const fs = require('fs').promises;
const path = require('path');

async function deleteOCIDFile(){
	try{
		const directoryPath = path.join(__dirname, 'data');

		// 폴더 내 모든 파일 목록 가져오기
		const files = await fs.readdir(directoryPath);

		await Promise.all(files.map(async (file) => {
			if(file.includes('OCID')){
				const filePath = path.join(directoryPath, file);
				await fs.unlink(filePath);
				console.log(`File ${file} deleted.`);
			}
		}));

	}catch (error){
		console.error('Error delete OCID files:', error);
	}
}

deleteOCIDFile();

