var sort = parseInt(document.URL.split('#')[1]),
	dowebok = document.querySelector('#dowebok'),
	tab_a = document.querySelectorAll('.tab a'),
	intro = document.querySelector('.pome .intro'),
	repre = document.querySelector('.pome .repre');
var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
}else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/project/php/galleryDetail.php?sort="+sort,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var obj = JSON.parse(xmlhttp.responseText);
		console.log(obj);
		showImg(obj);
	}
}

// 加载图片
function showImg(obj){
	for(var i = 0;i < obj.length;i++){
		dowebok.innerHTML += '<li><img src="'+obj[i].pic_url+'" alt="" data-original="'+obj[i].pic_url+'"></li>';
	}
}

// 加载看图插件
window.onload = function(){
	var viewer = new Viewer(document.getElementById('dowebok'), {
			url: 'data-original'
	});
}

// 添加tab选中class
tab_a[sort].classList.add('selected');

// 介绍文字
var arr =
	[ 	"",{
			"name" : "绿茶",
			"intro" : "绿茶比较完整地保留了鲜叶内的天然成分，矿物质丰富，对抗辐射、防衰老、增强抵抗力等均有特殊效果，为其他茶类所不及。茶叶仅经过“杀青”保留其绿色外表，然后经过不同制作工艺成型。",
			"repre" : "西湖龙井、洞庭碧螺春、恩施玉露、信阳毛尖..."
		},{
			"name" : "白茶",
			"intro" : "白茶制作方法采用天然晾干的方式，从而茶味非常自然纯净。白茶成品茶多为芽头，满披白毫，如银似雪而得名。具有外形芽毫完整，满身披毫，毫香清鲜，汤色黄绿清澈，滋味清淡回甘的品质特点。",
			"repre" : "银针白毫、贡眉、白牡丹..."
		},{
			"name" : "黄茶",
			"intro" : "黄茶的制作与绿茶有相似之处，不同点是多一道闷堆工序，这种闷堆渥黄工序，使黄茶具有“黄叶黄汤”的特点。黄茶芽叶细嫩，显毫，香味鲜醇。黄茶中富含茶多酚、氨基酸、可溶糖、维生素等丰富营养物质。",
			"repre" : "霍山雪芽、温州黄汤、君山银针..."
		},{
			"name" : "青茶",
			"intro" : "青茶，亦称乌龙茶。汤浓韵明不很香，其香气浓郁，入口甘甜，汤水色泽相对清淡。汤水入口，细搅可感其带微酸，口感特殊，而且酸中有香，香中含酸。酸中有甘，甘中带香，水香长流。",
			"repre" : "武夷岩茶大红袍、广东凤凰单枞、安溪铁观音、台湾冻顶乌龙..."
		},{
			"name" : "红茶",
			"intro" : "红茶因其干茶色泽和冲泡的茶汤以红色为主调而得名。因其完全发酵，比较温和，因此在养胃方面的功效特别突出，特别适宜胃寒的人群饮用。其他功效包括帮助胃肠消化、促进食欲，可利尿、消除水肿，并强壮心脏功能;抗菌力强。",
			"repre" : "川红功夫、滇红功夫、祁门功夫..."
		},{
			"name" : "黑茶",
			"intro" : "黑茶最常见的种类为普洱茶。而普洱茶根据其发酵种类分为生茶与熟茶。普洱生茶主要可以清理肠道，有降脂、提神、降压和减肥功效，适合年轻人群,不过生茶的活性成份较多，因此易失眠者、感冒发热者、胃溃疡患者、孕妇不宜饮用。",
			"repre" : "云南普洱熟茶、安化黑茶、梧州六堡茶..."
		}
	];

// 添加介绍文字
intro.innerHTML = arr[sort].intro;
repre.innerHTML = '代表茶种：'+arr[sort].repre;

// 修改标题
var title = document.querySelector('title'),
	titles = ['','绿茶','白茶','黄茶','青茶','红茶','黑茶'];
	title.innerHTML = '茗溪堂 | 茶图库 > ' + titles[sort];