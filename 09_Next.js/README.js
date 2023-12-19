NEXT JS

In getServerSideProps if we get empty response and we want to redirect to some other page:

export async function getServerSideProps(context) {
  const { query } = context;
  const url = query && query.slug && query.slug.join('/');
  const slug = query.slug;

  const delay = (s) => new Promise((resolve) => setTimeout(resolve, s));

  let brandById = null;
  try {
    const response = await axios.get(`${serverConfig.SERVER_URL}/${AXIOS_API_CALL.brands}/${slug}`);
    console.log('response', response);
    // if response is empty redirect to brendovi page
    if (response.status === 200) {
      brandById = response.data;
    }
  } catch (err) {
    console.error('Fetch data of featured products:', err);
  }

  if (!brandById) {
    return {
      redirect: {
        destination: '/brendovi',
        permanent: false,
      },
    };
  }

  // ALL PRODUCTS
  let allProducts = [];
  try {
    const response = await axios.get(`${serverConfig.SERVER_URL}/${AXIOS_API_CALL.products}`);
    if (response.status === 200) {
      allProducts = response.data;
    }
  } catch (err) {
    console.error('Fetch data of all products:', err);
  }

  await delay(400);

  return {
    props: {
      brandById: brandById,
      allProducts: allProducts,
    },
  };
}
—----------------------------------------------------------------------

  We can use this snippet
if (!brandById) {
  return {
    redirect: {
      destination: '/brendovi',
      permanent: false,
    },
  };
}

—----------------------------------------------------------------------
