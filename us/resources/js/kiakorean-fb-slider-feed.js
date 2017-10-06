var SLIDE_WITH_FB_PLUGIN = 0; //change if needed

var FbFeedModel = function() {
    this.feed = ko.observableArray();
    this.latestDate = 0;
    this.fadeIn = function(domNode, index, element) {
            if (domNode.nodeType === 1){
            	$(domNode).hide().slideDown();
            }
        }
};

function updateEntry(entry){

	entry.photo = "https://graph.facebook.com/"+entry.object_id+"/picture?type=normal";

	if (entry.message.length > 100){
	   entry.trunc = entry.message.substring(0,100)+'...';
	}else{
		entry.trunc = entry.message;
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


$.get("https://graph.facebook.com/277057641177/feed?limit=5&fields=created_time,message,story,id,shares,likes.limit(0).summary(true),link,type,message_tags,attachments,status_type,object_id&access_token=1084796521630695%7CXA-8-k2H2F3U6lJHjkjt1m-RgEg", function(result){
	var first = true;

	result.data.forEach(function(entry) {

		if(first){
			first=false;
			instFBFeedModel.latestDate = (new Date(entry.created_time).getTime()/1000) -1;
		}

	    instFBFeedModel.feed.push(updateEntry(entry));
	});
})

var prevSlide = 0;

$('.carousel-hero').on('afterChange', function(event, slick, currentSlide, nextSlide){

  if(prevSlide != currentSlide && currentSlide == SLIDE_WITH_FB_PLUGIN){

  	$.get("https://graph.facebook.com/277057641177/feed?since="+instFBFeedModel.latestDate+"&limit=5&fields=created_time,message,story,id,shares,likes.limit(0).summary(true),link,type,message_tags,attachments,status_type,object_id&access_token=1084796521630695%7CXA-8-k2H2F3U6lJHjkjt1m-RgEg", function(result){
		var first = true;

		result.data.forEach(function(entry) {

			if(first){
				first=false;
				instFBFeedModel.latestDate = (new Date(entry.created_time).getTime()/1000 ) -1;
			}

			instFBFeedModel.feed.pop();
		    instFBFeedModel.feed.unshift(updateEntry(entry));
		});
	})

  }else{
  	prevSlide = currentSlide;
  }
});
