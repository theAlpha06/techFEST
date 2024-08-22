import Sponser from "../models/sponser.js";

const createSponser = (req, res) => {
    try {
        const payLoad = {
            ... {
                sponserName: req.body.sponserName,
                sponserWebsite: req.body.sponserWebsite,
                sponserLogo: req.file.path,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        }
        const sponser = new Sponser(payLoad);
        sponser.save((err) => {
            if (err) {
                console.log("Sponser can't save to db", err);
                return res.status(400).json({
                    isError: true,
                    title: "Error",
                    message: err,
                });
            } else {
                console.log("Sponser registered to db");
                return res.status(200).send({
                    title: "Success",
                    message: "Saved"
                })
            }
        })
    } catch (error) {
        return res.status(201).json({
            isError: true,
            title: "Error",
            message: error
        })
    }
};

export {createSponser};