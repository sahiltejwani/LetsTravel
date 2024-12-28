// these is used to protect teh endpoints that mean the end point are 
// visible ot the user and the admin too, so only admin should have 
// right to see the data present on the endpoints

let auth = require('../controllers/auth');
function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    }
    else {
        resp.status(400);
        resp.send("Not authorized")
    }
}

module.exports = checkAuth;