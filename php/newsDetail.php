<?php
	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
	mysql_select_db('tea');
	$nid = $_GET["nid"];
	$sql = "SELECT * from news where news_id=".$nid;
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	$data = json_encode($row);
	echo $data;
?>