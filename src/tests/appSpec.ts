import myApp from "../app";

describe("first test ...", () => {
  it("should not return a number", () => {
    console.log(typeof myApp());
    expect(myApp()).toBeNaN();
  });
});
