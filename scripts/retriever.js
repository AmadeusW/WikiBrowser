var pageIndex = 0;

$( document ).ready(function() {
  console.log("ready");
  loadPageIntoElement("Copenhagen", addPage());
  loadPageIntoElement("Amadeus", addPage());
});

function addPage() {
	var pageId = "page" + pageIndex++;
	console.log("Creating element " + pageId);

	var tempContainer = document.createElement("div");
	tempContainer.innerHtml = 
'			<div class="wikibrowser-page-host">' +
'				<div class="wikibrowser-page ps-container ps-active-y" id="' + pageId + '">'+
'					<div class="pre-content">'+
'						<h1 id="section_0"></h1>'+
'					</div>'+
'					<div id="content" class="content"></div>'+
'				</div>'+
'			</div>';

	$(".wikibrowser-host").append(tempContainer.innerHtml);
	return pageId;
}

function loadPageIntoElement(page, element) {
	$.ajax({
	    url : "http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?&continue=&page=" + page,
	    data: {
	    	format: 'json'
	    },
	    dataType: 'jsonp',
	    success : function(result){
	        console.log("success");
	    }
	})
	.done(function(data) {
		console.log("injecting into " + element);
		console.log(data);
		$( "#" + element + " > .pre-content > h1" ).append( data.parse.displaytitle );
		$( "#" + element + " > .content" ).append( data.parse.text['*'] );
		$( "#" + element ).perfectScrollbar({
			wheelSpeed: 3
		});
	});  
}