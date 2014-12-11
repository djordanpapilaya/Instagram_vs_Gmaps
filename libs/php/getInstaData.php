<?php
require_once("settings.php");
$instagramApiUrl = 'https://api.instagram.com/v1/';

$queryString = array(
//    "client_id" => INSTAGRAM_CLIENT_ID,
    "access_token" => INSTAGRAM_ACCESS_TOKEN
);

$methods = array(
    "media/popular",
    "tags/search",
    "tags/@replace/media/recent",
    "users/" . INSTAGRAM_USER_ID,
    "users/208389622/media/recent"
);

$countPhotos = "&count=15";

$method = $methods[4];
$url = $instagramApiUrl . $method;
$url .= "?" . http_build_query($queryString) . $countPhotos;

$filedata = file_get_contents($url);
$data = json_decode($filedata);
$markers = array();
foreach ($data -> data as $photo) {
    if (isset($photo->location)){
        if (isset($photo->videos)){
            $markers[] = array(
                "latitude" => $photo->location->latitude,
                "longitude" => $photo->location->longitude,
                "title" => $photo->caption->text,
                "video" => $photo -> videos -> low_resolution -> url
            );
        }else{
            $markers[] = array(
                "latitude" => $photo->location->latitude,
                "longitude" => $photo->location->longitude,
                "title" => $photo->caption->text,
                "photo" => $photo -> images -> low_resolution->url,
            );
        }
    }
};
header("Content-Type: application/json");
echo json_encode($markers);
exit;