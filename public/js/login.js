let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;

    fetch('/users/login', {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email, //email,
            password: password // password --> direct commented part will also work as the key and value are same
        })
    })
    .then((resp) => resp.json())
    .then((data) => {
        let redirectURL = data.redirectURL;
        if(redirectURL) {
            window.location.href = redirectURL;
        }
        else {
            alert('Your password and email do not match. Please try again.')
        }
    });
});
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;

    if(password !== rePassword) {
        return;
    }
    fetch('/register', {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email, //email,
            password: password // password --> direct commented part will also work as the key and value are same
        })
    })
    .then((resp) => resp.text())
    .then((data) => alert(data));
})