// const express = require('express');
// const app = express();
// // const localStorage = require('local-storage');

// const{mongoose} = require('./index');

// app.use(express.json());

// //CORS HEADERS MIDDLEWARE
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// //Load in the mongoose models
// const {Task} = require('./db/models/task.model');
// const {Comment} = require('./db/models/comment.model');
// const {User} = require('./db/models/userModel');


// /**
//  * GET/tasks
//  * Get all tasks
//  * */
// app.get('/tasks', (req, res) => {
//     Task.find().then((tasks) => {
//         res.send(tasks);
//     }).catch((e) => {
//         res.send(e);
//     });

//     const username = 'testUser';
//     const password = 'test';
//     User.findOne().then((user) => {
//             if(user === null){
//                 const testUser = new User({username, password});
//                 testUser.save() 
//             }  
//             // res.send('Hello!' + username); 
//     })
// });

// app.post('/tasks', (req, res) => { 
//     let createdDate = req.body.createdDate;
//     let requiredDate = req.body.requiredDate;
//     let description = req.body.description;
//     let status = req.body.status;
//     let taskType = req.body.taskType;
//     let nextActionDate = req.body.nextActionDate;

//     let newTask = new Task({
//         createdDate, requiredDate, description, status, taskType, nextActionDate
//     });
//     newTask.save().then((taskDoc) => {
//         res.send(taskDoc);
//     })
// });

// /**
//  * GET/tasks/:taskId/comments
//  * Get all comments with id task
//  */
// app.get('/tasks/:taskId/comments', (req, res) => {
//     //We wont to return an array of all the coments in one task in DB
//     Comment.find({
//         _taskId: req.params.taskId
//     }).then((coments) => {
//         res.send(coments);
//     });
// })

// /**
//  * POST/tasks/:taskId/comments
//  * Create comment
//  */
// app.post('/tasks/:taskId/comments', (req, res) => {
//     //we wont to creare new coment and return list of coments back which includes id
//     //The list information (fields) will be parssed in via JSON request body
//     let dateAdded = req.body.dateAdded;
//     let text = req.body.text;
//     let commentType = req.body.commentType;
//     let reminderDate = req.body.reminderDate;


//     let newComment = new Comment({
//         dateAdded, text, commentType, reminderDate,
//          _taskId: req.params.taskId
//     });
//     newComment.save().then((commentDoc) => {
//         res.send(commentDoc);
//     })
// })

// /**
//  * PATCH/comments/:commentId
//  * Update existing comment
//  */
// app.patch('/comments/:commentId', (req, res) => {
//     //we wont to update an existing comment
//     Comment.findOneAndUpdate({
//         _id: req.params.commentId},{
//         $set: req.body
//     }).then(() => {
//         res.sendStatus(200);
//     });
// })

// /**
//  * DELETE/comments/:id
//  * Delete comment
//  */
// app.delete('/comments/:id', (req, res) => {
//     Comment.findOneAndDelete({
//         _id: req.params.id
//     }).then((removedCommentDoc) => {
//         res.send(removedCommentDoc);
//     })
// })


// app.get('/tasks/:taskId/comments', (req, res) => {
//     //We wont to return an array of all the coments in one task in DB
//     Comment.find({
//         _taskId: req.params.taskId
//     }).then((coments) => {
//         res.send(coments);
//     });
// })
// /**
//  * GET/tasks/:taskId/comments/by-date
//  */
// app.get('/tasks/:taskId/comments/by-date', (req, res) => {
//     //We wont to return an array of all the coments by date in one task
//     Comment.find({
//         _taskId: req.params.taskId
//     }).then((coments) => {
//         res.send(coments);
//     });
// })

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// })

