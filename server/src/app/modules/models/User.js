const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    FirstName: {type: String, 'default': ''},
    LastName: {type: String, 'default': ''},
    Address: {
        Street: {type: String, 'default': ''},
        Suburb: {type: String, 'default': ''},
        City: {type: String, 'default': ''},
        PostalCode: {type: String, 'default': ''},
        Country: {type: String, 'default': ''},
        Lat: {type: Number},
        Long: {type: Number},
    },
    Email: {type: String, required: true, unique: true},
    Ratings: {
        Value: {type: Number, 'default': 0},
        Count: {type: Number, 'default': 0}
    },
    Status: {type: String, required: true, 'enum': ['ACTIVE', 'PENDING', 'DELETED', 'BLOCKED']},
    Verified: {type: Boolean, 'default': false},
    ProfilePicture: {type: String, 'default': ''},
    Type: {type: String, required: true, 'default': 'user', 'enum': ['user', 'admin']},
    Password: {type: String, required: true},
    IsLogged: {type: Boolean, 'default': false},
}, {minimize: false});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('Password')) {
        return next();
    }
    bcrypt.hash(user.Password, 10).then((hashedPassword) => {
        user.Password = hashedPassword;
        next();
    });
}, function(err) {
    next(err);
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.Password, function(err, isMatch) {
        if (err) {
            console.log(err)
            return next(err);
        }
        console.log('issssss', isMatch)
        next(null, isMatch);
    });
};

const UserModal = mongoose.model('User', userSchema);
module.exports = UserModal;
