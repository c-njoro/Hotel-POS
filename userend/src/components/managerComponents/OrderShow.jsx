// ProductShow.js
import {
  ArrayField,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";

const OrderShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="table" />
      <TextField source="waiter.name" label="Waiter/Waitress" />
      <TextField source="orderStatus" />
      <ArrayField source="dishes">
        <SingleFieldList>
          <TextField source="dishName" label="Name" />
          <br />
          <TextField source="quantity" label="Quantity" aria-label="Quantity" />
          <br />
          <TextField source="unitPrice" label="Unit Price" />
          <br />
          <TextField source="totalPrice" label="Total Price" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="totalAmount" />
      <TextField source="paymentStatus" />
      <DateField source="dateCreated" />
    </SimpleShowLayout>
  </Show>
);

export default OrderShow;
