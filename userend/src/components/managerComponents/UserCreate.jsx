// UserCreate.js
import {
  ArrayInput,
  Create,
  PasswordInput,
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

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <SelectInput source="role" choices={roles} />

      {/* New shifts input */}
      <ArrayInput source="shifts">
        <SimpleFormIterator>
          <SelectInput source="day" choices={days} />
          <SelectInput source="time" choices={shiftTimes} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default UserCreate;
