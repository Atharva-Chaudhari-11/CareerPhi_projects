let currentAmount = document.getElementById("currentB")
let initialAmount= 1000

// /* Deposit functionality */
document.getElementById("deposit-button").addEventListener("click",() => {
    const depositeAmount = parseFloat(document.getElementById("dp-amount").value)
    console.log(depositeAmount)
    if(!isNaN(depositeAmount) && depositeAmount > 0){
        initialAmount += depositeAmount
        updateBalance()
        document.getElementById("dp-amount").value = ""
    }else{
        alert("Please enter a valid deposit amount.")
    }
})

// /* withdraw functionality */
document.getElementById("withdraw-button").addEventListener("click", ()=>{
    const withdrawAmount = parseFloat(document.getElementById("wd-amount").value)

    console.log(withdrawAmount)

    if(!isNaN(withdrawAmount) && withdrawAmount > 0){
        if(withdrawAmount <= initialAmount){
            initialAmount -= withdrawAmount
            updateBalance()
            document.getElementById("wd-amount").value = ""
        }else{
            alert("Insufficient balance.")
        }
    }else{
        alert("Please enter a valid withdrawal amount.")
    }
})

function updateBalance(){
    currentAmount.innerText = initialAmount.toFixed(2)
}