import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  Filter,
  List,
  Pagination,
  TextField,
  TextInput,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name" alwaysOn />
    <TextInput label="Search by role" source="role" />
  </Filter>
);

const UserList = (props) => {
  return (
    <List
      {...props}
      pagination={<ProductPagination />}
      perPage={5}
      filters={<UserFilter />}
    >
      <Datagrid>
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" />
        <TextField source="isActive" />
        <DateField source="dateCreated" label="Date Joined" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
