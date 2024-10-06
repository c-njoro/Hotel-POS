import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Structure = ({ children }) => {
  return (
    <div className="main-structure-container">
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <ToastContainer />
    </div>
  );
};

export default Structure;
