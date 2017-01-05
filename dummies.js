var genotype_len = 12;

var prev_number_dummies = 2;

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
    drawDummies(row_size);
}

function createDiv(div_number, i, j, cross_percentage, mutation_percentage) {
    var div = document.createElement("div");
    div.setAttribute("id", div_number * i + j);
    div.setAttribute("class", "dummy size-" + div_number);
    div.setAttribute("onClick", "crossAndMutate(" + div_number + ", " + i + ", " + j + ", "
        + cross_percentage + ", " + mutation_percentage + ");");
    return div;
}

function createDivsGrid(div_number, cross_percentage, mutation_percentage) {
    var essential = document.getElementById("essential");
    essential.innerHTML = "";
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

function createEssential(div_number) {
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    createDummies(div_number);
    createDivsGrid(div_number, cross_percentage, mutation_percentage);
}

function updateEssential(div_number) {
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    if(prev_number_dummies != div_number) {
        createDummies(div_number);
        prev_number_dummies = div_number;
    }
    createDivsGrid(div_number, cross_percentage, mutation_percentage);
}

function drawDummy(row_size, i, j) {
    var genotype = dummies[i][j];
    var div = document.getElementById(i * row_size + j);
    div.innerHTML = "";

    var width = $("div#" + (i * row_size + j)).width();
    var height = $("div#" + (i * row_size + j)).height();

    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", (i * row_size + j) + "_dummy" );
    canvas.setAttribute("width", String(width));
    canvas.setAttribute("height", String(height));

    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.055 * width;
    ctx.lineCap = "round";

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[4] * width, genotype[5] * height);

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[6] * width, genotype[7] * height);

    ctx.moveTo(genotype[8] * width, genotype[9] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.moveTo(genotype[10] * width, genotype[11] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.stroke();

    var diameter = Math.sqrt(Math.pow((genotype[0] - genotype[2]) * width, 2) + Math.pow((genotype[1] - genotype[3]) * height, 2)) / 2;

    var diameter_to_right = Math.abs((1.0 - genotype[2]) * width);
    var diameter_to_left = Math.abs(genotype[2] * width);
    var diameter_to_up = Math.abs(genotype[3] * height);

    var ray = Math.min(diameter, diameter_to_right, diameter_to_up, diameter_to_left) / 2;

    ctx.beginPath();
    ctx.arc(genotype[2] * width, genotype[3] * height - ray, ray, 0, 2 * Math.PI);

    ctx.stroke();

    div.appendChild(canvas);
}

function drawDummies(row_size) {
    for(var i = 0; i < row_size; ++i) {
        for(var j = 0; j < row_size; ++j) {
            drawDummy(row_size, i, j);
        }
    }
}

function refresh() {
    var div_number = Number(document.getElementById("dummies_number").value);
    createEssential(div_number);
    drawDummies(div_number);
}

$(document).change( function() {
        var div_number = Number(document.getElementById("dummies_number").value);
        showPercentage();
        showNumber();
        showMutations();
        updateEssential(div_number);
        drawDummies(div_number);
    }
);

$(document).ready( function() {
        var div_number = Number(document.getElementById("dummies_number").value);
        createEssential(div_number);
        drawDummies(div_number);
    }
);
