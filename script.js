// need var instead of const to avoid "Identifier has already been declared" error in the console, since it const has to be block scoped.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
var MIN_PW_LENGTH = 8
var MAX_PW_LENGTH = 128
var DEFAULT_LENGTH = 128
var generateBtn = document.querySelector("#generate");

// need to check if this is valid, else get console log error.
if (generateBtn)
  generateBtn.addEventListener("click", writePassword);

function writePassword() {
  const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
  const upperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = '\'\\`!"#$%&()*+-./:;<>?@[]^{}|~';

  let characters = "";

  const length = getPasswordLength();
  // length is a string, despite looking like a number in this case.
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

// This checks twice, but can still fail, so needs to be checked by the caller as well.
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

// Since we're getting a string from the prompt, we need to check if it's a valid integer first. parseInt returns `NaN` (Not a Number) if the value isn't correct (that is, if it's not an integer, which is what we want). NaN is falsely much the same way that `null` is. 
function passwordLengthIsValid(length) {
  if (!parseInt(length)) return false
  if (length < MIN_PW_LENGTH || length > MAX_PW_LENGTH) { return false }
  return true
}
