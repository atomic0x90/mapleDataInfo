function resultDisplayState(what){
	const resultLinkSkill = document.getElementById('result-link-skill');
	const resultHyperpassiveSkill = document.getElementById('result-hyper-passive-skill');
	const resultSixSkill = document.getElementById('result-six-skill');

	resultLinkSkill.style.display = 'none';
	resultHyperpassiveSkill.style.display = 'none';
	resultSixSkill.style.display = 'none';

	if(what == 'linkSkill') resultLinkSkill.style.display = 'block';
	else if(what == 'hyperpassiveSkill') resultHyperpassiveSkill.style.display = 'block';
	else if(what == 'sixSkill') resultSixSkill.style.display = 'block';
}
