// entityName --> The name of the entity's name in memory
// entityValue --> The name of the entity's value in memory
// entity-container --> The name of the entity container on the character sheet
// entity-container --> The ID of the entity container on the character sheet
// entity-label --> The ID of the entity label on the character sheet
// entity-label --> The class of the entity label on the character sheet
// entity-input --> The class of the entity input on the character sheet
// entity-input --> The entity input field for the config page
// "Entity Name" --> The default name of the newly added entity in the config page
// chosenEntityName --> The back-end variable name for the user-input entity name
//  + entityName + " " + i +  --> The section of code that loads entity values onto the config page

// entityName : entityName
// entityValue : entityValue
// entity-container : entity-container
// entity-container --> entity-container
// entity-label --> entity-label
// entity-label --> entity-label
// entity-input --> entity-input
// entity-input --> entity-input
// "Entity Name" --> "Entity Name"
// chosenEntityName --> chosenEntityName
// + entityName + " " + i + --> + entityName + " " + i +
// entityValue --> entityValue


function loadEntitiesOntoCharacterSheet() {
    var i = 1;
    while (localStorage.getItem("entityName" + i) !== null) {
        if (localStorage.getItem("entityValue" + i) !== null) {
            var entityValue = (localStorage.getItem("entityValue" + i));
        } else {
            entityValue = 0;
            updateEntityValues();
        }
        $(".entity-container").append('\
            \
            <div class="form-group"> \
            <label class="entity-label" id="entity-label">' + localStorage.getItem("entityName" + i) + ': </label > \
            <input class="entity-input" type="number" value=' + entityValue + ' onchange="updateEntityValues();" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function updateEntityValues() {
    var children = document.getElementById("entity-container").children;
    for (var i = 0; i < children.length; i++) {
        userChosenentityValue = children[i].querySelector("input").value;
        localStorage.setItem("entityValue" + (i + 1), userChosenentityValue);
    }
}

function addEntity() {

    var formgroup = document.getElementById("entity-container");
    var numberOfExistingInputFields = formgroup.children.length;
    var numberOfNewInputField = numberOfExistingInputFields + 1;

    $(".entity-container").append('\
            \
            <div class="form-group"> \
            <label id="entity-label"> Entity ' + numberOfNewInputField + ': </label > \
            <input class="entity-input" type="text" value="Entity Name" onchange="updateEntityNames();" /> <br /> \
            <button onclick="removeEntity(this)">X</button> \
            </div> \
            \
            ')
}

function removeEntity(buttonelement, entityMetaname) { // Parallel data continuity entity removal
    // The steps for execution are: 1. Delete the element marked for deletion | 2. Shift all displaced elements to cover down the gaps | 3. De-allocate unused memory
    // The parameter is the generic entity name ("Attribute 1: {user-input}") where "Attribute" is the entity meta name

    var children = document.getElementById("entity-container").children; // Store the list of entity forms

    // De-allocate deleted object's memory
    for (var i = 0; i < children.length; i++) {
        if (children[i] === buttonelement.parentNode) {
            localStorage.removeItem("entityName" + (i + 1));
            localStorage.removeItem("entityValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < children.length; i++) {
        if (localStorage.getItem("entityName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("entityName" + (i + 1), localStorage.getItem("entityName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("entityValue" + (i + 1), localStorage.getItem("entityValue" + (i + 2))); // Do the same to the entity value as well as the entity name.
            localStorage.removeItem("entityName" + (i + 2));
            localStorage.removeItem("entityValue" + (i + 2));
            children[i].querySelector("label").innerHTML = entityMetaname + (i + 1) + ":";
        }
    }

    // 3. De-allocated unused memory
    var finalEntityIndex = (children.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("entityName" + finalEntityIndex); // De-allocate unused memory
    localStorage.removeItem("entityValue" + finalEntityIndex); // De-allocate unsued memory
}

function updateEntityNames() {
    var children = document.getElementById("entity-container").children;
    for (var i = 0; i < children.length; i++) {
        chosenEntityName = children[i].querySelector("input").value;
        localStorage.setItem("entityName" + (i + 1), chosenEntityName);

        if (localStorage.getItem("entityValue" + (i + 1)) === null) {
            localStorage.setItem("entityValue" + (i + 1), 0); // The '0' is not entity-agnostic; this only works for entities whose default value is zero.
        }

    }
}

function loadEntitiesOntoConfigurationPage(entityMetaname) {
    var i = 1;
    // The parameter is the generic entity name ("Attribute 1: {user-input}") where "Attribute" is the entity meta name
    while (localStorage.getItem("entityName" + i) !== null) {
        $(".entity-container").append('\
            \
            <div class="form-group"> \
            <label id="entity-label">' + entityName + " " + i + ': </label > \
            <input class="entity-input" type="text" value="' + localStorage.getItem("entityName" + i) + '"onchange="updateEntityNames();" /> <br /> \
            <button onclick="removeEntity(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}
