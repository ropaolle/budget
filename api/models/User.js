const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const { BUDGET_API_JWT_SECRET } = process.env;

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
userSchema.statics.authenticate = async (email, password) => {
  try {
    // eslint-disable-next-line
    const user = await User.findOne({ email });
    if (!user) {
      return Promise.reject(new Error('User not found.'));
    }

    const valid = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (valid === true) {
      const userInfo = {
        username: user.username,
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(userInfo, BUDGET_API_JWT_SECRET, { expiresIn: '24h' });

      return Promise.resolve(token);
    }
    return Promise.reject(new Error('Wrong password.'));
  } catch (err) {
    return Promise.reject(err);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
