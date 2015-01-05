var movingTooltip;
var movingTooltipPointer;
var movingTooltipFinalContent;
var movingTooltipTempContent;
var header;
var hoveredElements = 0;

$( document ).ready(function() {
	movingTooltip = $('#moving-tooltip');
	movingTooltipFinalContent = $('#visible-tooltip span');
	movingTooltipTempContent = $('#hidden-tooltip span');
	movingTooltipPointer = $('#tooltip-pointer');
	header = $('.wikibrowser-header'); // TODO: make it an ID
	setUpTooltips();
});

function setUpTooltips() {
	var elements = $(".wikibrowser-header .header-element");
	$.each(elements, function(index, element) {
		$(element).hover(mouseEnter, mouseLeave);
	});
}

function mouseEnter() {
	hoveredElements++;

	var jElement = $(this);
	var newTooltipContent = jElement.attr('alt');

	// Before taking measurements, update tooltip's contents
	movingTooltipTempContent.html(newTooltipContent);

	var elementPosition = jElement.offset().left;
	var elementWidth = jElement.outerWidth(false);
	var tooltipWidth = movingTooltipTempContent.outerWidth(true);
	var screenWidth = header.width();
	//console.log(elementPosition +", "+ elementWidth +", "+ tooltipWidth+", "+ screenWidth);
	
	var targetPosition = elementPosition + elementWidth * 0.5 - 6;
	var tooltipOffset = targetPosition - tooltipWidth * 0.5 - 10;
	// Movement is bound on the right side
	if (targetPosition + tooltipWidth * 0.5 > screenWidth - 30)
	{
		tooltipOffset = screenWidth - tooltipWidth - 30;
	}
	// Movement is bound on the left side
	if (targetPosition - tooltipWidth * 0.5 < 30)
	{
		tooltipOffset = 30;
	}

	movingTooltip.stop().animate(
		{
			opacity: 1
		},
		{
			duration: 200,
			queue: false
		}
	);
	movingTooltipPointer.stop().animate(
		{
			opacity: 1
		},
		{
			duration: 200,
			queue: false
		}
	);
	movingTooltip.animate(
		{
			width: tooltipWidth,
			left: tooltipOffset
		},
		{
			duration: 400,
			queue: false
		}
	);
	movingTooltipPointer.animate(
	{
			left: targetPosition,
		},
		{
			duration: 400,
			queue: false
		}
	);	
	movingTooltipFinalContent.animate(
		{ 
			opacity: '0'
		},
		{
			duration: 200,
			queue: false,
		 	always: function() {
		 		movingTooltipFinalContent.animate(
		 			{
		 				opacity: '1'
		 			},
		 			{
		 				duration: 200,
		 				queue: false
		 			}
		 		);
		 		movingTooltipFinalContent.html(newTooltipContent);
		 	}
		}
	);
}

function mouseLeave() {
	hoveredElements--;
	if (hoveredElements == 0) {
		movingTooltip.stop().animate(
			{
				opacity: 0
			},
			{
 				duration: 200,
 				queue: false
			}
		);
		movingTooltipPointer.stop().animate(
			{
				opacity: 0
			},
			{
 				duration: 200,
 				queue: false
			}
		);
 		movingTooltipFinalContent.stop().animate(
 			{
 				opacity: '0'
 			},
 			{
 				duration: 200,
 				queue: false
 			}
 		);		
	}
}