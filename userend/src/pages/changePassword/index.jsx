import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
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

  const [oldType, setOldType] = useState("text");
  const [newType, setNewType] = useState("password");
  const [inputForm, setInputForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendChangeRequest = async (e) => {
    e.preventDefault();
    const userEmail = user?.email;

    if (inputForm.oldPassword.length < 1 || inputForm.newPassword.length < 1) {
      console.log("Please fill the form!!!");

      return;
    }

    if (!userEmail) {
      console.log("Could not find user email!!!");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_USERS_URL}/changePassword`,
        {
          email: userEmail,
          oldPassword: inputForm.oldPassword,
          newPassword: inputForm.newPassword,
        }
      );

      if (res.status == 200) {
        console.log("Password Changed Successfully");
        setInputForm({ oldPassword: "", newPassword: "" });
        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      if (error.status == 409) {
        console.log("You put wrong current password!!");
        toast.error("Wrong Password!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.log("Could not change password due to: ", error.response.data);
        toast.error("Operation failed, please try again after 3 seconds!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const toggleNew = () => {
    setNewType((prev) => {
      if (prev === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  const toggleOld = () => {
    setOldType((prev) => {
      if (prev === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  return (
    <div className="main-change-container">
      <div className="heading">
        <h1>Change Password</h1>
      </div>
      <div className="form-container">
        <form onSubmit={sendChangeRequest}>
          <div className="one-input">
            <input
              type={oldType}
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter current password..."
              value={inputForm.oldPassword}
              onChange={handleChange}
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={toggleOld}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <div className="one-input">
            <input
              type={newType}
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password..."
              value={inputForm.newPassword}
              onChange={handleChange}
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={toggleNew}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>

          <input type="submit" value="Change Password" />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
