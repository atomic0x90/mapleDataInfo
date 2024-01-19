async function whatToggleContent(what){
	try{
		console.log(clickedClassName+' '+what);
		if(clickedClassName != ''){
			className = classChangeKorean(clickedClassName);
			console.log("className:"+className);

			var linkSkillHunt0, linkSkillHunt1, linkSkillBoss0, linkSkillBoss1;
			var hyperpassiveSkill0, hyperpassiveSkill1;
			var sixSkill0, sixSkill1;

			resultBoxInit();

			if(what == 'linkSkill'){
				linkSkillHunt0 = await readResultFile('LinkSkillHunt',0,className);
				linkSkillHunt1 = await readResultFile('LinkSkillHunt',1,className);
				linkSkillBoss0 = await readResultFile('LinkSkillBoss',0,className);
				linkSkillBoss1 = await readResultFile('LinkSkillBoss',1,className);

				resultDataProcess('hunt', 0, linkSkillHunt0);
				resultDataProcess('hunt', 1, linkSkillHunt1);
				resultDataProcess('boss', 0, linkSkillBoss0);
				resultDataProcess('boss', 1, linkSkillBoss1);
				resultDisplayState(what);
			}
			else if(what == 'hyperpassiveSkill'){
				hyperpassiveSkill0 = await readResultFile('HyperpassiveSkill',0,className);
				hyperpassiveSkill1 = await readResultFile('HyperpassiveSkill',1,className);

				resultDataProcess('hyper', 0, hyperpassiveSkill0);
				resultDataProcess('hyper', 1, hyperpassiveSkill1);
				resultDisplayState(what);
			}
			else if(what == 'sixSkill'){
				sixSkill0 = await readResultFile('SixSkill',0,className);
				sixSkill1 = await readResultFile('SixSkill',1,className);

				resultDataProcess('six', 0, sixSkill0);
				resultDataProcess('six', 1, sixSkill1);
				resultDisplayState(what);
			}
		}
	}catch(error){
		console.error(`Error whatToggleContent:`,error);
	}
}

function resultBoxInit(){
	const where1 = document.getElementById('hunt-box-0');
	const where2 = document.getElementById('hunt-box-1');
	const where3 = document.getElementById('boss-box-0');
	const where4 = document.getElementById('boss-box-1');
	const where5 = document.getElementById('hyper-box-0');
	const where6 = document.getElementById('hyper-box-1');
	const where7 = document.getElementById('six-box-0');
	const where8 = document.getElementById('six-box-1');

	where1.innerHTML = '';
	where2.innerHTML = '';
	where3.innerHTML = '';
	where4.innerHTML = '';
	where5.innerHTML = '';
	where6.innerHTML = '';
	where7.innerHTML = '';
	where8.innerHTML = '';
}
