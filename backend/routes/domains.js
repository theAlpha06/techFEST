import Express from "express";
import multer from 'multer';
const upload = multer({dest: 'upload/images'});
import {check} from "express-validator";

import {
  createDomain,
  deleteDomain,
  getAllDomainNames,
  getAllDomains,
  getDomain,
  modifyDomain,
} from "../controllers/domains.js";

const router = Express.Router();

router.post(
  "/create",
  check("domainName").exists(),
  check("domainInfo").exists(),
  check("facultyAdvisor").exists(),
  check("domainCoor1").exists(),
  upload.single('domainPicture'),
  createDomain,
);

router.get(
  "/getAllDomains",
  getAllDomains,
);

router.get(
  "/getAllDomainNames",
  getAllDomainNames,
);

router.get(
  "/get",
  getDomain,
);
router.post(
  "/delete",
  deleteDomain,
);
router.post(
  "/modify",
  modifyDomain,
);
export default router;
