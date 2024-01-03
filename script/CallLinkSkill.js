const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveDataToFile = require('./SaveDataToFile.js');

async function linkSkill(world_type = 0, characterClass = ""){
	const linkSkillUrlString = "https://open.api.nexon.com/maplestory/v1/character/link-skill";
	// 현재 날짜를 얻어옴
	var currentDate = new Date();
	// API 업데이트 고려해서 2일 전 날짜로 설정
	currentDate.setDate(currentDate.getDate() - 2);

	var date = currentDate.toISOString().split('T')[0];

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	try {
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `CharacterOCID_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const characterOCIDDataArray = JSON.parse(fileData);

		console.log("fileData:"+fileData);

		const queryParams = new URLSearchParams({
			ocid: characterOCIDDataArray[0],
			date: date
		});
		console.log("path:"+__dirname);
		console.log("ocid:"+characterOCIDDataArray[0]);

		const requestUrl = `${linkSkillUrlString}?${queryParams}`;

		var answer = fetch(requestUrl, {
			method: 'GET',
			headers: headers
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			saveDataToFile("LinkSkill", data, world_type, characterClass);
			console.log("success");
		})
		.catch(error => console.error(error));

	}catch(error){
		console.error(error);
	}
}

linkSkill(0,"해적-캡틴");
