import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

const PieChartComponent = ({ title, data }) => (
  <div className="p-4 shadow-md bg-white rounded-xl w-full h-max">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <PieChart width={500} height={450}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default PieChartComponent;
