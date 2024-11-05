import express from 'express';
import authRoute from './auth.route.js';
import defaultRoute from './default.rout.js';
import userRoute from './user.route.js';
import leageTournament from './leageTournament.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: defaultRoute
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/leage-tournament',
    route: leageTournament,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
