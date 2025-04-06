import axios from "axios";

const UserTracking = ({ currentUser }) => {
  return (
    <div>
      <h1>Track user</h1>
      <p>User ID: {currentUser._id}</p>
      <p>User Name: {currentUser.name}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_URL}`);
  const users = response.data;

  const allPaths = users.map((usr) => {
    return {
      params: {
        userId: usr._id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.userId;
  console.log("Fetching user with ID: ", id);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_USERS_URL}/findOne/${id}`
  );
  const currentUser = res.data;
  return { props: { currentUser } };
}

export default UserTracking;
