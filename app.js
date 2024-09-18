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
                <td>${entry.acceptTerms}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
const saveUserForm=(event) => {
    event.preventDefault();
    const name=document.getElementById("name").value;
    const namevalidation=document.getElementById("name");
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const passValidation=document.getElementById("password");
    const dob=document.getElementById("date").value;
    const dobvVlidation=document.getElementById("date");
    const acceptTerms=document.getElementById("Accept").checked;
    //password validation
    let pass =password.length;

    
    if(pass < 8)
    {
        passValidation.setCustomValidity("password must be at least 8 characters!");
        passValidation.reportValidity();
    }
    //name validation
    if(name.length <=1)
    {
        namevalidation.setCustomValidity("name must be at least 2 characters");
        namevalidation.reportValidity();

    }
    //Age limit validation
    const today = new Date();
    dobString =dob;
    const dobDate = new Date(dobString);

    const birthYear = dobDate.getFullYear();
    const birthMonth = dobDate.getMonth();
    const birthDay = dobDate.getDate();
    
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay))
        {
            age--;
        }
            
            dobvVlidation.setCustomValidity('');
            if(!(age >= 18 && age <= 55))
                {
                    dobvVlidation.setCustomValidity("Age must  be in between 18 or 55 year!");
                    dobvVlidation.reportValidity();
                    return;
               
                }
            
        
    
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