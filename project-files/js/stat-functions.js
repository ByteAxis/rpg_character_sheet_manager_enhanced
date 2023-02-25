function displayStatsOntoCharacterSheet() {
    if (localStorage.getItem("healthValue") !== null) {
        displayHealth = localStorage.getItem("healthValue");
    } else {
        localStorage.setItem("healthValue", "Health");
        displayHealth = localStorage.getItem("healthValue");
    }
    $(".container-of-health").append('\
        <div class="form-group"> \
        <label class="stat-label">Current ' + localStorage.getItem("healthName") + ': </label> <br /> \
        <input class="health-input" type = "number" id = "currenthp" name = "currenthp" value = ' + displayHealth  + ' onchange = "updateHealthValue();" /> <br /> \
        </div> \
        <div class="form-group"> \
        <label class="stat-label">Max ' + localStorage.getItem("healthName") + ': </label> <br /> \
        <input class="health-input" type = "number" id = "maxhp" name = "maxhp" value = ' + localStorage.getItem("healthMax") + ' onchange = "updateMaxHealthValue();" /> <br /> \
        </div> \
        ');

    var i = 1;
    while (localStorage.getItem("statName" + i) !== null) { // While "statName{i}" exists,
        if (localStorage.getItem("statValue" + i) !== null) {
            var statVal = (localStorage.getItem("statValue" + i)); // I wonder if this can leave scope.
        } else {
            statVal = 0;
            updateStatValues();
        }
        $(".stat-container").append('\
            \
            <div class="form-group"> \
            <label class="stat-label" id="stat-label">' + localStorage.getItem("statName" + i) + ': </label > \
            <input class="stat-input" type="number" value=' + statVal + ' onchange="updateStatValues();" /> <br /> \
            </div> \
            \
            ');
        i++;
    }
}

function loadStatsOntoConfigurationPage() {
    if (localStorage.getItem("healthName") !== null) {
        var healthName = localStorage.getItem("healthName");
    } else {
        alert("Healthname was not detected, resetting to 'Health'");
        localStorage.setItem("healthName", "Health");
        var healthName = localStorage.getItem("healthName");
    }

    $(".health-container").append('\
        <div class="form-group"> \
        <label class="stat-label">Health Name: </label> <br /> \
        <input class="stat-input" type = "text" id = "healthName" name = "healthName" value = ' + healthName + ' onchange = "updateHealthName();" /> <br /> \
        </div> \
        ');

    var i = 1;
    while (localStorage.getItem("statName" + i) !== null) {
        $(".stat-container").append('\
            \
            <div class="form-group"> \
            <label id="stat-label">' + "Stat " + i + ': </label > \
            <input class="stat-input" type="text" value="' + localStorage.getItem("statName" + i) + '"onchange="updateStatNames();" /> <br /> \
            <button onclick="removeStat(this)">X</button> \
            </div> \
            \
            ');
        i++;
    }
}

function addStat() {

    var formgroup = document.getElementById("character-info-list");
    var numberOfInputFields = formgroup.children.length;
    var numberOfNewInputField = numberOfInputFields + 1;

    $(".stat-container").append('\
            \
            <div class="form-group"> \
            <label id="stat-label"> Stat ' + numberOfNewInputField + ': </label > \
            <input class="stat-input" type="text" value="Stat Name" onchange="updateStatNames();" /> <br /> \
            <button onclick="removeStat(this)">X</button> \
            </div> \
            \
            ')
}

function removeStat(buttonelement) { // Parallel data continuity achieved.
    // The steps for execution should be: 1. Delete the element marked for deletion | 2. Shift all displaced elements toward index 1 | 3. De-allocate unused memory

    var children = document.getElementById("character-info-list").children; // Store the list of attribute forms

    // De-allocate deleted object's memory
    for (var i = 0; i < children.length; i++) {
        if (children[i] === buttonelement.parentNode) {
            localStorage.removeItem("statName" + (i + 1));
            localStorage.removeItem("statValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < children.length; i++) {
        if (localStorage.getItem("statName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("statName" + (i + 1), localStorage.getItem("statName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("statValue" + (i + 1), localStorage.getItem("statValue" + (i + 2))); // Do the same to the attribute value as well as the attribute name.
            localStorage.removeItem("statName" + (i + 2));
            localStorage.removeItem("statValue" + (i + 2));
            children[i].querySelector("label").innerHTML = "Stat " + (i + 1) + ":";
        }
    }

    // 3. De-allocated unused memory
    var finalStatIndex = (children.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("statName" + finalStatIndex); // De-allocate unused memory
    localStorage.removeItem("statValue" + finalStatIndex); // De-allocate unsued memory
}

function updateStatValues() {
    var children = document.getElementById("stat-container").children;
    for (var i = 0; i < children.length; i++) {
        inputStatName = children[i].querySelector("input").value;
        localStorage.setItem("statValue" + (i + 1), inputStatName);
    }
}

function updateStatNames() {
    var children = document.getElementById("character-info-list").children;
    for (var i = 0; i < children.length; i++) {
        statName = children[i].querySelector("input").value;
        localStorage.setItem("statName" + (i + 1), statName);

        if (localStorage.getItem("statValue" + (i + 1)) === null) {
            localStorage.setItem("statValue" + (i + 1), 0);
        }

    }
}

function initializeHealthValue() {
    if (localStorage.getItem("healthValue") === null) {
        localStorage.setItem("healthValue", 0);
    }
}

function updateHealthValue() {
    var children = document.getElementById("container-of-health");
    var userInputHealthValue = children.querySelector("input[id='currenthp']").value;
    localStorage.setItem("healthValue", userInputHealthValue);
}

function updateMaxHealthValue() {
    var children = document.getElementById("container-of-health");
    var userInputHealthValue = children.querySelector("input[id='maxhp']").value;
    localStorage.setItem("healthMax", userInputHealthValue);
}

function updateHealthName() {
    var children = document.getElementById("health-container");
    var healthName = children.querySelector("input").value;
    localStorage.setItem("healthName", healthName);
}
