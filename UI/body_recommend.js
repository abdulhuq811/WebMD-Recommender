// Fpr male or female. When toggled, this should be cleared off
var selectedBodyParts = new Array();
var recommendedBodyParts = new Array();
var selectedGender = 'male'

function toggleGender(gender) {
    selectedBodyParts = new Array();
    recommendedBodyParts = new Array();
    selectedGender = gender;
    console.log(selectedGender);
}

function addBodyPart(label) {
    if (selectedBodyParts.indexOf(label) === -1) {
        selectedBodyParts.push(label);
    } else {
        selectedBodyParts.splice(selectedBodyParts.indexOf(label), 1);
    }
}

$(document).ready(function() {
    var maleBody = $('#maleBody g path');
    var femaleBody = $('#femaleBody g path');

    var chart = new CanvasJS.Chart("donut-example", {
        title: {
            text: "Presidential Election Results"
        },
        animationEnabled: true,
        data: [{
            type: "doughnut",
            startAngle: 60,
            toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>",
            showInLegend: false,
            dataPoints: [
                { y: 65899660, indexLabel: "Barack Obama #percent%", legendText: "Barack Obama" },
                { y: 60929152, indexLabel: "Mitt Romney #percent%", legendText: "Mitt Romney" },
                { y: 2175850, indexLabel: "Others #percent%", legendText: "Others" }
            ]
        }]
    });
    chart.render();

    maleBody.on('click', function(e) {
        var tags = [];
        var currEle = $(e.target);
        var currVal = currEle[0].getAttribute('fill-opacity');
        toggleMale(currEle[0].getAttribute("value"))
        if (currVal == 0.4) {
            currEle[0].setAttribute('fill-opacity', 0);
        } else {
            currEle[0].setAttribute('fill-opacity', 0.4);
        }


        $('#selected-tags').children().remove();
        var tempArr = $('#maleBody g path');
        for (var i = 0; i < tempArr.length; i++) {
            var currFill = tempArr[i].getAttribute('fill-opacity');
            var currVal = tempArr[i].getAttribute('value');
            if (currFill == 0.4) {
                tags.push(currVal);
            }
        }
        generateTags(tags);

    });

    femaleBody.on('click', function(e) {
        var tags = [];
        var currEle = $(e.target);
        var currVal = currEle[0].getAttribute('fill-opacity');
        toggleFemale(currEle[0].getAttribute("value"))
        if (currVal == 0.4) {
            currEle[0].setAttribute('fill-opacity', 0);
        } else {
            currEle[0].setAttribute('fill-opacity', 0.4);
        }

        $('#selected-tags').children().remove();
        var tempArr = $('#femaleBody g path');
        for (var i = 0; i < tempArr.length; i++) {
            var currFill = tempArr[i].getAttribute('fill-opacity');
            var currVal = tempArr[i].getAttribute('value');
            if (currFill == 0.4) {
                tags.push(currVal);
            }
        }
        generateTags(tags);

    });

    function generateTags(parts) {

        var parent = $('#selected-tags');
        for (var i = 0; i < parts.length; i++) {
            var tag = $("<span></span>").addClass('tag tag-default');
            tag.text(parts[i]);
            parent.append(tag);
        }
    }

    $('.search-toggle').click(function(event) {
        $('search-wrapper').prop('class', 'modal fade search-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.search-wrapper').modal('show');
    });

    $('.graph-toggle').click(function(event) {
        $('graph-wrapper').prop('class', 'modal fade graph-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.graph-wrapper').modal('show');
    });

    $('.posts-toggle').click(function(event) {
         $('posts-wrapper').prop('class', 'modal fade posts-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.posts-wrapper').modal('show');
    });
});




function toggleMale(bodyPart) {
    if (bodyPart === 'larm' || bodyPart === 'rarm')
        bodyPart = 'arms'
    if (selectedBodyParts.indexOf(bodyPart) === -1) {
        // Change color here
        let parts = description["male"][bodyPart];
        $('.modal-body').children().remove();
        var container = document.createElement("div");
        for (p in parts) {
            let partDiv = document.createElement("div");
            partDiv.setAttribute("class", "checkbox");

            let partLabel = document.createElement("label");

            let part = document.createElement("input");
            part.setAttribute("type", "checkbox");
            part.setAttribute("name", parts[p]);
            part.setAttribute("class", "maleParts");
            part.addEventListener("click", function() {
                addBodyPart(this.name);
            });

            let partTitle = document.createElement("span");
            partTitle.innerHTML = parts[p];
            // All Recommended body parts will be loaded on to the var
            if (recommendedBodyParts.indexOf(parts[p]) !== -1)
                partTitle.style.fontWeight = 'bold';

            partLabel.appendChild(part);
            partLabel.appendChild(partTitle);
            partDiv.appendChild(partLabel);
            container.appendChild(partDiv);
        }
        $('.modal-body').append(container);
        $('#myModal').modal('toggle');
        // Add to the selected list
        selectedBodyParts.push(bodyPart);
    } else {
        // Remove that part from selected list
        selectedBodyParts.splice(selectedBodyParts.indexOf(bodyPart), 1);
        var subCategoriesToRemove = description['male'][bodyPart];
        for (s in subCategoriesToRemove) {
            if (selectedBodyParts.indexOf(subCategoriesToRemove[s]) !== -1) {
                selectedBodyParts.splice(selectedBodyParts.indexOf(subCategoriesToRemove[s]), 1);
            }
        }
    }
    console.log(selectedBodyParts);
}

function toggleFemale(bodyPart) {
    if (bodyPart === 'larm' || bodyPart === 'rarm')
        bodyPart = 'arms'
    if (selectedBodyParts.indexOf(bodyPart) === -1) {
        // Change color here
        let parts = description["female"][bodyPart];
        $('.modal-body').children().remove();
        var container = document.createElement("div");
        for (p in parts) {
            let partDiv = document.createElement("div");
            partDiv.setAttribute("class", "checkbox");

            let partLabel = document.createElement("label");

            let part = document.createElement("input");
            part.setAttribute("type", "checkbox");
            part.setAttribute("name", parts[p]);
            part.setAttribute("class", "maleParts");
            part.addEventListener("click", function() {
                addBodyPart(this.name);
            });

            let partTitle = document.createElement("span");
            partTitle.innerHTML = parts[p];
            // All Recommended body parts will be loaded on to the var
            if (recommendedBodyParts.indexOf(parts[p]) !== -1)
                partTitle.style.fontWeight = 'bold';

            partLabel.appendChild(part);
            partLabel.appendChild(partTitle);
            partDiv.appendChild(partLabel);
            container.appendChild(partDiv);
        }
        $('.modal-body').append(container);
        $('.modal').modal('toggle');
        // Add to the selected list
        selectedBodyParts.push(bodyPart);
    } else {
        // Remove that part from selected list
        selectedBodyParts.splice(selectedBodyParts.indexOf(bodyPart), 1);
        var subCategoriesToRemove = description['female'][bodyPart];
        for (s in subCategoriesToRemove) {
            if (selectedBodyParts.indexOf(subCategoriesToRemove[s]) !== -1) {
                selectedBodyParts.splice(selectedBodyParts.indexOf(subCategoriesToRemove[s]), 1);
            }
        }
    }
    console.log(selectedBodyParts);
}

function invokeBodyChange() {
    var obj = {};
    obj['gender'] = selectedGender;
    obj['bodyParts'] = selectedBodyParts;
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://192.168.0.18:8083/dataviz_project/internalgui/getdetail',
        type: 'POST',
        data: obj, // or $('#myform').serializeArray()
        success: function(result) { colorBodyParts(selectedGender, result); }
    });
}

function colorBodyParts(gender, bodyParts) {
    // On recieving recommendations, color body parts
}

Morris.Donut({
    element: 'donut-example',
    data: [
        { label: "Diseases", value: 12 },
        { label: "Allergies", value: 30 },
        { label: "Medical Conditions", value: 20 },
        { label: "Infections", value: 20 },
        { label: "Symptoms", value: 20 }
    ]
});
