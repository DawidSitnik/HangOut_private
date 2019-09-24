import { Router } from 'express';
import * as HangoutController from './controller';

const routes = new Router();

routes.post('/hangouts/createHangout', HangoutController.createHangout);
routes.post('/hangouts/joinHangout', HangoutController.joinHangout);
routes.post('/hangouts/leaveHangout', HangoutController.leaveHangout);
routes.post('/hangouts/deleteHangout', HangoutController.deleteHangout);
routes.post('/hangouts/deleteOldHangouts', HangoutController.deleteOldHangouts);

routes.get('/hangouts/:userId/getHangoutsAroundUser', HangoutController.getHangoutsAroundUser);
routes.get('/hangouts/:hangoutId/getHangout', HangoutController.getHangout);
routes.get('/hangouts/:userId/:howFar/findHangouts', HangoutController.findHangouts);
routes.get('/hangouts/:userId/findCreatedHangouts', HangoutController.findCreatedHangouts);
routes.get('/hangouts/:userId/findJoinedHangouts', HangoutController.findJoinedHangouts);
routes.get('/hangouts/:hangoutId/:userId/getPeopleInHangout', HangoutController.getPeopleInHangout);

export default routes;
