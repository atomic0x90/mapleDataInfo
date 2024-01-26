document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('.class-adventurer').click();
	document.querySelector('.class-img-hero').click();
	document.querySelector('#what-link-skill').click();
});

function handleClick(className){
	if(className === 'adventurer'){
		classToggleContent('adventurer');
	}
	else if(className === 'img-hero'){
		handleClassImgClick('hero');
	}
	else if(className === 'what-link-skill'){
		whatToggleContent('linkSkill');
	}
}
