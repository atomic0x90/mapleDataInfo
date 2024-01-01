require = require('esm')(module /*, options*/);

const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises;

function rankingOverall(world_type = 0, characterClass = ""){
	const rankUrlString = "https://open.api.nexon.com/maplestory/v1/ranking/overall";
	
	// 현재 날짜를 얻어옴
	var currentDate = new Date();
	var date = currentDate.toISOString().split('T')[0];

	const headers = { "x-nxopen-api-key": API_KEY };

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
	      saveRankingDataToFile(data.ranking, world_type, characterClass);
	})
	.catch(error => console.error(error));
}

async function saveRankingDataToFile(rankingData, world_type, characterClass){
	try {
		// _data 폴더 경로 지정
		const directoryPath = path.join(__dirname, 'data');
		// _data 디렉토리가 없다면 생성
		await fs.mkdir(directoryPath, { recursive: true });

		// 파일 이름을 생성
		const fileName = `RankingOverall_${world_type}_${characterClass}.json`;
		// 데이터를 JSON 형식의 문자열로 변환
		const jsonData = JSON.stringify(rankingData, null, 2);
		// 파일에 데이터를 쓰기 (파일이 존재하면 덮어쓰기)
		await fs.writeFile(path.join(directoryPath, fileName), jsonData, 'utf-8');
	}catch(error){
		console.error('Error saving ranking data to file:', error);
	}
}

rankingOverall(0,"해적-캡틴");
