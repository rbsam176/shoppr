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

    function insertRowData(tableName, itemQuantity, itemName){
        $(tableName).append(`
        <tr class="table-row">
            <td class="quantity-field px-4 red-line">${itemQuantity}</td>
            <td class="item-field w-75">${itemName}</td>
            <td><button class="favourite-field"><i class="far fa-star"></i></button></td>
            <td><button class="remove-field"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        `);
    }

    items = [];

    function captureInput(location, tableName){
        $(location).on("click", function() {
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
                insertRowData(tableName, itemInput.itemQuantity, itemInput.itemName);
            }
        });
    };

    captureInput(".fruitveg", "#fruit-veg-table");
    captureInput(".frontshelves", "#front-shelves-table");
    captureInput(".fridges", "#fridges-table");
    captureInput(".freezers", "#freezers-table");
    captureInput(".middleshelves", "#middle-shelves-table");
    captureInput(".endshelves", "#end-shelves-table");

    // Source: https://stackoverflow.com/a/171293
    function removeRow(tableName){
        $(tableName).on("click", ".remove-field", function() {
            var removedItemName = $(this).closest("tr").find(".item-field").text();
            items.splice(items.findIndex(x => x.itemName === removedItemName),1);
            $(this).closest("tr").remove();
            console.log(`Removed ${removedItemName} from array`);
        });
    }

    removeRow("#fruit-veg-table");
    removeRow("#front-shelves-table");
    removeRow("#fridges-table");
    removeRow("#freezers-table");
    removeRow("#middle-shelves-table");
    removeRow("#end-shelves-table");

    // function addFavourite(tableName){
    //     $(tableName).on("click", ".favourite-field", function() {
    //         var favouriteItemName = $(this).closest("tr").find(".item-field").text();
    //         var itemIndex = items.findIndex(x => x.itemName === favouriteItemName);
    //         items[itemIndex].itemFavourite = true;
    //         $(this).closest(".favourite-field").addClass("favourite-enable");
    //         console.log(`Added ${favouriteItemName} to favourites`);
    //     })
    // }

    function toggleFavourite(tableName){
        $(tableName).on("click", ".favourite-field", function() {
            var favouriteItemName = $(this).closest("tr").find(".item-field").text();
            var itemIndex = items.findIndex(x => x.itemName === favouriteItemName);
            $(this).closest(".favourite-field").toggleClass("favourite-enable");
            if (items[itemIndex].itemFavourite != true) {
                items[itemIndex].itemFavourite = true;
                console.log("favourite status is " + items[itemIndex].itemFavourite);
            } else {
                items[itemIndex].itemFavourite = false;
                console.log("favourite status is " + items[itemIndex].itemFavourite);
            }
        })
    }

    toggleFavourite("#fruit-veg-table");
    toggleFavourite("#front-shelves-table");
    toggleFavourite("#fridges-table");
    toggleFavourite("#freezers-table");
    toggleFavourite("#middle-shelves-table");
    toggleFavourite("#end-shelves-table");

    


});

