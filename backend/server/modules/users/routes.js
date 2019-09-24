import { Router } from 'express';
import * as UserController from './controller';
import * as NotificationsController from './controllerNotifications';

const routes = new Router();

routes.post('/users/register', UserController.createUser);
routes.post('/users/changeDescription', UserController.changeDescription);

routes.post('/users/checkIfRequestSend', UserController.checkIfRequestSend);
routes.post('/users/checkIfFriend', UserController.checkIfFriend);
routes.post('/users/requestFriend', UserController.requestFriend);
routes.post('/users/cancelRequest', UserController.cancelRequest);
routes.post('/users/addFriend', UserController.addFriend);
routes.post('/users/deleteFriend', UserController.deleteFriend);

routes.post('/users/getAllUsersExceptOne', UserController.getAllUsersExceptOne);
routes.post('/users/getMyFriends', UserController.getMyFriends);

routes.post('/users/sendMessage', UserController.sendMessage);
routes.post('/users/getAllMessages', UserController.getAllMessages);
routes.post('/users/checkIfChatIsSeen', UserController.checkIfChatIsSeen);
routes.post('/users/markChatIsSeenFalse', UserController.markChatIsSeenFalse);
routes.post('/users/markChatIsSeenTrue', UserController.markChatIsSeenTrue);
routes.get('/users/:myId/getFirstMessages', UserController.getFirstMessages);

routes.post('/users/addNotificationsToken', NotificationsController.addNotificationsToken);
routes.post('/users/sendNotification', NotificationsController.sendNotification);

routes.get('/users/getAll', UserController.getAllUsers);
routes.post('/users/logIn', UserController.logInUser);
routes.post('/users/changeDescription', UserController.changeDescription);
routes.get('/users', UserController.checkToken, UserController.getAllUsers);
routes.get('/users/:userId/getUser', UserController.getUser);

routes.post('/users/sendCoordinates', UserController.changeCoordinates);

export default routes;
