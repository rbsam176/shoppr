// DOES THE COUNTER INCREASE?
describe("increaseQuantity", function() {
        it("should return 11", function(){
            expect(increaseQuantity(10)).toBe(11);
        })
    });

// DOES THE COUNTER DECREASE?
describe("decreaseQuantity", function() {
    it("should return 9", function(){
        expect(decreaseQuantity(10)).toBe(9);
    })
});

// DOES IT RETURN THE QUANTITY?
// Source: https://stackoverflow.com/a/21269332
describe("checkQuantity", function() {
    it("should return a number", function(){
        expect(quantity).toEqual(jasmine.any(Number));
    })
});



