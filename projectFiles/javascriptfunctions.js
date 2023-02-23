
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
            <input type="number" value=' + attributeVal + ' onchange="updateAttributeValuesInLocalStorage();" style="font-size: 60px; width: 130px;" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function displaySkillsFromStorage() {
    var i = 1;
    while (localStorage.getItem("skillName" + i) !== null) {
        if (localStorage.getItem("skillValue" + i) !== null) {
            var skillValue = (localStorage.getItem("skillValue" + i));
        } else {
            skillValue = false;
            updateSkillValuesInLocalStorage(); // In case skillValue is null, set it to false and sync storage
        }

        if (skillValue == "true") {
            setChecked = "checked";
        } else {
            setChecked = "";
        }
        $(".skill-container").append('\
            \
            <div class="form-group"> \
            <label id="skilllabel">' + localStorage.getItem("skillName" + i) + ': </label > \
            <input type="checkbox" ' + setChecked + ' onchange="updateSkillValuesInLocalStorage();" style="margin-top:10px; height:60px; width:60px; margin-left: 20px;" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function updateAttributeValuesInLocalStorage() {
    var children = document.getElementById("attributelist").children;
    for (var i = 0; i < children.length; i++) {
        userChosenAttributeValue = children[i].querySelector("input").value;
        localStorage.setItem("attributeValue" + (i + 1), userChosenAttributeValue);
    }
}

function updateSkillValuesInLocalStorage() {
    var children = document.getElementById("skilllist").children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].querySelector("input").checked) {
            localStorage.setItem("skillValue" + (i + 1), true);
        } else {
            localStorage.setItem("skillValue" + (i + 1), false);
        }

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
            <button onclick="destroyAttr(this)">X</button> \
            </div> \
            \
            ')
}

function addSkill() {
    var formgroup = document.getElementById("skilllist");
    var numberOfForms = formgroup.children.length;
    var numberOfNewForm = numberOfForms + 1;

    $(".skill-container").append('\
            \
            <div class="form-group"> \
            <label id="skilllabel"> Skill ' + numberOfNewForm + ': </label > \
            <input type="text" value="Skill Name" onchange="updateSkillNamesInLocalStorage();" style="font-size: 30px;" /> <br /> \
            <button onclick="removeSkill(this)">X</button> \
            </div> \
            \
            ')
}

function destroyAttr(buttonelement) { // Parallel data continuity achieved.
    // The steps for execution should be: 1. Delete the element marked for deletion | 2. Shift all displaced elements toward index 1 | 3. De-allocate unused memory

    var children = document.getElementById("attributelist").children; // Store the list of attribute forms

    // De-allocate deleted object's memory
    for (var i = 0; i < children.length; i++) {
        if (children[i] === buttonelement.parentNode) {
            localStorage.removeItem("attributeName" + (i + 1));
            localStorage.removeItem("attributeValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < children.length; i++) {
        if (localStorage.getItem("attributeName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("attributeName" + (i + 1), localStorage.getItem("attributeName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("attributeValue" + (i + 1), localStorage.getItem("attributeValue" + (i + 2))); // Do the same to the attribute value as well as the attribute name.
            localStorage.removeItem("attributeName" + (i + 2));
            localStorage.removeItem("attributeValue" + (i + 2));
            children[i].querySelector("label").innerHTML = "Attribute " + (i + 1) + ":";
        }
    }

    // 3. De-allocated unused memory
    var finalAttributeIndex = (children.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("attributeName" + finalAttributeIndex); // De-allocate unused memory
    localStorage.removeItem("attributeValue" + finalAttributeIndex); // De-allocate unsued memory
}

function removeSkill(buttonelement) { // Parallel data continuity achieved.

    // The steps for execution should be: 1. Delete the element marked for deletion | 2. Shift all displaced elements toward index 1 | 3. De-allocate unused memory

    var children = document.getElementById("skilllist").children; // Store the list of skill forms

    // De-allocate deleted object's memory
    for (var i = 0; i < children.length; i++) {
        if (children[i] === buttonelement.parentNode) {
            localStorage.removeItem("skillName" + (i + 1));
            localStorage.removeItem("skillValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < children.length; i++) {
        if (localStorage.getItem("skillName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("skillName" + (i + 1), localStorage.getItem("skillName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("skillValue" + (i + 1), localStorage.getItem("skillValue" + (i + 2))); // Do the same to the skill value as well as the skill name.
            localStorage.removeItem("skillName" + (i + 2));
            localStorage.removeItem("skillValue" + (i + 2));
            children[i].querySelector("label").innerHTML = "Skill " + (i + 1) + ":";
        }
    }

    // 3. De-allocated unused memory
    var finalSkillIndex = (children.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("skillName" + finalSkillIndex); // De-allocate unused memory
    localStorage.removeItem("skillValue" + finalSkillIndex); // De-allocate unsued memory
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

function updateSkillNamesInLocalStorage() {
    var children = document.getElementById("skilllist").children;
    for (var i = 0; i < children.length; i++) {
        userChosenSkillName = children[i].querySelector("input").value;
        localStorage.setItem("skillName" + (i + 1), userChosenSkillName);

        if (localStorage.getItem("skillValue" + (i + 1)) === null) {
            localStorage.setItem("skillValue" + (i + 1), false);
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
            <button onclick="destroyAttr(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}

function loadSkillsFromStorage() {
    var i = 1;
    while (localStorage.getItem("skillName" + i) !== null) {
        $(".skill-container").append('\
            \
            <div class="form-group"> \
            <label id="skilllabel">' + "Skill " + i + ': </label > \
            <input type="text" value="' + localStorage.getItem("skillName" + i) + '"onchange="updateSkillNamesInLocalStorage();" style="font-size: 30px;" /> <br /> \
            <button onclick="removeSkill(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}
