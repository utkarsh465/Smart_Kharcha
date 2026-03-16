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
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const totalExpense = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const pieData = [
    { name: "Income", value: totalIncome || 0 },
    { name: "Expense", value: totalExpense || 0 }
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  // Monthly grouping
  const monthlyData = {};

  transactions.forEach(t => {
    try {
      if (!t.date) return;
      const dateObj = new Date(t.date);
      if (isNaN(dateObj)) return; // Skip invalid dates
      const month = dateObj.toLocaleString("default", { month: "short" });
      
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      if (t.type === "Expense") {
        monthlyData[month] += (Number(t.amount) || 0);
      }
      // eslint-disable-next-line no-unused-vars
    } catch(e) { /* ignore parse errors */ }
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