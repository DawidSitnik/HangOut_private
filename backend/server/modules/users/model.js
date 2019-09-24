import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  profilePicture: {
    type: String,
    default: 'default',
  },
  description: {
    type: String,
    default: 'Hello, I am new to HangOut app!',
  },
  notifficationsToken: {
    type: String,
    default: 'default',
  },
  friends: [{
    type: String,
    id: String,
  }],
  friendRequests: [{
    friendId: String,
    request: String,
  }],
  chats: [{
    friendId: String,
    friendName: String,
    isSeen: {
      type: Boolean,
      default: true,
    },
    firstMessage: {
      content: String,
      sendBy: String,
    },
    messages: [{
      content: String,
      sendBy: String,
      time: Date,
    }],
  }],
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  hangouts: [{
    type: String,
  }],
  createdHangouts: [{
    type: String,
  }]

}, { timestamps: true });

UserSchema.statics.validateUser = function (user) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
      .label('{"message":"Name must be minimum 3 characters long"}'),
    email: Joi.string().min(5).max(255).required()
      .email()
      .label('{"message":"Invalid email address"}'),
    password: Joi.string().min(5).max(255).required()
      .label('{"message":"Password must be minimum 5 characters long"}'),
  };
  return Joi.validate(user, schema);
};

export default mongoose.model('User', UserSchema);
