var bcrypt = require('bcrypt');

// bcrypt.hash('password to encrypt',salt -or- number of rounds if you want to auto-gen salt, callback)
bcrypt.hash('pass123',12, function(err, hash) {
	if (err) {
		console.log("error = " + err);
	} else {
		console.log(hash);
	}
});
