import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  Filter,
  List,
  Pagination,
  SelectInput,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const OrderFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by tracking table" source="table" alwaysOn />
    <SelectInput
      label="Order Status"
      source="orderStatus"
      choices={[
        { id: "preparing", name: "preparing" },
        { id: "ready", name: "ready" },
        { id: "served", name: "served" },
      ]}
    />
    <SelectInput
      label="Payment Status"
      source="paymentStatus"
      choices={[
        { id: "pending", name: "pending" },
        { id: "paid", name: "paid" },
      ]}
    />
  </Filter>
);

const OrderList = (props) => {
  return (
    <List {...props} filters={<OrderFilter />}>
      <Datagrid>
        <TextField source="table" label="Table Number" />
        <TextField source="orderStatus" />
        <TextField source="totalAmount" />
        <TextField source="paymentStatus" />
        <TextField source="waiter.name" label="Waiter/Waitress" />
        <ArrayField source="dishes">
          <SingleFieldList>
            <ChipField source="dishName" />
            <ChipField source="quantity" />
          </SingleFieldList>
        </ArrayField>
        <DateField source="dateCreated" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrderList;
