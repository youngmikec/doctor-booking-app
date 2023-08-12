import clinicService from "./../services/clinicService.js";

let getInfoClinicById = async (req, res) => {
    try {
        let clinic = await clinicService.getClinicById(req.body.id);
        return res.status(200).json({
            message: 'get info clinic successful',
            clinic: clinic
        })
    } catch (e) {
        return res.status(500).json(e);
    }
};

const clinic = {
    getInfoClinicById: getInfoClinicById
};

module.exports = clinic;
