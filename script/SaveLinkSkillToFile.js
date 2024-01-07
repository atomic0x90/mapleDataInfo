const fs = require('fs').promises;
const path = require('path');

async function saveLinkSkillToFile(saveName, data, world_type, characterClass){
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

		await fs.writeFile(path.join(directoryPath, fileName), jsonData, 'utf-8');

		const fileContent = await fs.readFile(path.join(directoryPath, fileName), 'utf-8');

		console.log(`Contents of ${fileName}:\n${fileContent}`);

	}catch(error){
		console.error(`Error saving ${saveName} data to file:`, error);
	}
}

module.exports = saveLinkSkillToFile;
