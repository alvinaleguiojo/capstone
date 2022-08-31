import React from "react";
import Link from "next/link";

const index = ({ users }) => {
  return (
    <div>
      {users.map((user, key) => {
        return (
          <div key={key}>
            <Link href={`/todo/${user._id}`}>{user.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default index;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3001/users?page=1&limit=10");
  const { results } = await res.json();

  return {
    props: {
      users: results,
    },
  };
};
