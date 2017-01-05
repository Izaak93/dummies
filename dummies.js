function showPercentage() {
    var slider_value_div = document.getElementById("cross_percentage_value");
    var slider_input = document.getElementById("cross_percentage");
    slider_value_div.innerHTML = slider_input.value;
}

function showNumber() {
    var slider_value_div = document.getElementById("dummies_number_value");
    var slider_input = document.getElementById("dummies_number");
    var value = Number(slider_input.value);
    slider_value_div.innerHTML = String(value * value);
}

function showMutations() {
    var slider_value_div = document.getElementById("mutation_percentage_value");
    var slider_input = document.getElementById("mutation_percentage");
    slider_value_div.innerHTML = slider_input.value;
}

function createDiv(div_number, i, j) {
    var div = document.createElement("div");
    div.setAttribute("id", div_number * i + j);
    div.setAttribute("class", "dummy size-" + div_number);
    div.innerHTML = i*div_number + j;
    return div;
}

function createEssential() {
    var essential = document.getElementById("essential");
    var div_number = Number(document.getElementById("dummies_number").value);
    console.log("Divs number: " + div_number);

    essential.innerHTML = "";
    for(var i = 0; i < div_number; ++i) {
        for(var j = 0; j < div_number; ++j) {
            essential.appendChild(createDiv(div_number, i, j));
        }
    }
}