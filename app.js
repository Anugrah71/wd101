let userForm = document.getElementById("form");
let tdName = document.getElementById("td-name");
let tdEmail = document.getElementById("td-email");
let tdPassword = document.getElementById("td-password");
let tdDob = document.getElementById("td-dob");
let tdAccept = document.getElementById("td-accept");
const tableBody = document.querySelector("#entriesTableBody");
const retriveEntries=()=>{
    let entries=localStorage.getItem("userentries");
    if(entries)
    {
        return JSON.parse(entries);
    }else{
        return [];
    }
    return entries;
}


let userEntries =retriveEntries();
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
                <td>${entry.acceptTerms ? "Yes" : "No"}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
const saveUserForm=(event) => {
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("date").value;
    const acceptTerms=document.getElementById("Accept").checked;
    const entry={
        name,
        email,
        password,
        dob,
        acceptTerms
    };
    userEntries.push(entry);
    
    localStorage.setItem('userentries', JSON.stringify(userEntries));
    displayEntries();
}
document.addEventListener('DOMContentLoaded', displayEntries);
userForm.addEventListener('submit',saveUserForm);