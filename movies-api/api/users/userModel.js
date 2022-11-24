import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    id: Number,
    title: String
  });
  
  const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true },
    favourites: [MovieSchema]
  });

UserSchema.statics.findByUserName = function(username) {
  return this.findOne({ username });
};

UserSchema.methods.comparePassword = function(password) {
  const isMatch = this.password === password;
  if(!isMatch) throw new Error('Password is incorrect');
  return this;
};

export default mongoose.model('User', UserSchema);