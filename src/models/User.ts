import mongoose, { InferSchemaType } from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export type UserDocument = InferSchemaType<typeof userSchema>;
export type UserDocumentWithoutPassword = Omit<UserDocument, 'password'>;
export default User;
