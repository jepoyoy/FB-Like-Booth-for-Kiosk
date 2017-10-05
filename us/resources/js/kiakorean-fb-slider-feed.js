var FbFeedModel = function() {
    this.feed = ko.observableArray();
};

var instFBFeedModel = new FbFeedModel();
ko.applyBindings(instFBFeedModel);

$.get("https://graph.facebook.com/277057641177/feed?fields=created_time,message,story,id,shares,likes.limit(0).summary(true),link,type,message_tags,attachments,status_type,object_id&access_token=1084796521630695%7CXA-8-k2H2F3U6lJHjkjt1m-RgEg", function(result){
	result.data.forEach(function(entry) {
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

	    instFBFeedModel.feed.push(entry);
	});
})

