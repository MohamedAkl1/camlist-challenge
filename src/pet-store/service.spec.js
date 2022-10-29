const { getBidWinners } = require("./service");

describe("pet Store service", () => {
  it("should return correct auction results", () => {
    const input = [
      { name: "John Doe", amount: 100 },
      { name: "John Smith", amount: 500 },
      { name: "Sara Conor", amount: 280 },
      { name: "Martin Fowler", amount: 320 },
    ];
    expect(getBidWinners(input)).toStrictEqual([
      {
        name: "John Smith",
        amount: 320,
      },
      {
        name: "Martin Fowler",
        amount: 280,
      },
      {
        name: "Sara Conor",
        amount: 100,
      },
      {
        name: "John Doe",
        amount: "lost",
      },
    ]);
  });
});
