import Coordinator from "../models/coordinator.js";
import asyncHandler from "express-async-handler";
// import {failAction, successAction } from "../utils/response.js";
import fileHelper from "../utils/file.js";


const getCoordinators = asyncHandler(async (req, res, next) => {
  try {
    const result = await Coordinator.find().sort({coordinatorStatus: 1})
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});


const createCoordinator = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: "Image is not given" });
  }
  const cc = await Coordinator.findOne({
    coordinatorEmail: req.body.coordinatorEmail,
  });
  if (cc) {
    if (req.file) {
      const pathImg = "images/" + req.file.filename;
      fileHelper(pathImg);
    }
    return res.status(208).json({
      isError: true,
      title: "Error",
      message: `Coordinator already exists with this mail ${req.body.coordinatorEmail}`,
    });
  }

  const c1 = new Coordinator({
    coordinatorName: req.body.coordinatorName,
    coordinatorPhone: req.body.coordinatorPhone,
    coordinatorEmail: req.body.coordinatorEmail,
    coordinatorType: req.body.coordinatorType,
    coordinatorBranch: req.body.coordinatorBranch,
    photo: req.file.filename,
  });

  c1.save((err, c1) => {
    if (err) {
      //err
      console.log(err);
      if (req.file) {
        const pathImg = "images/" + req.file.filename;
        fileHelper(pathImg);
      }
      return res.status(208).json({
        error: "error occurd, not able to saved in db ",
      });
    }
    return res.status(201).json({
      isError: false,
      title: "Success",
      message: "Coordinator saved!",
    });
  });
});

const validateCoordinator = async (req, res) => {
  let coordinator = await Coordinator.findOne({coordinatorEmail: req.body.email});
  coordinator.coordinatorStatus = true;
  await coordinator.save();
  res.status(200).json({
    isError: false,
    title: "Success",
    message: "Coordinator validated!",
  });
};

const deleteCoordinator = async(req, res) => {
  const coordinator = await Coordinator.findOneAndDelete({coordinatorId: req.body.id});
  if(!coordinator) {
    return res.status(404).json({
      isError: true,
      title: "Error",
      message: "Coordinator not found!",
    });
  }
  res.status(200).json({
    isError: false,
    title: "Success",
    message: "Coordinator deleted!",
  });
}

const getCoordinatorById = (req, res) => {
  const coordinatorId = req.params.id;
  Coordinator.findById(coordinatorId)
  .then((coordinator) => {
    if (!coordinator) {
      return res.status(404).json({
        isError: true,
        title: "Error",
        message: "Coordinator not found!",
      });
    }
      res.status(200).send({
        isError: false,
        title: "Success",
        message: "Coordinator found!",
        coordinator: coordinator,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
}
const updateCoordinator =async(req,res)=>{
 const  coordinatorName =req.body.coordinatorName;
//  return console.log(coordinatorName);
  const coordinatorBranch =req.body.coordinatorBranch;
  const coordinatorPhone = req.body.coordinatorPhone;
  const coordinatorEmail = req.body.coordinatorEmail;
 Coordinator.findOne({coordinatorEmail:coordinatorEmail}).then((c)=>{
  c.coordinatorName=coordinatorName,
  c.coordinatorBranch=coordinatorBranch,
  c.coordinatorPhone=coordinatorPhone
  return c.save()

 })
.then((result)=>{
  return res.status(200).json({
    isError: true,
    title: "Success",
    message: "User update successfully",
  });
})
}

const updatePhoto = async (req, res) => {
  if(!req.file) {
    return res.status(208).send({
      title: "Empty!",
      message: "No image Selected."
    });
  }
  if(req.file.size > 102400) {
    return res.status(208).send({
      title: "Large!",
      message: "Image size should be less than 100kb."
    });
  }
  const fileName = req.file.filename;
  const coordinatorId = req.params.id;
  await Coordinator.findByIdAndUpdate(coordinatorId, {$set : 
    {coordinatorPhoto: `${fileName}`}
  }).exec();
  res.status(200).send({
    title: "Uplaoded!",
    message: "Photo uploaded successfully!"
  });
}
export { getCoordinators, createCoordinator, validateCoordinator, deleteCoordinator, getCoordinatorById,updateCoordinator, updatePhoto };
