import { addExpense, getTotalExpenses, filterExpenses, fetchExpenseReport } from "./tracker.js";

// Add Expense Event
document.getElementById("addExpenseBtn").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    const newExpense = addExpense(description, amount, date);
    if (newExpense) {
        updateExpenseList();
        updateTotalExpenses();
    }
});

// Update Total Expenses
function updateTotalExpenses() {
    document.getElementById("totalAmount").textContent = getTotalExpenses();
}

// Update Expense List
function updateExpenseList(filteredExpenses = null) {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    const expensesToShow = filteredExpenses || expenses;

    expensesToShow.forEach(exp => {
        const li = document.createElement("li");
        li.textContent = `${exp.description} - ₹${exp.amount} on ${exp.date.toDateString()}`;
        expenseList.appendChild(li);
    });
}

// Filter Expenses Event
document.getElementById("filterBtn").addEventListener("click", () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const filtered = filterExpenses(startDate, endDate);
    updateExpenseList(filtered);
});

// Fetch Expense Report
document.getElementById("fetchReportBtn").addEventListener("click", async () => {
    const reportStatus = document.getElementById("reportStatus");
    reportStatus.textContent = "Fetching report...";

    try {
        const report = await fetchExpenseReport();
        reportStatus.textContent = report;
    } catch (error) {
        reportStatus.textContent = `Error: ${error}`;
    }
});
