const { validationResult } = require('express-validator');
const { responseHandler, asyncHandler } = require('../helpers');
const { votesService } = require('../services');

exports.getUserVote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.user;
        const { target_type, target_id } = req.params;
        await votesService.retrieve(target_type, target_id, id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            // console.log(data.vote_score);
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
})

exports.getAllVotes = asyncHandler(async (req, res) => {
    try {
        const { target_type, target_id } = req.params;
        await votesService.retrieveAll(target_type, target_id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log("err");
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
})

exports.addVote = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
        const { id } = req.user;
        const { target_type, target_id } = req.params;
        const { score } = req.body;
        
        await votesService.add(target_type, target_id, id, score, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
})

exports.deleteVote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.user;
        const {target_type, target_id } = req.params;
        
        await votesService.remove(target_type, target_id, id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
})


