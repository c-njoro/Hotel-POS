import {
  Edit,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const categories = [
  { id: "Grain", name: "Grain" },
  { id: "Meat", name: "Meat" },
  { id: "Vegetable", name: "Vegetable" },
  { id: "Dairy", name: "Dairy" },
  { id: "Spices", name: "Spices" },
  { id: "Beverage", name: "Beverage" },
  { id: "Other", name: "Other" },
];

const units = [
  { id: "kg", name: "kg" },
  { id: "liters", name: "liters" },
  { id: "pieces", name: "pieces" },
  { id: "grams", name: "grams" },
  { id: "packs", name: "packs" },
];

const StockEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Stock Name" required />
      <SelectInput
        source="category"
        label="Category"
        choices={categories}
        required
      />
      <NumberInput source="quantity" label="Quantity" required min={0} />
      <SelectInput source="unit" label="Unit" choices={units} required />
      <NumberInput source="threshold" label="Threshold" min={0} />
    </SimpleForm>
  </Edit>
);

export default StockEdit;
