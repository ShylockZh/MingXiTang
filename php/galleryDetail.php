<?php
	mysql_connect('127.0.0.1','root','root');
	mysql_query('set names utf8');
	mysql_select_db('tea');
	$sort = $_GET["sort"];
	if($sort == 0){
		$sql ='select * from picture';
	}else{
		$sql = "select * from picture where pic_sort like '%".$sort."%'";
	}
	$res = mysql_query($sql);
	$rows = array();
	while($row = mysql_fetch_assoc($res)){
		$rows[] = $row;
	}
	$data = json_encode($rows);
	echo $data;
?>
