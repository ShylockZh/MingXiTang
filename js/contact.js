var iname = document.getElementsByTagName('input')[0],
	email = document.getElementsByTagName('input')[1],
	message = document.getElementsByTagName('textarea')[0];


// 获取焦点事件
function onFocus(a,i){
	var spanName = a.previousElementSibling;
	spanName.style.fontSize = '10px';
	spanName.style.marginTop = '0px';
	a.style.marginTop = i;
}

// 失去焦点事件
function onBlur(a,index){
	checkEmpty(a);
	switch (index){
		case 'name':if(checkName()){
						a.classList.add('success');
					}else{
						a.value = '';
						a.setAttribute('placeholder','请输入少于20个字符的内容');
						a.style.borderColor = '#FF511A';
						a.classList.remove('success');
						a.classList.add('invalid');
					}
					break;
		case 'email':if(checkEmail()){
						a.classList.add('success');
					}else{
						a.value = '';
						a.setAttribute('placeholder','输入不合法');
						a.style.borderColor = '#FF511A';
						a.classList.remove('success');
						a.classList.add('invalid');
					}
					break;
		case 'message':if(checkEmpty(message)){
						a.classList.add('success');
						}else{
						a.classList.remove('success');
						}
	}
	var access = document.querySelectorAll('.success');
	if(access.length == 3){
		btn.classList.remove('disable');
		btn.removeAttribute('disabled');
	}
}


// 判空
function checkEmpty(a){
	// 如果为空
	if(a.value == null || a.value ==''){
		a.setAttribute('placeholder','请输入内容');
		a.style.borderColor = '#FF511A';
		a.classList.add('invalid');
		return false;
	}else{
		return true;
	}
}
// 判定name输入内容
function checkName(){
	var reg = /^.{1,20}$/;
	return reg.test(iname.value);
}
// 判定email输入内容
function checkEmail(){
	var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	return reg.test(email.value);
}


var btn = document.querySelector('input[type=submit]');
btn.onclick = function(){
	var xmlhttp,obj;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObjext("Microsoft.XMLHTTP");
	}
	var val = '/project/php/contact.php?name='+iname.value+'&email='+email.value+'&textarea='+message.value;
	xmlhttp.open('GET',val,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			obj = xmlhttp.responseText;
			if(obj){
				alert("thank u!");
			}else{
				alert("retry")
			}
		}
	}
}

	
	