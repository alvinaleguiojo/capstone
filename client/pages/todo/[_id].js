import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const RouterId = ({ user }) => {
  //   const router = useRouter();
  //   const { id } = router.query;

  return (
    <div>
      {user.map((userdata, key) => {
        return (
          <div key={key}>
            <h1> {userdata.name}</h1>
            <h1> {userdata.id}</h1>
            <Link href="/todo">Go back</Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterId;

export const getStaticProps = async (contex) => {
  const res = await fetch(`http://localhost:3001/users/${contex.params._id}`);
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3001/users`);
  const { results } = await res.json();

  const ids = results.map((userdata) => userdata._id);
  const paths = ids.map((_id) => ({ params: { _id: _id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
