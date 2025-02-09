import axios from "axios";
import React from "react";
import useMessages from "../../components/hooks/messagesHook";
import useSessionHook from "../../components/hooks/sessionHook";
import useUser from "../../components/hooks/userHook";

const Notifications = () => {
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
  const {
    data: messages,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessages(user?._id);

  const deleteMessage = async (messageId) => {
    try {
      const del = await axios.delete(
        `${process.env.NEXT_PUBLIC_MESSAGES_URL}/delete/${messageId}`
      );
    } catch (error) {
      console.log("Could not delete message from client side: ", error);
    }
  };

  return (
    <div className="w-screen h-[calc(90vh)] flex flex-col justify-start items-center bg-blue-200 p-5 overflow-auto">
      <div className="w-full h-max flex flex-col justify-center items-center">
        <h1 className="font-beauty font-bold capitalize text-3xl tracking-wider">
          Notifications
        </h1>
      </div>
      {messages ? (
        messages.length > 0 ? (
          <div className="w-full h-max flex flex-col justify-start items-start gap-3 pt-5 ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`border-l-2 border-blue-400 p-3 rounded-lg shadow-md ${
                  !msg.opened ? "bg-blue-300" : ""
                }`}
              >
                <div>
                  <p className="font-body p-1 text-gray-800">{msg.text}</p>
                </div>
                <div className="flex flex-row justify-start items-center gap-5">
                  <p className="text-sm  text-gray-500">
                    {new Date(msg.timestamp).toLocaleDateString("en-CA")},
                  </p>
                  <p className="text-sm font-body  text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString("en-CA")}
                  </p>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <button
                    onClick={() => {
                      deleteMessage(msg._id);
                    }}
                    className="flex flex-row justify-start items-center mt-3 shadow-md px-4 py-1 rounded-lg "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="size-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>

                    <p className="text-red-600 tracking-wide uppercase text-xs font-body">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No messages sent to you</h1>
          </div>
        )
      ) : messagesLoading ? (
        <div>
          <h1>Loading messages</h1>
        </div>
      ) : messagesError ? (
        <div>
          <h1>Error fetching messages</h1>
        </div>
      ) : (
        <div>
          <h1>No messages fetch</h1>
        </div>
      )}
    </div>
  );
};

export default Notifications;
