// Global array to store investments
let investments = [];

// DOM Elements
const investmentForm = document.getElementById('investment-form');
const totalValueEl = document.getElementById('total-value');
const totalInvestedEl = document.getElementById('total-invested'); // Corrected reference
const investmentItems = document.getElementById('investment-items'); // Corrected ID reference

// Load from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    const storedInvestments = JSON.parse(localStorage.getItem('investments'));
    if (storedInvestments) {
        investments = storedInvestments;
        updatePortfolio();
    }
});

// Form submission handler (Add/Update investment)
investmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const assetName = document.getElementById('asset-name').value;
    const investedAmount = parseFloat(document.getElementById('invested-amount').value);
    const currentValue = parseFloat(document.getElementById('current-value').value);

    // Validation
    if (!assetName || isNaN(investedAmount) || isNaN(currentValue) || investedAmount < 0 || currentValue < 0) {
        alert("Please enter valid values. All fields must be filled, and amounts should be non-negative numbers.");
        return;
    }
    
    const index = investmentForm.dataset.index;

    // Check if it's an update or a new investment
    if (index !== undefined) {
        investments[index] = { assetName, investedAmount, currentValue };
        delete investmentForm.dataset.index;  // Reset index after update
    } else {
        investments.push({ assetName, investedAmount, currentValue });
    }

    // Store in localStorage
    localStorage.setItem('investments', JSON.stringify(investments));
    updatePortfolio();
    investmentForm.reset();
});

// Update Portfolio (Displays the list of investments and updates total value)
function updatePortfolio() {
    investmentItems.innerHTML = '';  // Clear the table body

    let totalValue = 0;
    let totalInvested = 0;

    investments.forEach((investment, index) => {
        const { assetName, investedAmount, currentValue } = investment;
        const percentChange = ((currentValue - investedAmount) / investedAmount * 100).toFixed(2);

        totalValue += currentValue;
        totalInvested += investedAmount;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assetName}</td>
            <td>$${investedAmount.toFixed(2)}</td>
            <td>$${currentValue.toFixed(2)}</td>
            <td>${percentChange}%</td>
            <td>
                <button onclick="editInvestment(${index})">Update</button>
                <button onclick="removeInvestment(${index})">Remove</button>
            </td>
        `;
        investmentItems.appendChild(row);
    });

    totalValueEl.textContent = totalValue.toFixed(2);
    totalInvestedEl.textContent = totalInvested.toFixed(2); // Update total invested amount display
    updateChart(); // Update the chart with new data
}

// Pre-fill the form with the selected investment data for updating
function editInvestment(index) {
    const investment = investments[index];

    document.getElementById('asset-name').value = investment.assetName;
    document.getElementById('invested-amount').value = investment.investedAmount;
    document.getElementById('current-value').value = investment.currentValue;

    // Store the index of the investment being edited
    investmentForm.dataset.index = index;
}

// Remove investment from the list and update the portfolio
function removeInvestment(index) {
    investments.splice(index, 1);
    localStorage.setItem('investments', JSON.stringify(investments));
    updatePortfolio();
}

// Chart.js for dynamic pie chart visualization
let pieChart;

function updateChart() {
    if (investments.length === 0) {
        // Clear the chart if there are no investments
        if (pieChart) {
            pieChart.destroy();
        }
        return;
    }

    const assetNames = investments.map(inv => inv.assetName);
    const assetValues = investments.map(inv => inv.currentValue);

    const ctx = document.getElementById('pie-chart').getContext('2d');

    if (pieChart) {
        pieChart.destroy();  // Destroy previous chart to update
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: assetNames,
            datasets: [{
                data: assetValues,
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}
