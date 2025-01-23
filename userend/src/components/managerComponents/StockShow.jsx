import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const StockShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Stock Name" />
      <TextField source="category" label="Category" />
      <NumberField source="quantity" label="Quantity" />
      <TextField source="unit" label="Unit" />
      <NumberField source="threshold" label="Threshold" />
      <DateField source="createdAt" label="Created At" />
      <DateField source="lastUpdated" label="Last Updated" />
    </SimpleShowLayout>
  </Show>
);

export default StockShow;
