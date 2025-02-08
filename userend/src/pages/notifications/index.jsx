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

  return (
    <div className="w-screen h-[calc(90vh)] flex flex-col justify-start items-center bg-blue-200 p-5">
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
                className="border-l-2 border-blue-400 p-3 rounded-lg shadow-md"
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
