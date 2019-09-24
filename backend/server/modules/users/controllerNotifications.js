import Expo from 'expo-server-sdk';
import User from './model';

export const addNotificationsToken = async (req, res) => {
  try {
    return res.status(200).json({ user: await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $set: { notifficationsToken: req.body.token } }
    ) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with getting description' });
  }
};

export const sendNotification = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  const token = user.notifficationsToken;
  const expo = new Expo();

  const messages = [];
  // for (const pushToken of somePushTokens) {

  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
  }

  // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
  messages.push({
    to: token,
    sound: 'default',
    body: req.body.message,
    data: {
      type: req.body.type,
      fromId: req.body.fromId,
    },
  });
  // }

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  const receiptIds = [];
  for (const ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receipt of receipts) {
          if (receipt.status === 'ok') {
            break;
          } else if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();

  try {
    return res.status(200).json({ error:false, message:"notiffication was sent" });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with sendind notiffication' });
  }

};
