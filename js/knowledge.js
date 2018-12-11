var list = document.querySelector('.list'),
	page = parseInt(document.URL.split('#')[1]),//获取页号
	i = (page - 1) * 5,//当前页第一个内容的索引
	len = i + 5;//当前页最后一个内容的索引
var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/project/php/knowledge.php",true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var obj = JSON.parse(xmlhttp.responseText);
		showKnow(obj);
		showPage(obj);
	}
}

// 添加内容
function showKnow(obj){
	// 内容显示限定
	for(i;i < ( obj.length>len ? len : obj.length);i++){
		list.innerHTML += '<div class="list_item">'+
						'<div class="img" onclick="toKnowdetail('+obj[i].know_id+')">'+
							'<img src="images/'+obj[i].know_img+'" alt="">'+
						'</div>'+
						'<div class="info">'+
							'<h3 onclick="toKnowdetail('+obj[i].know_id+')">'+obj[i].know_title+'</h3>'+
							'<p>'+
								'<span class="author">'+obj[i].know_author+' </span>'+
								'<span class="date">'+obj[i].know_date.split(' ')[0]+'</span>'+
							'</p>'+
							'<div class="example">'+obj[i].know_content.substr(0,180).replace(/@/g,' ')+'</div>'+
						'</div>'+
					'</div>'
	}
}

// 页面按钮
function showPage(obj){
	list.innerHTML += 
	'<div class="page">'+
		'<a href="" class="prev_page pageBtn" onclick="location.reload()">上一页</a>'+
		'<span class="page_container"></span>'+
		'<a href="" class="next_page pageBtn" onclick="location.reload()">下一页</a>'+
	'</div>';
	var pageCon = document.querySelector('.page_container');
	// 添加页面按钮
	for(var p = 1;p <= Math.ceil(obj.length / 5);p++){
		pageCon.innerHTML += '<a href="#'+p+'" class="page_button pageBtn" onclick="location.reload()">'+p+'</a>';
	}
	// 设置样式与href属性
	var currentPage = document.querySelectorAll('span .page_button')[page-1],
		prevPage = document.querySelector('.prev_page'),
		nextPage = document.querySelector('.next_page');
	currentPage.classList.add('page_active');
	prevPage.setAttribute('href','#'+(page-1));
	nextPage.setAttribute('href','#'+(page+1));
	// 临界条件，首页尾页样式
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
// 设置内容的href属性
function toKnowdetail(e){
	window.location.href = 'knowledgeDetail.html?kid='+e;
}
