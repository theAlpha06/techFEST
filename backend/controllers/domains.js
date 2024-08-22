import multiparty from "multiparty";
import Domain from "../models/domains.js";
import saveImg from "../utils/image.js";
import deleteFiles from "../utils/file.js";

function isEmpty(req) {
  return req === {} || req === undefined || req === "" || req == [] ||
    req == null;
}

const UPLOAD_PATH = "uploads/images/domain/";

export function createDomain(req, res) {
  const studentCoor = [
    req.body.domainCoor1,
    req.body.domainCoor2,
  ];
  try {
    const payLoad = {
      ...{
        domainName: req.body.domainName,
        domainInfo: req.body.domainInfo,
        domainPhoto: req.file.path,
        facultyCoordinator: req.body.facultyAdvisor,
        studentCoordinator: studentCoor,
      },
    };

    const domain = new Domain(payLoad);
    domain.save((err) => {
      if (err) {
        console.log("domain can't to db!", err);
        return res.status(400).json({
          isError: true,
          title: "Error",
          message: err,
        });
      } else {
        console.log("domain registered to db!");
        return res.status(200).send({
          title: "Success",
          message: "Saved",
        });
      }
    });
  } catch (error) {
    return res.status(201).json({
      isError: true,
      title: "Error",
      message: error,
    });
  }
}

export async function getAllDomains(req, res) {
  res.json(await Domain.find());
}

export async function getAllDomainNames(req, res) {
  return res.json(
    (await Domain.find({})).map((res) => {
      return res.domainName;
    }),
  );
}

export async function getIdByName(name) {
  (await Domain.find({ domainName: name })).map((d) => {
    return d._id;
  });
}

export function getDomain(req, res) {
  // Sanitizing the request
  const form = new multiparty.Form();
  form.parse(req, (err, fields) => {
    let missingFields = [];
    const requiredFields = [
      "domainId",
    ];
    requiredFields.forEach((val) => {
      if (!fields.hasOwnProperty(val)) missingFields += val;
    });
    if (missingFields.length != 0) {
      return res.status(500).json({
        error: "Not found: " + missingFields.toString(),
      });
    }
    Domain.findById(fields.domainId[0]).then((d) => {
      if (!d) {
        // console.log(err)
        return res.status(404).json({
          error: "Not Found!",
        });
      }

      res.status(200).json({
        message: "Returned Domain Successfully",
        d,
      });
    });
  });
}

export function deleteDomain(req, res) {
  // Sanitizing the request
  const form = new multiparty.Form();
  form.parse(req, (err, fields) => {
    let missingFields = [];
    const requiredFields = [
      "domainId",
    ];
    requiredFields.forEach((val) => {
      if (!fields.hasOwnProperty(val)) missingFields += val;
    });
    if (missingFields.length != 0) {
      return res.status(500).json({
        error: "Not found: " + missingFields.toString(),
      });
    }
    Domain.deleteOne({ _id: fields.domainId[0] }).then((d) => {
      if (d.acknowledged == false || d.deletedCount == 0) {
        // console.log(err)
        return res.status(404).json({
          error: "Not Found!",
        });
      }

      res.status(200).json({
        message: "Deleted Domain Successfully",
        d,
      });
    });
  });
}

export function modifyDomain(req, res) {
  // Sanitizing the request
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    let missingFields = [];
    const requiredFields = [
      "domainId",
    ];
    requiredFields.forEach((val) => {
      if (!fields.hasOwnProperty(val)) missingFields += val;
    });
    if (missingFields.length != 0) {
      return res.status(500).json({
        error: "Not found: " + missingFields.toString(),
      });
    }
    Domain.findById(fields.domainId[0]).then((d) => {
      if (!d) {
        // console.log(err)
        return res.status(404).json({
          error: "Domain Not Found!",
        });
      }
      if (isEmpty(fields)) {
        return res.status(400).json({
          error: "Malformed Request or Bad key",
        });
      }
      if (!isEmpty(fields.domainName)) {
        d.domainName = fields.domainName[0];
      }
      if (!isEmpty(fields.domainInfo)) {
        d.domainInfo = fields.domainInfo[0];
      }
      if (!isEmpty(files.domainPhoto)) {
        deleteFiles(UPLOAD_PATH + d.domainPhoto);
        d.domainPhoto = saveImg(
          files.domainPhoto[0],
          UPLOAD_PATH,
          (err) => console.error(err),
        );
      }
      if (!isEmpty(fields.studentCoordinator)) {
        d.studentCoordinator = fields.studentCoordinator[0].split(",");
      }
      if (!isEmpty(fields.facultyCoordinator)) {
        d.facultyCoordinator = fields.facultyCoordinator[0].split(",");
      }
      d.save((err, domain) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Error occurred, Can't save to database",
          });
        }
        res.json({
          message: "Domain Edited successfully!",
          domain,
        });
      });
    });
  });
}
