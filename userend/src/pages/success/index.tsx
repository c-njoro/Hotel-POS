import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Successful = () => {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedID = localStorage.getItem("paidId");
      if (savedID) {
        setCurrentId(savedID);
      }
    }
  }, []);

  useEffect(() => {
    if (currentId.trim() !== "") {
      markOrderAsPaid(currentId);
    }
  }, [currentId]);

  const markOrderAsPaid = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          paymentStatus: "paid",
        }
      );
    } catch (error) {
      console.log("Could not mark as paid due to : ", error);
    }
  };
  return (
    <div className="bg-blue-200 w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center gap-16">
      <h1 className="text-green-600 font-bold text-2xl tracking-widest capitalize">
        Successful Order Payment
      </h1>
      <Link
        href="/"
        className="bg-blue-50 text-gray-500 w-max h-max py-2 px-12 rounded-full shadow-md"
      >
        Back Home
      </Link>
    </div>
  );
};

export default Successful;
