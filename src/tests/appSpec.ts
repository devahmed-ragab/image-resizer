import myApp from "../app";

describe("test jasmine config...", () => {
  it("should not return a number", () => {
    console.log(typeof myApp());
    expect(myApp()).not.toBeNaN();
  });
});
