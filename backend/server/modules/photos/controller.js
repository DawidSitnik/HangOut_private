import multer from 'multer';
import User from '../users/model';
const fs = require('fs')

export var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/profilePictures')
  },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export var upload = multer({ storage: storage })

export const uploadPhoto = async (req, res) => {
    let user = await User.findOneAndUpdate(
    { _id: req.files[0].originalname},
    { $set: { "profilePicture": req.files[0].originalname } }
  );
    res.send("Photo uploaded");
};

  export const downloadPhoto = async (req, res) => {
    const { userId } = req.params;
    var path = require('path');
    if (fs.existsSync('uploads/profilePictures/'+userId))
      res.sendFile(path.resolve('uploads/profilePictures/'+userId));
    else
      res.sendFile(path.resolve('uploads/profilePictures/default'));
}
