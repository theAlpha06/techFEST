import Express from "express";

import {
  createEvent,
  deleteEvent,
  // getEvent,
  getAllEvents,
  getByDomain,
  modifyEvent,
  getEventByName,
  getEventByDomainName,
  getEventByDomain,
  getEventById,
  toggleRegistration,
} from "../controllers/events.js";

const router = Express.Router();

router.post(
  "/create",
  createEvent
);

// router.get(
//   "/get",
//   getEvent,
// );


router.get(
  "/getAll",
  getAllEvents,
);

router.get(
  "/getByDomain",
  getByDomain,
);

router.post(
  "/delete",
  deleteEvent,
);
router.post(
  "/modify/:id",
  modifyEvent,
);

router.post(
  '/geteventbyname',
  getEventByName,
)
router.post(
  '/geteventbydomainname',
  getEventByDomainName,
);

router.post(
  '/geteventbydomain',
  getEventByDomain,
);

router.get(
  '/event/:id',
  getEventById,
)

router.post(
  '/toggleregistration',
  toggleRegistration,
)


export default router;
