let homeScoreEl = document.getElementById("home-score-display")
let guestScoreEl = document.getElementById("guest-score-display")
let homeScore = 0
let guestScore = 0

function addOneHome () {
    homeScore += 1
    homeScoreEl.textContent = homeScore
}

function addTwoHome () {
    homeScore += 2
    homeScoreEl.textContent = homeScore
}

function addThreeHome () {
    homeScore += 3
    homeScoreEl.textContent = homeScore
}

function addOneGuest () {
    guestScore += 1
    guestScoreEl.textContent = guestScore
}

function addTwoGuest () {
    guestScore += 2
    guestScoreEl.textContent = guestScore
}

function addThreeGuest () {
    guestScore += 3
    guestScoreEl.textContent = guestScore
}

//------------------reset button----------------------//
function reset() {
    homeScore = 0
    guestScore = 0
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore
}

console.log(homeScore)

