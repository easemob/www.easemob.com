<?php
$target_path = "uploads/";
if (isset($_POST['app'])) {
    $appId = $_POST['app'];
    $target_path = $target_path . $appId . "/";
}

$file_to_delete = $target_path . $_FILES["file"]["name"];
echo "file to delete:" . $file_to_delete;
unlink($file_to_delete);
?>

