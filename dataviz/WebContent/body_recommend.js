// Fpr male or female. When toggled, this should be cleared off
var selectedBodyParts = new Array();
var recommendedBodyParts = new Array();
var selectedGender = 'male'

function toggleGender(gender) {
  selectedBodyParts = new Array();
  recommendedBodyParts = new Array();
  selectedGender = gender;
  $('#selected-tags').children().remove();
  clearColoring();
}

function addBodyPart(label) {
  if(selectedBodyParts.indexOf(label) === -1) {
   selectedBodyParts.push(label);
  } else {
    selectedBodyParts.splice(selectedBodyParts.indexOf(label), 1);
  }
}

$(document).ready(function() {
    var maleBody = $('#maleBody g path');
    var femaleBody = $('#femaleBody g path');

    maleBody.on('click', function(e) {
        var tags = [];
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
        if (selectedBodyParts.indexOf(currEle[0].getAttribute("value")) !== -1) {
          currEle[0].setAttribute('fill-opacity', 0.4);
          currEle[0].setAttribute('fill', '#111');
        } else {
          currEle[0].setAttribute('fill-opacity', 0);
          currEle[0].setAttribute('fill', '#111');
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
        loadDefaultLists();
        $('search-wrapper').prop('class', 'modal fade search-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.search-wrapper').modal('show');
    });

    $('.graph-toggle').click(function(event) {
        getDonut()
        $('graph-wrapper').prop('class', 'modal fade graph-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.graph-wrapper').modal('show');
    });

    $('.posts-toggle').click(function(event) {
         getPostsData()
         $('posts-wrapper').prop('class', 'modal fade posts-wrapper') // revert to default
            .addClass($(this).data('direction'));
        $('.posts-wrapper').modal('show');
    });
});

function toggleMale(bodyPart) {
  if(bodyPart === 'larm' || bodyPart === 'rarm')
    bodyPart = 'Arms'
  if(selectedBodyParts.indexOf(bodyPart) === -1) {
    // Change color here
    let parts = description["male"][bodyPart];
    $('#myModal .modal-body').children().remove();
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
    $('#myModal .modal-body').append(container);
    $('#myModal').modal('toggle');
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
    if(selectedBodyParts.length === 0)
      clearColoring();
    invokeBodyChange();
  }
}

function toggleFemale(bodyPart) {
  if(bodyPart === 'larm' || bodyPart === 'rarm')
    bodyPart = 'Arms'
  if(selectedBodyParts.indexOf(bodyPart) === -1) {
    // Change color here
    let parts = description["female"][bodyPart];
    $('#myModal .modal-body').children().remove();
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
    $('#myModal .modal-body').append(container);
    $('#myModal').modal('toggle');
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
    if(selectedBodyParts.length === 0)
      clearColoring();
    invokeBodyChange();
  }
}

function invokeBodyChange () {
    var obj = {};
    obj['gender'] = (selectedGender==='male')?'m':'w';
    obj['topics'] = selectedBodyParts ;
    var objVal = JSON.stringify(obj);
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://localhost:8080/dataviz/internalgui/getdetail',
        dataType:'json',
        contentType:'application/json; charset=utf-8',
        type: 'POST',
        data: objVal,
        success: function(result) { extractBodyParts(result.bodyParts); }
    });
}

function loadDefaultLists(){
  getRecommendedList('diseases', 'problem');
  getRecommendedList('drugs', 'solution');
  getRecommendedList('infection', 'reason');  
}

function getRecommendedList(category, location) {
    var obj = {};
    obj['gender'] = (selectedGender==='male')?'m':'w';
    obj['topics'] = selectedBodyParts ;
    obj['category'] = category ;
    var objVal = JSON.stringify(obj);
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://localhost:8080/dataviz/internalgui/getcategories',
        dataType:'json',
        contentType:'application/json; charset=utf-8',
        type: 'POST',
        data: objVal,
        success: function(result) { createList(result.values, location); }
    });
}

function getDonut() {
    var obj = {};
    obj['gender'] = (selectedGender==='male')?'m':'w';
    obj['topics'] = selectedBodyParts ;
    var objVal = JSON.stringify(obj);
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://localhost:8080/dataviz/internalgui/getdonut',
        dataType:'json',
        contentType:'application/json; charset=utf-8',
        type: 'POST',
        data: objVal,
        success: function(result) { populateDonut(result); }
    });
}

function populateDonut(result) {
  console.log(result);
  var data = [];
  for(r in result) {
    var point = {
      y: Number(result[r]),
      indexLabel: r.charAt(0).toUpperCase()+r.substring(1,r.length)+ " #percent%",
      legendText: r.charAt(0).toUpperCase()+r.substring(1,r.length)
    }
    data.push(point);
  }
  console.log(data);
  // Chart
    var chart = new CanvasJS.Chart("donut-example", {
        title: {
            text: "Analytics"
        },
        animationEnabled: true,
        data: [{
            type: "doughnut",
            startAngle: 60,
            toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>",
            showInLegend: false,
            dataPoints: data
        }]
    });
    chart.render();

    // Male Body
    $('.canvasjs-chart-credit').remove();
}

function getPostsData() {
    var obj = {};
    obj['gender'] = (selectedGender==='male')?'m':'w';
    obj['topics'] = selectedBodyParts ;
    var objVal = JSON.stringify(obj);
    // Whenever the list of body parts changes, this will get called.
    $.ajax({
        url: 'http://localhost:8080/dataviz/internalgui/getPosts',
        dataType:'json',
        contentType:'application/json; charset=utf-8',
        type: 'POST',
        data: objVal,
        success: function(result) { createPosts(result); }
    });
}

function clearColoring() {
  if(selectedGender === 'male') {
    body = $('#maleBody g path');
  } else {
    body = $('#femaleBody g path');
  }
  for(b in body) {
    body[b].setAttribute('fill-opacity', 0);
    body[b].setAttribute('fill', "#111");
  }
}

function extractBodyParts(recommendedList) {
  recommendedBodyParts = recommendedList;
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
    
    let head = document.createElement("h5");
    head.setAttribute("class","list-group-item-heading");
    let question = document.createElement("a");

    question.setAttribute("href",posts[p].questionURL);
    question.setAttribute("target","_blank");
    question.innerHTML = posts[p].question;
    head.appendChild(question);

    let content = document.createElement("p");
    content.setAttribute("class", "list-group-item-text");

    let relevance = document.createElement("i");
    relevance.setAttribute("class","fa fa-star");
    relevance.setAttribute("aria-hidden","true");
    relevance.innerHTML="Relevance&nbsp;&nbsp;" + posts[p].rating;

    let tags = document.createElement("span");
    let tagList='';
    for(t in posts[p].tags) {
      if(posts[p].tags[t]){
        tagList+="&nbsp;"+posts[p].tags[t];
      }
    }
    tags.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Tags:"+tagList;

    content.appendChild(relevance);
    content.appendChild(tags);
    anchor.appendChild(head);
    anchor.appendChild(content);
    
    wrapper.appendChild(anchor);
    postLoc.appendChild(wrapper);
  }
}
