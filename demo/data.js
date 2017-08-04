var TUTORIAL_APP = TUTORIAL_APP || {};
(function () {
	TUTORIAL_APP.data = [1,3];
})(); 

var tourConfig = {
	WALK : [{
		title : "Welcome!",
		subtitle : "Have a look around ",
		description : "<p>With the help of the icons of top of the page access your inbox, Tasks and Feeds for content shared or delivered to you.</p><p style='margin-top:30px'>Your Companies & Groups will be listed below with latest activity on top. You can access Inbox, Feeds and Shared tasks for your Company/Group</p>",
		image:"demo/img/12.jpg",
	},{
		title : "Let’s introduce you to our platform features",
		subtitle : "Where to find the basic features",
		image:"demo/img/9.jpg",
		description : "The new icons on top.With the help of the icons of top of the page access your Inbox, Tasks and Feeds for the content shared or delivered to you"
	},{
		title : "How to create your company",
		subtitle : "How to create your company",
		image:"demo/img/3.jpg",
		description : "Search,Pick your company, Activate with payment Register in Simpler Invoicing Network"
	},{
		title : "How to activate your company",
		subtitle : "How to activate your company",
		image:"demo/img/4.jpg",
		description : "Based on the event or direct action it should be possible to launch the tutorail which will appear on the screen and it will allows you to navigate through the steps"
	},{
		title : "Why chose to register your company",
		subtitle : "Why chose to register your company",
		image:"demo/img/5.jpg",
		description : "After sign in to the the platform an event will be initiated from the front end logic to launch the tutorial. This event can be turned ON/OFF for each collabrr installation."
	},{
		title : "How to create an app connection?",
		subtitle : "How to create an app connection?",
		image:"demo/img/6.jpg",
		description : "<p>By conceving it as an application we avoid adding this feature to base collabrr platform.</p><p> Based on the context of usage of collabrr platform (like eVerbinding) we will have the freedom to create new tutorials in the language desired. It will also help in creating specific logic to decide upon which tutorial to launch.</p>"
	}],
	TEST: [{
		title : "Test",
		subtitle : "New Look and Feel ",
		description : "Thanks to you feedback we have created this brand new look.All existing features are here in a new future proof platform.All existing data is transfered.The new design...Is mobile frendlySimpler look-and-feel.Aligned to the marked standards.Is ready for new features",
		image:"demo/img/1.jpg",
	}]
};

function getTutorialById(id){
	return tourConfig[id].slice(0)
}

function getTutorialList(){
	var keys = Object.keys(tourConfig);
	var TutResult = [];
	for (var i = 0; i < keys.length; i++) {
		var temp = {
			index : i+1,
			name : keys[i]
		}
		TutResult.push(temp);
	}
	return TutResult;
}









