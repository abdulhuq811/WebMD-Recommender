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
  if(selectedBodyParts.indexOf(label) === -1) {
   selectedBodyParts.push(label);
  } else {
    selectedBodyParts.splice(selectedBodyParts.indexOf(label), 1);
  }
}

$(document).ready(function() {
  testCreate();
  var maleBody = $('#maleBody g path');
  var femaleBody = $('#femaleBody g path');
  maleBody.on('click', function(e) {
    var currEle = $(e.target);
    var currVal = currEle[0].getAttribute('fill-opacity');
    toggleMale(currEle[0].getAttribute("value"))
    if (selectedBodyParts.indexOf(currEle[0].getAttribute("value")) !== -1) {
      currEle[0].setAttribute('fill-opacity', 0.4);
      currEle[0].setAttribute('fill', '#111');
    } else {
      currEle[0].setAttribute('fill-opacity', 0);
      currEle[0].setAttribute('fill', '#111');
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
    bodyPart = 'Arms'
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
    bodyPart = 'Arms'
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
    obj['gender'] = selectedGender;
    obj['topics'] = selectedBodyParts ;
    var objVal = JSON.stringify(obj);
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://localhost:8080/dataviz_project/internalgui/getdetail',
        dataType:'json',
        contentType:'application/json; charset=utf-8',
        type: 'POST',
        data: objVal,
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

function testCreate() {
  var disease = ["Nails","Legs","Chest"];
  var allergies = ["ea","eb","ec"];
  var drugs = ["aa","bb","cc"];
  createList(disease, 'problem');
  createList(allergies, 'solution');
  createList(drugs, 'reason');

  extractBodyParts(disease);
}

function extractBodyParts(recommendedList) {
  var body = description[selectedGender];
  var bodyParts = new Array();
  for(b in body){
    if(recommendedList.indexOf(b) !== -1) {
      if(bodyParts.indexOf(b) === -1)
        bodyParts.push(b);
    }
    for(p in body[b]){
      if(recommendedList.indexOf(body[b][p]) !== -1)
        if(bodyParts.indexOf(b) === -1)
          bodyParts.push(b);
    }
  }
  console.log(bodyParts);
  colorBodyParts(bodyParts);
}

function colorBodyParts(bodyParts) {
  let body;
  if(selectedGender === 'male') {
    body = $('#maleBody g path');
  } else {
    body = $('#femaleBody g path');
  }
  for(b in body) {
    // If recommended
    if(body[b].tagName === 'path'){
      if(bodyParts.indexOf(body[b].getAttribute("value")) !== -1) {
        if(selectedBodyParts.indexOf(body[b].getAttribute("value")) === -1) { 
          // If it is already not selected
          body[b].setAttribute('fill-opacity', 0.5);
          body[b].setAttribute('fill', "#f23726");
        }
      } else { // Else remove colors (handles prev recos)
        body[b].setAttribute('fill-opacity', 0);
        body[b].setAttribute('fill', "#111");
      }
    }
  }
}

function createList(suggestions, location) {
  let loc = document.getElementById(location);
  $('#'+location).children().remove();
  let listHead = document.createElement("ol");
  for (s in suggestions) {
    let listEntry = document.createElement("li");
    listEntry.innerHTML = suggestions[s];
    listHead.appendChild(listEntry);
  }
  loc.appendChild(listHead);
}

function createPosts(posts) {
  var postLoc = document.getElementById("postsLoc");
  $('#postsLoc').children().remove();
  for(p in posts){  
    let wrapper = document.createElement("div");
    wrapper.setAttribute("class","list-group");
    
    let anchor = document.createElement("a");
    anchor.setAttribute("class", "list-group-item list-group-item-action");
    
    let head = document.createElement("a");
    head.setAttribute("class","list-group-item-heading");
    head.setAttribute("href",posts[p].questionURL);
    head.innerHTML = posts[p].question;

    let content = document.createElement("p");
    content.setAttribute("class", "list-group-item-text");

    let relevance = document.createElement("i");
    relevance.setAttribute("class","fa fa-star");
    relevance.setAttribute("aria-hidden","true");
    relevance.innerHTML="Relevance&nbsp;&nbsp;" + posts[p].rating;

    let tags = document.createElement("span");
    let tagList='';
    for(t in posts[p].tags) {
      if(posts[p].tag[t]){
        tagList+="&nbsp;"+posts[p].tag[t];
      }
    }
    tags.innerHTML="Tags:"+tagList;

    content.appendChild(relevance);
    content.appendChild(tags);

    wrapper.appendChild(anchor);
    wrapper.appendChild(head);
    wrapper.appendChild(content);

    postLoc.appendChild(wrapper);
  }
}