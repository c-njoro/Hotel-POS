// UserCreate.js
import {
  ArrayInput,
  Create,
  email,
  minLength,
  PasswordInput,
  regex,
  required,
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

const validateEmail = [required(), email()];

const validateNotJustNumbers = [
  required(),
  regex(/[^0-9]/, "Cannot consist of only numbers"),
];

// Password validation: at least 8 chars, must contain at least one lowercase, uppercase, number, and special character
const validatePassword = [
  required(),
  minLength(8, "Password must be at least 8 characters"),
  regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
    "Password must include lowercase, uppercase, number, and special character"
  ),
];

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={validateNotJustNumbers} fullWidth />
      <TextInput
        source="username"
        validate={validateNotJustNumbers}
        fullWidth
      />
      <TextInput source="email" validate={validateEmail} fullWidth />
      <PasswordInput source="password" validate={validatePassword} fullWidth />
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
