import Link from "next/link";

const Kitchen = () => {
  return (
    <div>
      <h1>The Kitchen Page</h1>
      <Link href="/kitchen/orderManagement">Manage Orders</Link>
      <br />
      <Link href="/kitchen/dishesManagement">Manage Dishes</Link>
    </div>
  );
};

export default Kitchen;
