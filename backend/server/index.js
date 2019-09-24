import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middlewares';
import { HangoutRoutes, GroupRoutes, UserRoutes, PhotosRoutes } from './modules';

export const app = express();

// Database
dbConfig(); // nie musimy wskazywac zadnej konkretnej funkcji, w db.js mamy zdefiniowane export default

// middlewares
middlewareConfig(app);

app.use('/api', [HangoutRoutes, GroupRoutes, UserRoutes, PhotosRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port:${PORT}`);
  }
});
