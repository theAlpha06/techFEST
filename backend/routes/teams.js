import Express from "express";
import {isAuth} from '../middleware/isAuth.js';

import {
  createTeam,
  deleteTeam,
  getByLeaderId,
  getTeam,
  modifyTeam,
  verifyteaminvitation,
  properTeam
} from "../controllers/teams.js";

const router = Express.Router();

router.post(
  "/create",
  isAuth,
  createTeam,
);

router.get(
  "/get",
  isAuth,
  getTeam,
);
router.post(
  "/delete",
  isAuth,
  deleteTeam,
);
router.post(
  "/modify",
  isAuth,
  modifyTeam,
);
router.post(
  "/getByLeaderId",
  isAuth,
  getByLeaderId,
);

router.get(
  '/verifyteaminvitation/:memberid/:teamid',
  verifyteaminvitation,
)

router.get(
  '/properteam',
  isAuth,
  properTeam,
)

export default router;
