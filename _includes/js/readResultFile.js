async function readResultFile(what,server,fileName){
	try{
		const filePath = `./script/data/${what}_${server}_${fileName}.json`;
		console.log(`filePath:${filePath}`);

		const response = await fetch(filePath);
		const fileData = await response.text();

		var num,jsonData;

		if(fileData != ''){
			console.log(fileData);

			const lines = fileData.split('\n');

			num = lines[0];

			jsonData = JSON.parse(lines.slice(1).join('\n'));

//			console.log(num);
//			console.log(jsonData);
			return [num,jsonData];
		}
		else return [0,''];
	}catch(error){
		console.error(`Error read ${fileName} file:`,error);
	}
}
