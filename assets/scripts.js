
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
        $("#quantity-counter").text(1);
        $("#item-name").val('');
    }

    function insertRowData(tableName, itemQuantity, itemName){
        $(tableName).prepend(`
        <tr class="table-row">
            <td class="red-line"><input type="checkbox"></td>
            <td class="quantity-field px-4"><span class="quantity-number">${itemQuantity}x</span></td>
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
                let collapseParent = $(tableName).parent().parent().parent();
                $(".collapse").not(collapseParent).collapse('hide');
                $(collapseParent).addClass('show');
                $(collapseParent).removeClass('hide');
            }
            changeBannerImg(location);
        });
    };

    function changeBannerImg(location){
        if (location == ".fruitveg") {
            $("#banner-img").css('background-image', 'url(' + "https://bit.ly/2H4Q3AU" + ')');
        }
        if (location == ".frontshelves") {
            $("#banner-img").css('background-image', 'url(' + "https://www.italianfoodexperts.com/wp-content/uploads/2017/11/Vera-pasta-italiana.jpg" + ')');
        }
        if (location == ".fridges") {
            $("#banner-img").css('background-image', 'url(' + "https://post.healthline.com/wp-content/uploads/2019/11/milk-soy-hemp-almond-non-dairy-1200x628-facebook.jpg" + ')');
        }
        if (location == ".freezers") {
            $("#banner-img").css('background-image', 'url(' + "https://post.healthline.com/wp-content/uploads/2020/09/green-peas-thumb-1-732x549.jpg" + ')');
        }
        if (location == ".middleshelves") {
            $("#banner-img").css('background-image', 'url(' + "https://res.cloudinary.com/grohealth/image/upload/$wpsize_!post-thumbnail!,w_1000,h_600,c_fill,g_auto/v1588092404/Low-Carb-Flour.png" + ')');
        }
        if (location == ".endshelves") {
            $("#banner-img").css('background-image', 'url(' + "https://www.thebrewery.co.uk/wp-content/uploads/2020/04/1280px-New_Orleans_Wine-1073x687-1.jpg" + ')');
        }
    }

    function openSections(){
        $("#open-sections").on("click", function() {
            $(".collapse").removeClass('hide');
            $(".collapse").addClass('show');
        });
    }

    // captureInput(".fruitveg", "#fruit-veg-table");
    // captureInput(".frontshelves", "#front-shelves-table");
    // captureInput(".fridges", "#fridges-table");
    // captureInput(".freezers", "#freezers-table");
    // captureInput(".middleshelves", "#middle-shelves-table");
    // captureInput(".endshelves", "#end-shelves-table");

    // Source: https://stackoverflow.com/a/171293
    function removeRow(tableName){
        $(tableName).on("click", ".remove-field", function() {
            var removedItemName = $(this).closest("tr").find(".item-field").text();
            items.splice(items.findIndex(x => x.itemName === removedItemName),1);
            $(this).closest("tr").remove();
            console.log(`Removed ${removedItemName} from array`);
        });
    }

    // removeRow("#fruit-veg-table");
    // removeRow("#front-shelves-table");
    // removeRow("#fridges-table");
    // removeRow("#freezers-table");
    // removeRow("#middle-shelves-table");
    // removeRow("#end-shelves-table");

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

    // toggleFavourite("#fruit-veg-table");
    // toggleFavourite("#front-shelves-table");
    // toggleFavourite("#fridges-table");
    // toggleFavourite("#freezers-table");
    // toggleFavourite("#middle-shelves-table");
    // toggleFavourite("#end-shelves-table");

    





$(document).ready(function() {

    increaseQuantity();
    decreaseQuantity();
    checkQuantity();
    resetInput();
    insertRowData();

    captureInput(".fruitveg", "#fruit-veg-table");
    captureInput(".frontshelves", "#front-shelves-table");
    captureInput(".fridges", "#fridges-table");
    captureInput(".freezers", "#freezers-table");
    captureInput(".middleshelves", "#middle-shelves-table");
    captureInput(".endshelves", "#end-shelves-table");

    openSections();

    removeRow("#fruit-veg-table");
    removeRow("#front-shelves-table");
    removeRow("#fridges-table");
    removeRow("#freezers-table");
    removeRow("#middle-shelves-table");
    removeRow("#end-shelves-table");

    toggleFavourite("#fruit-veg-table");
    toggleFavourite("#front-shelves-table");
    toggleFavourite("#fridges-table");
    toggleFavourite("#freezers-table");
    toggleFavourite("#middle-shelves-table");
    toggleFavourite("#end-shelves-table");
});