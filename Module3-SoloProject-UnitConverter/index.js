const userInputEl = document.getElementById("user-inpt")
const conversionBtn = document.getElementById("conversion-btn")
let lengthDisplayEl = document.getElementById("length-display")
let volumeDisplayEl = document.getElementById("volume-display")
let massDisplayEl = document.getElementById("mass-display")
console.log(massDisplayEl)
const ratios = {
    meter:3.281,
    liter: 0.264,
    kilogram: 2.204
}

conversionBtn.addEventListener("click", function() {
    console.log("clicked")
    let meterToFeetResult = (userInputEl.value * ratios.meter).toFixed(3)
    let feetToMeterResult = (userInputEl.value / ratios.meter).toFixed(3)
    lengthDisplayEl.textContent = `${userInputEl.value} meters = ${meterToFeetResult} feet | ${userInputEl.value} feet = ${feetToMeterResult} meters`

    let litersToGallonsResult = (userInputEl.value * ratios.liter).toFixed(3)
    let gallonsToLitersResult = (userInputEl.value / ratios.liter).toFixed(3)
    volumeDisplayEl.textContent = `${userInputEl.value} liters = ${litersToGallonsResult } gallons | ${userInputEl.value} gallons = ${gallonsToLitersResult} liters`

    let kilogramsToPoundsResult = (userInputEl.value * ratios.kilogram).toFixed(3)
    let poundsToKilogramsResult = (userInputEl.value / ratios.kilogram).toFixed(3)
    massDisplayEl.textContent = `${userInputEl.value} kilos = ${kilogramsToPoundsResult} pounds | ${userInputEl.value} pounds = ${poundsToKilogramsResult} kilos`
})
