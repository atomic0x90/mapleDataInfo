const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

//캐릭터 식별자
function characterID(world_type = 0, characterClass = ""){
	const characterOCIDUrlString = "https://open.api.nexon.com/maplestory/v1/id";

	const headers = new Headers({
		"x-nxopen-api-key": process.env.API_KEY
	});

	try{
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `RankingOverall_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const rankingOverallDataArray = JSON.parse(fileData);
	}catch(error){
		console.error('Error open RankingOverall file:', error);
	}

	var queryParams = new URLSearchParams({
		character_name: rankingOverallDataArray[0].character_name
	});

	var requestUrl = `${characterOCIDUrlString}?${queryParams}`;
	
	var answer = fetch(requestUrl, {
		headers: headers
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		ocid[0] = data.ocid;
		saveCharacterOCIDToFile(data.ocid,world_type,characterClass);
		console.log("success");
	})
	.catch(error => console.error(error));
}

async function saveCharacterOCIDToFile(OCID_Data, world_type, characterClass){
	try {
		// data 폴더 경로 지정
		const directoryPath = path.join(__dirname, 'data');
		// data 디렉토리가 없다면 생성
		await fs.mkdir(directoryPath, { recursive: true });

		// 파일 이름을 생성
		const fileName = `CharacterOCID_${world_type}_${characterClass}.json`;
		// 데이터를 JSON 형식의 문자열로 변환
		const jsonData = JSON.stringify(OCID_Data, null, 2);
		// 파일에 데이터를 쓰기 (파일이 존재하면 덮어쓰기)
		await fs.writeFile(path.join(directoryPath, fileName), jsonData, 'utf-8');
	}catch(error){
		console.error('Error saving OCID data to file:', error);
	}
}

characterID(0,"해적-캡틴");
