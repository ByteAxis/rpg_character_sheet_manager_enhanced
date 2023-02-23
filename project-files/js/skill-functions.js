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
            <label class="skill-label" id="skill-label">' + localStorage.getItem("skillName" + i) + ': </label > \
            <input type="checkbox" ' + setChecked + ' onchange="updateSkillValuesInLocalStorage();" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function updateSkillValuesInLocalStorage() {
    var children = document.getElementById("skill-list").children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].querySelector("input").checked) {
            localStorage.setItem("skillValue" + (i + 1), true);
        } else {
            localStorage.setItem("skillValue" + (i + 1), false);
        }

    }
}

function addSkill() {
    var formgroup = document.getElementById("skill-list");
    var numberOfForms = formgroup.children.length;
    var numberOfNewForm = numberOfForms + 1;

    $(".skill-container").append('\
            \
            <div class="form-group"> \
            <label id="skill-label"> Skill ' + numberOfNewForm + ': </label > \
            <input class="skill-input" type="text" value="Skill Name" onchange="updateSkillNamesInLocalStorage();" /> <br /> \
            <button onclick="removeSkill(this)">X</button> \
            </div> \
            \
            ')
}

function removeSkill(buttonelement) { // Parallel data continuity achieved.

    // The steps for execution should be: 1. Delete the element marked for deletion | 2. Shift all displaced elements toward index 1 | 3. De-allocate unused memory

    var children = document.getElementById("skill-list").children; // Store the list of skill forms

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

function updateSkillNamesInLocalStorage() {
    var children = document.getElementById("skill-list").children;
    for (var i = 0; i < children.length; i++) {
        userChosenSkillName = children[i].querySelector("input").value;
        localStorage.setItem("skillName" + (i + 1), userChosenSkillName);

        if (localStorage.getItem("skillValue" + (i + 1)) === null) {
            localStorage.setItem("skillValue" + (i + 1), false);
        }

    }
}

function loadSkillsFromStorage() {
    var i = 1;
    while (localStorage.getItem("skillName" + i) !== null) {
        $(".skill-container").append('\
            \
            <div class="form-group"> \
            <label id="skill-label">' + "Skill " + i + ': </label > \
            <input class="skill-input" type="text" value="' + localStorage.getItem("skillName" + i) + '"onchange="updateSkillNamesInLocalStorage();" /> <br /> \
            <button onclick="removeSkill(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}
