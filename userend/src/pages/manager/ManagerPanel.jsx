import React from "react";
import { Admin, Resource } from "react-admin";
import customDataProvider from "./customDataProvider";

//custom components
import DishCreate from "../../components/managerComponents/DishCreate";
import DishEdit from "../../components/managerComponents/DishEdit";
import DishesList from "../../components/managerComponents/DishesList";
import DishShow from "../../components/managerComponents/DishShow";
import OrderEdit from "../../components/managerComponents/OrderEdit";
import OrderList from "../../components/managerComponents/OrderList";
import OrderShow from "../../components/managerComponents/OrderShow";
import UserCreate from "../../components/managerComponents/UserCreate";
import UserEdit from "../../components/managerComponents/UserEdit";
import UserShow from "../../components/managerComponents/UserShow";
import UserList from "../../components/managerComponents/UsersList";

const ManagerPanel = () => {
  return (
    <Admin dataProvider={customDataProvider}>
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
    </Admin>
  );
};

export default ManagerPanel;
