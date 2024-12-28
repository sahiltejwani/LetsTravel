let User = require('../models/user.model').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find()
                    .where({email : email})

    if(users.length > 0) {
        let comparisonResult = await bcrypt.compare(password, users[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(users[0]);

            // now we store the data in the cookies, click on insect then on the application and check the type of storage and see all that things 
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin',
                message: 'Success'
            });
        }
        else {
            resp.send({message : 'Rejected'});
        }
    }
    else {
        resp.send({message : 'Rejected'}); 
    }
});

router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find()
                    .where({email : email})
    if(users.length === 0) {
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email : email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send({message : 'Done'});
    }   
    else {
        resp.send({message : 'Rejected'});
    }
});

module.exports = router;