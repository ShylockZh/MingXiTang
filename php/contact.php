<?php
	$mess_name = $_GET["name"];
	$mess_email = $_GET["email"];
	$mess_conent = $_GET["textarea"];

	mysql_connect('127.0.0.1:3306','root','root');
	mysql_query('set names utf8');
	mysql_select_db('tea');
	$sql = "INSERT into message (mess_name,mess_email,mess_content,mess_date) values 
			('".$mess_name."','".$mess_email."','".$mess_conent."',now())";
	$res = mysql_query($sql);
	if($res) echo true;
	else echo false;
	// header("location:/project/contact.html");
?>