import {
  BooleanInput,
  Edit,
  maxValue,
  minValue,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const DishEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" disabled />
      <NumberInput source="price" />
      <BooleanInput source="availabilityStatus" />
      <TextInput source="image" />
      <NumberInput source="discount" />
      <NumberInput source="rating" validate={[minValue(1), maxValue(5)]} />
    </SimpleForm>
  </Edit>
);

export default DishEdit;
