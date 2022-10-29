jest.mock("./model");
const model = require("./model");

jest.mock("./service");
const service = require("./service");

const addBidMock = jest.fn();
const addPetMock = jest.fn();
const getBidsMock = jest.fn();
const getPetMock = jest.fn();

model.addBid = addBidMock;
model.addPet = addPetMock;
model.getBids = getBidsMock;
model.getPet = getPetMock;

const petExistsMock = jest.fn();
const isOwnerMock = jest.fn();
const getBidWinnersMock = jest.fn();

service.getBidWinners = getBidWinnersMock;
service.isOwner = isOwnerMock;
service.petExists = petExistsMock;

const {
  addUserBid,
  addPet,
  listBids,
  getAuctionResult,
} = require("./controller");

describe("Pet Store Controller", () => {
  const petId = "test pet";
  const owner = "owner1";
  describe("when adding pets", () => {
    beforeEach(() => {
      petExistsMock.mockReturnValueOnce(
        new Promise((resolve) => resolve(true))
      );
      isOwnerMock.mockReturnValueOnce(new Promise((resolve) => resolve(false)));
      getBidsMock.mockReturnValueOnce(
        new Promise((resolve) => resolve(undefined))
      );
    });
    it("should return false if pet already exists", async () => {
      const result = await addPet({ petId, owner });
      expect(result).toBe(false);
    });
  });

  describe("when adding bids", () => {
    it("should return false if pet does not exist", async () => {
      const result = await addUserBid({
        name: "mohamed",
        petId: "testPet",
        amount: 11,
      });

      expect(result).toBe(false);
    });
  });

  describe("when listing bids", () => {
    it("should return false when request is not the owner", async () => {
      const result = await listBids("notOwner@notOwner.com", "testPet");
      expect(result).toBe(undefined);
    });
  });

  describe("When getting auction result", () => {
    it("should return no winners when there are no bids on pet", async () => {
      const result = await getAuctionResult("testPet");
      expect(result).toBe("no Winners");
    });
  });
});
