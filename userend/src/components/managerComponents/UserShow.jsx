// UserShow.js
import {
  ArrayField,
  Datagrid,
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="isActive" />
      <DateField source="dateCreated" label="Join Date" />
      <TextField source="__v" label="Appearances" />

      {/* Shifts Table */}
      <ArrayField source="shifts">
        <Datagrid bulkActionButtons={false}>
          <TextField source="day" label="Shift Day" />
          <TextField source="time" label="Shift Time" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
