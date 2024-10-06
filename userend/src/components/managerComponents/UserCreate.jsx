// ProductCreate.js
import {
  Create,
  PasswordInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const roles = [
  { id: "waiter", name: "waiter" },
  { id: "kitchen", name: "kitchen" },
  { id: "manager", name: "manager" },
  { id: "cashier", name: "cashier" },
];

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <SelectInput source="role" choices={roles} />
    </SimpleForm>
  </Create>
);

export default UserCreate;
