const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

const saveDataToFile = require('./SaveDataToFile.js');

function rankingOverall(world_type = 0, characterClass = ""){
	const rankUrlString = "https://open.api.nexon.com/maplestory/v1/ranking/overall";
	
	// 현재 날짜를 얻어옴
	var currentDate = new Date();
	// API 업데이트 고려해서 2일 전 날짜로 설정
	currentDate.setDate(currentDate.getDate() - 2);

	var date = currentDate.toISOString().split('T')[0];

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	var queryParams = new URLSearchParams({
		world_type: world_type,
		class: characterClass,
		date: date
	});

	var requestUrl = `${rankUrlString}?${queryParams}`;

	console.log(requestUrl);

	var answer = fetch(requestUrl, {
		method: 'GET',
		headers: headers
	})
	.then(response => response.json())
	.then(data => {
		//해당 직업 랭킹 1 ~ 200 데이터 저장
		console.log("ranking");
		console.log(data.ranking);
	      saveDataToFile("RankingOverall", data.ranking, world_type, characterClass);
	})
	.catch(error => console.error(error));
}

rankingOverall(0,"해적-캡틴");
