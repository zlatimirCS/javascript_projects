const fetchData = async (search) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'c8aa494e',
      s: search
    }
  });

  if (response.data.Error) {
    return [];
  } else {
  return response.data.Search;
  }
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
  <div class="dropdown-menu">
  <div class="dropdown-content results"></div>
  </div>
  </div>
  `;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
const dropdownItems = document.querySelectorAll('.dropdown-item');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    if (movies.length === 0) {
      console.log('No movies found');
      dropdown.classList.remove('is-active');
      return;
    }

    resultsWrapper.innerHTML = '';

    dropdown.classList.add('is-active');
    for (let movie of movies) {
      const option = document.createElement('a');
      const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
      option.classList.add('dropdown-item');
      option.innerHTML = `
        <img src="${imgSRC}" />
        ${movie.Title}
      `;
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;
      });
      resultsWrapper.appendChild(option);
    }
}
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
