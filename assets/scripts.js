
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

    // IF TEXT INPUT IS EMPTY: CREATE EMPTY ARRAY
    // IF POPULATED: GRAB VALUE, STORE IN ARRAY IN LOCAL STORAGE
    if (JSON.parse(localStorage.getItem('inputObjects')) == undefined){
        var autoFillItems = [];
    } else {
        var autoFillItems = JSON.parse(localStorage.getItem('inputObjects'));
    }

    // LOOPS THROUGH ALL ITEMS IN AUTOFILL LOCAL MEMORY AND STORES THEM IN AN OBJECT WITHIN AN ARRAY
    // RATHER THAN CREATING A NEW OBJECT, MAYBE THIS COULD PUSH JUST THE VALUES NEEDED FROM THE EXISTING OBJECT autoFillItems
    function createMemoryObject(){
        for (x in autoFillItems){
            itemNameLocation = {
                RememberedItemName: autoFillItems[x].itemName,
                RememberedItemLocation: autoFillItems[x].itemLocation
            };
            rememberedItem.push(itemNameLocation);
        }
    }

    // IF EMPTY, AN ARRAY 'rememberedItem' & AN OBJECT 'itemNameLocation' IS CREATED
    if (rememberedItem == undefined && itemNameLocation == undefined){
        var rememberedItem = [];
        var itemNameLocation = {};
        createMemoryObject();
    } else {
        createMemoryObject();
    }

    // GRABS TEXT INPUT VALUES, MAPS THEM TO AN OBJECT 'itemInput'
    // PUSHES OBJECT 'itemInput' TO ARRAY 'items'
    // SENDS 'autoFillItems' ARRAY VALUES TO LOCAL MEMORY OBJECT 'inputObjects'
    // RESETS INPUT FIELD TO EMPTY
    // INSERTS VALUES TO TABLE
    // ONLY SHOWS TABLE THAT WAS USED
    // CHANGES BANNER IMAGE TO RELEVANT LOCATION
    // RESETS LOCATION BUTTON TEXT COLOR BACK TO BLACK FROM RED
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

                autoFillItems.push(itemInput);
                localStorage.setItem('inputObjects', JSON.stringify(autoFillItems));

                resetInput();
                insertRowData(tableName, itemInput.itemQuantity, itemInput.itemName);
                let collapseParent = $(tableName).parent().parent().parent();
                $(".collapse").not(collapseParent).collapse('hide');
                $(collapseParent).addClass('show');
                $(collapseParent).removeClass('hide');
            }
            changeBannerImg(location);
            $(location).css("color","black")
        });
    };

    // GRABS ALL ITEM NAMES FROM AUTOFILL ARRAY OF OBJECTS
    var rememberedItemNames = [];
    for (x in rememberedItem){
        rememberedItemNames.push(rememberedItem[x].RememberedItemName);
    }
    // REMOVES ANY DUPLICATES
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    var removedDuplicatesSet = new Set(rememberedItemNames);
    var removedDuplicatesArray = Array.from(removedDuplicatesSet);

    // CREATES AUTOCOMPLETE FEATURE, ASSIGNS ARRAY OF UNIQUE VALUES FROM ABOVE
    $( "#item-name" ).autocomplete({
        source: removedDuplicatesArray,
        select: function (e, ui) {
            // SOURCE FOR USING ui.item.label: https://stackoverflow.com/questions/19675069/how-to-get-value-of-selected-item-in-autocomplete
            // WHEN SUGGESTED ITEM CLICKED: HIGHLIGHT LOCATION BUTTON
            if(jQuery.inArray(ui.item.label, removedDuplicatesArray) !== -1){
                var foundIndex = removedDuplicatesArray.indexOf(ui.item.label)
                var matchedLocation = rememberedItem[foundIndex].RememberedItemLocation
                $("button:contains('" + matchedLocation + "')").css("color","red");
            } else {
                $("#location_buttons").find("button").css("color","black")
            }
        }
    });


    // CHECKS TEXT INPUT VALUE, WHEN MATCHED IT CHECKS IF IT EXISTS IN AUTOFILL MEMORY AND HIGHLIGHTS LOCATION BUTTON
    function inputMatch(textInput){
        $(textInput).on("propertychange click input change paste keyup", function() {
            if(jQuery.inArray(this.value, removedDuplicatesArray) !== -1){
                var foundIndex = removedDuplicatesArray.indexOf(this.value)
                var matchedLocation = rememberedItem[foundIndex].RememberedItemLocation
                $("button:contains('" + matchedLocation + "')").css("color","red");
            } else {
                $("button").css("color","black")
            }
        })
    }

    // CLEARS THE LOCALSTORAGE MEMORY
    $("#clear-autofill").on("click", function() {
        localStorage.clear();
        alert("Autofill Cleared")
        location.reload();
    })

    // SETS EACH LOCATION A CORRESPONDING BANNER IMAGE
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

    // OPENS ALL TABLES
    $("#open-sections").on("click", function() {
        $(".collapse").removeClass('hide');
        $(".collapse").addClass('show');
    });

    // REMOVES ROW FROM TABLE
    // Source: https://stackoverflow.com/a/171293
    function removeRow(tableName){
        $(tableName).on("click", ".remove-field", function() {
            var removedItemName = $(this).closest("tr").find(".item-field").text();
            items.splice(items.findIndex(x => x.itemName === removedItemName),1);
            $(this).closest("tr").remove();
            console.log(`Removed ${removedItemName} from array`);
        });
    }

    // TOGGLES FAVOURITE STATUS TO TRUE/FALSE AND APPLIES CSS
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

$(document).ready(function() {

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

    inputMatch("#item-name");

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