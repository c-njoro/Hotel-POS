import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";

const UserTracking = ({ currentUser }) => {
  const [day, setDay] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    setDay(currentDay); // Set the current day of the week
  }, []);

  const isUserOnShiftNow = (shifts) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }); // e.g. "Monday"
    const currentHour = now.getHours(); // 0-23

    return shifts.some(({ day, time }) => {
      const isToday = day.toLowerCase() === currentDay.toLowerCase();

      if (!isToday) return false;

      if (time === "day") {
        return currentHour >= 6 && currentHour < 18;
      } else if (time === "night") {
        return currentHour >= 18 || currentHour < 6;
      }

      return false;
    });
  };

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

        <p className="font-body  text-gray-600 capitalize ">
          Hire Date:{" "}
          {new Date(currentUser.dateCreated).toISOString().split("T")[0]}
        </p>

        <p className="font-body font-semibold text-gray-600 capitalize tracking-widest">
          Status: {currentUser.isActive ? "Online" : "Offline"}
        </p>
      </nav>

      <main className="min-h-full w-full flex flex-col justify-start items-start p-5">
        <div className="shifts w-full flex flex-col justify-start items-start p-3 shadow-lg rounded-lg gap-8">
          <h1 className="text-xl font-bold font-heading tracking-widest text-gray-800">
            User Shifts
          </h1>
          <div className="w-full h-max flex flex-row justify-between items-center">
            {currentUser.shifts.length < 1 ? (
              <p>No shifts recorded fot this user!</p>
            ) : (
              currentUser.shifts.map((shift, index) => {
                return (
                  <div
                    className={`shift flex flex-col justify-start items-start gap-2 w-max min-w-40 ${
                      day.toLowerCase() === shift.day.toLowerCase()
                        ? "bg-blue-100 border-l-4 border-blue-500 p-3"
                        : "bg-white border-l-4 border-gray-300 p-3"
                    }`}
                    key={index}
                  >
                    <h3 className="tracking-widest">{shift.day}</h3>

                    {shift.time == "day" ? (
                      <div className="flex flex-row justify-start items-center gap-2 ">
                        <IoSunnySharp className="text-2xl text-yellow-500" />
                        <p className="text-gray-600">Day</p>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-start items-center gap-2 ">
                        <MdNightlight className="text-2xl text-white" />
                        <p>Night</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {currentUser.shifts.length > 0 ? (
            <div>
              {isUserOnShiftNow(currentUser.shifts) ? (
                <p className="text-green-600 font-semibold">
                  Currently on shift
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Not on shift</p>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
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
