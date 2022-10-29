const sortBids = (bids) => {
  bids.sort((a, b) => b.amount - a.amount || a.email.localeCompare(b.email));
  return bids;
};

module.exports = {
  sortBids,
};
