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