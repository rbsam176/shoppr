$(document).ready(function() {
    function increaseQuantity(quantity){
        return quantity + 1;
    }

    function decreaseQuantity(quantity){
        return quantity - 1;
    }

    function checkQuantity(){
        quantity = parseInt($("#quantity-counter").text());
        return (quantity);
    }

    $("#plus-button").on("click", function() {
        checkQuantity();
        if (checkQuantity() < 10){
            $("#quantity-counter").text(increaseQuantity(quantity));
        }
    });

    $("#minus-button").on("click", function() {
        checkQuantity();
        if (checkQuantity() > 1){
            $("#quantity-counter").text(decreaseQuantity(quantity));
        }
    });

    $("#create-button").on("click", function() {
        var itemInput = {
            itemName: $("#item-name").val(),
            itemQuantity: $("#quantity-counter").text(),
          };
        alert(itemInput.itemName);
        alert(itemInput.itemQuantity);
    });

    $(".addItem").on("click", function() {
        var itemInput = {
            itemName: $("#item-name").val(),
            itemQuantity: $("#quantity-counter").text(),
            itemLocation: $(this).text()
          };
        alert(itemInput.itemName);
        alert(itemInput.itemQuantity);
        alert(itemInput.itemLocation);
    });


});

