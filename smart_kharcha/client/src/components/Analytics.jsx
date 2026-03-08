import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Analytics = ({ transactions }) => {

  const totalIncome = transactions
    .filter(t => t.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  // Monthly grouping
  const monthlyData = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    if (t.type === "Expense") {
      monthlyData[month] += Number(t.amount);
    }
  });

  const barData = Object.keys(monthlyData).map(month => ({
    month,
    expense: monthlyData[month]
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Income vs Expense
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Monthly Expenses
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analytics;