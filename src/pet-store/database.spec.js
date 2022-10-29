const createDatabase = require("./database");

describe("Pet store database", () => {
  describe("Add bid", () => {
    const db = createDatabase();

    it("should return true when adding a bid", async () => {
      const result = await db.addBid("test user", "1", 11);
      expect(result).toBe(true);
    });
  });

  describe("Overwrite bid from existing user", () => {
    const db = createDatabase({
      bids: {
        test: [{ name: "existing user", amount: 100 }],
      },
    });

    it("should overwrite existing value of bid", async () => {
      await db.addBid("existing user", "test", 300);
      expect(await db.getBid("existing user", "test")).toStrictEqual({
        name: "existing user",
        amount: 300,
      });
    });
  });

  describe("get pet test", () => {
    const db = createDatabase({
      pets: {
        testPet: "owner1",
      },
    });

    it("should return pet owner", async () => {
      const result = await db.getPet("testPet");
      expect(result).toBe("owner1");
    });

    it("should return undefined if pet doesn't exist", async () => {
      const result = await db.getPet("undefined pet");
      expect(result).toBe(undefined);
    });
  });

  describe("get bids test", () => {
    const db = createDatabase({
      bids: {
        testPet: [
          {
            name: "John Doe",
            amount: 100,
          },
          {
            name: "John Smith",
            amount: 500,
          },
        ],
      },
    });

    it("should return pet bids if exist", async () => {
      const result = await db.getBids("testPet");
      expect(result).toStrictEqual([
        {
          name: "John Doe",
          amount: 100,
        },
        {
          name: "John Smith",
          amount: 500,
        },
      ]);
    });

    it("should return undefined if no pet bids exist", async () => {
      const result = await db.getBids("undefined pet bid");
      expect(result).toBe(undefined);
    });
  });
});
