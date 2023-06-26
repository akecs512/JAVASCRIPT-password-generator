
var MIN_PW_LENGTH = 8
var MAX_PW_LENGTH = 128
var DEFAULT_LENGTH = 128
var generateBtn = document.querySelector("#generate");


if (generateBtn)
  generateBtn.addEventListener("click", writePassword);

function writePassword() {
  const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
  const upperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = '\'\\`!"#$%&()*+-./:;<>?@[]^{}|~';

  let characters = "";

  const length = getPasswordLength();
  
  if (!passwordLengthIsValid(length)) { alert("❗Please try again and select a valid number range"); return; }

  if (confirm("Do you want to include lower case letters?") === true) {
    characters += lowerAlpha
  }

  if (confirm("Do you want to include upper case letters?") === true) {
    characters += upperAlpha
  }

  if (confirm("Do you want to include numbers?") === true) {
    characters += numbers
  }

  if (confirm("Do you want to include special characters?") === true) {
    characters += symbols
  }

  if (characters.length === 0) { alert("❗No character types were selected. Please try again.") }

  const password = generatePassword(length, characters);
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(length, characters) {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};
function getPasswordLength() {
  let passwordLength = prompt(
    `How long would you like your password to be? (Must be ${MIN_PW_LENGTH}-${MAX_PW_LENGTH} characters in length)`, DEFAULT_LENGTH
  );
  if (!passwordLengthIsValid(passwordLength)) {
    passwordLength = prompt(
      `Please try again. Password should be between ${MIN_PW_LENGTH}-${MAX_PW_LENGTH} characters in length.`)
  };
  return passwordLength
}

function passwordLengthIsValid(length) {
  if (!parseInt(length)) return false
  if (length < MIN_PW_LENGTH || length > MAX_PW_LENGTH) { return false }
  return true
}
