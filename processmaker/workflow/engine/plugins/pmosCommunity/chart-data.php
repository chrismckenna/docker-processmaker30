<?php

  $chartType =  isset ( $_GET['chart']) ?  $_GET['chart']  : '1' ;

  // use the chart class to build the chart:
  require_once ( "class.pmosCommunity.php" );
  include_once( 'open-flash-chart.php' );
  $chartsObj = new pmosCommunityClass();

  if ( method_exists( $chartsObj, $chartType) ) {
  	$chartsObj->{$chartType}();
  	die;
  }
  
