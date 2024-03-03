import { Schema, model } from 'mongoose';

export const OAuthUserSchema = new Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  imageUrl: String,
});

const User = model('OAuthUser', OAuthUserSchema);
export default User;
