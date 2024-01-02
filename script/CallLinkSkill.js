const fetch = require('node-fetch-commonjs');
const path = require('path');
const fs = require('fs').promises; //file system

async function linkSkill(world_type = 0, characterClass = ""){
	const linkSkillUrlString = "https://open.api.nexon.com/maplestory/v1/character/link-skill";
	// 현재 날짜를 얻어옴
	var currentDate = new Date();
	var date = currentDate.toISOString().split('T')[0];

	const headers = { "x-nxopen-api-key": process.env.API_KEY };

	try {
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `CharacterOCID_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const characterOCIDDataArray = JSON.parse(fileData);

		const queryParams = new URLSearchParams({
			ocid: characterOCIDDataArray[0],
			date: date
		});

		const requestUrl = `${linkSkillUrlString}?${queryParams}`;

		var answer = fetch(requestUrl, {
			method: 'GET',
			headers: headers
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			saveLinkSkillToFile(data, world_type, characterClass);
			console.log("success");
		})
		.catch(error => console.error(error));

	}catch(error){
		console.error(error);
	}
}

async function saveLinkSkillToFile(LinkSkill_Data, world_type, characterClass){
	try {
		// data 폴더 경로 지정
		const directoryPath = path.join(__dirname, 'data');
		// data 디렉토리가 없다면 생성
		await fs.mkdir(directoryPath, { recursive: true });

		// 파일 이름을 생성
		const fileName = `LinkSkill_${world_type}_${characterClass}.json`;
		console.log("fileName:",fileName);
		// 데이터를 JSON 형식의 문자열로 변환
		const jsonData = JSON.stringify(LinkSkill_Data, null, 4);
		// 파일에 데이터를 쓰기 (파일이 존재하면 덮어쓰기)
		await fs.writeFile(path.join(directoryPath, fileName), jsonData, 'utf-8');
	}catch(error){
		console.error('Error saving LinkSkill data to file:', error);
	}
}

