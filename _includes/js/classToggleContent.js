function classToggleContent(className){
	var classList = ['adventurer', 'cygnus', 'resistance', 'heros', 'nova', 'ref', 'anima', 'etc'];

	for(var i = 0;i < classList.length;i++){
		if(classList[i] == className) continue;

		var content = document.getElementsByClassName('class-' + classList[i] + '-detail-list');

		for(var j = 0;j < content.length;j++)
			content[j].style.display = 'none';
	}

	var targetContent = document.getElementsByClassName('class-' + className + '-detail-list');

	if(targetContent[0].style.display == 'flex') targetContent[0].style.display = 'none';
	else targetContent[0].style.display = 'flex';
}
