const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
});

// INFO: No this, if arraow func is used.
userSchema.pre('save', async function callback() {
  const user = this;
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      return err;
    }
    user.password = hash;
  });
});

// authenticate input against database
userSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      const newErr = new Error('User not found.');
      newErr.status = 401;
      return callback(newErr);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      }
      return callback();
    });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
