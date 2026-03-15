import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allTransactions =
      JSON.parse(localStorage.getItem("transactions")) || {};

    if (currentUser && allTransactions[currentUser.email]) {
      setTransactions(allTransactions[currentUser.email]);
    } else {
      setTransactions([]);
    }
  }, []);

  
  // Filter transactions for selected date
  const transactionsOnDate = transactions.filter((t) => {
    if (!t.date) return false;
    const selected = new Date(date).toISOString().split("T")[0];
    return t.date === selected;
  });

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Expense Calendar
      </h1>

      {/* Centered Calendar */}
      <div className="flex justify-center">
        <div className="p-6 rounded shadow bg-white dark:bg-transparent">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const formatted = date.toISOString().split("T")[0];

                const dayTransactions = transactions.filter(
                  (t) => t.date === formatted
                );

                const hasIncome = dayTransactions.some(
                  (t) => t.type === "Income"
                );

                const hasExpense = dayTransactions.some(
                  (t) => t.type === "Expense"
                );

                return (
                  <div className="flex justify-center gap-1 mt-1">
                    {hasIncome && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {hasExpense && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                );
              }
            }}
          />
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        {transactionsOnDate.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No transactions on this date.
          </p>
        ) : (
          transactionsOnDate.map((t, index) => (
            <div key={index} className="py-2 border-b dark:border-gray-700">
              <span
                className={
                  t.type === "Income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {t.type}
              </span>{" "}
              ₹{t.amount} - {t.category}
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CalendarPage;