// challenges: ability to set password length
// add "copy-on-click"
// Toggle "symbols" and "numbers" on/off

characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let pass1El = document.getElementById("pass1")
let pass2El = document.getElementById("pass2")
let btnEl = document.getElementById("btn1")

// ------------password lenght set by user---------------

document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('range-slider');
    var numberInput = document.getElementById('number-input');

    slider.addEventListener('input', function() {
        numberInput.value = slider.value;
    });

    numberInput.addEventListener('input', function() {
        // Ensure the user input is within range before setting the slider value.
        if (numberInput.value < 1) {
            numberInput.value = 1;
        } else if (numberInput.value > 12) {
            numberInput.value = 12;
        }
        
        slider.value = numberInput.value;
    });
});

// let passwordLength = 12

// -----------------------------------------------------------


// function getRandomCharacter(parametro1) {
//     let randomIndex = Math.floor ( Math.random() * characters.length )
//     return characters [randomIndex]
// }

// function generateRandomPassword () {
//     let randomPassword = ""
//     for (let i=0; i < passwordLength; i++) {
//         randomPassword += getRandomCharacter()
//     }
//     return randomPassword
// }


// Dividing the characters array
let alphabets = characters.slice(0, 52);  // "A" to "z"
let numbers = characters.slice(52, 62);   // "0" to "9"
let specialChars = characters.slice(62);  // "~" to "/"

function generateRandomPassword() {
    let chosenCharacters = [...alphabets];

    let randomPassword = "";

    // If numbers are chosen, ensure at least one number
    if (document.getElementById('includeNumbers').checked) {
        randomPassword += numbers[Math.floor(Math.random() * numbers.length)];
        passwordLength -= 1;
        chosenCharacters.push(...numbers);
    }

    // If special characters are chosen, ensure at least one special character
    if (document.getElementById('includeSpecialChars').checked) {
        randomPassword += specialChars[Math.floor(Math.random() * specialChars.length)];
        passwordLength -= 1;
        chosenCharacters.push(...specialChars);
    }

    // Fill the rest of the password length
    for (let i = 0; i < passwordLength; i++) {
        randomPassword += chosenCharacters[Math.floor(Math.random() * chosenCharacters.length)];
    }
    
    // Shuffle the generated password for randomness
    randomPassword = randomPassword.split('').sort(() => 0.5 - Math.random()).join('');

    return randomPassword;
}

function displayRandomPassword () {
    passwordLength = parseInt(document.getElementById('number-input').value);  // Read the value from the input and convert to integer
    pass1El.textContent = generateRandomPassword ()
    pass2El.textContent = generateRandomPassword ()
}