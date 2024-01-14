const fs = require('fs').promises;
const path = require('path');

async function initOCIDFile(){
	try{
		const directoryPath = path.join(__dirname, 'data');

		// 폴더 내 모든 파일 목록 가져오기
		const files = await fs.readdir(directoryPath);

		// 각 파일 초기화
		await Promise.all(files.map(async (file) => {
			if (file.includes('OCID')) {
				const filePath = path.join(directoryPath, file);

				// 파일 크기를 0으로 만들어서 내용을 완전히 비우기
				await fs.truncate(filePath, 0);

				console.log(`File ${file} initialized.`);
			}
		}));

	}catch (error){
		console.error('Error initializing OCID files:', error);
	}
}

initOCIDFile();

