import useOrders from "@/components/hooks/orderHook";
import PieChartComponent from "@/components/PieChartComponent";
import StatCard from "@/components/StatCard";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";

const UserTracking = ({ currentUser }) => {
  const [day, setDay] = useState("");

  //kitchen data
  const [prepared, setPrepared] = useState([]);
  const [unPrepared, setUnPrepared] = useState([]);

  //waiters data
  const [myOrders, setMyOrders] = useState([]);
  const [served, setServed] = useState([]);
  const [unServed, setUnServed] = useState([]);

  //cashiers data
  const [paid, setPaid] = useState([]);
  const [unPaid, setUnPaid] = useState([]);

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrders();

  useEffect(() => {
    if (currentUser.role == "waiter") {
      if (orders && orders.length > 0) {
        const userOrders = orders.filter(
          (order) => order.waiter.waiterId === currentUser._id
        );
        setMyOrders(userOrders);

        const servedOrders = userOrders.filter(
          (order) => order.orderStatus === "served"
        );
        setServed(servedOrders);

        const unServedOrders = userOrders.filter(
          (order) => order.orderStatus !== "served"
        );
        setUnServed(unServedOrders);
      }

      return;
    }

    if (currentUser.role == "kitchen") {
      if (orders && orders.length > 0) {
        // Filter orders for the kitchen
        const readyOrders = orders.filter(
          (order) => order.orderStatus !== "preparing"
        );
        setPrepared(readyOrders);

        const unOrders = orders.filter(
          (order) => order.orderStatus == "preparing"
        );
        setUnPrepared(unOrders);
      }
      return;
    }

    if (currentUser.role == "cashier") {
      if (orders && orders.length > 0) {
        // Filter orders for the cashier
        const paidOrders = orders.filter(
          (order) => order.paymentStatus === "paid"
        );
        setPaid(paidOrders);

        const unPaidOrders = orders.filter(
          (order) => order.paymentStatus === "pending"
        );
        setUnPaid(unPaidOrders);
      }
      return;
    }
  }, [orders]);

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
            {currentUser.name}'s Shift Schedule
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
        <div className="user-performance w-full h-max flex flex-col justify-start items-start p-5">
          {currentUser.role === "kitchen" && (
            <div className="w-full h-max flex flex-row justify-around items-start gap-4">
              <div className="w-1/2">
                <PieChartComponent
                  title="Order Preparation Status"
                  data={[
                    { name: "Prepared", value: prepared.length },
                    { name: "Preparing", value: unPrepared.length },
                  ]}
                />
              </div>

              <div className="w-1/2 flex flex-col justify-start items-start gap-4">
                <StatCard
                  title="Total Orders"
                  value={prepared.length + unPrepared.length}
                />
                <StatCard title="Prepared" value={prepared.length} />
                <StatCard title="Preparing" value={unPrepared.length} />
              </div>
            </div>
          )}

          {currentUser.role === "waiter" && (
            <div className="w-full h-max flex flex-row justify-around items-start gap-4">
              <div className="w-1/2">
                <PieChartComponent
                  title="Order Serving Status"
                  data={[
                    { name: "Served", value: served.length },
                    { name: "Unserved", value: unServed.length },
                  ]}
                />
              </div>

              <div className="w-1/2 flex flex-col justify-start items-start gap-4">
                <StatCard
                  title={`${currentUser.name} Orders`}
                  value={myOrders.length}
                />
                <StatCard title="Served" value={served.length} />
                <StatCard title="Unserved" value={unServed.length} />
              </div>
            </div>
          )}

          {currentUser.role === "cashier" && (
            <div className="w-full h-max flex flex-row justify-around items-start gap-4">
              <div className="w-1/2">
                <PieChartComponent
                  title="Payment Status"
                  data={[
                    { name: "Paid", value: paid.length },
                    { name: "Pending", value: unPaid.length },
                  ]}
                />
              </div>

              <div className="w-1/2 flex flex-col justify-start items-start gap-4">
                <StatCard
                  title="Total Orders"
                  value={paid.length + unPaid.length}
                />
                <StatCard title="Paid" value={paid.length} />
                <StatCard title="Unpaid" value={unPaid.length} />
              </div>
            </div>
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
