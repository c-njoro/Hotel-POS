import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Structure = ({ children }) => {
  return (
    <div className="main-structure-container relative ">
      <div className="fixed top-0 left-0 z-20">
        <Header />
      </div>
      <div className="mt-[calc(10vh)]">{children}</div>
      <ToastContainer />
    </div>
  );
};

export default Structure;
