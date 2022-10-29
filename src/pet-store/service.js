const { getPet } = require("./model");
const { sortBids } = require("../lib/helper");

const petExists = async (petId) => {
  const pet = await getPet(petId);
  if (pet) return true;
  return false;
};

const isOwner = async (email, petId) => {
  const owner = await getPet(petId);
  return email === owner;
};

const getBidWinners = (bids) => {
  bids = sortBids(bids);
  for (let index = 1; index < bids.length; index++) {
    bids[index - 1].amount = bids[index].amount;
    bids[index].amount = "lost";
  }
  return bids;
};

module.exports = {
  petExists,
  isOwner,
  getBidWinners,
};
