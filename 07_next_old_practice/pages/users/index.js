import Link from 'next/link';
import axios from 'axios';

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return <Link key={user.id} href={`http://localhost:3000/users/${user.id}`}>
          <p>{user.name}</p>
        </Link>
      })}
    </div>
  )
}

export async function getStaticProps() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return {
    props: {
      users: res.data
    }
  }
}

export default Users;