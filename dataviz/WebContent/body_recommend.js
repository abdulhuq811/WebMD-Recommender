// Fpr male or female. When toggled, this should be cleared off
var selectedBodyParts = new Array();
var recommendedBodyParts = new Array();

function toggleGender () {
  selectedBodyParts = new Array();
  recommendedBodyParts = new Array();
}

function addBodyPart (label) {
  if(selectedBodyParts.indexOf(label) === -1) {
   selectedBodyParts.push(label);
  } else {
    selectedBodyParts.splice(selectedBodyParts.indexOf(label), 1);
    // ALso remove the associated parts
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
      let part = document.createElement("input");
      part.setAttribute("type", "checkbox");
      part.setAttribute("name", parts[p]);
      part.setAttribute("class","maleParts");
      part.addEventListener("click", function () {
        addBodyPart(this.name);
      });
      container.appendChild(part);

      let partLabel = document.createElement("span");
      partLabel.innerHTML = parts[p];
      // All Recommended body parts will be loaded on to the var
      if(recommendedBodyParts.indexOf(parts[p]) !== -1)  
        partLabel.style.fontWeight = 'bold';
      container.appendChild(partLabel);
      container.appendChild(part);
    }
    $('.modal-body').append(container);
    $('.modal').modal('toggle');
    // Add to the selected list
    selectedBodyParts.push(bodyPart);
  } else {
    // Remove that part from selected list
    selectedBodyParts.splice(selectedBodyParts.indexOf(bodyPart), 1);
  }
  console.log(selectedBodyParts);
  invokeBodyChange('m');
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
      let part = document.createElement("input");
      part.setAttribute("type", "checkbox");
      part.setAttribute("name", parts[p]);
      part.setAttribute("class","maleParts");
      part.addEventListener("click", function () {
        addBodyPart(this.name);
      });
      container.appendChild(part);

      let partLabel = document.createElement("span");
      partLabel.innerHTML = parts[p];
      // All Recommended body parts will be loaded on to the var
      if(recommendedBodyParts.indexOf(parts[p]) !== -1)  
        partLabel.style.fontWeight = 'bold';
      container.appendChild(partLabel);
      container.appendChild(part);
    }
    $('.modal-body').append(container);
    $('.modal').modal('toggle');
    // Add to the selected list
    selectedBodyParts.push(bodyPart);
  } else {
    // Remove that part from selected list
    selectedBodyParts.splice(selectedBodyParts.indexOf(bodyPart), 1);
  }
  console.log(selectedBodyParts);
  invokeBodyChange('f');
}

function invokeBodyChange (gender) {
	  var obj = {};
	  obj['gender'] = gender;
	  obj['topics'] = selectedBodyParts ;
	  var v=JSON.stringify(obj);
	  
	  // Whenever the list of body parts changes, this will get called.
	  console.log(obj);
	  $.ajax({
	      url: 'http://localhost:8080/dataviz/internalgui/getdetail',
	      dataType:'json',
	      contentType:'application/json; charset=utf-8',
	      type: 'POST',
	      data: v,
	      success: function(result) { console.log(result); }
	  });
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
