document.getElementById('claimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;
    const fileUpload = document.getElementById('fileUpload').files[0];
    
    if (policyNumber && incidentDate && incidentDescription && fileUpload) {
        // Simulate claim submission
        const newClaim = {
            claimNumber: `CLM${Math.floor(Math.random() * 1000) + 1}`,
            status: 'In Review',
            dateSubmitted: new Date().toLocaleDateString()
        };
        
        addClaimToTable(newClaim);
        
        document.getElementById('formMessage').textContent = 'Claim submitted successfully!';
        document.getElementById('claimForm').reset();
    } else {
        alert('Please fill in all fields and attach a file.');
    }
});

function addClaimToTable(claim) {
    const claimsTable = document.getElementById('claimsTable').querySelector('tbody');
    const newRow = claimsTable.insertRow();
    
    newRow.innerHTML = `
        <td>${claim.claimNumber}</td>
        <td>${claim.status}</td>
        <td>${claim.dateSubmitted}</td>
    `;
}

const knowledgeBase = [
    { title: "How to File a Claim", content: "You can file a claim by clicking the 'Submit a Claim' button and filling in the required details." },
    { title: "Claim Status", content: "You can track your claim status in the 'Track Claims' section." },
    { title: "Supported Documents", content: "You need to upload documents such as an accident report or photos while filing a claim." }
];

document.getElementById('searchBar').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const results = knowledgeBase.filter(article => article.title.toLowerCase().includes(query));
    
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.forEach(article => {
        const li = document.createElement('li');
        li.textContent = article.title;
        resultsContainer.appendChild(li);
    });
});
