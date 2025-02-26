async function getPosts() {
    return await fetch('/posts')
        .then((resp) => resp.json())
        .then((data) => data);
}

async function getCallbackRequests() {
    return await fetch('/callback-requests')
        .then((resp) => resp.json())
        .then((data) => data);
}

async function getEmails() {
    return await fetch('/emails')
        .then((resp) => resp.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function () {
    addPosts();
    addCallbackRequests();
    addEmails();

    //CREATE POST
    let addPostBtn = document.querySelector('.add-post');
    let createPostBtn = document.querySelector('#v-pills-add-post-tab');
    addPostBtn.addEventListener('click', function () {
        createPostBtn.click();
    });
});

async function addPosts() {
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML =
            `<tr>
            <td>${i++}<input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>`;

        //articles.innerHTML = postHTML;
        // inner html main jo content hai woh replace hoge completely, insertadjacentHtml amin woh sirf add hote hai
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

async function addCallbackRequests() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-requests tbody');

    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML =
            `<tr>
            <td>${i++}<input class="id" type="hidden" value="${request.id}"></td>
            <td class="title">${request.phoneNumber}</td>
            <td class="date">${request.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>`;

        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

async function addEmails() {
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');

    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((email) => {
        let emailHTML =
            `<tr>
            <td>${i++}<input class="id" type="hidden" value="${email.id}"></td>
            <td class="name">${email.name}</td>
            <td class="email">${email.email}</td>
            <td class="date">${email.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
            </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>`;

        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}


let requestsBlock = document.querySelector('#v-pills-requests');

requestsBlock.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/' + id, {
            method: 'DELETE'
        })
            .then((resp) => resp.text())
            .then(() => window.history.go());
    }
})

let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        })
            .then((resp) => resp.text())
            .then(() => window.history.go());
    }
})

let logOutBtn = document.querySelector('.log-out-btn');

logOutBtn.addEventListener('click', function () {
    // for the deleting the cookies
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})