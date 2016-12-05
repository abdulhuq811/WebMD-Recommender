// Fpr male or female. When toggled, this should be cleared off
var selectedBodyParts = new Array();
var recommendedBodyParts = new Array();
var selectedGender = 'male'

function toggleGender (gender) {
  selectedBodyParts = new Array();
  recommendedBodyParts = new Array();
  selectedGender = gender;
  console.log(selectedGender);
}

function addBodyPart (label) {
  if(selectedBodyParts.indexOf(label) === -1) {
   selectedBodyParts.push(label);
  } else {
    selectedBodyParts.splice(selectedBodyParts.indexOf(label), 1);
  }
}

$(document).ready( function() {
  var maleBody = $('#maleBody g path');
  var femaleBody = $('#femaleBody g path');
  maleBody.on('click', function(e) {
    var currEle = $(e.target);
    var currVal = currEle[0].getAttribute('fill-opacity');
    toggleMale(currEle[0].getAttribute("value"))
    if (currVal == 0.4) {
      currEle[0].setAttribute('fill-opacity', 0);
    } else {
      currEle[0].setAttribute('fill-opacity', 0.4);
    }
  });
  femaleBody.on('click', function(e) {
    var currEle = $(e.target);
    var currVal = currEle[0].getAttribute('fill-opacity');
    toggleFemale(currEle[0].getAttribute("value"))
    if (currVal == 0.4) {
      currEle[0].setAttribute('fill-opacity', 0);
    } else {
      currEle[0].setAttribute('fill-opacity', 0.4);
    }
  });
});

function toggleMale(bodyPart) {
  if(bodyPart === 'larm' || bodyPart === 'rarm')
    bodyPart = 'arms'
  if(selectedBodyParts.indexOf(bodyPart) === -1) {
    // Change color here
    let parts = description["male"][bodyPart];
    $('.modal-body').children().remove();
    var container = document.createElement("div");
    for (p in parts) {
      let partDiv = document.createElement("div");
      partDiv.setAttribute("class","checkbox");

      let partLabel = document.createElement("label");

      let part = document.createElement("input");
      part.setAttribute("type", "checkbox");
      part.setAttribute("name", parts[p]);
      part.setAttribute("class","maleParts");
      part.addEventListener("click", function () {
        addBodyPart(this.name);
      });
      
      let partTitle = document.createElement("span");
      partTitle.innerHTML = parts[p];
      // All Recommended body parts will be loaded on to the var
      if(recommendedBodyParts.indexOf(parts[p]) !== -1)  
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
    var subCategoriesToRemove = description['male'][bodyPart];
    for(s in subCategoriesToRemove) {
      if(selectedBodyParts.indexOf(subCategoriesToRemove[s]) !== -1) {
        selectedBodyParts.splice(selectedBodyParts.indexOf(subCategoriesToRemove[s]), 1);
      }
    }
  }
  console.log(selectedBodyParts);
}

function toggleFemale(bodyPart) {
  if(bodyPart === 'larm' || bodyPart === 'rarm')
    bodyPart = 'arms'
  if(selectedBodyParts.indexOf(bodyPart) === -1) {
    // Change color here
    let parts = description["female"][bodyPart];
    $('.modal-body').children().remove();
    var container = document.createElement("div");
    for (p in parts) {
      let partDiv = document.createElement("div");
      partDiv.setAttribute("class","checkbox");

      let partLabel = document.createElement("label");

      let part = document.createElement("input");
      part.setAttribute("type", "checkbox");
      part.setAttribute("name", parts[p]);
      part.setAttribute("class","maleParts");
      part.addEventListener("click", function () {
        addBodyPart(this.name);
      });
      
      let partTitle = document.createElement("span");
      partTitle.innerHTML = parts[p];
      // All Recommended body parts will be loaded on to the var
      if(recommendedBodyParts.indexOf(parts[p]) !== -1)  
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
    for(s in subCategoriesToRemove) {
      if(selectedBodyParts.indexOf(subCategoriesToRemove[s]) !== -1) {
        selectedBodyParts.splice(selectedBodyParts.indexOf(subCategoriesToRemove[s]), 1);
      }
    }
  }
  console.log(selectedBodyParts);
}

function invokeBodyChange () {
  var obj = {};
  obj['gender'] = 'm';//gender;
  obj['bodyParts'] = selectedBodyParts;
  // Whenever the list of body parts changes, this will get called.
  $.ajax({
      url: 'http://192.168.0.18:8083/dataviz_project/internalgui/getdetail',
      type: 'POST',
      data: obj, // or $('#myform').serializeArray()
      success: function(result) { alert(result); }
  });
}

function colorBodyParts(gender, bodyParts) {

}

Morris.Donut({
  element: 'donut-example',
  data: [
    {label: "Diseases", value: 12},
    {label: "Allergies", value: 30},
    {label: "Medical Conditions", value: 20},
    {label: "Infections", value: 20},
    {label: "Symptoms", value: 20}
    ]
});
