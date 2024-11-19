let incomeTransactions = [];
let expenseTransactions = [];
let allTransactions = [];

function addIncome() {
    const date = document.getElementById('incomeDate').value;
    const description = document.getElementById('incomeDescription').value;
    const category = document.getElementById('incomeCategory').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);

    if (validateInput(date, description, category, amount)) {
        incomeTransactions.push({ date, description, category, amount });
        addTransactionToHistory('Income', date, description, category, amount);
        updateIncomeUI();
        calculateTotals();
    }
}

function addExpense() {
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (validateInput(date, description, category, amount)) {
        expenseTransactions.push({ date, description, category, amount });
        addTransactionToHistory('Expense', date, description, category, amount);
        updateExpenseUI();
        calculateTotals();
    }
}

function deleteIncome(index) {
    incomeTransactions.splice(index, 1);
    updateIncomeUI();
    calculateTotals();
}

function deleteExpense(index) {
    expenseTransactions.splice(index, 1);
    updateExpenseUI();
    calculateTotals();
}
function editIncome(index) {
    const transaction = incomeTransactions[index];
    document.getElementById('incomeDate').value = transaction.date;
    document.getElementById('incomeDescription').value = transaction.description;
    document.getElementById('incomeCategory').value = transaction.category;
    document.getElementById('incomeAmount').value = transaction.amount;
    deleteIncome(index);
}

function editExpense(index) {
    const transaction = expenseTransactions[index];
    document.getElementById('expenseDate').value = transaction.date;
    document.getElementById('expenseDescription').value = transaction.description;
    document.getElementById('expenseCategory').value = transaction.category;
    document.getElementById('expenseAmount').value = transaction.amount;
    deleteExpense(index);
}

function updateIncomeUI() {
    const incomeList = document.getElementById('incomeList');
    incomeList.innerHTML = "";
    incomeTransactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${transaction.date}</span>
                        <span>${transaction.description}</span>
                        <span>Category: ${transaction.category}</span>
                        <span>Amount: $${transaction.amount}</span>
                        <button onclick="deleteIncome(${incomeTransactions.indexOf(transaction)})">Delete</button>
                        <button onclick="editIncome(${incomeTransactions.indexOf(transaction)})">Edit</button>`;
        incomeList.appendChild(li);
    });
}

function updateExpenseUI() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = "";
    expenseTransactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${transaction.date}</span>
                        <span>${transaction.description}</span>
                        <span>Category: ${transaction.category}</span>
                        <span>Amount: $${transaction.amount}</span>
                        <button onclick="deleteExpense(${expenseTransactions.indexOf(transaction)})">Delete</button>
                        <button onclick="editExpense(${expenseTransactions.indexOf(transaction)})">Edit</button>`;
        expenseList.appendChild(li);
    });
}

function calculateTotals() {
    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpenses = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('netIncome').textContent = netIncome.toFixed(2);
}

function validateInput(date, description, category, amount) {
    // Check if date is not empty
    if (!date) {
        alert("Please enter a valid date.");
        return false;
    }

    // Check if description is not empty
    if (!description) {
        alert("Please enter a description.");
        return false;
    }

    // Check if category is not empty
    if (!category) {
        alert("Please enter a category.");
        return false;
    }

    // Check if amount is a positive number
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return false;
    }

    // All inputs are valid
    return true;
}
function addTransactionToHistory(type, date, description, category, amount) {
    const transaction = { type, date, description, category, amount };
    allTransactions.push(transaction);
    updateHistoryUI();
}

function updateHistoryUI() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = "";
    allTransactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} - ${transaction.description} - ${transaction.category} - $${transaction.amount}`;
        historyList.appendChild(li);
    });
}
