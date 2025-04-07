import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";

const UserProfile = () => {
  const [day, setDay] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    setDay(currentDay); // Set the current day of the week
  }, []);
  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
    refetch: refetchSession,
  } = useSessionHook();
  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useUser(sessionData?.email);

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
    <div className="w-screen h-[calc(90vh)] flex flex-col justify-start items-start p-5 gap-8 bg-blue-200">
      <div>
        <h1 className="text-3xl text-gray-600 font-body font-semibold tracking-widest">
          {user.name}
        </h1>
      </div>
      <div>
        <Image
          src={`${user.profilePicture}`}
          alt="Profile picture"
          width={500}
          height={500}
          className="h-56 w-56 rounded-lg object-cover shadow-lg mb-4" // Add border and rounded-full for styling
        ></Image>
        <p className="text-base tracking-widest text-gray-500 font-heading mt-3">
          {user.email}
        </p>
      </div>
      <div className="shifts w-full flex flex-col justify-start items-start p-3 shadow-lg rounded-lg gap-8">
        <h1 className="text-xl font-bold font-heading tracking-widest text-gray-800">
          My Shift Schedule
        </h1>
        <div className="w-full h-max flex flex-row justify-between items-center">
          {user.shifts.length < 1 ? (
            <p>No shifts recorded for you!</p>
          ) : (
            user.shifts.map((shift, index) => {
              return (
                <div
                  className={`shift flex flex-col justify-start items-start gap-2 w-max min-w-40 ${
                    day.toLowerCase() === shift.day.toLowerCase()
                      ? "bg-blue-300 border-l-4 border-blue-500 p-3"
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
        {user.shifts.length > 0 ? (
          <div>
            {isUserOnShiftNow(user.shifts) ? (
              <p className="text-green-600 font-semibold">Currently on shift</p>
            ) : (
              <p className="text-red-600 font-semibold">Not on shift</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        <Link
          href="/profile/change-password"
          className="py-2 px-8 w-max h-max bg-white rounded-full shadow-md text-sm uppercase tracking-widest font-body"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
