const Joi = require("joi");

module.exports = {
  userBid: {
    name: Joi.string().required(),
    petId: Joi.string(),
    amount: Joi.number().min(0).required(),
  },
  addPet: {
    owner: Joi.string().email().required(),
    petId: Joi.string(),
  },
  listBids: {
    email: Joi.string().email().required(),
    petId: Joi.string(),
  },
};
