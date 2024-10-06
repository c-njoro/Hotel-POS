import Link from "next/link";

const Waiter = () => {
  return (
    <div>
      <h1>Waiters Page</h1>
      <Link href="/waiter/order">Make An Order</Link>
      <br />
      <Link href="/waiter/editOrder">Edit my Orders</Link>
    </div>
  );
};

export default Waiter;
