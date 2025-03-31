const expenses = [];

// Add Expense
export function addExpense(description, amount, date) {
    try {
        if (!description.trim()) throw new Error("Description cannot be empty.");
        if (isNaN(amount) || amount <= 0) throw new Error("Amount must be a positive number.");
        
        const expenseDate = new Date(date);
        if (isNaN(expenseDate)) throw new Error("Invalid date.");

        const expense = { description, amount: parseFloat(amount), date: expenseDate };
        expenses.push(expense);
        console.log(`Expense added: ${description} - ₹${amount} on ${expenseDate}`);

        return expense;
    } catch (error) {
        console.error(error.message);
    }
}

// Calculate Total Expenses
export function getTotalExpenses() {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
}

// Filter Expenses by Date Range
export function filterExpenses(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return expenses.filter(exp => exp.date >= start && exp.date <= end);
}

// Simulate Fetching an Expense Report Asynchronously
export function fetchExpenseReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length === 0) {
                reject("No expenses to generate report.");
            } else {
                resolve(`Expense report generated. Total: ₹${getTotalExpenses()}`);
            }
        }, 2000);
    });
}
