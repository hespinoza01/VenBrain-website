<?php

$host=$_SERVER['HTTP_HOST'];
$uri=$_SERVER['REQUEST_URI'];
$availables_routes=array(
    "/", "/acerca", "/equipo", "/servicios"
);

// verify if the REQUEST_URI if available
if(in_array($uri, $availables_routes)){
	$cookie_value=$uri;
}else{
    $cookie_value="/404";
}

// headers declarations for evit cache storing for files
header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Connection: close");

// header declaration for redirect to 404 page when if necesary
if(count(explode("/", $uri)) > 2){
    header("Location: http://".$host."/404");
    exit();
}

// cookie declaration to indicate the application path
setcookie('websitepath', $cookie_value, time()+(86400 * 30), "/");

// loading a returning the html code for application
$index=file_get_contents('website.html');
echo $index;
