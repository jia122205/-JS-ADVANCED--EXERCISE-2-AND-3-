const firstNameInput = document.getElementById('firstName');
 const middleNameInput = document.getElementById('middleName');
 const lastNameInput = document.getElementById('lastName');
 const ageInput = document.getElementById('age');
 const insertBtn = document.getElementById('insertBtn');
 const clearBtn = document.getElementById('clearBtn');
 const recordsTable = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
 const sortBySelect = document.getElementById('sortBy');
 const sortAZBtn = document.getElementById('sortAZ');
 const saveToLocalBtn = document.getElementById('saveToLocal');
 
 let records = [];
 
 function renderTable() {
     recordsTable.innerHTML = '';
     records.forEach((record, index) => {
         const row = recordsTable.insertRow();
         row.insertCell(0).textContent = record.firstName;
         row.insertCell(1).textContent = record.middleName;
         row.insertCell(2).textContent = record.lastName;
         row.insertCell(3).textContent = record.age;
         
         const actionCell = row.insertCell(4);
         actionCell.className = 'action-buttons';
         
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Delete';
         deleteBtn.onclick = () => deleteRecord(index);
         
         const editBtn = document.createElement('button');
         editBtn.textContent = 'Edit';
         editBtn.onclick = () => editRecord(index);
         
         actionCell.appendChild(deleteBtn);
         actionCell.appendChild(editBtn);
     });
 }
 
 function addRecord() {
     const firstName = firstNameInput.value.trim();
     const middleName = middleNameInput.value.trim();
     const lastName = lastNameInput.value.trim();
     const age = ageInput.value.trim();
     
     if (firstName && lastName && age) {
         records.push({
             firstName,
             middleName,
             lastName,
             age: parseInt(age)
         });
 
         saveToLocalStorage(); // Save to localStorage
         clearForm();
         renderTable();
     } else {
         alert('Please fill in all required fields (First Name, Last Name, and Age)');
     }
 }
 
 // Delete a record
 function deleteRecord(index) {
     if (confirm('Are you sure you want to delete this record?')) {
         records.splice(index, 1);
         saveToLocalStorage(); // Save to localStorage after delete
         renderTable();
     }
 }
 
 // Edit a record
 function editRecord(index) {
     const record = records[index];
     firstNameInput.value = record.firstName;
     middleNameInput.value = record.middleName;
     lastNameInput.value = record.lastName;
     ageInput.value = record.age;
     
     // Remove the record being edited
     records.splice(index, 1);
     saveToLocalStorage(); // Save to localStorage after edit
     renderTable();
 }
 
 // Clear the form
 function clearForm() {
     firstNameInput.value = '';
     middleNameInput.value = '';
     lastNameInput.value = '';
     ageInput.value = '';
 }
 
 // Sort records
 function sortRecords() {
     const sortBy = sortBySelect.value;
     records.sort((a, b) => {
         if (sortBy === 'age') {
             return a[sortBy] - b[sortBy];
         } else {
             return a[sortBy].localeCompare(b[sortBy]);
         }
     });
     renderTable();
 }
 
 // Save to local storage
 function saveToLocalStorage() {
     localStorage.setItem('records', JSON.stringify(records));
 }
 
 // Load from local storage
 function loadFromLocalStorage() {
     const savedRecords = localStorage.getItem('records');
     if (savedRecords) {
         records = JSON.parse(savedRecords);
         renderTable();
     }
 }
 
 // Event listeners
 insertBtn.addEventListener('click', addRecord);
 clearBtn.addEventListener('click', clearForm);
 sortAZBtn.addEventListener('click', sortRecords);
 saveToLocalBtn.addEventListener('click', saveToLocalStorage);
 
 // Initialize
 loadFromLocalStorage(); // Load saved records on page load
 renderTable();