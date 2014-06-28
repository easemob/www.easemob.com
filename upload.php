<?php
print "<pre>";
print_r ($_FILES);
print_r ($_POST);
print_r ($_REQUEST);
print "</pre>";
$allowedExts = array("gif", "jpeg", "jpg", "png", "3gp", "mp4", "amr");
$extension = end(explode(".", $_FILES["file"]["name"]));
$target_path = "uploads/";
if (isset($_POST['app'])) {
    $appId = $_POST['app'];
    $target_path = $target_path . $appId . "/";
    if (!file_exists($target_path))
    {
      print "mkdir ..." . $target_path;
      mkdir($target_path);
    }
}

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "audio/3gp")
|| ($_FILES["file"]["type"] == "video/mpeg4")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 52428800)   //the file size limit 50M
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {
    /*
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
    */

    if (file_exists($target_path . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      $target_path . $_FILES["file"]["name"]);
      echo "Stored in: " . $target_path . $_FILES["file"]["name"];
      }
    }
  }
else
  {
  echo "Invalid file";
  }
?>

