$(".slider").each(function(){
	var $this = $(this); //gets the current slider
	var $group = $this.find(".slide-group"); //gets the slide group container
	var $slides = $this.find(".slide");//object to hold all slides
	var buttonArray =[];//array to hold nav buttons
	var currentIndex = 0; //index of current slide
	var timeout; //used to store the timer
	
	
	
	function move(newIndex){
		var animateLeft, slideLeft;
		
		advance();//resets the timer
		
		//This checks if you are clicking on the current slide, and if so does nothing
		if($group.is(":animated")||currentIndex===newIndex){
			return;
			}
		//This changes the class of the buttons, so the color changes on the bottom
		buttonArray[currentIndex].removeClass("active");
		buttonArray[newIndex].addClass("active");
		
		// I removed the following line, because this makes the first slide 
		// come from the left slide when it reaches the end.  I don't think that
		// looks correct.  They should appear to be going in a loop.
		//if(newIndex>currentIndex){
			slideLeft = "100%"; //puts the element 100% to right relative to the left edge.
			animateLeft = "-100%"; //puts the element 
		//} else{
		//	slideLeft = "100%";
		//	animateLeft ="-100%";
		//}
		
		$slides.eq(newIndex).css({left:slideLeft, display:"block"});
		
		$group.animate({left:animateLeft},function(){
			$slides.eq(currentIndex).css({display:"none"});
			$slides.eq(newIndex).css({left:0});
			$group.css({left:0});
			currentIndex = newIndex;
		});
	}
	
	function advance(){
		clearTimeout(timeout);
		//this sets the timer to run an anonymous function every 4 seconds
		timeout=setTimeout(function(){
			if(currentIndex<($slides.length -1)){
				move(currentIndex + 1);
			} else {
				move(0);
			}
		}, 4000);
	}
	
	$.each($slides, function(index){
		var $button = $("<button type='button' class='slide-btn'>&bull;</button>");
		if (index === currentIndex){
			$button.addClass("active");
		} 
		$button.on("click", function(){
			move(index);
		}).appendTo(".slide-buttons"); //adds buttons to the HTML page
		buttonArray.push($button);   //adds them one at a time to the array
	});
	
	advance();
});
				
			