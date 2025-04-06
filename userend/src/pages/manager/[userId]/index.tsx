import axios from "axios";
import Image from "next/image";

const UserTracking = ({ currentUser }) => {
  return (
    <div className="w-screen h-[calc(90vh)] flex flex-row justify-start items-start bg-blue-200">
      <nav className="side-nav w-64 h-full flex flex-col justify-start items-start shadow-lg p-5 gap-4">
        <Image
          src={`${currentUser.profilePicture}`}
          alt="Profile picture"
          width={500}
          height={500}
          className="h-48 w-48 rounded-full object-cover shadow-lg mb-4" // Add border and rounded-full for styling
        ></Image>
        <h1 className="text-2xl font-bold font-body tracking-wider text-gray-800">
          {currentUser.name}
        </h1>
        <p className="font-body font-semibold text-gray-600 capitalize tracking-widest">
          Role: {currentUser.role}
        </p>
        <p className="font-heading font-semibold text-gray-500  tracking-widest">
          {currentUser.email}
        </p>

        <p className="font-body font-semibold text-gray-600 capitalize tracking-widest">
          Status: {currentUser.isActive ? "Online" : "Offline"}
        </p>
      </nav>
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
