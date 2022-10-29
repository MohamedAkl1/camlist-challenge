const db = require("./database")();

const addBid = async (name, petId, amount) =>
  await db.addBid(name, petId, amount);

const addPet = async (email, petId) => await db.addPet(email, petId);

const getPet = async (petId) => await db.getPet(petId);

const getBids = async (petId) => await db.getBids(petId);

module.exports = {
  addBid,
  addPet,
  getPet,
  getBids,
};
