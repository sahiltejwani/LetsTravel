let express = require('express');
let app = express();
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
//let Post = require('./models/post.model').Post; //no .js at last it has default .js extension
let multer = require('multer');
let postsRouter = require('./routes/posts.route');
let callbackRequestsRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth.js');


app.set('view engine', 'ejs')


// let CallbackRequest = require('./models/callback-request.model').CallbackRequest;

// let cr = new CallbackRequest({
//     id : '1234',
//     phoneNumber: '+918669225235',
//     date: new Date()
// });
// cr.save()
//     .then(() => console.log('Done'));  

mongoose.connect('mongodb://localhost/travels');
app.use(express.json());


//// for this all multer thing see the vedio again for create post part -3
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({storage: imageStorage}).single('imageFile'));

// let post1 = new Post({
//     id: '2',
//     title: 'Statue of Liberty',
//     date: new Date(),
//     description: 'Some description',
//     text: 'Some text',
//     country: 'France',
//     imageURL: '/images/img-2.jpg' // ./public/images/img-1.jpg
// })
// post1.save()
//     .then(() => {
//         console.log('Saved!..');
//     });


app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);// this means if the user wants to go to ....../post then it will use the postsRouter
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/landmark', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id : id});
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
});

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.redirect('/admin');
    }
    else {
        resp.render('login');
    }
});

app.listen(3000, () => {
    console.log('Listening the port 3000...');
});