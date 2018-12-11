<?php
	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
	mysql_select_db('tea');
	$sql = "SELECT * from news";
	$res = mysql_query($sql);
	$arr = mysql_fetch_array($res);

	if($arr){
		// echo $arr['news'];
		echo json_encode($arr);
	}else{
		echo false;
	}
?>