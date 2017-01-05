var genotype_len = 2;

var dummies = [];

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

function cross(ref_i, ref_j, cur_i, cur_j, cross_percentage) {
    for(var k = 0 ; k < genotype_len; ++k) {
        if(cross_percentage >= Math.random()) {
            dummies[cur_i][cur_j][k] = dummies[ref_i][ref_j][k];
        }
    }
}

function mutate(i, j, percentage) {
    for(var k = 0; k < genotype_len; ++k) {
        if(percentage >= Math.random()) {
            dummies[i][j][k] = Math.random();
        }
    }
}

function crossAll(row_size, ref_i, ref_j, percentage) {
    for(var i = 0; i < row_size; ++i) {
        for(var j = 0; j < row_size; ++j) {
            cross(ref_i, ref_j, i, j, percentage);
        }
    }
}

function mutateAll(row_size, mutation_percentage) {
    for(var i = 0; i < row_size; ++i) {
        for(var j = 0; j < row_size; ++j) {
            mutate(i, j, mutation_percentage);
        }
    }
}

// used within createDiv
function crossAndMutate(row_size, ref_i, ref_j, cross_percentage, mutation_percentage) {
    crossAll(row_size, ref_i, ref_j, cross_percentage);
    mutateAll(row_size, mutation_percentage);
}

function createDiv(div_number, i, j, cross_percentage, mutation_percentage) {
    var div = document.createElement("div");
    div.setAttribute("id", div_number * i + j);
    div.setAttribute("class", "dummy size-" + div_number);
    div.setAttribute("onClick", "crossAndMutate(" + div_number + ", " + i + ", " + j + ", "
        + cross_percentage + ", " + mutation_percentage + ");");
    var text = "";
    for(var k = 0; k < genotype_len; ++k) {
        text += parseFloat(dummies[i][j][k]).toFixed(2) + " : ";
    }
    div.innerHTML = text;
    return div;
}

function createDivsGrid(div_number, cross_percentage, mutation_percentage) {
    var essential = document.getElementById("essential");
    essential.innerHTML = "";
    console.log(div_number);
    for(var i = 0; i < div_number; ++i) {
        for(var j = 0; j < div_number; ++j) {
            essential.appendChild(createDiv(div_number, i, j, cross_percentage, mutation_percentage));
        }
    }
}

function createDummies(row_size) {
    dummies = new Array(row_size);
    for(var i = 0; i < row_size; ++i) {
        dummies[i] = new Array(row_size);
        for(var j = 0; j < row_size; ++j) {
            dummies[i][j] = new Array(row_size);
            for (var k = 0; k < genotype_len; ++k) {
                dummies[i][j][k] = Math.random();
            }
        }
    }
}

function createEssential() {
    var div_number = Number(document.getElementById("dummies_number").value);
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    createDummies(div_number);
    createDivsGrid(div_number, cross_percentage, mutation_percentage);
}

function updateEssential() {
    var div_number = Number(document.getElementById("dummies_number").value);
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    createDummies(div_number);
    createDivsGrid(div_number, cross_percentage, mutation_percentage);
}

$(document).change( function() {
        showPercentage();
        showNumber();
        showMutations();
        updateEssential();
    }
);

$(document).ready( function() {
        createEssential();
    }
);