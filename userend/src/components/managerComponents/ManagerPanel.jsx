import { Admin, Resource } from "react-admin";
import customDataProvider from "./customDataProvider";

//custom components
import CustomLayout from "./CustomLayout";
import DishCreate from "./DishCreate";
import DishEdit from "./DishEdit";
import DishesList from "./DishesList";
import DishShow from "./DishShow";
import OrderEdit from "./OrderEdit";
import OrderList from "./OrderList";
import OrderShow from "./OrderShow";
import StockCreate from "./StockCreate";
import StockEdit from "./StockEdit";
import StockList from "./StockList";
import StockShow from "./StockShow";
import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import UserShow from "./UserShow";
import UserList from "./UsersList";

const ManagerPanel = () => {
  return (
    <Admin dataProvider={customDataProvider} layout={CustomLayout}>
      <Resource
        name="dishes"
        list={DishesList}
        create={DishCreate}
        edit={DishEdit}
        show={DishShow}
      />

      <Resource
        name="users"
        list={UserList}
        create={UserCreate}
        show={UserShow}
        edit={UserEdit}
      />

      <Resource
        name="orders"
        list={OrderList}
        edit={OrderEdit}
        show={OrderShow}
      />

      <Resource
        name="stock"
        list={StockList}
        edit={StockEdit}
        show={StockShow}
        create={StockCreate}
      />
    </Admin>
  );
};

export default ManagerPanel;
