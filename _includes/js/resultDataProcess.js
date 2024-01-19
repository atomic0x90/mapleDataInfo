function resultDataProcess(where, server, data) {
	if(data[0] == 0) return;

	const divID = document.getElementById(`${where}-box-${server}`);

	divID.innerHTML = '';

	const spanContainer = document.createElement('span');
	var what;
	if(where == 'hunt') what = '사냥 링크 사용률';
	else if(where == 'boss') what = '보스 링크 사용률';
	else if(where == 'hyper') what = '하이퍼 패시브 스킬 사용률';
	else if(where == 'six') what = '6차 스킬 강화 평균';

	spanContainer.textContent = (server == 0 ? '일반 월드' : '리부트 월드') + ' ' + what; 

	divID.appendChild(spanContainer);

	const num = data[0];
	var jsonData = data[1];

	console.log("num:" + num);
	console.log("jsonData:" + jsonData);

	if(where == 'hunt' || where == 'boss'){
		const sortedData = jsonData.sort((a, b) => {
			const A = (Number(a.skill_level) / Number(num)) * 100;
			const B = (Number(b.skill_level) / Number(num)) * 100;

			if(A != B) return B - A; //내림차순

			//오름차순
			return a.skill_name.localeCompare(b.skill_name);
		});

		jsonData = sortedData;
	}
	else if(where == 'six'){
		const sortedData = jsonData.sort((a, b) => {
			return a.skill_name.localeCompare(b.skill_name);
		});

		jsonData = sortedData;
	}


	const listContainer = document.createElement('ul');

	for (let i = 0; i < jsonData.length; i++) {
		const listItem = document.createElement('li');

		if(i % 2 === 1){
		    listItem.style.backgroundColor = '#f2f2f2';
		}

		const itemArea = document.createElement('div');

		const itemImage = document.createElement('img');
		itemImage.src = jsonData[i].skill_icon;
		itemArea.appendChild(itemImage);

		const itemName = document.createElement('span');
		itemName.textContent = jsonData[i].skill_name;
		itemArea.appendChild(itemName);

		listItem.appendChild(itemArea);

		const progressBarContainer = document.createElement('div');
		progressBarContainer.classList.add('progress-bar-container');
		listItem.appendChild(progressBarContainer);

		if(where != 'six'){
			const progressBar = document.createElement('progress');
			progressBar.value = (Number(jsonData[i].skill_level) / Number(num)) * 100;
			progressBar.max = 100;
			progressBar.style.flexGrow = 1;
			progressBarContainer.appendChild(progressBar);

			const percentText = document.createElement('span');
			percentText.textContent = `${Math.round(progressBar.value)}%`;
			progressBarContainer.appendChild(percentText);
		}
		else{
			const progressBar = document.createElement('progress');
			progressBar.value = (Number(jsonData[i].skill_level) / Number(num))* 100;
			progressBar.max = 3000;
			progressBar.style.flexGrow = 1;
			progressBarContainer.appendChild(progressBar);

			console.log(`${Number(jsonData[i].skill_level)}, ${Number(num)}, ${(Number(jsonData[i].skill_level) / Number(num))}`);
			const percentText = document.createElement('span');
			percentText.textContent = `Lv.${(progressBar.value / 100).toFixed(2)}`;
			progressBarContainer.appendChild(percentText);
		}

		listContainer.appendChild(listItem);
	}

	divID.appendChild(listContainer);
}
