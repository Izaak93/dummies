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