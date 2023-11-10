import axios from 'axios';

const User = ({ user }) => {

  return (
    <div>{user.name}</div>
  )
}

export async function getServerSideProps({ params }) {
  // console.log('ctx', ctx);
  // console.log('paramas', ctx.params);

  const { name } = params;
  console.log('params', name);
  // const { slug } = ctx.query;
  // console.log('slug', slug);
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${name}`);
  if (res.status === 404) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      user: res.data
    }
  }
}

export default User;