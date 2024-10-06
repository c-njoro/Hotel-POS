// ProductEdit.js
import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

const status = [
  { id: "preparing", name: "preparing" },
  { id: "ready", name: "ready" },
  { id: "served", name: "served" },
];

const payment = [
  { id: "pending", name: "pending" },
  { id: "paid", name: "paid" },
];

const OrderEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="table" disabled />
      <SelectInput source="paymentStatus" choices={payment} />
      <SelectInput source="orderStatus" choices={status} />
    </SimpleForm>
  </Edit>
);

export default OrderEdit;
