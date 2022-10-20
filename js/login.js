let userName = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById('click');
let dash = document.getElementById('dashboard');
userName.addEventListener
submit.onclick = function(){
    if(userName.value == 'admin' && password.value == 'admin'){
        dash.classList.remove('d-none');
        userName.classList.remove('is-invalid');
        password.classList.remove('is-invalid');
        userName.classList.add('is-valid');
        password.classList.add('is-valid');
        userName.value ="";
        password.value ="";

    }
    else {
        userName.classList.add('is-invalid');
        password.classList.add('is-invalid');
    }

}