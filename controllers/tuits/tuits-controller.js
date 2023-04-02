import posts from "./tuits.js";
let tuits = posts;

// function invoked if URL matches pattern
// extract new tuit from BODY in request
// add an _id property with unique timestamp
// append new tuit to tuits array
// respond with new tuit to client
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}

// function called if URL matches pattern
// get tid from request parameter map
// find tuit in users array whose _id
// matches tuitId retrieved from params
// respond to client with tuit found
const findTuits  = (req, res) => {
    res.json(tuits);
}

// handle PUT /api/users/:uid
// get tuit ID from path
// BODY includes updated fields
// create a new array of tuits
// if current tuit's ID matches ID we want to update
// merge old tuit with new updates
// otherwise keep the old tuit
const updateTuit = (req, res) => {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

// get tuit ID from path parameter tid
// filter out the tuit
// respond with success code
const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter(t =>
    t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

