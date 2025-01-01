import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const StaffSchema = new mongoose.Schema({
  username: { type: String, required: true,min: 6, max: 25 },
  password: { type: String},
  email: { type: String, required: true, unique: true, min: 6, max: 50 },
  role: { type: String, required: true, default: 'Staff' },
  img: { type: String ,default:false},
},{timestamps: true});
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export  const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);