const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

// const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    tasks:[{
        type: ObjectId,
        ref: "Task"
    }],
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username should be at least 5 characters']
    }, 
    password: {
        type: String,
        require: true,
        minlength: [4, 'Password should be at least 5 characters']
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = {User}
