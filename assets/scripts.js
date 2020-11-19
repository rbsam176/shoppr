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

    function resetInput(){
        $("#quantity-counter").text("1");
        $("#item-name").val('');
    }

    function insertRowData(itemQuantity, itemName){
        $("table").append(`
        <tr class="table-row">
            <td class="quantity-field red-line">${itemQuantity}</td>
            <td class="item-field">${itemName}</td>
            <td> <button class="favourite-field"><i class="far fa-star"></i></button></td>
            <td><button class="remove-field"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        `);
    }

    let items = [];

    $(".add-item").on("click", function() {
        var itemInput = {
            id: Date.now(),
            itemName: $("#item-name").val(),
            itemQuantity: $("#quantity-counter").text(),
            itemLocation: $(this).text(),
            itemFavourite: false
        };
        if (itemInput.itemName != ""){
            items.push(itemInput);
            resetInput();
            insertRowData(itemInput.itemQuantity, itemInput.itemName);
        }

        // alert(items[0]['itemName']);
    });

    // Source: https://stackoverflow.com/a/171293
    function removeRow(tableName){
        $(tableName).on("click", ".remove-field", function() {
            $(this).closest("tr").remove();
        });
    }

    removeRow("#table");

    function addFavourite(tableName){
        $(tableName).on("click", ".favourite-field", function() {
            var itemName = $(this).closest(".item-field").text();
            console.log("hello" + itemName);
            var itemIndex = items.findIndex(x => x.itemName === 'banana');
            console.log(items[itemIndex]);
            items[itemIndex].itemFavourite = true;
            console.log(items[itemIndex]);
            $(this).closest(".favourite-field").addClass("favourite-enable");
        })
    }

    addFavourite("#table");

    


});

