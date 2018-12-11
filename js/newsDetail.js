var dBox = document.querySelector('.list'),
	nid = parseInt(document.URL.split('nid=')[1]);
var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/project/php/newsDetail.php?nid="+nid,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var obj = JSON.parse(xmlhttp.responseText);
		// console.log(obj);
		showNewscontent(obj);
		changeTitle(obj);
	}
}

function showNewscontent(obj){
	dBox.innerHTML = '<div class="detail_title"><h3 class="tcenter"></h3><div class="detail_mess tcenter"></div></div><div class="detail_content"></div>';
	var dTitle = document.querySelector('.detail_title h3'),
		dMess = document.querySelector('.detail_title .detail_mess'),
		dContent = document.querySelector('.detail_content');
	dTitle.innerHTML = obj.news_title;
	dMess.innerHTML = '作者：'+obj.news_author+" 上传时间："+obj.news_date;
	var content = obj.news_content.split('@');
	// console.log(content);
	dContent.innerHTML = '<img src="images/'+obj.news_img.split('@')[0]+'" alt="">';
	for(var i = 0;i < content.length;i++){
		dContent.innerHTML += '<p>'+content[i]+'</p>';
	}
	for(var i = 1;i < obj.news_img.split('@').length;i++){
		dContent.innerHTML += '<img src="images/'+obj.news_img.split('@')[i]+'" alt="">';

	}
}
function changeTitle(obj){
	document.querySelector('title').innerHTML += ' > '+obj.news_title;
	document.querySelector('.position').innerHTML += ' > '+obj.news_title;
}