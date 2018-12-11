var dBox = document.querySelector('.list'),
	kid = parseInt(document.URL.split('kid=')[1]);
var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/project/php/knowledgeDetail.php?kid="+kid,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var obj = JSON.parse(xmlhttp.responseText);
		console.log(obj);
		showKnowcontent(obj);
		changeTitle(obj);
	}
}

function showKnowcontent(obj){
	dBox.innerHTML = '<div class="detail_title"><h3 class="tcenter"></h3><div class="detail_mess tcenter"></div></div><div class="detail_content"></div>';
	var dTitle = document.querySelector('.detail_title h3'),
		dMess = document.querySelector('.detail_title .detail_mess'),
		dContent = document.querySelector('.detail_content');
	dTitle.innerHTML = obj.know_title;
	dMess.innerHTML = '作者：'+obj.know_author+" 上传时间："+obj.know_date;
	var content = obj.know_content.split('@');
	// console.log(content);
	dContent.innerHTML = '<img src="images/'+obj.know_img+'" alt="">';
	for(var i = 0;i < content.length;i++){
		dContent.innerHTML += '<p>'+content[i]+'</p>';
	}	
}
function changeTitle(obj){
	document.querySelector('title').innerHTML += ' > '+obj.know_title;
	document.querySelector('.position').innerHTML += ' > '+obj.know_title;
}