import tuitsModel from "./tuits-model.js";

export const findTuits = () => tuitsModel.find();
export const findTuitById = async (id) => {
    const tuit = await tuitsModel.findById(id);
    return tuit;
};
export const createTuits = (tuit) => tuitsModel.create(tuit);
export const deleteTuits = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuits = (tid, tuit) => tuitsModel.updateOne({_id: tid}, {$set: tuit})