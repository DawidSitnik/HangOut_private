import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Name must be at least 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, 'Description must be at least 5 characters long'],
  },
  category: {
    type: String,
  },
  hangouts: [{
    type: Schema.Types.ObjectId,
    ref: 'Hangout',
  }],
}, { timestamps: true });

/**
 * Create a meetup and add it to the meetups array in the group
 */
GroupSchema.statics.addHangout = async function (id, args) {
  const Hangout = mongoose.model('Hangout');
  // We add the group id to the meetup group element
  // Finally this is the author of the meetup
  const hangout = await new Hangout({ ...args, group: id });
  // We found the group with the id provide in the url
  // And we push the meetup id in the meetups element
  const group = await this.findByIdAndUpdate(id, { $push: { hangouts: hangout.id } });

  return {
    hangout: await hangout.save(),
    group,
  };
};

export default mongoose.model('Group', GroupSchema);
