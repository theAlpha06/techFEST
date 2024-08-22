import Workshop from "../models/workshop.js";

const createWorkshop = (req, res) => {
    const file = req.file.filename;
    try {
    
        const payLoad = {
            ... {
                workshopName: req.body.workshopName,
                workshopDescription: req.body.workshopDescription,
                workshopPhoto: `${file}`,
                studentCoordinator: req.body.domainCoor1,
                workshopVenue: req.body.workshopVenue,
                workshopTime: req.body.workshopTime,
                whatsappLink: req.body.whatsappLink,
                workshopDate: req.body.workshopDate,
                domainName: req.body.domainName,
                workshopMode: req.body.workshopMode,
                profName: req.body.profName,
                profDesignation: req.body.profDesignation,
            }
        }
        const workshop = new Workshop(payLoad);
        workshop.save((err) => {
            if (err) {
                console.log("workshop can't save to db!", err);
                return res.status(400).json({
                    isError: true,
                    title: "Error",
                    message: err,
                });
            } else {
                return res.status(200).send({
                    title: "Success",
                    message: "Saved",
                })
            }
        })
    } catch (error) {
        return res.status(201).json({
            isError: true,
            title: 'Error',
            message: error
        })
    }
};

const  getAllWorkshop = (req, res) => {

    try {
        Workshop.find({}, (err, workshops) => {
            if (err) {
                return res.status(400).json({
                    isError: true,
                    title: "Error",
                    message: err,
                });
            } else {
                return res.status(200).send({
                    title: "Success",
                    message: "Saved",
                    workshops: workshops
                })
            }
        })
    } catch (error) {
        return res.status(201).json({
            isError: true,
            title: 'Error',
            message: error
        })
    }
}

const getWorkshopById = (req, res) => {
    const workshopId = req.params.id;
    Workshop.findById(workshopId)
        .populate('user')
        .exec((err, workshop) => {
            if (err) {
                console.log("workshop can't get from db!", err);
                return res.status(400).json({
                    isError: true,
                    title: "Error",
                    message: err,
                });
            } else {
                return res.status(200).send({
                    title: "Success",
                    workshop: workshop,
                    user: workshop.user
                })
            }
        });
}

const toggleRegistration = async (req, res) => {
    const workshopId = req.body.id;
    const workshop = await Workshop.findById(workshopId);
    workshop.registrationLive = !workshop.registrationLive;
    let msg;
    if(workshop.registrationLive) {
      msg = 'Open';
    } else {
      msg = 'Closed';
    }
    await workshop.save();
    return res.status(200).json({ isError: false, isSuccess: true, message: `Registration ${msg}` });
  }

export { createWorkshop, getAllWorkshop, getWorkshopById, toggleRegistration};
