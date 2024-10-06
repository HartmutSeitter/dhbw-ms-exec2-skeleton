// The query service
//   we get a post request from the event bus and it could be from type PostCreated or CommentCreated
//   we will store the data in an array 
//     if it is a post request we will save the data under the id in the array
//     if it ia a comment request we the comment corresponding the the post id and under the comment id
// change history
// hs002 implement the event bus communication
//   when a new post is generated the post info will be sent via http req. to the eventbus service
//   listening on port 4005

const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());
// required to handle the request body
app.use(express.json());

const axios = require('axios');

const posts = {};

app.get('/posts',(req,res)=> {
    console.log(posts);
    res.send(posts);
});

app.post('/events', (req,res)=> {
    const {type, data} = req.body;

    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] ={id, title, comments: []}; 
    }
    if (type === 'CommentCreated') {
        const {id, content, postId} = data;

        const post = posts[postId];
        post.comments.push({id, content});
    }
    console.log("http post/events request received", posts);
    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
});