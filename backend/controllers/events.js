import multiparty from "multiparty";
import Event from "../models/events.js";
import fs from "fs";
import deleteFiles from "../utils/file.js";
import saveImg from "../utils/image.js";
import { getIdByName } from "./domains.js";

const UPLOAD_PATH = "uploads/images/event/";

export async function createEvent(req, res) {
  const domainName = req.body.domainName;
  try {
    const payLoad = {
      ...{
        domainName: domainName.toLowerCase(),
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        studentCoordinator: req.body.studentCoordinator,
        startDate: req.body.startDate,
        venue: req.body.eventVenue,
        eventParticipationType: req.body.eventParticipationType,
        whatsappLink: req.body.whatsappLink,
        ePrizeWorth: req.body.ePrizeWorth,
        driveLink: req.body.driveLink,
        eventMode: req.body.eventMode,
        //  eventPhoto: req.body.eventPhoto
      },
    };
    const event = new Event(payLoad);
    event.save((err) => {
      if (err) {
        console.log("Event can't save to db", err);
        return res.status(400).json({
          isError: true,
          title: "Error",
          message: err,
        });
      } else {
        console.log("Event registered to db");
        return res.status(200).send({
          title: "Success",
          message: "Saved",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      isError: true,
      title: "Error",
      message: err,
    });
  }
}

export function getAllEvents(req, res) {
  Event.find()
    .populate("studentCoordinator", ["coordinatorName", "coordinatorEmail"])
    .exec((err, e) => {
      if (err || !e) {
        return res.status(208).json(failAction(err));
      }
      return res.status(200).json({
        events: e,
      });
    });
}

export function getByDomain(req, res) {
  const form = new multiparty.Form();
  form.parse(req, (err, fields) => {
    let missingFields = [];
    const requiredFields = ["domainId"];
    requiredFields.forEach((val) => {
      if (!fields.hasOwnProperty(val)) missingFields += val;
    });
    if (missingFields.length != 0) {
      return res.status(500).json({
        error: "Not found: " + missingFields,
      });
    }
    Event.find({ domainId: fields.domainId[0] })
      .populate("studentCoordinator", [
        "coordinatorName",
        "coordinatorPhone",
        "eventPhoto",
      ])
      .exec((err, d) => {
        if (err || !d) {
          return res.status(404).json({
            error: "Not found",
          });
        }

        return res.status(200).json({
          data: d,
        });
      });
  });
}

export async function deleteEvent(req, res) {
  const event = await Event.findOneAndDelete({ _id: req.body.id });
  if (!event) {
    return res.status(404).json({
      isError: true,
      title: "Error",
      message: "Event not found!",
    });
  }
  res.status(200).json({
    isError: false,
    title: "Success",
    message: "Event deleted!",
  });
}

export async function modifyEvent(req, res) {
  if (Object.keys(req.body).length === 0) {
    console.log("No data to update");
    return res.status(208).send({
      isError: true,
      title: "Error",
      message: "No data to update",
    });
  }
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  if (req.body.eventName) {
    event.eventName = req.body.eventName;
  }
  if (req.body.eventDescription) {
    event.eventDescription = req.body.eventDescription;
  }
  if (req.body.studentCoordinator) {
    event.studentCoordinator = req.body.studentCoordinator;
  }
  if (req.body.startDate) {
    event.startDate = req.body.startDate;
  }
  if (req.body.eventVenue) {
    event.venue = req.body.eventVenue;
  }
  if (req.body.eventParticipationType) {
    event.eventParticipationType = req.body.eventParticipationType;
  }
  if (req.body.whatsappLink) {
    event.whatsappLink = req.body.whatsappLink;
  }
  if (req.body.ePrizeWorth) {
    event.ePrizeWorth = req.body.ePrizeWorth;
  }
  if (req.body.driveLink) {
    event.driveLink = req.body.driveLink;
  }
  if (req.body.eventMode) {
    event.eventMode = req.body.eventMode;
  }
  if (req.body.domainName) {
    event.domainName = req.body.domainName;
  }
  event.save((err) => {
    if (err) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: err,
      });
    } else {
      return res.status(200).send({
        isError: false,
        title: "Success",
        message: "Event updated",
      });
    }
  });


}

const getEventByName = async (req, res) => {
  Event.findOne({ eventName: req.body.eventName }).exec((err, event) => {
    if (err || !event) {
      return res.status(208).json({ isError: true, message: err });
    }
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, id: event._id });
  });
};

const getEventByDomainName = async (req, res) => {
  const domainName = req.body.domainName;
  Event.find({ domainName: domainName.toLowerCase() })
    .populate("studentCoordinator")
    .exec((err, event) => {
      if (err || !event) {
        return res.status(208).json({ isError: true, message: err });
      } else {
        return res
          .status(200)
          .send({ isError: false, isSuccess: true, event: event });
      }
    });
};

const getEventByDomain = async (req, res) => {
  const domainName = req.body.domainName;
  Event.find({ domainName: domainName.toLowerCase() })
    .populate("studentCoordinator")
    .exec((err, event) => {
      if (err || !event) {
        return res.status(208).json({ isError: true, message: err });
      } else {
        return res
          .status(200)
          .send({ isError: false, isSuccess: true, event: event });
      }
    });
};

const getEventById = (req, res) => {
  const eventId = req.params.id;
  Event.findById(eventId)
    .populate("individual", ['name', 'email', 'phone', 'branch'])
    .populate('teams')
    .populate('teams.leaderId', ['email', 'phone'])
    .exec((err, event) => {
      if (err || !event) {
        return res.status(208).json({ isError: true, message: err });
      } else {
        console.log(event.user)
        return res
          .status(200)
          .send({ isError: false, isSuccess: true, event: event, user: event.user});
      }
    });
};

const toggleRegistration = async (req, res) => {
  const eventId = req.body.id;
  const event = await Event.findById(eventId);
  event.registrationLive = !event.registrationLive;
  let msg;
  if(event.registrationLive) {
    msg = 'Open';
  } else {
    msg = 'Closed';
  }
  await event.save();
  return res.status(200).json({ isError: false, isSuccess: true, message: `Registration ${msg}` });
}

export { getEventByName, getEventByDomainName, getEventByDomain, getEventById, toggleRegistration };
