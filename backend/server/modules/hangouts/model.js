import mongoose, { Schema } from 'mongoose';

const HangoutSchema = new Schema({
  creator: {
    id: String,
    name: String,
  },
  activity: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  timeTo: String,
  timeFrom: String,
  radius: Number,
  maxPeople: Number,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  users: [{
    type: String,
  }]
}, { timestamps: true });

export default mongoose.model('Hangout', HangoutSchema);
