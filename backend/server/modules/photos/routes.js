import { Router } from 'express';
import * as PhotosController from './controller';
import multer from 'multer';

const routes = new Router();

routes.post('/photos/upload', PhotosController.upload.array('file', 12), PhotosController.uploadPhoto);
routes.get('/photos/download/*/:userId/', PhotosController.upload.single('fieldname'), PhotosController.downloadPhoto )

export default routes;
