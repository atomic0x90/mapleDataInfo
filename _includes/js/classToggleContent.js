function classToggleContent(className){
	var classList = ['adventurer', 'cygnus', 'resistance', 'heros', 'nova', 'ref', 'anima', 'etc'];

	for(var i = 0;i < classList.length;i++){
		if(classList[i] == className) continue;

		var content = document.getElementsByClassName('class-' + classList[i] + '-detail-list');

		for(var j = 0;j < content.length;j++)
			content[j].classList.remove('visible');
	}

	var targetContent = document.getElementsByClassName('class-' + className + '-detail-list');
	targetContent[0].classList.toggle('visible');
}
