import Group from './model';
import { Hangout } from '../hangouts';

export const createGroup = async (req, res) => {
  const {
    name,
    description,
    category,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      error: true,
      message: 'Name must be provided',
    });
  } else if (typeof name !== 'string') {
    return res.status(400).json({
      error: true,
      message: 'Name has to be string',
    });
  } else if (name.length < 5) {
    return res.status(400).json({
      error: true,
      message: 'Length of name has to be longer than 5',
    });
  }

  if (!description) {
    return res.status(400).json({
      error: true,
      message: 'Description must be provided',
    });
  } else if (typeof description !== 'string') {
    return res.status(400).json({
      error: true,
      message: 'Description has to be string',
    });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Length of description has to be longer than 10',
    });
  }

  const newGroup = new Group({
    name,
    description,
  });

  try {
    return res.status(201).json({
      group: await newGroup.save(),
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error while creating group',
    });
  }
};

export const createGroupHangout = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: 'Title must be provided',
    });
  } else if (typeof title !== 'string') {
    return res.status(400).json({
      error: true,
      message: 'Title has to be a string',
    });
  } else if (title.length < 5) {
    return res.status(400).json({
      error: true,
      message: 'Length of title has to be longer than 5',
    });
  }

  if (!description) {
    return res.status(400).json({
      error: true,
      message: 'Description must be provided',
    });
  } else if (typeof description !== 'string') {
    return res.status(400).json({
      error: true,
      message: 'Description has to be string',
    });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Length of description has to be longer than 10',
    });
  }

  if (!groupId) {
    return res.status(400).json({
      error: true,
      message: 'GroupId must be provided',
    });
  }

  try {
    const { hangout, group } = await Group.addHangout(groupId, { title, description });
    return res.status(201).json({ error: false, hangout, group });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'There was an error with GroupId, hangout can not be created',
    });
  }
};

export const getAllGroupHangouts = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'You need to provide a group id' });
  }

  // Search to see if the group exist
  const group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({ error: true, message: 'Group does not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      hangouts: await Hangout.find({ group: groupId }).populate('group', 'name'),
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot fetch hangout' });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    return res.status(200).json({
      group: await Group.find({}),
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error while getting all groups',
    });
  }
};
