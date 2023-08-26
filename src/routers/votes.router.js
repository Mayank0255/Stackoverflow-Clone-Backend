const express = require('express');
const { auth } = require('../middleware');
const { votesController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/votes/:target_type/:target_id
 *  @desc       fetch all votes to a particular posts or answer
 */ 

router.route('/all/:target_type/:target_id')
    .get(votesController.getAllVotes);

    
/** @route      GET ,POST, DELETE /api/votes/:target_type/:target_id/:user_id
 *  @desc       fetch,delete,update/add vote of user's vote of post or an answer ,
 *              target_type="posts/answer" target_id=id of posts/answers
 */

router.route('/:target_type/:target_id/')
    .get(auth,votesController.getUserVote)
    .post(auth,votesController.addVote)
    .delete(auth, votesController.deleteVote)


module.exports = router;
