module.exports = {
    success: (req, res, data) => {
        return res.status(200).json(data)
    },
    successWrite: (req, res, data) => {
        return res.status(201).json(data)
    },
    error: (req, res, data) => {
        return res.status(500).json(data);
    }
}