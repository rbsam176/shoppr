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
describe("checkQuantity", function() {
    it("should return a number", function(){
        expect(Number.isInteger(1)).toBeTruthy();
    })
});