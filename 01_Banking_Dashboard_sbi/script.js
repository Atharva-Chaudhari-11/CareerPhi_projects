let currentAmount = document.getElementById("currentB");
let cardBalance = document.getElementById("card-balance");
let initialAmount = 1000;

// Assume the username is fetched from the profile section
let username = document.querySelector(".profile-name").innerText;
document.getElementById("card-username").innerText = username; // Update username on the card

// Deposit functionality
document.getElementById("deposit-button").addEventListener("click", () => {
    const depositAmount = parseFloat(document.getElementById("dp-amount").value);
    if (!isNaN(depositAmount) && depositAmount > 0) {
        initialAmount += depositAmount;
        updateBalance();
        addTransaction("Deposit", depositAmount);
        document.getElementById("dp-amount").value = "";
    } else {
        alert("Please enter a valid deposit amount.");
    }
});

// Withdraw functionality
document.getElementById("withdraw-button").addEventListener("click", () => {
    const withdrawAmount = parseFloat(document.getElementById("wd-amount").value);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
        if (withdrawAmount <= initialAmount) {
            initialAmount -= withdrawAmount;
            updateBalance();
            addTransaction("Withdraw", withdrawAmount);
            document.getElementById("wd-amount").value = "";
        } else {
            alert("Insufficient balance.");
        }
    } else {
        alert("Please enter a valid withdrawal amount.");
    }
});

// Function to update balance on the UI and the card
function updateBalance() {
    currentAmount.innerText = initialAmount.toFixed(2); // Update balance on the dashboard
    cardBalance.innerText = initialAmount.toFixed(2); // Update balance on the credit card
}

// Function to add transaction to the transaction history
function addTransaction(type, amount) {
    const transactionHistoryTable = document.querySelector(".transaction-history tbody");
    const newRow = document.createElement("tr");

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Create table row with transaction details including username
    newRow.innerHTML = `
        <td>${username}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${type}</td>
        <td>$${amount.toFixed(2)}</td>
    `;

    // Append the new row to the transaction history table
    transactionHistoryTable.appendChild(newRow);
}


