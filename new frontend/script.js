// =====================================================
// API URL
// =====================================================

const API_URL =
    "http://localhost:8083/api/transactions";


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log("script.js loaded");


        // ---------------------------------------------
        // Get logged-in user
        // ---------------------------------------------

        const loggedInUser =
            localStorage.getItem("loggedInUser");


        console.log(
            "Logged in user:",
            loggedInUser
        );


        // ---------------------------------------------
        // If user is NOT logged in
        // ---------------------------------------------

        if (!loggedInUser) {

            window.location.href =
                "login.html";

            return;
        }


        // ---------------------------------------------
        // Show username
        // ---------------------------------------------

        const userDisplay =
            document.getElementById(
                "userDisplay"
            );


        if (userDisplay) {

            userDisplay.textContent =
                loggedInUser;

        }


        // ---------------------------------------------
        // Set today's date
        // ---------------------------------------------

        const dateInput =
            document.getElementById(
                "transactionDate"
            );


        if (dateInput) {

            dateInput.value =
                new Date()
                    .toISOString()
                    .split("T")[0];

        }


        // ---------------------------------------------
        // Load transactions
        // ---------------------------------------------

        loadTransactions();


        // ---------------------------------------------
        // Transaction form
        // ---------------------------------------------

        const transactionForm =
            document.getElementById(
                "transactionForm"
            );


        if (transactionForm) {

            transactionForm.addEventListener(
                "submit",
                addTransaction
            );

        }


        // ---------------------------------------------
        // Logout button
        // ---------------------------------------------

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logout
            );

        }


        // ---------------------------------------------
        // User profile
        // ---------------------------------------------

        const userProfile =
            document.getElementById(
                "userProfile"
            );


        if (userProfile) {

            userProfile.addEventListener(
                "click",
                showProfile
            );

        }


        // ---------------------------------------------
        // Close profile
        // ---------------------------------------------

        const closeProfile =
            document.getElementById(
                "closeProfile"
            );


        if (closeProfile) {

            closeProfile.addEventListener(
                "click",
                closeProfilePopup
            );

        }

    }
);


// =====================================================
// LOAD ONLY CURRENT USER'S TRANSACTIONS
// =====================================================

async function loadTransactions() {


    const loggedInUser =
        localStorage.getItem(
            "loggedInUser"
        );


    // ---------------------------------------------
    // Check login
    // ---------------------------------------------

    if (!loggedInUser) {

        window.location.href =
            "login.html";

        return;

    }


    try {


        console.log(
            "Loading transactions for:",
            loggedInUser
        );


        // IMPORTANT:
        // Your backend endpoint is /getall
        // NOT /api/transactions

        const response =
            await fetch(

                API_URL +
                "/getall?username=" +
                encodeURIComponent(
                    loggedInUser
                )

            );


        console.log(
            "Response status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load transactions"
            );

        }


        const transactions =
            await response.json();


        console.log(
            "Transactions:",
            transactions
        );


        // ---------------------------------------------
        // Display transactions
        // ---------------------------------------------

        displayTransactions(
            transactions
        );


        // ---------------------------------------------
        // Calculate totals
        // ---------------------------------------------

        calculateSummary(
            transactions
        );


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

                        ❌ Cannot connect to backend.

                    </td>

                </tr>

            `;

        }

    }

}


// =====================================================
// DISPLAY TRANSACTIONS
// =====================================================

function displayTransactions(
    transactions
) {


    const table =
        document.getElementById(
            "transactionTable"
        );


    if (!table) {
        return;
    }


    // Clear old rows

    table.innerHTML = "";


    // ---------------------------------------------
    // No transactions
    // ---------------------------------------------

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


    // ---------------------------------------------
    // Add rows
    // ---------------------------------------------

    transactions.forEach(
        function (transaction) {


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
                        onclick="
                            deleteTransaction(
                                ${transaction.id}
                            )
                        ">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


// =====================================================
// CALCULATE SUMMARY
// =====================================================

function calculateSummary(
    transactions
) {


    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        function (transaction) {


            const amount =
                Number(
                    transaction.amount
                );


            if (
                transaction.type ===
                "Income"
            ) {

                totalIncome += amount;

            }


            if (
                transaction.type ===
                "Expense"
            ) {

                totalExpense += amount;

            }

        }
    );


    const balance =
        totalIncome -
        totalExpense;


    // ---------------------------------------------
    // Display
    // ---------------------------------------------

    document.getElementById(
        "totalIncome"
    ).textContent =
        "₹" + totalIncome;


    document.getElementById(
        "totalExpense"
    ).textContent =
        "₹" + totalExpense;


    document.getElementById(
        "balance"
    ).textContent =
        "₹" + balance;

}


// =====================================================
// ADD TRANSACTION
// =====================================================

async function addTransaction(
    event
) {


    event.preventDefault();


    // ---------------------------------------------
    // Get logged-in user
    // ---------------------------------------------

    const loggedInUser =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!loggedInUser) {

        alert(
            "Please login first."
        );

        window.location.href =
            "login.html";

        return;

    }


    // ---------------------------------------------
    // Create transaction object
    // ---------------------------------------------

    const transaction = {


        description:
            document.getElementById(
                "description"
            ).value.trim(),


        amount:
            Number(
                document.getElementById(
                    "amount"
                ).value
            ),


        category:
            document.getElementById(
                "category"
            ).value,


        type:
            document.getElementById(
                "type"
            ).value,


        transactionDate:
            document.getElementById(
                "transactionDate"
            ).value,


        // VERY IMPORTANT
        // Save username with transaction

        username:
            loggedInUser

    };


    console.log(
        "Sending transaction:",
        transaction
    );


    const button =
        document.getElementById(
            "addTransactionButton"
        );


    const message =
        document.getElementById(
            "transactionMessage"
        );


    button.disabled = true;

    button.textContent =
        "Adding...";


    try {


        // ---------------------------------------------
        // POST transaction
        // ---------------------------------------------

        const response =
            await fetch(

                API_URL +
                "/addTransaction",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            transaction
                        )

                }

            );


        console.log(
            "Add response:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Failed to add transaction"
            );

        }


        // ---------------------------------------------
        // Success
        // ---------------------------------------------

        message.textContent =
            "✅ Transaction added successfully!";

        message.style.color =
            "green";


        // Clear form

        document.getElementById(
            "transactionForm"
        ).reset();


        // Set date again

        document.getElementById(
            "transactionDate"
        ).value =
            new Date()
                .toISOString()
                .split("T")[0];


        // Reload table

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


        button.disabled =
            false;


        button.textContent =
            "+ Add Transaction";

    }

}


// =====================================================
// DELETE TRANSACTION
// =====================================================

async function deleteTransaction(
    id
) {


    const loggedInUser =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!loggedInUser) {

        window.location.href =
            "login.html";

        return;

    }


    // ---------------------------------------------
    // Confirm
    // ---------------------------------------------

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!confirmDelete) {

        return;

    }


    try {


        // ---------------------------------------------
        // Delete only current user's transaction
        // ---------------------------------------------

        const response =
            await fetch(

                API_URL +
                "/" +
                id +
                "?username=" +
                encodeURIComponent(
                    loggedInUser
                ),

                {

                    method: "DELETE"

                }

            );


        console.log(
            "Delete response:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Failed to delete transaction"
            );

        }


        alert(
            "✅ Transaction deleted successfully!"
        );


        // Reload table

        await loadTransactions();


    } catch (error) {


        console.error(
            "Delete error:",
            error
        );


        alert(
            "❌ Failed to delete transaction."
        );

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    // Remove logged-in username

    localStorage.removeItem(
        "loggedInUser"
    );


    // Go to login page

    window.location.href =
        "login.html";

}


// =====================================================
// SHOW USER PROFILE
// =====================================================

function showProfile() {


    const username =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!username) {

        window.location.href =
            "login.html";

        return;

    }


    const profileUsername =
        document.getElementById(
            "profileUsername"
        );


    profileUsername.textContent =
        username;


    const profileModal =
        document.getElementById(
            "profileModal"
        );


    profileModal.style.display =
        "flex";

}


// =====================================================
// CLOSE PROFILE
// =====================================================

function closeProfilePopup() {


    const profileModal =
        document.getElementById(
            "profileModal"
        );


    profileModal.style.display =
        "none";

}