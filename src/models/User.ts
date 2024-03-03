import { Schema, model, Document } from 'mongoose';
import { UserSignupDetails } from 'src/types';

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const UserModel = model('Token-User', userSchema);
export type UserDocument = UserSignupDetails & Document;
export default UserModel;
