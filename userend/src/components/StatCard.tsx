const StatCard = ({ title, value }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center w-full flex flex-col justify-start items-center gap-5">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
