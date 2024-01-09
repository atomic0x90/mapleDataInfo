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
		console.log("data:"+data+"\n");

		// 파일이 이미 존재하는지 확인
		const fileExists = await fs.access(path.join(directoryPath, fileName))
		.then(() => true)
		.catch(() => false);

		if(fileExists){
			const existingData = await fs.readFile(path.join(directoryPath, fileName), 'utf-8');
			await fs.writeFile(path.join(directoryPath, fileName), existingData + '\n' + data, 'utf-8');
		}
		else{ await fs.writeFile(path.join(directoryPath, fileName), data, 'utf-8'); }

	}catch(error){
		console.error(`Error saving CharacterOCID data to file:`, error);
	}
}

module.exports = saveOCIDToFile;
