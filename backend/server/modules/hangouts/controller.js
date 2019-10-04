import Hangout from "./model";
import User from "../users/model";

//getting distance from 2 objects in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(3);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const createHangout = async (req, res) => {
  const {
    id,
    activity,
    description,
    coordinates,
    timeFrom,
    timeTo,
    radius,
    maxPeople
  } = req.body;
  const user = await User.findById(id, { name: 1, coordinates: 1 });

  //we are formating our data to have better format in database
  let activityLowercase = activity.toLowerCase();
  let newActivity =
    activityLowercase.charAt(0).toUpperCase() + activityLowercase.slice(1);
  let newTimeFrom = timeFrom
    .substr(5)
    .replace(/-/g, ".")
    .replace(/T/g, " ");
  let newTimeTo = timeTo
    .substr(5)
    .replace(/-/g, ".")
    .replace(/T/g, " ");

  const newHangout = new Hangout({
    creator: { id, name: user.name },
    activity: newActivity,
    description,
    coordinates,
    timeFrom: newTimeFrom,
    timeTo: newTimeTo,
    radius,
    maxPeople,
    users: [id]
  });

  const hangout = await newHangout.save();
  await User.findByIdAndUpdate(id, { $push: { createdHangouts: hangout._id } });

  try {
    return res.status(201).json({ hangout });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with hangout" });
  }
};

export const getHangoutsAroundUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId, { _id: 1, coordinates: 1 });

  const hangouts = await Hangout.find({});
  const hangoutsAroundUser = [];

  //finding hangouts next to user
  for (let hangout of hangouts) {
    const distance = getDistanceFromLatLonInKm(
      user.coordinates.latitude,
      user.coordinates.longitude,
      hangout.coordinates.latitude,
      hangout.coordinates.longitude
    );
    let isUserInHangout = false;
    if (hangout.users.length <= hangout.maxPeople) {
      if (distance < 10000) {
        for (let id of hangout.users) {
          if (id == userId) {
            isUserInHangout = true;
            break;
          }
        }
        if (!isUserInHangout)
          hangoutsAroundUser.push({ hangout: hangout, distance: distance });
        isUserInHangout = false;
      }
      hangoutsAroundUser.forEach(e => {
        if (e == []) hangoutsAroundUser.delete(e);
      });
    }
  }
  try {
    return res.status(200).json({ hangoutsAroundUser });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const getHangout = async (req, res) => {
  const { hangoutId } = req.params;
  try {
    return res.status(200).json({ hangout: await Hangout.findById(hangoutId) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const findCreatedHangouts = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const hangoutsIds = user.createdHangouts;
  let hangouts = [];

  for (let hangoutId of hangoutsIds) {
    let hangout = await Hangout.findById(hangoutId);
    if (hangout === null) continue;
    let distance = getDistanceFromLatLonInKm(
      hangout.coordinates.latitude,
      hangout.coordinates.longitude,
      user.coordinates.latitude,
      user.coordinates.longitude
    );
    hangouts.push({ hangout, distance });
  }

  try {
    return res.status(200).json({ hangouts });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const findJoinedHangouts = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const hangoutsIds = user.hangouts;
  let hangouts = [];

  for (let hangoutId of hangoutsIds) {
    let hangout = await Hangout.findById(hangoutId);
    if (hangout === null) continue;
    let distance = getDistanceFromLatLonInKm(
      hangout.coordinates.latitude,
      hangout.coordinates.longitude,
      user.coordinates.latitude,
      user.coordinates.longitude
    );
    hangouts.push({ hangout, distance });
  }

  try {
    return res.status(200).json({ hangouts });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const findHangouts = async (req, res) => {
  const { userId, howFar } = req.params;
  const user = await User.findById(userId, { coordinates: 1 });
  let foundHangouts = [];
  const allHangouts = await Hangout.find();
  let isUserInHangout = false;
  for (let hangout of allHangouts) {
    if (hangout.users.length <= hangout.maxPeople) {
      let distance = getDistanceFromLatLonInKm(
        user.coordinates.latitude,
        user.coordinates.longitude,
        hangout.coordinates.latitude,
        hangout.coordinates.longitude
      );
      if (distance < (howFar + hangout.radius) / 1000) {
        for (let id of hangout.users) {
          if (id == userId) {
            isUserInHangout = true;
            break;
          }
        }
        if (!isUserInHangout)
          foundHangouts.push({ hangout, distance: distance });
        isUserInHangout = false;
      }
    }
  }

  try {
    return res.status(200).json({ hangouts: foundHangouts });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const joinHangout = async (req, res) => {
  const { userId, hangoutId } = req.body;
  await User.findByIdAndUpdate(userId, { $push: { hangouts: hangoutId } });
  await Hangout.findByIdAndUpdate(hangoutId, { $push: { users: userId } });

  try {
    return res.status(200).json({ message: "you joined hangout" });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const leaveHangout = async (req, res) => {
  const { userId, hangoutId } = req.body;
  await User.findByIdAndUpdate(userId, { $pull: { hangouts: hangoutId } });
  await Hangout.findByIdAndUpdate(hangoutId, { $pull: { users: userId } });

  try {
    return res.status(200).json({ message: "you left hangout" });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with getting hangouts" });
  }
};

export const deleteHangout = async (req, res) => {
  const { userId, hangoutId } = req.body;
  await User.findByIdAndUpdate(userId, {
    $pull: { createdHangouts: hangoutId }
  });
  let hangout = await Hangout.findById(hangoutId);
  let users = hangout.users;
  for (let user of users) {
    await User.findByIdAndUpdate(user, { $pull: { hangouts: hangoutId } });
  }
  await Hangout.deleteOne({ _id: hangoutId });

  try {
    return res.status(200).json({ message: "hangout deleted" });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with deleting hangout" });
  }
};

export const getPeopleInHangout = async (req, res) => {
  const { hangoutId, userId } = req.params;
  const hangout = await Hangout.findById(hangoutId);
  const people = hangout.users;
  let peopleInHangout = [];
  for (let personId of people) {
    if (personId === userId) continue;
    const person = await User.findById(personId, {
      _id: 1,
      name: 1,
      description: 1,
      profilePicture: 1
    });
    peopleInHangout.push(person);
  }
  try {
    return res.status(200).json({ peopleInHangout });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with deleting hangout" });
  }
};

export const deleteOldHangouts = async (req, res) => {
  var today = new Date();

  var year = String(today.getYear());
  year = year.substring(1, 3);
  year = parseFloat(year);
  var month = parseFloat(today.getMonth() + 1);
  var day = parseFloat(today.getDate());
  var hour = parseFloat(today.getHours());
  var minute = parseFloat(today.getMinutes());

  const hangouts = await Hangout.find({});

  //przerobic na momentjs()
  for (let hangout of hangouts) {
    let hangoutTime = hangout.timeTo;
    let createdAt = String(hangout.createdAt);
    var hangoutYear = parseFloat(createdAt.substring(13, 15));
    var hangoutMonth = parseFloat(hangoutTime.substring(0, 2));
    var hangoutDay = parseFloat(hangoutTime.substring(3, 5));
    var hangoutHour = parseFloat(hangoutTime.substring(6, 8));
    var hangoutMinute = parseFloat(hangoutTime.substring(9, 11));
    if (year > hangoutYear) {
      await Hangout.deleteOne({ _id: hangout._id });
    } else if (month > hangoutMonth && year == hangoutYear) {
      await Hangout.deleteOne({ _id: hangout._id });
    } else if (
      day > hangoutDay &&
      month == hangoutMonth &&
      year == hangoutYear
    ) {
      await Hangout.deleteOne({ _id: hangout._id });
    } else if (
      hour > hangoutHour &&
      day == hangoutDay &&
      month == hangoutMonth &&
      year == hangoutYear
    ) {
      await Hangout.deleteOne({ _id: hangout._id });
    } else if (
      minute > hangoutMinute &&
      hour == hangoutHour &&
      day == hangoutDay &&
      month == hangoutMonth &&
      year == hangoutYear
    ) {
      await Hangout.deleteOne({ _id: hangout._id });
    }
  }

  try {
    return res.status(200).json({ error: false, message: "hangouts updated" });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with deleting hangout" });
  }
};
