const jwt = require('jsonwebtoken');


var data = {
    id:10
};

var token = jwt.sign(data,'salt');
console.log(token);

var decoded =  jwt.verify(token,'salt');
console.log('decoded',decoded);