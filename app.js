var baseUrl = 'http://www.civicdata.com/api/action/';

function getOrganizationID() {
  var paramstring = window.location.href.substr(window.location.href.indexOf('?')+1);
  var params = paramstring.split('=');
  return params[1];
}

function beforeSend() {
  $("#loading-button").show();
}

function renderDataSet(response) {
  $("#loading-button").hide();
  $(".navbar-brand").text(response.result.title);
  var url = response.result.resources[0].url;
  $("#org-name").append("<p><a href=\"" + url + "\">Download</a> this data set.</p>");
  $("#org-name").append("<div>");
  $("#org-name").append("<embed height=\"450px\" width=\"800px\" src=\"" + "http://www.civicdata.com/en/dataset/" + response.result.name + "/resource/" + response.result.resources[0].id + "/preview\"/>");
     $("#org-name").append("</div>");
}

// Render the result.
function renderDataSetList(response) {
  $("#loading-button").hide();
  $("#org-name").append("<h3>Open Data Sets</h3>");
  $(".navbar-brand").text(response.result.title);
  for(var i=0; i<response.result.packages.length; i++) {
    var description = response.result.packages[i].notes == '' ? 'No description available' : response.result.packages[i].notes
    $("#dataset-list").append("<h4 class=\"heading\">" + response.result.packages[i].title + "</h4>");
    $("#dataset-list").append("<div class=\"well well-sm\">Description: " + description + ".<br/><a href=\"data.html?id=" + response.result.packages[i].id + "\">View this dataset</a></div>");
  }
}

function handleError() {
  $("#loading-button").removeClass("btn-warning").addClass("btn-error").text('An error occured');
}