<html>
<?php
include ("head.htm");
?>
<body>
<?php include_once("analyticstracking.php") ?>
<?php
include ("header.htm");
?>
<div class="wrap_bd con_bd">
  <div class="slides_m_top"></div>
  <div id="container">
    <div class="w990">
      <div class="padded about_wrap">
        <div class="entry-content">
<?php
include ("about_nav.htm");
?>
<?php
include ("./content/" . $_GET['page']);
?>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
include ("footer.htm");
?>
</body>
</html>
