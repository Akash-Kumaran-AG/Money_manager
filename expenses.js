// document.addEventListener('DOMContentLoaded', () => {
//     const addButton = document.getElementById('addButton');
//     const modal = document.getElementById('modal');
//     const closeModal = document.getElementsByClassName('close')[0];
//     const expenseForm = document.getElementById('expenseForm');
//     const expenseTableContainer = document.getElementById('expenseTableContainer');
//     const totalIncomeElem = document.getElementById('totalIncome');
//     const totalExpenseElem = document.getElementById('totalExpense');
    
//     let totalIncome = 0;
//     let totalExpense = 0;
//     const dateSections = {};
//     const dailyTotals = {};

//     addButton.addEventListener('click', () => {
//         modal.style.display = 'block';
//     });

//     closeModal.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });

//     window.addEventListener('click', (event) => {
//         if (event.target == modal) {
//             modal.style.display = 'none';
//         }
//     });

//     expenseForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formData = new FormData(expenseForm);
//         const type = formData.get('type');
//         const amount = parseFloat(formData.get('amount'));
//         const description = formData.get('description');
//         const now = new Date();
//         const date = now.toLocaleDateString();
//         const time = now.toLocaleTimeString();

//         if (!dateSections[date]) {
//             const dateSection = document.createElement('div');
//             dateSection.classList.add('date-section');
            
//             const dateHeader = document.createElement('div');
//             dateHeader.classList.add('date-header');
//             dateHeader.textContent = date;
            
//             const table = document.createElement('table');
//             const thead = document.createElement('thead');
//             const tbody = document.createElement('tbody');
            
//             const headerRow = document.createElement('tr');
//             ['Date', 'Time', 'Description', 'Amount'].forEach(text => {
//                 const th = document.createElement('th');
//                 th.textContent = text;
//                 headerRow.appendChild(th);
//             });
            
//             thead.appendChild(headerRow);
//             table.appendChild(thead);
//             table.appendChild(tbody);
            
//             dateSection.appendChild(dateHeader);
//             dateSection.appendChild(table);
            
//             const totalsRow = document.createElement('div');
//             totalsRow.classList.add('daily-totals');
//             totalsRow.innerHTML = `
//                 <span>Total Income: <span class="daily-income">0</span></span>
//                 <span>Total Expense: <span class="daily-expense">0</span></span>
//             `;
            
//             dateSection.appendChild(totalsRow);
            
//             expenseTableContainer.appendChild(dateSection);
//             dateSections[date] = tbody;
//             dailyTotals[date] = { income: 0, expense: 0, totalsRow: totalsRow };
//         }

//         const row = dateSections[date].insertRow();
//         row.insertCell(0).textContent = date;
//         row.insertCell(1).textContent = time;
//         row.insertCell(2).textContent = description;
//         row.insertCell(3).textContent = amount.toFixed(2);

//         if (type === 'income') {
//             totalIncome += amount;
//             totalIncomeElem.textContent = totalIncome.toFixed(2);
//             dailyTotals[date].income += amount;
//             dailyTotals[date].totalsRow.querySelector('.daily-income').textContent = dailyTotals[date].income.toFixed(2);
//         } else {
//             totalExpense += amount;
//             totalExpenseElem.textContent = totalExpense.toFixed(2);
//             dailyTotals[date].expense += amount;
//             dailyTotals[date].totalsRow.querySelector('.daily-expense').textContent = dailyTotals[date].expense.toFixed(2);
//         }

//         expenseForm.reset();
//         modal.style.display = 'none';
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const expenseForm = document.getElementById('expenseForm');
    const expenseTableContainer = document.getElementById('expenseTableContainer');
    const totalIncomeElem = document.getElementById('totalIncome');
    const totalExpenseElem = document.getElementById('totalExpense');
    
    let totalIncome = 0;
    let totalExpense = 0;
    const dateSections = {};
    const dailyTotals = {};

    // Load saved data from localStorage
    loadSavedData();

    addButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(expenseForm);
        const type = formData.get('type');
        const amount = parseFloat(formData.get('amount'));
        const description = formData.get('description');
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        if (!dateSections[date]) {
            createDateSection(date);
        }

        const row = dateSections[date].insertRow();
        row.insertCell(0).textContent = date;
        row.insertCell(1).textContent = time;
        row.insertCell(2).textContent = description;
        row.insertCell(3).textContent = amount.toFixed(2);

        if (type === 'income') {
            totalIncome += amount;
            totalIncomeElem.textContent = totalIncome.toFixed(2);
            dailyTotals[date].income += amount;
            dailyTotals[date].totalsRow.querySelector('.daily-income').textContent = dailyTotals[date].income.toFixed(2);
        } else {
            totalExpense += amount;
            totalExpenseElem.textContent = totalExpense.toFixed(2);
            dailyTotals[date].expense += amount;
            dailyTotals[date].totalsRow.querySelector('.daily-expense').textContent = dailyTotals[date].expense.toFixed(2);
        }

        saveData();
        expenseForm.reset();
        modal.style.display = 'none';
    });

    function createDateSection(date) {
        const dateSection = document.createElement('div');
        dateSection.classList.add('date-section');

        const dateHeader = document.createElement('div');
        dateHeader.classList.add('date-header');
        dateHeader.textContent = date;

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['Date', 'Time', 'Description', 'Amount'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);

        dateSection.appendChild(dateHeader);
        dateSection.appendChild(table);

        const totalsRow = document.createElement('div');
        totalsRow.classList.add('daily-totals');
        totalsRow.innerHTML = `
            <span>Total Income: <span class="daily-income">0</span></span>
            <span>Total Expense: <span class="daily-expense">0</span></span>
        `;

        dateSection.appendChild(totalsRow);

        expenseTableContainer.appendChild(dateSection);
        dateSections[date] = tbody;
        dailyTotals[date] = { income: 0, expense: 0, totalsRow: totalsRow };
    }

    function saveData() {
        const data = {
            totalIncome,
            totalExpense,
            dailyTotals: Object.keys(dailyTotals).map(date => ({
                date,
                income: dailyTotals[date].income,
                expense: dailyTotals[date].expense,
                entries: Array.from(dateSections[date].rows).map(row => ({
                    date: row.cells[0].textContent,
                    time: row.cells[1].textContent,
                    description: row.cells[2].textContent,
                    amount: parseFloat(row.cells[3].textContent)
                }))
            }))
        };
        localStorage.setItem('expenseTrackerData', JSON.stringify(data));
    }

    function loadSavedData() {
        const savedData = localStorage.getItem('expenseTrackerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            totalIncome = data.totalIncome;
            totalExpense = data.totalExpense;
            totalIncomeElem.textContent = totalIncome.toFixed(2);
            totalExpenseElem.textContent = totalExpense.toFixed(2);

            data.dailyTotals.forEach(({ date, income, expense, entries }) => {
                createDateSection(date);
                dailyTotals[date].income = income;
                dailyTotals[date].expense = expense;
                dailyTotals[date].totalsRow.querySelector('.daily-income').textContent = income.toFixed(2);
                dailyTotals[date].totalsRow.querySelector('.daily-expense').textContent = expense.toFixed(2);

                entries.forEach(({ date, time, description, amount }) => {
                    const row = dateSections[date].insertRow();
                    row.insertCell(0).textContent = date;
                    row.insertCell(1).textContent = time;
                    row.insertCell(2).textContent = description;
                    row.insertCell(3).textContent = amount.toFixed(2);
                });
            });
        }
    }
});
