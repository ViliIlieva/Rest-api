const express = require('express');
const { userModel, themeModel, postModel } = require('../models');

function newTask(taskName, createdDate, requiredDate, taskText, status, taskType, nextActionDate, userId) {
    return taskModel.create({ taskName, createdDate, requiredDate, taskText, status, taskType, nextActionDate, userId })
        .then(task => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, 
                    { $push: { tasks: task._id }, $addToSet: { tasks: taskId } }),
                taskModel.findByIdAndUpdate({ _id: taskId }, { $push: { tasks: task._id }, $addToSet:
                     { assignedTo: userId } },
                     { new: true })
            ])
        })
}

function getTasks(req, res, next) {
    taskModel.find()
        .populate('userId')
        .then(tasks => res.json(tasks))
        .catch(next);
}

function getTask(req, res, next) {
    const { taskId } = req.params;

    taskModel.findById(taskId)
        .populate({
            path : 'assignedTo',
            populate : {
              path : 'userId'
            }
          })
        .then(task => res.json(task))
        .catch(next);
}

function createTask(req, res, next) {
    const {taskName} = req.body.taskName;
    const {createdDate} = req.body.createdDate;
    const {requiredDate} = req.body.requiredDate;
    const {taskText} = req.body.description;
    const {status} = req.body.status;
    const {taskType} = req.body.taskType;
    const {nextActionDate} = req.body.nextActionDate;
    const { _id: userId } = req.user;

    newTask(taskName, userId, createdDate, requiredDate, taskText, status, taskType, nextActionDate)
    .catch(next);
}

function editTask(req, res, next) {
    const { taskId } = req.params;
    const {taskName} = req.body.taskName;
    const {createdDate} = req.body.createdDate;
    const {requiredDate} = req.body.requiredDate;
    const {description} = req.body.description;
    const {status} = req.body.status;
    const {taskType} = req.body.taskType;
    const {nextActionDate} = req.body.nextActionDate;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the task, the task will not be updated
    taskModel.findOneAndUpdate({ _id: taskId, userId }, 
        { taskName: taskName, createdDate: createdDate, requiredDate: requiredDate,
            description: description, status: status, taskType: taskType, nextActionDate: nextActionDate}, 
        { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    newTask,
    getTasks,
    getTask,
    createTask,
    editTask,
}