function addAttribute() {

    var container = document.getElementById("attribute-container");
    var numberOfInputFields = container.children.length;
    var numberOfNewInputField = numberOfInputFields + 1;

    $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label class="attribute-label" id="attribute-label"> Attribute ' + numberOfNewInputField + ': </label > \
            <input class="attribute-input" type="text" value="Attribute Name" onchange="updateAttributeNames();" /> <br /> \
            <button onclick="removeAttr(this)">X</button> \
            </div> \
            \
            ')
}


function updateAttributeValues() {
    var children = document.getElementById("attribute-container").children;
    for (var i = 0; i < children.length; i++) {
        userChosenAttributeValue = children[i].querySelector("input").value;
        localStorage.setItem("attributeValue" + (i + 1), userChosenAttributeValue);
    }
}

function updateAttributeNames() {
    var children = document.getElementById("attribute-container").children;
    for (var i = 0; i < children.length; i++) {
        userChosenAttributeName = children[i].querySelector("input").value;
        localStorage.setItem("attributeName" + (i + 1), userChosenAttributeName);

        if (localStorage.getItem("attributeValue" + (i + 1)) === null) {
            localStorage.setItem("attributeValue" + (i + 1), 0);
        }

    }
}


function removeAttr(buttonelement) {

    var inputFields = document.getElementById("attribute-container").children; // Store the list of attribute forms
    // 1. De-allocate deleted object's memory
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i] === buttonelement.parentNode) {
            localStorage.removeItem("attributeName" + (i + 1));
            localStorage.removeItem("attributeValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // 2. Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < inputFields.length; i++) {
        if (localStorage.getItem("attributeName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("attributeName" + (i + 1), localStorage.getItem("attributeName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("attributeValue" + (i + 1), localStorage.getItem("attributeValue" + (i + 2))); // Do the same to the attribute value as well as the attribute name.
            localStorage.removeItem("attributeName" + (i + 2));
            localStorage.removeItem("attributeValue" + (i + 2));
            inputFields[i].querySelector("label").innerHTML = "Attribute " + (i + 1) + ":";
        }
    }
    // 3. De-allocated unused memory
    var finalAttributeIndex = (inputFields.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("attributeName" + finalAttributeIndex); // De-allocate unused memory
    localStorage.removeItem("attributeValue" + finalAttributeIndex); // De-allocate unsued memory
}

function loadAttributesOntoConfigurationPage() {
    var i = 1;
    while (localStorage.getItem("attributeName" + i) !== null) {
        $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label id="attribute-label">' + "Attribute " + i + ': </label > \
            <input class="attribute-input" type="text" value="' + localStorage.getItem("attributeName" + i) + '"onchange="updateAttributeNames();" /> <br /> \
            <button onclick="removeAttr(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}

function loadAttributesOntoCharacterSheet() {
    var i = 1;
    while (localStorage.getItem("attributeName" + i) !== null) {
        if (localStorage.getItem("attributeValue" + i) !== null) {
            var attributeVal = (localStorage.getItem("attributeValue" + i));
        } else {
            attributeVal = 0;
            updateAttributeValues();
        }
        $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label class="attribute-label" id="attribute-label">' + localStorage.getItem("attributeName" + i) + ': </label > \
            <input class="attribute-value-input" type="number" value=' + attributeVal + ' onchange="updateAttributeValues();" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}