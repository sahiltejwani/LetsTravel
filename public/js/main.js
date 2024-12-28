let callMeForm = document.querySelector('.call-me-form')

async function getPosts() {
    return await fetch('http://localhost:3000/posts')
        .then((resp) => resp.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = 
        `<div class="col">
            <div class="card">
                <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <a href="/landmark?id=${post.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`;
//<p class="card-text">The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris, France.</p>
        //articles.innerHTML = postHTML;

        articles.insertAdjacentHTML('beforeend', postHTML);
    })
});

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    })
    .then((resp) => resp.text())
    .then(() => alert('We will call you back as soon as possible!'));
})

let emailRequestFrom = document.querySelector('.email-request-form');

emailRequestFrom.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json' // what we are going to send
        },
        body: JSON.stringify({ // what we are going to send to the server
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            text: document.querySelector('#message').value
        })
    })
    .then((resp) => resp.text()) // converting to the text format
    .then((data) => console.log(data));
})