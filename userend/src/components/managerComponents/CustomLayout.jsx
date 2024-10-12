// CustomLayout.js
import { AppBar as DefaultAppBar, Layout } from "react-admin";

const CustomAppBar = (props) => (
  <DefaultAppBar {...props} style={{ position: "absolute" }} />
);

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
