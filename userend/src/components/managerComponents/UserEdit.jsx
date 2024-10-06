import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

const roles = [
  { id: "waiter", name: "waiter" },
  { id: "kitchen", name: "kitchen" },
  { id: "manager", name: "manager" },
  { id: "cashier", name: "cashier" },
];

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="profilePicture" />
      <SelectInput source="role" choices={roles} />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
