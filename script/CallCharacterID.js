const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveOCIDToFile = require('./SaveOCIDToFile.js');

//캐릭터 식별자
async function characterID(world_type = 0, characterClass = ""){
	const characterOCIDUrlString = "https://open.api.nexon.com/maplestory/v1/id";

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	try {
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `RankingOverall_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const rankingOverallDataArray = JSON.parse(fileData);

		for(var i = 0;i < 100/*rankingOverallDataArray.length*/;i++){
			const queryParams = new URLSearchParams({
				character_name: rankingOverallDataArray[i].character_name
			});

			const requestUrl = `${characterOCIDUrlString}?${queryParams}`;

			var answer = await fetch(requestUrl, {
				method: 'GET',
				headers: headers
			});/*
			.then(response => response.json())
			.then(data => {
				console.log(data.ocid);
				saveOCIDToFile(data.ocid, world_type, characterClass);
				console.log("success");
			})
			.catch(error => console.error(error));*/

			const response = await answer.json();

			await saveOCIDToFile(response.ocid, world_type, characterClass);
		}
	}catch(error){
		console.error(error);
	}
}

characterID(0,"해적-캡틴");
