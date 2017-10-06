var SLIDE_WITH_FB_PLUGIN = 0; //change if needed
var ANIMATE_TOGGLE = false;

var FbFeedModel = function() {
    this.feed = ko.observableArray();
    this.latestDate = 0;
    this.fadeIn = function(domNode, index, element) {
            if (domNode.nodeType === 1 && ANIMATE_TOGGLE){
            	$(domNode).hide().fadeIn({
                    duration: 2000,
                    easing: "easeInQuad"
                });
            }
        }
};

function updateEntry(entry){

	entry.photo = "https://graph.facebook.com/"+entry.object_id+"/picture?type=normal";

	var msg = (entry.message ? entry.message : entry.story);

	if (msg.length > 100){
	   entry.trunc = msg.substring(0,100)+'...';
	}else{
		entry.trunc = msg;
	}

	if(!entry.shares){
		entry.shares = {count:0};
	}

	if(entry.type == "link"){
		entry.type_link_name = "go to link";
		entry.photo = entry.attachments.data[0].media.image.src;
	}else if(entry.type =="video"){
		entry.type_link_name = "watch video";
		entry.photo = entry.attachments.data[0].media.image.src;
	}else{
		entry.type_link_name = "view post";
	}

	return entry;
}

var instFBFeedModel = new FbFeedModel();
ko.applyBindings(instFBFeedModel);


$.get("https://graph.facebook.com/277595262589101/feed?limit=5&fields=created_time,message,story,id,shares,likes.limit(0).summary(true),link,type,message_tags,attachments,status_type,object_id&access_token=1084796521630695%7CXA-8-k2H2F3U6lJHjkjt1m-RgEg", function(result){
	var first = true;

	result.data.forEach(function(entry) {

		if(first){
			first=false;
			instFBFeedModel.latestDate = (new Date(entry.created_time).getTime()/1000);
		}

	    instFBFeedModel.feed.push(updateEntry(entry));
	});

	ANIMATE_TOGGLE = true;
})

var prevSlide = 0;

$('.carousel-hero').on('afterChange', function(event, slick, currentSlide, nextSlide){
  var first = true;

  if(prevSlide != currentSlide && currentSlide == SLIDE_WITH_FB_PLUGIN){

  	prevSlide = currentSlide;
  	
  	$.get("https://graph.facebook.com/277595262589101/feed?since="+instFBFeedModel.latestDate+"&limit=5&fields=created_time,message,story,id,shares,likes.limit(0).summary(true),link,type,message_tags,attachments,status_type,object_id&access_token=1084796521630695%7CXA-8-k2H2F3U6lJHjkjt1m-RgEg", function(result){
		

		result.data.forEach(function(entry) {

			if(first){
				first=false;
				instFBFeedModel.latestDate = (new Date(entry.created_time).getTime()/1000 );
			}

			var toTop = instFBFeedModel.feed.pop();
		    instFBFeedModel.feed.unshift(updateEntry(entry));
		});
	})

	if(first){ //cycle bottom to top
		var toTop = instFBFeedModel.feed.pop();
		instFBFeedModel.feed.unshift(updateEntry(toTop));
	}

  }else{
  	prevSlide = currentSlide;
  }
});
