$(document).ready(function(){
	activateLauncher();
});

function activateLauncher(){
	$("#launcher").launcher({
		id : "tutLauncher1",
		data :getTutorialById("WALK")
	});	
}
