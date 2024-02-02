/*document.addEventListener("DOMContentLoaded", function() {
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
}*/
const jobs = [
"전사-히어로", 
"전사-팔라딘", 
"전사-다크나이트", 
"마법사-아크메이지(불,독)", 
"마법사-아크메이지(썬,콜)", 
"마법사-비숍", 
"궁수-보우마스터", 
"궁수-신궁", 
"궁수-패스파인더", 
"도적-나이트로드", 
"도적-섀도어", 
"도적-듀얼블레이더", 
"해적-바이퍼", 
"해적-캡틴", 
"해적-캐논마스터", 
"기사단-소울마스터", 
"기사단-플레임위자드", 
"기사단-윈드브레이커", 
"기사단-나이트워커", 
"기사단-스트라이커", 
"기사단-미하일", 
"아란-전체 전직", 
"에반-전체 전직", 
"레지스탕스-배틀메이지", 
"레지스탕스-와일드헌터", 
"레지스탕스-메카닉", 
"레지스탕스-데몬슬레이어", 
"레지스탕스-데몬어벤져", 
"레지스탕스-제논", 
"레지스탕스-블래스터", 
"메르세데스-전체 전직", 
"팬텀-전체 전직", 
"루미너스-전체 전직", 
"카이저-전체 전직", 
"엔젤릭버스터-전체 전직", 
"초월자-제로", 
"은월-전체 전직", 
"프렌즈 월드-키네시스", 
"카데나-전체 전직", 
"일리움-전체 전직", 
"아크-전체 전직", 
"호영-전체 전직", 
"아델-전체 전직", 
"카인-전체 전직", 
"라라-전체 전직", 
"칼리-전체 전직"
];

function resultDataProcessTestAdsense(where, server, data, job) {
	if(data[0] == 0) return;

	const divID = document.getElementById('main-right');

	const divContainer = document.createElement('div');
	var what;
	if(where == 'hunt') what = '사냥 링크 사용률';
	else if(where == 'boss') what = '보스 링크 사용률';
	else if(where == 'hyper') what = '하이퍼 패시브 스킬 사용률';
	else if(where == 'six') what = '6차 스킬 강화 평균';

	const lineBreak = document.createElement('br');

	divContainer.textContent = (server == 0 ? '일반 월드' : '리부트 월드') + '의 '+job+' 직업의 ' + what + ' 은 다음과 같습니다.\n';

	divID.appendChild(divContainer);

	const num = data[0];
	var jsonData = data[1];

	if(where == 'hunt' || where == 'boss'){
		const sortedData = jsonData.sort((a, b) => {
			const A = (Number(a.skill_level) / Number(num)) * 100;
			const B = (Number(b.skill_level) / Number(num)) * 100;

			if(A != B) return B - A; //내림차순

			//오름차순
			return a.skill_name.localeCompare(b.skill_name);
		});

		jsonData = sortedData;
	}
	else if(where == 'six'){
		const sortedData = jsonData.sort((a, b) => {
			return a.skill_name.localeCompare(b.skill_name);
		});

		jsonData = sortedData;
	}


	const container = document.createElement('span');

	for (let i = 0; i < jsonData.length; i++) {
		const text = document.createElement('span');

		if(where != 'six'){
			text.textContent = `${jsonData[i].skill_name} 은(는) ${((Number(jsonData[i].skill_level) / Number(num)) * 100).toFixed(2)}% 사용하고 있습니다.`;
		}
		else{
			text.textContent = `${jsonData[i].skill_name} 은(는) 평균 Lv.${(Number(jsonData[i].skill_level) / Number(num)).toFixed(2)}만큼 강화 했습니다.`;
		}

		container.appendChild(text);
		const lineBreak = document.createElement('br');
		container.appendChild(lineBreak);
	}

	divID.appendChild(container);
	divID.appendChild(lineBreak);
}

async function adsenseTest(){
	var linkSkillHunt0, linkSkillHunt1, linkSkillBoss0, linkSkillBoss1;
	var hyperpassiveSkill0, hyperpassiveSkill1;
	var sixSkill0, sixSkill1;

	for(job of jobs){
		linkSkillHunt0 = await readResultFile('LinkSkillHunt',0,job);
		linkSkillHunt1 = await readResultFile('LinkSkillHunt',1,job);
		linkSkillBoss0 = await readResultFile('LinkSkillBoss',0,job);
		linkSkillBoss1 = await readResultFile('LinkSkillBoss',1,job);

		resultDataProcessTestAdsense('hunt', 0, linkSkillHunt0,job);
		resultDataProcessTestAdsense('hunt', 1, linkSkillHunt1,job);
		resultDataProcessTestAdsense('boss', 0, linkSkillBoss0,job);
		resultDataProcessTestAdsense('boss', 1, linkSkillBoss1,job);

		hyperpassiveSkill0 = await readResultFile('HyperpassiveSkill',0,job);
		hyperpassiveSkill1 = await readResultFile('HyperpassiveSkill',1,job);

		resultDataProcessTestAdsense('hyper', 0, hyperpassiveSkill0,job);
		resultDataProcessTestAdsense('hyper', 1, hyperpassiveSkill1,job);

		sixSkill0 = await readResultFile('SixSkill',0,job);
		sixSkill1 = await readResultFile('SixSkill',1,job);

		resultDataProcessTestAdsense('six', 0, sixSkill0,job);
		resultDataProcessTestAdsense('six', 1, sixSkill1,job);
	}
	
}

adsenseTest();
