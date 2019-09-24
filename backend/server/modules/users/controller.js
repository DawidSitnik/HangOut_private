import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from './model';

const SECRET_KEY = 'BoroKtosCiLusieNaBicaBierzeCoRobisz?ZaKotaZabijKurwa.SprężynkęJebnij.AleJakSięPrzypinasz?TyGarbataCioto.';
const isRealeaseVersion = 0;// Change this to remove token authentication

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name +' '+ email +' '+password)
  const { error } = User.validateUser(req.body);
  if (error) {
    console.log("err1")
    return res.status(400).send(error.details[0].context.label); }

  const isEmail = await User.findOne({ email: req.body.email });
  if (isEmail) {
    console.log("err2")
    return res.status(400).send({ error: true, message: 'That email already exisits!' }); }

  const isName = await User.findOne({ name: req.body.name });
  if (isName) {
    console.log("err3")
    return res.status(400).send({ error: true, message: 'That login already exisits!' }); }

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
  const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
  let user = await newUser.save();
  try {
    return res.status(201).json({ id: user._id, token: accessToken });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with user' });
  }
};

export const logInUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].context.label);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) { return res.status(400).send({ message: 'Incorrect email or password.' }); }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) { return res.status(400).send({ message: 'Incorrect email or password.' }); }
  const expiresIn = 24 * 60 * 60;
  const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn });

  res.status(201).send({ token: accessToken, expires_in: expiresIn, id: user.id });
};

export const getAllUsers = async (req, res) => {
  try {
    return res.status(200).json({ user: await User.find({}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting users' });
  }
};

export const getAllUsersExceptOne = async (req, res) => {
  const { myId } = req.body;
  try {
    return res.status(200).json({ user: await User.find({ _id: { $nin: myId } }, { _id: 1, name: 1 }) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting users' });
  }
};

export const getMyFriends = async (req, res) => {
  const { myId } = req.body;
  try {
    const me = await User.findOne({ _id: myId });
    const friends = me.friends;
    let friendsWithPictures = []
    for (let friend of friends){
      const user = await User.findById(friend)
      friendsWithPictures.push({id: user._id, picture: user.profilePicture, name:user.name})
    }
    return res.status(200).json({ friends: friendsWithPictures });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting users' });
  }
};

export const getAllUsersVerify = async (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.status(403);
    }
  });
  try {
    return res.status(200).json({ user: await User.find({}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting users' });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: true, message: 'You need to provided a user id' });
  }

  const user = await User.findById(userId, { description: 1, _id: 1, name: 1 });

  if (!user) {
    return res.status(400).json({ error: true, message: 'User not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      user,
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot find user' });
  }
};

export const changeDescription = async (req, res) => {
  try {
    return res.status(200).json({ user: await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { description: req.body.description } }
    ) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting description' });
  }
};

export const checkToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    // If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required()
      .email()
      .label('{"message":"Invalid email address"}'),
    password: Joi.string().min(5).max(255).required()
      .label('{"message":"Invalid password"}'),
  };
  return Joi.validate(req, schema);
}

export const checkIfRequestSend = async (req, res) => {
  const { myId, friendId } = req.body;
  try {
    const me = await User.findOne({ _id: myId });
    const friendRequests = me.friendRequests;

    // if array empty or doesnt exist
    if (friendRequests === undefined || friendRequests.length === 0) { return res.status(201).json({ error: false, request: 'notRequested' }); }

    const request = friendRequests.find(x => x.friendId).request;

    // if we found a request
    return res.status(201).json({ error: false, request });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const checkIfFriend = async (req, res) => {
  const { myId, friendId } = req.body;

  try {
    const me = await User.findOne({ _id: myId });
    const friends = me.friends;

    // if array empty or doesnt exist

    if (friends === undefined || friends.length === 0) { return res.status(201).json({ error: false, request: 'notFriend' }); }
    const request = friends.findIndex(x => x === friendId);
    if (request === undefined || request === -1) {
      return res.status(201).json({ error: false, request: 'notFriend' });
    }
    // if we found a friend
    return res.status(201).json({ error: false, request: 'friend' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const requestFriend = async (req, res) => {
  const { myId, friendId } = req.body;

  try {
    const me = await User.findOne({ _id: myId });
    const myRequests = me.friendRequests;
    const myIndex = myRequests.findIndex(x => x.friendId === friendId);
    if (myIndex != -1) { return res.status(201).json({ error: false, message: 'already requested' }); }

    await User.update(
      { _id: myId },
      { $push: { friendRequests: { friendId, request: 'send' } } });

    await User.update(
      { _id: friendId },
      { $push: { friendRequests: { friendId: myId, request: 'received' } } });

    return res.status(201).json({ error: false, message: 'Request sent successfuly' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const cancelRequest = async (req, res) => {
  const { myId, friendId } = req.body;
  try {
    // finding our object and our friend object
    const me = await User.findOne({ _id: myId });
    const friend = await User.findOne({ _id: friendId });

    // getting ours requests
    const myRequests = me.friendRequests;
    const friendRequests = friend.friendRequests;

    // loking for indexes of objects to remove
    const myIndex = myRequests.findIndex(x => x.friendId === friendId);
    const friendIndex = friendRequests.findIndex(x => x.friendId === myId);

    // removing requests from array
    myRequests.splice(myIndex, 1);
    friendRequests.splice(friendIndex, 1);

    // updating database
    await User.update(
      { _id: myId },
      { friendRequests: myRequests });

    await User.update(
      { _id: friendId },
      { friendRequests });

    return res.status(201).json({ error: false, message: 'requests deleted from database' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const addFriend = async (req, res) => {
  const { myId, friendId } = req.body;
  try {
    await User.update(
      { _id: myId },
      { $push: { friends: friendId } });

    await User.update(
      { _id: friendId },
      { $push: { friends: myId } });

    return res.status(201).json({ error: false, message: 'Friend added successfuly' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const deleteFriend = async (req, res) => {
  const { myId, friendId } = req.body;
  try {
    // finding our object and our friend object
    const me = await User.findOne({ _id: myId });
    const friend = await User.findOne({ _id: friendId });

    // getting ours friends
    const myFriends = me.friends;
    const friendFriends = friend.friends;

    //gettingOurChats
    const myChats = me.chats;
    const friendChats = friend.chats;

    // looking for indexes of friends to remove
    const myIndex = myFriends.findIndex(x => x.id === friendId);
    const friendIndex = friendFriends.findIndex(x => x === myId);

    //looking for indexes of chats to remove
    const myChatIndex = myChats.findIndex(x => x.friendId === friendId)
    const friendChatIndex = friendChats.findIndex(x => x.friendId === myId)

    // removing friends from array
    myFriends.splice(myIndex, 1);
    friendFriends.splice(friendIndex, 1);

    //removing chats from array
    myChats.splice(myChatIndex, 1);
    friendChats.splice(friendChatIndex, 1);

    // updating database
    await User.update(
      { _id: myId },
      { friends: myFriends, chats: myChats });

    await User.update(
      { _id: friendId },
      { friends: friendFriends, chats: friendChats });

    return res.status(201).json({ error: false, message: 'requests deleted from database' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for friend' });
  }
};

export const checkIfChatIsSeen = async (req,res) => {
  const {myId, friendId} = req.body

  const friend = await User.findOne({ _id: friendId },)
  const friendChats = friend.chats
  let isSeen =true
  for (let chat of friendChats){
    if (chat.friendId == myId) {
      isSeen = chat.isSeen
}
  }

  try {
    return res.status(200).json({error:false, isSeen:isSeen });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting isSeen' });
  }
}

  export const markChatIsSeenFalse = async (req,res) => {
    const {myId, friendId} = req.body
    await User.update(
      { _id: friendId, 'chats.friendId': myId },
      { $set: { 'chats.$.isSeen': false } }
    );

  try {
    return res.status(200).json({});
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with marking isSeen' });
  }
}

export const markChatIsSeenTrue = async (req,res) => {
  const {myId, friendId} = req.body
  await User.update(
    { _id: myId, 'chats.friendId': friendId },
    { $set: { 'chats.$.isSeen': true } }
  );

try {
  return res.status(200).json({});
} catch (e) {
  return res.status(e.status).json({ error: true, message: 'Error with marking isSeen' });
}
}

export const sendMessage = async (req, res) => {
  const { myId, friendId, content } = req.body;
  try {
    const me = await User.findOne({ _id: myId });
    const myChats = me.chats;
    const chatIndex = myChats.findIndex(x => x.friendId === friendId);

    const friend = await User.findOne({ _id: friendId });
    const friendChats = friend.chats;
    const friendChatIndex = friendChats.findIndex(x => x.friendId === myId);

    // if we didnt chat with that user yet we need to add message array to chats
    if (chatIndex === -1) {
      await User.update(
        { _id: myId },
        { $push: { chats: { friendId: req.body.friendId, friendName: friend.name, messages: [] } } }
      );
    }
    await User.update(
      { _id: myId, 'chats.friendId': friendId },
      { $push: { 'chats.$.messages': { content: req.body.content, sendBy: 'You', time: new Date().setUTCHours(15) } } }
    );
    await User.update(
      { _id: myId, 'chats.friendId': friendId },
      { $set: { 'chats.$.firstMessage': { content: req.body.content, sendBy: 'You' } } }
    );

    // if we didnt chat with that user yet we need to add message array to chats
    if (friendChatIndex === -1) {
      await User.update(
        { _id: friendId },
        { $push: { chats: { friendId: req.body.myId, friendName: me.name, messages: [] } } }
      );
    }
    await User.update(
      { _id: friendId, 'chats.friendId': myId },
      { $push: { 'chats.$.messages': { content: req.body.content, sendBy: me.name, time: new Date().setUTCHours(15) } } }
    );
    await User.update(
      { _id: friendId, 'chats.friendId': myId },
      { $set: { 'chats.$.firstMessage': { content: req.body.content, sendBy: me.name } } }
    );

    return res.status(201).json({ error: 'false', response: 'sent a message' });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with hangout' });
  }
};

export const getAllMessages = async (req, res) => {
  const { myId, friendId } = req.body;
  const me = await User.findOne({ _id: myId });
  const myChats = me.chats;
  let messages = [];
  let friendName = me.name;

  myChats.forEach((item, index, array) => {
    if (item.friendId === friendId) {
      messages = item.messages;
     }
  });

  try {
    return res.status(201).json({ error: 'false', allMessages: messages, friendName });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with hangout' });
  }
};

export const getFirstMessages = async (req, res) => {
  const myId = req.params.myId;
  const me = await User.findById(myId);
  const chats = me.chats;
  let chatsWithPictures = []
  for (let chat of chats) {
    const user = await User.findById(chat.friendId)
    const profilePicture = user.profilePicture
    await chatsWithPictures.push({firstMessage: chat.firstMessage, profilePicture, _id:user._id, friendName: user.name})

  };
  try {
    return res.status(201).json({ error: false, chats:chatsWithPictures });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with requesting for chats' });
  }
};

export const changeCoordinates = async (req, res) => {
  try {
    return res.status(200).json({ user: await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { coordinates: { latitude: req.body.latitude, longitude: req.body.longitude } } }
    ) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Coords error' });
  }
};
