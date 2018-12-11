var nav = dom('nav ul')[0],
	bannerContainer = dom('.banner_container')[0],
	category = dom('.category .wrap')[0],
	news = dom('.news .wrap')[0],
	arrow = dom('.arrow'),
	i = 0;
//封装DOM
function dom(selector){
	return document.querySelectorAll(selector);
} 

// ----------------------------------------------------------------------------------------------
// 茶图库category
// 获取JSON数据
var xmlhttp,obj;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObjext("Microsoft.XMLHTTP");
}
xmlhttp.open('GET','/project/json/index.json',true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		obj = JSON.parse(xmlhttp.responseText);
		// operateJSON(obj);
		categoryJSON(obj);
	}
}
// category
function categoryJSON(obj){ 
	var categoryContainer = dom('.category_container')[0];
	for(var i = 0;i < obj.category.items.length;i++){
		categoryContainer.innerHTML += '<div class="category_item" onclick="toGallery('+(i+1)+')">'+
								'<img src="'+obj.category.items[i].img+'" alt="">'+
								'<div class="name">'+obj.category.items[i].name+'</div>'+
								'<div class="item_intro">'+obj.category.items[i].intro+'</div>'+
								'</div>';
	}
}
function toGallery(index){
	if(index == 0){
		window.location.href = 'gallery.html';
	}else{
		window.location.href = 'galleryDetail.html#'+index;
	}
}

// ---------------------------------------------------------------------------------------
// 茶新闻news
var xmlnews,res;
if(window.XMLHttpRequest){
	xmlnews = new XMLHttpRequest();
}else{
	xmlnews = new ActiveXObjext("Microsoft.XMLHTTP");
}
xmlnews.open('GET','/project/php/news.php',true);
xmlnews.send();
xmlnews.onreadystatechange = function(){
	if(xmlnews.readyState == 4 && xmlnews.status == 200){
		res = JSON.parse(xmlnews.responseText);
		newsJSON(res);
	}
}
function newsJSON(res){
	// }
	var newsContainer = dom('.news_container')[0];
	for(var i = 0;i < 3;i++){
		newsContainer.innerHTML += '<div class="news_items" onclick="toNews(this)" nid="'+res[i].news_id+'">'+
								'<img src="images/'+res[i].news_img.split('@')[0]+'" alt="">'+
								'<div class="news_name">'+res[i].news_title+'</div>'+
								'<div class="news_date">'+res[i].news_date.split(' ')[0]+'</div>'+
								'</div>';
	}
	newsContainer.innerHTML += '<i class="more fa fa-angle-right fa-5x" onclick="toNews(this)"></i>';
}
function toNews(e){
	if(e.getAttribute('nid')){
		window.location.href = 'newsdetail.html?nid='+e.getAttribute('nid');
	}else{
		window.location.href = 'news.html#1';
	}
}

// ---------------------------------------------------------------------------------------
// 茶知识knows
var xmlknows,les;
if(window.XMLHttpRequest){
	xmlknows = new XMLHttpRequest();
}else{
	xmlknows = new ActiveXObjext("Microsoft.XMLHTTP");
}
xmlknows.open('GET','/project/php/knowledge.php',true);
xmlknows.send();
xmlknows.onreadystatechange = function(){
	if(xmlknows.readyState == 4 && xmlknows.status == 200){
		les = JSON.parse(xmlknows.responseText);
		knowsJSON(les);
	}
}
function knowsJSON(les){
	// }
	var knowsContainer = dom('.knows_container')[0];
	for(var i = 0;i < 3;i++){
		knowsContainer.innerHTML += '<div class="knows_items" onclick="toKnows(this)" nid="'+les[i].know_id+'">'+
								'<img src="images/'+les[i].know_img+'" alt="">'+
								'<div class="knows_name">'+les[i].know_title+'</div>'+
								'<div class="knows_date">'+les[i].know_date.split(' ')[0]+'</div>'+
								'</div>';
	}
	knowsContainer.innerHTML += '<i class="more fa fa-angle-right fa-5x" onclick="toKnows(this)"></i>';
}
function toKnows(e){
	if(e.getAttribute('nid')){
		window.location.href = 'knowledgeDetail.html?kid='+e.getAttribute('nid');
	}else{
		window.location.href = 'knowledge.html#1';
	}
}

// --------------------------------------------------------------------------------------
// 轮播
var open=false;// 动画标志
var interv=0;// 动画间隔
arrow[1].onclick=function(){   
	run("next");
};
//点击向前按钮
arrow[0].onclick=function(){   
	run("prev");
};
function run(dir){
	var x=1903; //偏移距离
	if (open) return;   //正在动画，直接退出
    open=true;
    //没有找到指定下标，类清空
	if(dir=="prev"){   //向前移动
		i=i>3?0:++i;
        //获取左边的距离
	        newLeft=parseInt(bannerContainer.style.left)-x;
        //开启动画定时器
		interv=setInterval(goprev,5);     
	}
	else{  //向后移动
		i=i<1?4:--i;
        //获取左边的距离
	        newLeft=parseInt(bannerContainer.style.left)+x;
        //开启动画定时器
		interv=setInterval(gonext,5);     
	}
}
//向前移动
function goprev(){
		if(parseInt(bannerContainer.style.left)>newLeft){
        //每次移动20像素
        bannerContainer.style.left=parseInt(bannerContainer.style.left)-20+'px';   
	}
	else{
		goend();  //移动结束
	}
}
//向后移动
function gonext(){
	if(parseInt(bannerContainer.style.left)<newLeft){
        //每次移动20像素
        bannerContainer.style.left=parseInt(bannerContainer.style.left)+20+'px';    
	}
	else{
        //移动结束
        goend();   
	}
}
//移动结束
function goend(){
	bannerContainer.style.left=newLeft+'px';
    //如果到最后一张，在点击，回到第一张
	if(parseInt(bannerContainer.style.left)<-9515){  
		bannerContainer.style.left='-1903px';
	}
	else if(parseInt(bannerContainer.style.left)>-1903){
		bannerContainer.style.left='-9515px';
	}
	open=false
	clearInterval(interv);    //关闭定时器
}

var timer = setInterval(function(){
	run('prev');
},2500);

// 鼠标移入 停止轮播
bannerContainer.onmouseenter = function(){
	clearInterval(timer);
}
// 鼠标移出 开始轮播
bannerContainer.onmouseleave = function(){
	timer = setInterval(function(){
		run('prev');
	},2500);
}
for(var i = 0;i < 2;i++){
	(function(i){
		arrow[i].onmouseenter = function(){
			clearInterval(timer);
		};
	})(i);
}
