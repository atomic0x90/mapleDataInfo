const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveDataToFile = require('./SaveDataToFile.js');
const readOCIDInFile = require('./ReadOCIDInFile.js');

async function hyperpassiveSkill(world_type = 0, characterClass = ""){
	const skillUrlString = "https://open.api.nexon.com/maplestory/v1/character/skill";
	
	var currentDate = new Date();
	// API 업데이트 고려해서 2일 전 날짜로 설정
	currentDate.setDate(currentDate.getDate() - 2);

	var date = currentDate.toISOString().split('T')[0];

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	try {
		// 파일 읽기
		const characterOCIDDataArray = await readOCIDInFile(world_type,characterClass);

		console.log("characterOCIDDataArray:", characterOCIDDataArray);

		const queryParams = new URLSearchParams({
			ocid: characterOCIDDataArray[0],
			date: date,
			character_skill_grade: "hyperpassive"
		});

		const requestUrl = `${skillUrlString}?${queryParams}`;

		var answer = fetch(requestUrl, {
			method: 'GET',
			headers: headers
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			saveDataToFile("HyperpassiveSkill", data, world_type, characterClass);
			console.log("success");
		})
		.catch(error => console.error(error));

	}catch(error){
		console.error(error);
	}
}

hyperpassiveSkill(0,"해적-캡틴");
