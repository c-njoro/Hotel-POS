import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const DishShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />

        <NumberField source="price" />
        <NumberField source="discount" />
        <NumberField source="rating" />
        <TextField source="category" />
        <TextField source="cuisineType" />
        <DateField source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
};

export default DishShow;
