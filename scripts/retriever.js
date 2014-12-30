var pageIndex = 0;

$( document ).ready(function() {
  loadPageIntoElement("JSONP", addPage());
  loadPageIntoElement("Copenhagen", addPage());
  addSearchPage()
});

function addPage() {
	var pageId = "page" + pageIndex++;

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

	// Scroll to reveal the new pane
	var newPageOffset = $("#" + pageId).offset().left;
	var offsetDelta = $(".wikibrowser-host").scrollLeft();
	$(".wikibrowser-host").animate({scrollLeft: offsetDelta + newPageOffset}, 400);

	return pageId;
}

function addSearchPage() {
	var pageId = "page" + pageIndex++;

	var tempContainer = document.createElement("div");
	tempContainer.innerHtml = 
'			<div class="wikibrowser-page-host">' +
'				<div class="wikibrowser-page ps-container ps-active-y" id="' + pageId + '">'+
'					<div class="pre-content">'+
'						<h1 id="section_0"></h1>'+
'					</div>'+
'					<div id="content" class="content">'+
'                        <p><strong>Search</strong><br />'+
'                        <input type="text" placeholder="Coming soon"></input></p>'+
'                        <p>Other upcoming features:<br />'+
'                            <ul>'+
'                                <li>Close and rearrange articles</li>'+
'                                <li>Set bookmarks and leave notes</li>'+
'                                <li>Save, restore and share your layout</li>'+
'                            </ul>'+
'                        </p>'+
'                        <p><strong>How do I use this?</strong><br />'+
'                        Click on links in Wikipedia articles on the left. They will open new articles side by side!</p>'+
'                   </div>'+
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
	    cache: 'true' // defaults to false for jsonp.	    
	})
	.done(function(data) {
		$( "#" + element + " > .pre-content > h1" ).append( data.parse.displaytitle );
		$( "#" + element + " > .content" ).append( data.parse.text['*'] );
		$( "#" + element + " > .content a").each(fixHyperlink);
		$( "#" + element ).perfectScrollbar({
			wheelSpeed: 3
		});
	});  
}

function fixHyperlink(index, element)
{
	var jElement = $(element);
	var address = jElement.attr('href');
	if (address.substring(0, 6) === '/wiki/')
	{
		jElement.attr('href', "http://en.wikipedia.org" + address);
		jElement.on('click', function() {
			loadPageIntoElement(address.substring(6), addPage());
			return false; // prevent going to href (wikipedia)
		})
	}
	if (address.substring(0, 1) !== '#')
	{
		jElement.attr('target', "_blank");
	}
}