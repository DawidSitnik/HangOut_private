import { Router } from 'express';
import * as GroupController from './controller';

const routes = new Router();

routes.post('/groups/new', GroupController.createGroup);
routes.post('/groups/:groupId/hangouts/new', GroupController.createGroupHangout);
routes.get('/groups/:groupId/hangouts', GroupController.getAllGroupHangouts);
routes.get('/groups/new', GroupController.getAllGroups);

export default routes;
