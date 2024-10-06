// our quick and dirty event bus implementation
//  it is for demonstration purpose only

// when we get a post request forward it to all services which are known

const express = require('express');
const axios = require('axios');

const app = express();

const events = [];
// required to handle the request body
app.use(express.json());


app.post('/events', async(req, res) => {
    const event = req.body;

    axios.post('....', event); //this is the post service
    axios.post('....', event); //this is the comment service
    axios.post('....', event); //this is the query service
    res.send({status: 'ok event rec. and forwarded'});
    console.log("post request on event bus rec.",event);
});
app.get('/events', (req, res) => {
  console.log("get request", events);
  res.send(events);
});

app.listen(4005, () => {
    console.log('Listening to 4005');
});