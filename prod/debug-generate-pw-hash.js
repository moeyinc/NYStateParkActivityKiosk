// This is a program to generate a hashed password with a given password
// run this file with a command like this -> NODE_PW=your_password node debug-generate-pw-hash.js

var passwordHash = require('password-hash');
var password = process.env.NODE_PW;
var hashedPassword = passwordHash.generate(password);
console.log('the given password:', password);
console.log('generated a hashed password:', hashedPassword);
console.log('verifing..', passwordHash.verify(password, hashedPassword))
