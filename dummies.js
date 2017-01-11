var prev_number_dummies = 2;    // see 112 - (updateEssential())

/*
 *  body parts  = [left foot, right foot, pelvis, neck, left hand, right hand]
 *  short names = [LF, RF, P, N, LH, RH]
 *  coords      = [(4, 5), (6, 7), (0, 1), (2, 3), (8, 9), (10, 11)]
 * */

var genotypes = [];
var genotype_len = 12;

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
            genotypes[cur_i][cur_j][k] = genotypes[ref_i][ref_j][k];
        }
    }
}

function mutate(i, j, percentage) {
    for(var k = 0; k < genotype_len; ++k) {
        if(percentage >= Math.random()) {
            var local_value = (0.5 - Math.random()) / 10;
            genotypes[i][j][k] += local_value;
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

function createDiv(row_size, i, j, cross_percentage, mutation_percentage) {
    var div = document.createElement("div");
    div.setAttribute("id", row_size * i + j);
    div.setAttribute("class", "dummy size-" + row_size);
    div.setAttribute("onClick", "crossAndMutate(" + row_size + ", " + i + ", " + j + ", "
        + cross_percentage + ", " + mutation_percentage + ");");
    return div;
}

function createDivsGrid(row_size, cross_percentage, mutation_percentage) {
    var essential = document.getElementById("essential");
    essential.innerHTML = "";
    for(var i = 0; i < row_size; ++i) {
        for(var j = 0; j < row_size; ++j) {
            essential.appendChild(createDiv(row_size, i, j, cross_percentage, mutation_percentage));
        }
    }
}

function createDummies(row_size) {
    genotypes = new Array(row_size);
    for(var i = 0; i < row_size; ++i) {
        genotypes[i] = new Array(row_size);
        for(var j = 0; j < row_size; ++j) {
            genotypes[i][j] = new Array(row_size);
            for (var k = 0; k < genotype_len; ++k) {
                var local_value = Math.random();
                if(k == 1 || k == 5 || k == 7) {
                    genotypes[i][j][k] = 0.5 + local_value / 2;
                } else {
                    genotypes[i][j][k] = local_value / 2;
                }
            }
        }
    }
}

function createEssential(row_size) {
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    createDummies(row_size);
    createDivsGrid(row_size, cross_percentage, mutation_percentage);
}

function updateEssential(row_size) {
    var cross_percentage = Number(document.getElementById("cross_percentage_value").innerHTML) / 100.0;
    var mutation_percentage = Number(document.getElementById("mutation_percentage_value").innerHTML) / 100.0;
    // should create new dummies if their number changed
    if(prev_number_dummies != row_size) {
        createDummies(row_size);
        prev_number_dummies = row_size;
    }
    createDivsGrid(row_size, cross_percentage, mutation_percentage);
}

function drawLegs(width, height, canvas, genotype) {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.055 * width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FF851B";

    ctx.beginPath();

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[4] * width, genotype[5] * height);

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[6] * width, genotype[7] * height);

    ctx.stroke();

    ctx.closePath();
}

function drawBody(width, height, canvas, genotype) {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.055 * width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "orange";

    ctx.beginPath();

    ctx.moveTo(genotype[0] * width, genotype[1] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.moveTo(genotype[8] * width, genotype[9] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.moveTo(genotype[10] * width, genotype[11] * height);
    ctx.lineTo(genotype[2] * width, genotype[3] * height);

    ctx.stroke();

    ctx.closePath();
}

function drawHead(width, height, canvas, genotype) {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.055 * width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FFDC00";

    ctx.beginPath();

    var diameter = Math.sqrt(Math.pow((genotype[0] - genotype[2]) * width, 2) + Math.pow((genotype[1] - genotype[3]) * height, 2)) / 2;

    var diameter_to_right = Math.abs((1.0 - genotype[2]) * width);
    var diameter_to_left = Math.abs(genotype[2] * width);
    var diameter_to_up = Math.abs(genotype[3] * height);

    var ray = Math.min(diameter, diameter_to_right, diameter_to_up, diameter_to_left) / 2;

    ctx.beginPath();
    ctx.arc(genotype[2] * width, genotype[3] * height - ray, ray, 0, 2 * Math.PI);

    ctx.stroke();

    ctx.closePath();
}

function drawDummy(row_size, i, j) {
    var genotype = genotypes[i][j];
    var div = document.getElementById(i * row_size + j);
    div.innerHTML = "";

    var width = $("div#" + (i * row_size + j)).width();
    var height = $("div#" + (i * row_size + j)).height();

    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", (i * row_size + j) + "_dummy" );
    canvas.setAttribute("width", String(width));
    canvas.setAttribute("height", String(height));

    drawLegs(width, height, canvas, genotype);
    drawBody(width, height, canvas, genotype);
    drawHead(width, height, canvas, genotype);

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
    var row_size = Number(document.getElementById("dummies_number").value);
    createEssential(row_size);
    drawDummies(row_size);
}

$(document).change( function() {
        var row_size = Number(document.getElementById("dummies_number").value);
        showPercentage();
        showNumber();
        showMutations();
        updateEssential(row_size);
        drawDummies(row_size);
    }
);

$(document).ready( function() {
        var row_size = Number(document.getElementById("dummies_number").value);
        createEssential(row_size);
        drawDummies(row_size);
    }
);