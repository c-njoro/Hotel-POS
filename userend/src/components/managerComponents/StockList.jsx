import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  TextField,
} from "react-admin";

const StockList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Stock Name" />
      <TextField source="category" label="Category" />
      <NumberField source="quantity" label="Quantity" />
      <TextField source="unit" label="Unit" />
      <NumberField source="threshold" label="Threshold" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default StockList;
