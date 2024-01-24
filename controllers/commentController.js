const { userModel, taskModel, commentModel } = require('../models');

function newComment(dateAdded, text, commentType, taskId, userId, reminderDate) {
    return commentModel.create({ dateAdded,text, commentType, taskId, userId, reminderDate })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id }, $addToSet: { tasks: taskId } }),
                taskModel.findByIdAndUpdate({ _id: taskId }, { $push: { comments: comment._id }, $addToSet: { assignedTo: userId } }, { new: true })
            ])
        })
}

function getLatestsComments(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    commentModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('commentId userId')
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(next);
}

function createComment(req, res, next) {
    const { taskId } = req.params;
    const { _id: userId } = req.user;
    const { dateAdded, text, commentType, reminderDate } = req.body;

    newComment(dateAdded, text, commentType, reminderDate, userId, taskId)
        .then(([_, updatedTask]) => res.status(200).json(updatedTask))
        .catch(next);
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { dateAdded, text, commentType, reminderDate } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel.findOneAndUpdate({ _id: commentId, userId }, 
        { dateAdded: dateAdded, text: text, commentType: commentType, reminderDate : reminderDate }, { new: true })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteComment(req, res, next) {
    const { commentId, taskId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        commentModel.findOneAndDelete({ _id: commentId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { comments: commentId } }),
        taskModel.findOneAndUpdate({ _id: themeId }, { $pull: { comments: commentId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    newComment,
    getLatestsComments,
    createComment,
    editComment,
    deleteComment,
}