var list = document.querySelector('.list'),
	page = parseInt(document.URL.split('#')[1]),//url参数
	i = (page - 1) * 5,//每页第一个项目的下标
	len = i + 5;//每页最后一个项目的下标
var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/project/php/news.php",true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var obj = JSON.parse(xmlhttp.responseText);
		showNews(obj);
		showPage(obj);
	}
}

// 添加项目
function showNews(obj){
	for(i;i < (obj.length>len?len:obj.length);i++){
		list.innerHTML += '<div class="list_item">'+
						'<div class="img" onclick="toNewsdetail('+obj[i].news_id+')">'+
							'<img src="images/'+obj[i].news_img.split('@')[0]+'" alt="">'+
						'</div>'+
						'<div class="info">'+
							'<h3 onclick="toNewsdetail('+obj[i].news_id+')">'+obj[i].news_title+'</h3>'+
							'<p>'+
								'<span class="author">'+obj[i].news_author+' </span>'+
								'<span class="date">'+obj[i].news_date.split(' ')[0]+'</span>'+
							'</p>'+
							'<div class="example">'+obj[i].news_content.substr(0,180).replace(/@/g,' ')+'</div>'+
						'</div>'+
					'</div>'
	}
}
// 添加页数
function showPage(obj){
	list.innerHTML += 
	'<div class="page">'+
		'<a href="" class="prev_page pageBtn" onclick="location.reload()">上一页</a>'+
		'<span class="page_container"></span>'+
		'<a href="" class="next_page pageBtn" onclick="location.reload()">下一页</a>'+
	'</div>';
	var pageCon = document.querySelector('.page_container');
	for(var p = 1;p <= Math.ceil(obj.length / 5);p++){
		pageCon.innerHTML += '<a href="#'+p+'" class="page_button pageBtn" onclick="location.reload()">'+p+'</a>';
	}
	var currentPage = document.querySelectorAll('span .page_button')[page-1],
		prevPage = document.querySelector('.prev_page'),
		nextPage = document.querySelector('.next_page');
	currentPage.classList.add('page_active');
	prevPage.setAttribute('href','#'+(page-1));
	nextPage.setAttribute('href','#'+(page+1));
	// 第一页和最后一页
	if(page == 1){
		prevPage.style.cursor = 'default';
		prevPage.removeAttribute('href');
		prevPage.removeAttribute('onclick');
	}else if(page == Math.ceil(obj.length / 5)){
		nextPage.style.cursor = 'default';
		nextPage.removeAttribute('href');
		nextPage.removeAttribute('onclick');
	}		
}
//转到
function toNewsdetail(e){
	window.location.href = 'newsDetail.html?nid='+e;
}
