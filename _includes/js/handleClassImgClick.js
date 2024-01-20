clickedClassName = '';

function handleClassImgClick(className){
	clickedClassName = className;
	console.log(clickedClassName);

	var whatBoxElement = document.querySelector(".what-box");

	whatBoxElement.scrollIntoView({
		behavior: "smooth"
	});
}
