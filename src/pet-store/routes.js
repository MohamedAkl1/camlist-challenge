const AsyncRouter = require("express-async-router").AsyncRouter;
const router = AsyncRouter();
const jsonParser = require("body-parser").json();
const schema = require("./schema");
const deserialize = require("../lib/middleware/to-camel-case");
const schemaValidator = require("../lib/middleware/schema-validator");
const {
  addUserBid,
  addPet,
  listBids,
  getAuctionResult,
  getAuctionWinners,
} = require("./controller");

router.use(jsonParser);
router.use(deserialize);

router.post("/userBid", schemaValidator(schema.userBid), async (req, res) => {
  const bidRequest = req.body;
  const result = await addUserBid(bidRequest);
  return res.status(result ? 200 : 400).json(result);
});

router.post("/addPet", schemaValidator(schema.addPet), async (req, res) => {
  const addPetRequest = req.body;
  const result = await addPet(addPetRequest);
  return res.status(result ? 200 : 400).json(result);
});

router.post("/listBids", schemaValidator(schema.listBids), async (req, res) => {
  const listBidsRequest = req.body;
  const result = await listBids(listBidsRequest);
  console.log(result);
  return res.status(result ? 200 : 400).json(result);
});

router.get("/getAuctionResult", async (req, res) => {
  const petId = req.query.petId;
  const result = await getAuctionResult(petId);
  return res.status(200).json(result);
});

router.post("/calculateAuctionWinners", async (req, res) => {
  const bids = req.body;
  const result = await getAuctionWinners(bids);
  return res.status(200).json(result);
});

module.exports = router;
