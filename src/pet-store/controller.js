const { addBid, addPet: addPetToModel, getBids } = require("./model");
const { petExists, isOwner, getBidWinners } = require("./service");

//adds user bid only if the pet exists.
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

//list all bids on specific pet if the user is the owner of the pet
const listBids = async ({ email, petId }) => {
  if (await isOwner(email, petId)) {
    return await getBids(petId);
  } else {
    return undefined;
  }
};

//gets auction result if there are bids or the pet exists, otherwise it returns "no Winners"
const getAuctionResult = async (petId) => {
  const bids = await getBids(petId);
  return calculateWinners(bids);
};

//gets bids from the request and runs the script to calculate the winner
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
