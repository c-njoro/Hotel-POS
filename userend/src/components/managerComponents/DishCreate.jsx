import {
  ArrayInput,
  BooleanInput,
  Create,
  maxValue,
  minValue,
  NumberInput,
  RadioButtonGroupInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

const categories = [
  { id: "Appetizer", name: "Appetizer" },
  { id: "Main Course", name: "Main Course" },
  { id: "Dessert", name: "Dessert" },
  { id: "Drink", name: "Drink" },
];

const DishCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Dish Name" required />

      <ArrayInput source="ingredients" label="Ingredients" required>
        <SimpleFormIterator>
          <TextInput source="" label="Ingredient" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="allergenInfo" label="Allergens" required>
        <SimpleFormIterator>
          <TextInput source="" label="Allergen" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="servingTimes" label="Serving Times" required>
        <SimpleFormIterator>
          <RadioButtonGroupInput
            source=""
            choices={[
              { id: "Breakfast", name: "Breakfast" },
              { id: "Lunch", name: "Lunch" },
              { id: "Dinner", name: "Dinner" },
            ]}
          />
        </SimpleFormIterator>
      </ArrayInput>

      <SelectInput source="category" choices={categories} required />

      <NumberInput source="preparationTime" label="Preparation Time (mins)" />

      <NumberInput source="price" label="Dish Price" required />

      <NumberInput source="discount" label="Discount (If Available)" required />
      <NumberInput
        source="spiceLevel"
        label="Spices Level"
        required
        validate={[minValue(0), maxValue(5)]}
      />
      <NumberInput
        source="rating"
        label="Dish Rating"
        required
        validate={[minValue(0), maxValue(5)]}
      />

      <TextInput source="cuisineType" label="Cuisine Type" />

      <NumberInput source="nutritionalInfo.calories" label="Calories" />
      <NumberInput source="nutritionalInfo.fat" label="Fat (g)" />
      <NumberInput source="nutritionalInfo.protein" label="Protein (g)" />

      <TextInput source="servingSize" label="Serving Size" required />

      <BooleanInput source="isChefSpecial" label="Chef Recommended" required />
      <BooleanInput
        source="availabilityStatus"
        label="Currently Available"
        required
      />
      <TextInput
        multiline
        source="description"
        label="Dish Description"
        required
      />
      <TextInput source="image" label="Image URL" fullWidth />
    </SimpleForm>
  </Create>
);

export default DishCreate;
