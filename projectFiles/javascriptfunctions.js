
function displayAttributesFromStorage() {
    var i = 1;
    while (localStorage.getItem("attributeName" + i) !== null) { // While "attributeName{i}" exists,
        if (localStorage.getItem("attributeValue" + i) !== null) {
            var attributeVal = (localStorage.getItem("attributeValue" + i)); // I wonder if this can leave scope.
        } else {
            attributeVal = 0;
            updateAttributeValuesInLocalStorage();
        }
        $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label id="attrlabel">' + localStorage.getItem("attributeName" + i) + ': </label > \
            <input type="text" value=' + attributeVal + ' onchange="updateAttributeValuesInLocalStorage();" style="font-size: 30px;" /> <br /> \
            </div> \
            \
            ');
        i++; // Increment i by 1
    }
}
function updateAttributeValuesInLocalStorage() {
    var children = document.getElementById("attributelist").children;
    for (var i = 0; i < children.length; i++) {
        userChosenAttributeValue = children[i].querySelector("input").value;
        localStorage.setItem("attributeValue" + (i + 1), userChosenAttributeValue);
    }
}


function addAttribute() {

    var formgroup = document.getElementById("attributelist");
    var numberOfForms = formgroup.children.length;
    var numberOfNewForm = numberOfForms + 1;

    $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label id="attrlabel"> Attribute ' + numberOfNewForm + ': </label > \
            <input type="text" value="Attribute Name" onchange="updateAttributeNamesInLocalStorage();" style="font-size: 30px;" /> <br /> \
            <button onclick="removeItem(this)">X</button> \
            </div> \
            \
            ')
}

function removeItem(buttonelement) { // Parallel data continuity achieved.

    // The steps for execution should be: 1. Delete the element marked for deletion | 2. Shift all displaced elements toward index 1 | 3. De-allocate unused memory

    var children = document.getElementById("attributelist").children; // Store the list of attribute forms

    
    // De-allocate deleted object's memory
    for (var i = 0; i < children.length; i++) {
        if (children[i] === buttonelement.parentNode) {
            localStorage.removeItem("attributeName" + (i+1));
            localStorage.removeItem("attributeValue" + (i+1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < children.length; i++) {
        if (localStorage.getItem("attributeName" + (i+1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("attributeName" + (i+1), localStorage.getItem("attributeName" + (i+2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("attributeValue" + (i+1), localStorage.getItem("attributeValue" + (i + 2))); // Do the same to the attribute value as well as the attribute name.
            localStorage.removeItem("attributeName" + (i+2));
            localStorage.removeItem("attributeValue" + (i+2));
            children[i].querySelector("label").innerHTML = "Attribute " + (i+1) + ":";
        }
    }

    // 3. De-allocated unused memory
    var finalAttributeIndex = (children.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("attributeName" + finalAttributeIndex); // De-allocate unused memory
    localStorage.removeItem("attributeValue" + finalAttributeIndex); // De-allocate unsued memory
}

function updateAttributeNamesInLocalStorage() {
    var children = document.getElementById("attributelist").children;
    for (var i = 0; i < children.length; i++) {
        userChosenAttributeName = children[i].querySelector("input").value;
        localStorage.setItem("attributeName" + (i + 1), userChosenAttributeName);

        if (localStorage.getItem("attributeValue" + (i + 1)) === null) {
            localStorage.setItem("attributeValue" + (i + 1), 0);
        }

    }
}



function loadAttributesFromStorage() {
    var i = 1;
    while (localStorage.getItem("attributeName" + i) !== null) {
        $(".attribute-container").append('\
            \
            <div class="form-group"> \
            <label id="attrlabel">' + "Attribute " + i + ': </label > \
            <input type="text" value="' + localStorage.getItem("attributeName" + i) + '"onchange="updateAttributeNamesInLocalStorage();" style="font-size: 30px;" /> <br /> \
            <button onclick="removeItem(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}
