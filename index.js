let userForm = document.getElementById("form");
let tdName = document.getElementById("td-name");
let tdEmail = document.getElementById("td-email");
let tdPassword = document.getElementById("td-password");
let tdDob = document.getElementById("td-dob");
let tdAccept = document.getElementById("td-accept");
const tableBody = document.querySelector("#entriesTableBody");
const retriveEntries = () => {
  let entries = localStorage.getItem("userentries");
  if (entries) {
    return JSON.parse(entries);
  } else {
    return [];
  }
  return entries;
};

let userEntries = retriveEntries();
const displayEntries = () => {
  const entries = retriveEntries();

  tableBody.innerHTML = "";

  entries.forEach((entry) => {
    const row = `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.acceptTerms}</td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
};

document.getElementById("dob").addEventListener("input", function () {
  const dobInput = document.getElementById("dob");
  const dobValue = new Date(dobInput.value);
  const today = new Date();

  const birthYear = dobValue.getFullYear();
  const birthMonth = dobValue.getMonth();
  const birthDay = dobValue.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  if (isNaN(age)) {
    dobInput.setCustomValidity("Please enter a valid date of birth.");
  } else if (age < 18 || age > 55) {
    dobInput.setCustomValidity("You must be between 18 and 55 years old.");
  } else {
    dobInput.setCustomValidity("");
  }
});
document.getElementById("password").addEventListener("input", function () {
  const passValidation = document.getElementById("password");
  const password = document.getElementById("password").value;
  let pass = password.length;
  if (pass < 8) {
    passValidation.setCustomValidity("password must be at least 8 characters!");
  } else {
    passValidation.setCustomValidity("");
  }
});
document.getElementById("password").addEventListener("input", function () {
  const passValidation = document.getElementById("password");
  const password = document.getElementById("password").value;
  let pass = password.length;
  if (pass < 8) {
    passValidation.setCustomValidity("password must be at least 8 characters!");
  } else {
    passValidation.setCustomValidity("");
  }
});
//rer
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const namevalidation = document.getElementById("name");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passValidation = document.getElementById("password");
  const dob = document.getElementById("dob").value;
  const dobvVlidation = document.getElementById("dob");
  const acceptTerms = document.getElementById("Accept").checked;

  if (
    !passValidation.checkValidity() ||
    !namevalidation.checkValidity() ||
    !dobvVlidation.checkValidity()
  ) {
    return;
  }
  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };
  userEntries.push(entry);

  localStorage.setItem("userentries", JSON.stringify(userEntries));
  displayEntries();
  document.getElementById("form").reset();
};
document.addEventListener("DOMContentLoaded", displayEntries);
userForm.addEventListener("submit", saveUserForm);
