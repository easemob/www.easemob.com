<?php


function createthumb($name,$new_w,$new_h) {
  $system=explode('.',$name);
  if (preg_match('/jpg|jpeg/',$system[1])){
    $src_img=imagecreatefromjpeg($name);
  }
  if (preg_match('/png/',$system[1])){
    $src_img=imagecreatefrompng($name);
  }


  $old_x=imageSX($src_img);
  $old_y=imageSY($src_img);
  if ($old_x > $old_y) {
    $thumb_w=$new_w;
    $thumb_h=$old_y*($new_h/$old_x);
  }
  if ($old_x < $old_y) {
    $thumb_w=$old_x*($new_w/$old_y);
    $thumb_h=$new_h;
  }
  if ($old_x == $old_y) {
    $thumb_w=$new_w;
    $thumb_h=$new_h;
  }

  $dst_img=ImageCreateTrueColor($thumb_w,$thumb_h);
  imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y);

  if (preg_match("/png/",$system[1]))
  {
      header('Content-Type: image/png');
      imagepng($dst_img);
  } else {
      header('Content-Type: image/jpg');
      imagejpeg($dst_img);
  }
  imagedestroy($dst_img);
  imagedestroy($src_img);
}

 $file_folder = 'uploads/';
 $filename = $_GET['filename'];
 $file_path = $file_folder . $filename;
 $thumbnail_size = 100;
 if (isset($_GET['size'])) {
   $thumbnail_size = $_GET['size'];
 }
 if (file_exists($file_path)) {
     createthumb($file_path, $thumbnail_size, $thumbnail_size);
 } else {
    header('HTTP/1.0 404 Not Found');
    echo "<h1>404 Not Found</h1>";
    echo "The page that you have requested could not be found.";
    die;
 }

?>
