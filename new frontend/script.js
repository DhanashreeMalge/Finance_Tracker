
const API_URL = "http://localhost:8083/api/transactions";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Check login
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }


    // Show username
    const userDisplay = document.getElementById("userDisplay");

    if (userDisplay) {
        userDisplay.textContent = loggedInUser;
    }


    // Set today's date
    const dateInput =
        document.getElementById("transactionDate");

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.value = today;
    }


    // Load transactions
    loadTransactions();


    // Transaction form
    const transactionForm =
        document.getElementById("transactionForm");

    if (transactionForm) {

        transactionForm.addEventListener(
            "submit",
            addTransaction
        );
    }

});


// ========================================
// LOAD TRANSACTIONS
// ========================================

async function loadTransactions() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load transactions"
            );
        }


        const transactions =
            await response.json();


        displayTransactions(transactions);

        calculateSummary(transactions);


    } catch (error) {

        console.error(
            "Load transaction error:",
            error
        );


        const table =
            document.getElementById(
                "transactionTable"
            );


        if (table) {

            table.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:30px;
                            color:red;
                        ">

                        ❌ Cannot connect to transaction backend.

                    </td>
                </tr>
            `;
        }
    }
}


// ========================================
// DISPLAY TRANSACTIONS
// ========================================

function displayTransactions(transactions) {

    const table =
        document.getElementById(
            "transactionTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    // No transactions
    if (
        !transactions ||
        transactions.length === 0
    ) {

        table.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                    ">

                    No transactions found.

                </td>
            </tr>
        `;

        return;
    }


    // Display every transaction
    transactions.forEach(function (transaction) {

        const row =
            document.createElement("tr");


        const typeClass =
            transaction.type === "Income"
                ? "income-text"
                : "expense-text";


        row.innerHTML = `

            <td>
                ${transaction.id}
            </td>

            <td>
                ${transaction.description}
            </td>

            <td>
                ₹${transaction.amount}
            </td>

            <td>
                ${transaction.category}
            </td>

            <td class="${typeClass}">
                ${transaction.type}
            </td>

            <td>
                ${transaction.transactionDate}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// CALCULATE SUMMARY
// ========================================

function calculateSummary(transactions) {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(function (transaction) {

        const amount =
            Number(transaction.amount);


        if (transaction.type === "Income") {

            totalIncome += amount;

        }


        if (transaction.type === "Expense") {

            totalExpense += amount;

        }

    });


    const balance =
        totalIncome - totalExpense;


    const incomeElement =
        document.getElementById(
            "totalIncome"
        );


    const expenseElement =
        document.getElementById(
            "totalExpense"
        );


    const balanceElement =
        document.getElementById(
            "balance"
        );


    if (incomeElement) {

        incomeElement.textContent =
            "₹" + totalIncome;

    }


    if (expenseElement) {

        expenseElement.textContent =
            "₹" + totalExpense;

    }


    if (balanceElement) {

        balanceElement.textContent =
            "₹" + balance;

    }

}


// ========================================
// ADD TRANSACTION
// ========================================

async function addTransaction(event) {

    event.preventDefault();


    const description =
        document.getElementById(
            "description"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "amount"
            ).value
        );


    const category =
        document.getElementById(
            "category"
        ).value;


    const type =
        document.getElementById(
            "type"
        ).value;


    const transactionDate =
        document.getElementById(
            "transactionDate"
        ).value;


    const message =
        document.getElementById(
            "transactionMessage"
        );


    const button =
        document.getElementById(
            "addTransactionButton"
        );


    const transaction = {

        description: description,

        amount: amount,

        category: category,

        type: type,

        transactionDate: transactionDate

    };


    button.disabled = true;

    button.textContent =
        "Adding...";


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        transaction
                    )

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add transaction"
            );
        }


        message.textContent =
            "✅ Transaction added successfully!";

        message.style.color =
            "green";


        const form =
            document.getElementById(
                "transactionForm"
            );

        if (form) {
            form.reset();
        }

        await loadTransactions();

    } catch (error) {

        console.error(
            "Add transaction error:",
            error
        );

        message.textContent =
            "❌ Failed to add transaction.";

        message.style.color =
            "red";

    } finally {

        button.disabled = false;
        button.textContent =
            "Add Transaction";
    }
}

