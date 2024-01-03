const fs = require('fs').promises;
const path = require('path');

async function saveDataToFile(saveName, data, world_type, characterClass){
	try {
		// data 폴더 경로 지정
		const directoryPath = path.join(__dirname, 'data');
		// data 디렉토리가 없다면 생성
		await fs.mkdir(directoryPath, { recursive: true });

		// 파일 이름을 생성
		const fileName = `${saveName}_${world_type}_${characterClass}.json`;
		console.log("fileName:"+fileName);
		// 데이터를 JSON 형식의 문자열로 변환
		const jsonData = JSON.stringify(data, null, 4);
		// 파일에 데이터를 쓰기 (파일이 존재하면 덮어쓰기)
		await fs.writeFile(path.join(directoryPath, fileName), jsonData, 'utf-8');
	}catch(error){
		console.error(`Error saving ${saveName} data to file:`, error);
	}
}

module.exports = saveDataToFile;
