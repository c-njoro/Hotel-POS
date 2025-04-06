// UserEdit.js
import {
  ArrayInput,
  Edit,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

const roles = [
  { id: "waiter", name: "waiter" },
  { id: "kitchen", name: "kitchen" },
  { id: "manager", name: "manager" },
  { id: "cashier", name: "cashier" },
];

const days = [
  { id: "Monday", name: "Monday" },
  { id: "Tuesday", name: "Tuesday" },
  { id: "Wednesday", name: "Wednesday" },
  { id: "Thursday", name: "Thursday" },
  { id: "Friday", name: "Friday" },
  { id: "Saturday", name: "Saturday" },
  { id: "Sunday", name: "Sunday" },
];

const shiftTimes = [
  { id: "day", name: "Day" },
  { id: "night", name: "Night" },
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

      {/* New shifts input */}
      <ArrayInput source="shifts">
        <SimpleFormIterator>
          <SelectInput source="day" choices={days} />
          <SelectInput source="time" choices={shiftTimes} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
