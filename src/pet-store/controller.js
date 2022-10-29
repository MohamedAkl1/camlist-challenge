const { addBid, addPet: addPetToModel, getBids } = require("./model");
const { petExists, isOwner, getBidWinners } = require("./service");

const addUserBid = async ({ name, petId, amount }) => {
  if (await petExists(petId)) return await addBid(name, petId, amount);
  else {
    return false;
  }
};

const addPet = async ({ owner, petId }) => {
  if (await petExists(petId)) {
    return false;
  }
  return await addPetToModel(owner, petId);
};

const listBids = async ({ email, petId }) => {
  if (await isOwner(email, petId)) {
    return await getBids(petId);
  } else {
    return undefined;
  }
};

const getAuctionResult = async (petId) => {
  const bids = await getBids(petId);
  return calculateWinners(bids);
};

const getAuctionWinners = (bids) => calculateWinners(bids);

const calculateWinners = (bids) => {
  if (bids && bids.length > 0) {
    winners = getBidWinners(bids);
  } else {
    winners = "no Winners";
  }
  return winners;
};

module.exports = {
  getAuctionWinners,
  getAuctionResult,
  listBids,
  addPet,
  addUserBid,
};
