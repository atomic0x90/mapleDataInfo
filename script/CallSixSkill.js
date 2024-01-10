const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveJSONSkillDataToFile = require('./SaveJSONSkillDataToFile.js');
const readOCIDInFile = require('./ReadOCIDInFile.js');
const timeSleep = require('./TimeSleep.js');
const jobs = require('./Jobs.js'); // 직업

async function sixSkill(world_type = 0, characterClass = ""){
	try {
		// 파일 읽기
		const characterOCIDDataArray = await readOCIDInFile(world_type,characterClass);

		console.log("characterOCIDDataArray:", characterOCIDDataArray);

		var saveResponseData;
		
		for(var i = 0;i < characterOCIDDataArray.length;i++){
			const data = await responseData(characterOCIDDataArray[i]);
		
			saveResponseData = await processData(saveResponseData,data);
		}

		saveJSONSkillDataToFile("SixSkill", saveResponseData, characterOCIDDataArray.length, world_type, characterClass);
	}catch(error){
		console.error(error);
	}
}

async function responseData(characterOCID){
	try{
		const sixSkillUrlString = "https://open.api.nexon.com/maplestory/v1/character/skill";

		var currentDate = new Date();
		// API 업데이트 고려해서 2일 전 날짜로 설정
		currentDate.setDate(currentDate.getDate() - 2);

		var date = currentDate.toISOString().split('T')[0];

		const headers = { "x-nxopen-api-key": process.env.API_KEY };

		const queryParams = new URLSearchParams({
			ocid: characterOCID,
			date: date,
			character_skill_grade: "6"
		});

		const requestUrl = `${sixSkillUrlString}?${queryParams}`;

		var answer = await fetch(requestUrl, {
			method: 'GET',
			headers: headers
		});

		await timeSleep(500);

		return await answer.json();

	}catch(error){
		console.error(error);
	}
}

async function processData(saveResponseData, data){
	try{
		if(saveResponseData){
			for(var i = 0;i < data.character_skill.length;i++){
				const existingSkill = saveResponseData.find(skill => skill.skill_name === data.character_skill[i].skill_name);

				if(existingSkill){
					existingSkill.skill_level += data.character_skill[i].skill_level;
				}
				else{
					saveResponseData.push({
						skill_name: data.character_skill[i].skill_name,
						skill_description: data.character_skill[i].skill_description,
						skill_level: data.character_skill[i].skill_level,
						skill_effect: data.character_skill[i].skill_effect,
						skill_icon: data.character_skill[i].skill_icon
					});
				}
			}
		}
		else{
			saveResponseData = data.character_skill.map(skill => ({
				skill_name: skill.skill_name,
				skill_description: skill.skill_description,
				skill_level: skill.skill_level,
				skill_effect: skill.skill_effect,
				skill_icon: skill.skill_icon
			}));
		}

		return saveResponseData;
	}catch(error){
		console.error(error);
	}
}

for(var i = 0;i < jobs.length;i++){
	await sixSkill(0, jobs[i]);
	await sixSkill(1, jobs[i]);
}
