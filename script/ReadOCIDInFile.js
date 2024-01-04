const fs = require('fs').promises;
const path = require('path');

async function readOCIDInFile(world_type, characterClass){
	try {
		// 파일 읽기
		const filePath = path.join(__dirname, 'data', `CharacterOCID_${world_type}_${characterClass}.json`);
		const fileData = await fs.readFile(filePath, 'utf-8');
		const characterOCIDDataArray = fileData.split('\n');

		return characterOCIDDataArray;
	}catch(error){
		console.error(`Error saving CharacterOCID data to file:`, error);
	}
}

module.exports = readOCIDInFile;
