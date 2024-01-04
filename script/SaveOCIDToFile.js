const fs = require('fs').promises;
const path = require('path');

async function saveOCIDToFile(data, world_type, characterClass){
	try {
		// data 폴더 경로 지정
		const directoryPath = path.join(__dirname, 'data');
		// data 디렉토리가 없다면 생성
		await fs.mkdir(directoryPath, { recursive: true });

		// 파일 이름을 생성
		const fileName = `CharacterOCID_${world_type}_${characterClass}.json`;
		console.log("fileName:"+fileName);

		// 파일이 이미 존재하면 append 모드로 열어서 데이터를 추가
		const existingData = await fs.readFile(path.join(directoryPath, fileName), 'utf-8').catch(() => ''); // 파일이 없는 경우 빈 문자열로 초기화
		await fs.writeFile(path.join(directoryPath, fileName), existingData + '\n' + data, 'utf-8');

	}catch(error){
		console.error(`Error saving CharacterOCID data to file:`, error);
	}
}

module.exports = saveOCIDToFile;
