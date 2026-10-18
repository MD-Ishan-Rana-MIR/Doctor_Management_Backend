const patientModel = require("../../model/patientModel");

const createPatient = async (req, res) => {
    try {

        const { name, age, gender, condition, doctorId, phone } = req.body;
        if (!phone) {
            return res.status(400).json({
                status: "fail",
                msg: "Phone number required."
            })
        }
        const payload = {
            name, age, gender, condition, doctorId, phone
        };
        const data = await patientModel.create(payload);
        return res.status(201).json({
            status:"success",
            msg : "Patient create successfully",
            data : data
        })

    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : "Something went wrong."
        })
    }
};



module.exports = {
    createPatient
}