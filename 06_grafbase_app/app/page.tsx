import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex-start flex-col paddings mb-16">
        <h1>Categories</h1>
        <h1>Posts</h1>
        <h1>LoadMore</h1>
      </section>
    </>
  );
};

export default Home;
