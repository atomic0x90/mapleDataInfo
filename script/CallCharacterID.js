const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveDataToFile = require('./SaveDataToFile.js');

//캐릭터 식별자
async function characterID(world_type = 0, characterClass = ""){
	const characterOCIDUrlString = "https://open.api.nexon.com/maplestory/v1/id";

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	try {
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `RankingOverall_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const rankingOverallDataArray = JSON.parse(fileData);

		const queryParams = new URLSearchParams({
			character_name: rankingOverallDataArray[0].character_name
		});

		const requestUrl = `${characterOCIDUrlString}?${queryParams}`;

		var answer = fetch(requestUrl, {
			method: 'GET',
			headers: headers
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.ocid);
			saveDataToFile("CharacterOCID", data.ocid, world_type, characterClass);
			console.log("success");
		})
		.catch(error => console.error(error));

	}catch(error){
		console.error(error);
	}
}

characterID(0,"해적-캡틴");
