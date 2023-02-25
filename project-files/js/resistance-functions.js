function addResistance() {

    var container = document.getElementById("resistance-container");
    var numberOfInputFields = container.children.length;
    var numberOfNewInputField = numberOfInputFields + 1;

    $(".resistance-container").append('\
            \
            <div class="form-group"> \
            <label id="resistance-label"> Resistance ' + numberOfNewInputField + ': </label > \
            <input class="resistance-input" type="text" value="Resistance Name" onchange="updateResistanceNames();" /> <br /> \
            <button onclick="removeResistance(this)">X</button> \
            </div> \
            \
            ')
}

function updateResistanceNames() {
    var children = document.getElementById("resistance-container").children;
    for (var i = 0; i < children.length; i++) {
        userChosenResistanceName = children[i].querySelector("input").value;
        localStorage.setItem("resistanceName" + (i + 1), userChosenResistanceName);
        if (localStorage.getItem("resistanceValue" + (i + 1)) === null) {
            localStorage.setItem("resistanceValue" + (i + 1), 0);
        }
    }
}

function removeResistance(buttonelement) {

    var inputFields = document.getElementById("resistance-container").children; // Store the list of attribute forms
    // 1. De-allocate deleted object's memory
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i] === buttonelement.parentNode) {
            localStorage.removeItem("resistanceName" + (i + 1));
            localStorage.removeItem("resistanceValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // 2. Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < inputFields.length; i++) {
        if (localStorage.getItem("resistanceName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("resistanceName" + (i + 1), localStorage.getItem("resistanceName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("resistanceValue" + (i + 1), localStorage.getItem("resistanceValue" + (i + 2))); // Do the same to the attribute value as well as the attribute name.
            localStorage.removeItem("resistanceName" + (i + 2));
            localStorage.removeItem("resistanceValue" + (i + 2));
            inputFields[i].querySelector("label").innerHTML = "Resistance " + (i + 1) + ":";
        }
    }
    // 3. De-allocated unused memory
    var finalResistanceIndex = (inputFields.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("resistanceName" + finalResistanceIndex); // De-allocate unused memory
    localStorage.removeItem("resistanceValue" + finalResistanceIndex); // De-allocate unsued memory
}

function loadResistancesOntoConfigurationPage() {
    var i = 1;
    while (localStorage.getItem("resistanceName" + i) !== null) {
        $(".resistance-container").append('\
            \
            <div class="form-group"> \
            <label id="resistance-label">' + "Resistance " + i + ': </label > \
            <input class="resistance-input" type="text" value="' + localStorage.getItem("resistanceName" + i) + '"onchange="updateResistanceNames();" /> <br /> \
            <button onclick="removeResistance(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}

function loadResistancesOntoCharacterSheet() {
    var i = 1;
    while (localStorage.getItem("resistanceName" + i) !== null) {
        if (localStorage.getItem("resistanceValue" + i) !== null) {
            var resistanceVal = (localStorage.getItem("resistanceValue" + i));
        } else {
            resistanceVal = 0;
            updateResistanceValues();
        }
        $(".resistance-container").append('\
            \
            <div class="form-group"> \
            <label class="resistance-label" id="resistance-label">' + localStorage.getItem("resistanceName" + i) + ': </label > \
            <input class="resistance-value-input" type="number" value=' + resistanceVal + ' onchange="updateResistanceValues();" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function updateResistanceValues() {
    var children = document.getElementById("resistance-container").children;
    for (var i = 0; i < children.length; i++) {
        userChosenResistanceValue = children[i].querySelector("input").value;
        localStorage.setItem("resistanceValue" + (i + 1), userChosenResistanceValue);
    }
}