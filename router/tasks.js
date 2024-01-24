const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { taskController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', taskController.getTasks);
router.post('/', auth(), taskController.createTask);

router.get('/:taskId', taskController.getTask);
router.post('/:taskId', auth(), commentController.createComment);
router.put('/:taskId', auth(), taskController.subscribe);
router.put('/:taskId/comments/:commentId', auth(), commentController.editComment);
router.delete('/:taskId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router