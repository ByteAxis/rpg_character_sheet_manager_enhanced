function addSpell() {

    var container = document.getElementById("spell-container");
    var numberOfInputFields = container.children.length;
    var numberOfNewInputField = numberOfInputFields + 1;

    $(".spell-container").append('\
            \
            <div class="form-group"> \
            <label class="spell-label" id="spell-label"> Spell ' + numberOfNewInputField + ': </label > \
            <input class="spell-name-input" type="text" value="Spell Name" onchange="updateSpellNames();" /> <br /> \
            <input class="spell-level-input" type="number" value="1" onchange="updateSpellLevels();" /> <br /> \
            <input class="spell-range-input" type="text" value="Range" onchange="updateSpellRanges();" /> <br /> \
            <input class="spell-damage-input" type ="number" value="0" onchange="updateSpellDamages();" /> <br /> \
            <input class="spell-castingtime-input" type="text" value="Casting Time" onchange="updateSpellCastingtime();" /> <br /> \
            <input class="spell-component-input" type="text" value="Components" onchange="updateSpellComponents();" /> <br /> \
            <label class="spell-concentration-label" id="spell-concentration-label">Requires Concentration:</label> <br /> \
            <input class="spell-concentration-input" type="checkbox" onchange="updateSpellConcentrations();" /> <br /> \
            <button class="delete-button" onclick = "removeSpell(this)" > X</button > \
            </div> \
            \
            ')
}

function removeSpell(buttonelement) {

    var inputFields = document.getElementById("spell-container").children; // Store the list of spell forms
    // 1. De-allocate deleted object's memory
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i] === buttonelement.parentNode) {
            localStorage.removeItem("spellName" + (i + 1));
            localStorage.removeItem("spellValue" + (i + 1));
        }
    }
    buttonelement.parentNode.remove(); // Delete the visual component of the element

    // 2. Shift all displaced elements to cover-down the gap in memory space.
    for (var i = 0; i < inputFields.length; i++) {
        if (localStorage.getItem("spellName" + (i + 1)) === null) { // When a gap in the new storage values is detected,
            localStorage.setItem("spellName" + (i + 1), localStorage.getItem("spellName" + (i + 2))); // Copy the next item into the current gap, then delete the item's old memory spaces (both name and value)
            localStorage.setItem("spellValue" + (i + 1), localStorage.getItem("spellValue" + (i + 2))); // Do the same to the spell value as well as the spell name.
            localStorage.removeItem("spellName" + (i + 2));
            localStorage.removeItem("spellValue" + (i + 2));
            inputFields[i].querySelector("label").innerHTML = "Spell " + (i + 1) + ":";
        }
    }
    // 3. De-allocated unused memory
    var finalSpellIndex = (inputFields.length + 1); // Use this variable to prevent off-by-one error during memory de-allocation
    localStorage.removeItem("spellName" + finalSpellIndex); // De-allocate unused memory
    localStorage.removeItem("spellValue" + finalSpellIndex); // De-allocate unsued memory
}
