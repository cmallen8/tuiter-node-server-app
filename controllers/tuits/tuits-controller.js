import * as tuitsDao from '../tuits/tuits-dao.js'
import {updateTuits} from "../tuits/tuits-dao.js";

// function invoked if URL matches pattern
// extract new tuit from BODY in request
// add an _id property with unique timestamp
// append new tuit to tuits array
// respond with new tuit to client
const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.dislikes = 0;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao.createTuits(newTuit);
    res.json(insertedTuit);
}

// function called if URL matches pattern
// get tid from request parameter map
// find tuit in users array whose _id
// matches tuitId retrieved from params
// respond to client with tuit found
const findTuits  = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}

const findTuitById = (req, res) => {
    const tuitId = req.params.tuitId;
    const tuit = tuits.find((tuit) => tuit._id === tuitId);
    if (tuit) {
        res.json(tuit);
    } else {
        res.sendStatus(404);
    }
};

// handle PUT /api/users/:uid
// get tuit ID from path
// BODY includes updated fields
// create a new array of tuits
// if current tuit's ID matches ID we want to update
// merge old tuit with new updates
// otherwise keep the old tuit
const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
        .updateTuits(tuitIdToUpdate, updates);
    res.json(status);
}

// get tuit ID from path parameter tid
// filter out the tuit
// respond with success code
const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuits(tuitdIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.get('/api/:tid', findTuitById);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

