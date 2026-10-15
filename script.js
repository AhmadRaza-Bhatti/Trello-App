const cardInput1 = document.querySelector('#card-input1');
const cardInput2 = document.querySelector('#card-input2');
const cardInput3 = document.querySelector('#card-input3');
const secInput1 = document.querySelector('#sec-input1');
const secInput2 = document.querySelector('#sec-input2');
const secInput3 = document.querySelector('#sec-input3');
const listContainer1 = document.querySelector('#list-container1');
const listContainer2 = document.querySelector('#list-container2');
const listContainer3 = document.querySelector('#list-container3'); 

function addTask1() {
     if (!secInput1.value.trim()) return;
     let li = document.createElement('li');
     li.classList.add('drag');
     li.innerHTML = secInput1.value;
     li.setAttribute('draggable', 'true');
     listContainer1.appendChild(li);
     let span = document.createElement('span');
     span.innerHTML = "\u00d7";
     li.appendChild(span);
     secInput1.value = '';
     remove1();
     saveData();
}

function addTask2() {
     if (!secInput2.value.trim()) return;
     let li = document.createElement('li');
     li.classList.add('drag');
     li.innerHTML = secInput2.value;
     li.setAttribute('draggable', 'true');
     listContainer2.appendChild(li);
     let span = document.createElement('span');
     span.innerHTML = "\u00d7";
     li.appendChild(span);
     secInput2.value = '';
     remove2();
     saveData();
}

function addTask3() {
     if (!secInput3.value.trim()) return;
     let li = document.createElement('li');
     li.classList.add('drag');
     li.innerHTML = secInput3.value;
     li.setAttribute('draggable', 'true');
     listContainer3.appendChild(li);
     let span = document.createElement('span');
     span.innerHTML = "\u00d7";
     li.appendChild(span);
     secInput3.value = '';
     remove3();
     saveData();
}

listContainer1.addEventListener('click', function(e){
     if(e.target.tagName === 'LI'){
          e.target.classList.toggle('checked');
          saveData();
     } else if (e.target.tagName === 'SPAN') {
          e.target.parentElement.remove();
          saveData();
     }
}, false);

listContainer2.addEventListener('click', function(e){
     if(e.target.tagName === 'LI'){
          e.target.classList.toggle('checked');
          saveData();
     } else if (e.target.tagName === 'SPAN') {
          e.target.parentElement.remove();
          saveData();
     }
}, false);

listContainer3.addEventListener('click', function(e){
     if(e.target.tagName === 'LI'){
          e.target.classList.toggle('checked');
          saveData();
     } else if (e.target.tagName === 'SPAN') {
          e.target.parentElement.remove();
          saveData();
     }
}, false);

function remove1(){
     document.querySelector('#card1').style.display = 'flex';
     document.querySelector('#sec-card1').style.display = 'none';
}
function remove2(){
     document.querySelector('#card2').style.display = 'flex';
     document.querySelector('#sec-card2').style.display = 'none';
}
function remove3(){
     document.querySelector('#card3').style.display = 'flex';
     document.querySelector('#sec-card3').style.display = 'none';
}

cardInput1.addEventListener('click', function(e){
     document.querySelector('#card1').style.display = 'none';
     document.querySelector('#sec-card1').style.display = 'block';
}, false);
cardInput2.addEventListener('click', function(e){
     document.querySelector('#card2').style.display = 'none';
     document.querySelector('#sec-card2').style.display = 'block';
}, false);
cardInput3.addEventListener('click', function(e){
     document.querySelector('#card3').style.display = 'none';
     document.querySelector('#sec-card3').style.display = 'block';
}, false);

function saveData(){
     localStorage.setItem('data1', listContainer1.innerHTML);
     localStorage.setItem('data2', listContainer2.innerHTML);
     localStorage.setItem('data3', listContainer3.innerHTML);
}

function showTask(){
     listContainer1.innerHTML = localStorage.getItem('data1') || "";
     listContainer2.innerHTML = localStorage.getItem('data2') || "";
     listContainer3.innerHTML = localStorage.getItem('data3') || "";
}

showTask();

let draggeditem = null;

document.addEventListener('dragstart', (e) => {
    if(e.target.tagName === 'LI'){
        draggeditem = e.target;
        e.target.classList.add('dragging');
    }
});

document.addEventListener('dragend', (e) => {
    if(e.target.tagName === 'LI'){
        draggeditem = null;
        e.target.classList.remove('dragging');
    }
});

[listContainer1, listContainer2, listContainer3].forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        if(draggeditem){
            container.appendChild(draggeditem);
            saveData();
        }
    });
});

// Login Section 
function errorMessage(){
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;

     let users = JSON.parse(localStorage.getItem("users")) || {
          "bhatti": {password: "1234", todo:[]},
          "ali": {password: "abc", todo:[]},
     };

     document.querySelector('#login_heading').textContent = 'Welcome Back';

     if(!users[username]){
          document.querySelector('#error-message').textContent = 'This username does not exist';
          document.querySelector('#error-message').style.display = "block";
     }
     else if(users[username].password !== password){
          document.querySelector('#error-message').textContent = 'Wrong password';
          document.querySelector('#error-message').style.display = "block";
     }
     else{
          document.querySelector('#error-message').style.display = "none";
          alert("Login successful ✔️");

          document.querySelector('#login-page').style.display = 'none';
          document.querySelector('#body').style.display = 'flex';
     }
}

function showRegister(){
     document.querySelector('#login_heading').textContent = 'Create Account';
     let loginBtn = document.querySelector('.btn-login');
     loginBtn.textContent = 'Register';
     loginBtn.onclick = register;
     
     let signupBtn = document.querySelector('.btn-signup');
     signupBtn.textContent = 'Back to login';
     signupBtn.onclick = showLogin;
     document.querySelector('#error-message').style.display = 'none';
}

function showLogin(){
     document.querySelector('#login_heading').textContent = 'Welcome Back';
     let loginBtn = document.querySelector('.btn-login');
     loginBtn.textContent = 'Login';
     loginBtn.onclick = errorMessage;
     
     let signupBtn = document.querySelector('.btn-signup');
     signupBtn.textContent = 'Sign Up';
     signupBtn.onclick = showRegister;
     document.querySelector('#error-message').style.display = 'none';
}

function register(){
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;

     if (!username || !password) {
          document.querySelector('#error-message').textContent = 'Please fill in both fields';
          document.querySelector('#error-message').style.display = 'block';
          return;
     }
     let users = JSON.parse(localStorage.getItem("users")) || {};

     if (users[username]) {
          document.querySelector('#error-message').textContent = 'Username already exists!';
          document.querySelector('#error-message').style.display = 'block';
          return;
     }

     users[username] = {password: password, todo:[]};
     localStorage.setItem("users", JSON.stringify(users));

     document.querySelector('#error-message').textContent = 'Registration successful!';
     document.querySelector('#error-message').style.color = 'green';
     document.querySelector('#error-message').style.display = 'block';

     document.getElementById('username').value = '';
     document.getElementById('password').value = '';

     setTimeout(() => {
          showLogin();
          document.querySelector('#error-message').style.color = 'red';
     }, 2000);
}

// Initial state setup
document.querySelector('#body').style.display = 'none';
document.querySelector('#login-page').style.display = 'block';
