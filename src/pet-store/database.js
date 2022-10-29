module.exports = (
  persistence = {
    bids: {},
    pets: {},
  }
) => {
  const bidsObject = persistence["bids"];
  const petsObject = persistence["pets"];

  const addBid = async (name, petId, amount) => {
    const bidItem = { name, amount };
    if (bidsObject[petId]) {
      const found = bidsObject[petId].find((o, i) => {
        if (o.name === name) {
          bidsObject[petId][i] = bidItem;
          return true;
        }
      });
      if (!found) bidsObject[petId] = [...bidsObject[petId], bidItem];
    } else {
      bidsObject[petId] = [bidItem];
    }
    console.log("Added bid, persistence is now: %j", persistence);

    return await new Promise((resolve) => resolve(true));
  };

  const getBid = async (name, petId) => {
    return await new Promise((resolve) =>
      resolve(bidsObject[petId].find((i) => i.name === name))
    );
  };

  const addPet = async (email, petId) => {
    petsObject[petId] = email;
    console.log("Added pet, persistence is now: %j", persistence);
    return await new Promise((resolve) => resolve(true));
  };

  const getPet = async (petId) => {
    if (petsObject[petId]) {
      return await new Promise((resolve) => resolve(petsObject[petId]));
    } else {
      return await new Promise((resolve) => resolve(undefined));
    }
  };

  const getBids = async (petId) => {
    return await new Promise((resolve) => resolve(bidsObject[petId]));
  };

  return {
    addBid,
    addPet,
    getPet,
    getBids,
    getBid,
  };
};
