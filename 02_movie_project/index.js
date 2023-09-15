const autoCompleteConfig = {
renderOption(movie) {
    const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${imgSRC}" />
    ${movie.Title}
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'c8aa494e',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  } else {
  return response.data.Search;
  }
}
};

createAutocomplete({
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
  ...autoCompleteConfig
});
createAutocomplete({
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
  ...autoCompleteConfig
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryWrapper, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'c8aa494e',
      i: movie.imdbID
    }
  });
  summaryWrapper.innerHTML = movieTemplate(response.data);
  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  console.log('Time for comparison');
}

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  });

  return `
  <article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${movieDetail.Poster}" />
  </p>
  </figure>
  <div class="media-content">
  <div class="content">
  <h1>${movieDetail.Title}</h1>
  <h4>${movieDetail.Genre}</h4>
  <p>${movieDetail.Plot}</p>
  </div>
  </div>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
  </article>`
};
