let createForm = document.querySelector('.create-post-form');
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#image-file');

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let createText = text.value;
    let createDescription;
    if(createText.indexOf('.') === -1) {
        createDescription = createText;
    }
    else {
        createDescription = createText.substring(0, createText.indexOf('.') + 1);
    }
    let data = new FormData();
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageURL', imageURL.value);
    data.append('text', text.value);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0]);
    // now the server want the data in the binary format but the our data is the file now we have to install the package named multer

    fetch('/posts', {
        method: 'POST',
        //// uncomment below all this for the original one
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        //// for sending the image as the file we donot use the json format we use form data
        // body: JSON.stringify({
        //     title: title.value,
        //     country: country.value,
        //     imageURL: imageURL.value,
        //     text: text.value,
        //     description: createDescription
        // })
        body: data
    }).then((resp) => resp.text())
        .then(() => window.history.go());

        //window.history.go() this is used to redirect ot the original that is it s history page
});

function disableInput(input1, input2) {
    if(input1.value) {
        input2.disabled = true;
    }
    else {
        input2.disabled = false;
    }
}


imageURL.addEventListener('change', () => disableInput(imageURL, imageFile));
imageFile.addEventListener('change', () => disableInput(imageFile, imageURL));