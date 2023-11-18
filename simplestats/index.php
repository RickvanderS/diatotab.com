<?php
include("./functions.inc");


// tableau de correspondance numéros et noms des mois
$monthsTrivia = array("01"=>"January", "02"=>"February", "03"=>"March", "04"=>"April", "05"=>"May", "06"=>"June", "07"=>"July", "08"=>"August", "09"=>"September", "10"=>"October", "11"=>"November", "12"=>"December");


// include ou GET pour year et month
if (!isset($_GET['year']))
    $YEAR = (string) date("Y");
else
    $YEAR = (string) $_GET['year'];

if (!isset($_GET['month']) || ($_GET['month']==date("m") && $_GET['year']==date("Y"))) {
    $MONTH = (string) date("m");
    $DAY = (string) date("d");
} else {
    $MONTH = (string) $_GET['month'];
    $DAY = "03"; // pour avoir les 3 premiers jours du mois sur lequel on revient
}


// open yearly stats log, build tabs/graph and save this month count
$thisMonthCount = array("others"=>0, "robots"=>0);
$yearlyCounts = array("01"=>0,"02"=>0,"03"=>0,"04"=>0,"05"=>0,"06"=>0,"07"=>0,"08"=>0,"09"=>0,"10"=>0,"11"=>0,"12"=>0);
$tabRatio = 0;
if (file_exists("./log/log_$YEAR.txt")) {
    $yearlyStatsArray = file("./log/log_$YEAR.txt");
    $yearlyCounts = array();
    $biggestCount = 0;
    foreach ($yearlyStatsArray as $month) {
        list($key, $values) = explode(":::", trim($month));
        list($others, $robots) = explode(";", $values);
        $yearlyCounts[$key] = (int) $others;
        if ((int) $others > $biggestCount)
            $biggestCount = (int) $others;
        if ($key == $MONTH)
            $thisMonthCount = array("others"=>$others, "robots"=>$robots);
    }
    if ($biggestCount >= 1)
        $tabsRatio = 115/$biggestCount; // pour répartir le plus gros mois sur toute la hauteur possible des tabs
    else
        $tabsRatio = 115;
}

    
// selected month data retrieval
if (file_exists("./log/log_visits_$YEAR$MONTH.txt"))
    $thisMonthAnalysis = monthAnalysis("$YEAR$MONTH");
else
    $thisMonthAnalysis = array("detail"=>"", "references"=>"", "googleQueries"=>"");
    

// display
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="Content-language" content="en" />
        <title>Simple Stats&nbsp;&nbsp;&gt;&nbsp;&nbsp;Your web statistics utility</title>
        <meta name="Author" content="USER STUDIO" />
        <meta name="Publisher" content="USER STUDIO" />
        <meta name="Copyright" content="USER STUDIO" />
        <meta name="robots" content="none" />
        <meta http-equiv="imagetoolbar" content="no" /> <!-- IE special -->
        
        <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
        <link rel="stylesheet" type="text/css" href="./layout.css" title="Simple Stats" media="all" />
    
        <script language="javascript" type="text/javascript">
            // img preloader (needed to give priority to rollovers & bkgd imgs)
            function imgPreloader(imgStr) {
                var imgObj = new Array();
                for (i=0; i<imgStr.length; i++) {
                    imgObj[i] = new Image();
                    imgObj[i].src = imgStr[i];
                }
            }
            var imgStr = new Array("./layout/stats_bkgd_header.png","./layout/stats_bkgd_body.png","./layout/stats_bkgd_footer.png","./layout/stats_day.png","./layout/stats_logo_on.jpg");
            imgPreloader(imgStr);
            
            // general button imgs rollovers
            function rollon(o) {
                offPath=o.src;
                newPath=offPath.replace(/_off/, "_on");
                o.src=newPath;  
            }
            function rolloff(o) {
                onPath=o.src;
                newPath=onPath.replace(/_on/, "_off");
                o.src=newPath;
            }
            
            // section deploying
            var SectionElmts = {};
            SectionElmts["references"] = new Array();
            <?php echo $thisMonthAnalysis['references']; ?>
            SectionElmts["googleQueries"] = new Array();
            <?php echo $thisMonthAnalysis['googleQueries']; ?>
            
            function deploy(section) {
                document.getElementById(section).innerHTML = "";
                for (i=0; i<SectionElmts[section].length; i++) {
                    if (section == "references")
                        document.getElementById(section).innerHTML += "<a href=\""+SectionElmts[section][i].url+"\" target=\"_blank\">"+SectionElmts[section][i].link+"</a> : "+SectionElmts[section][i].hits+"<br />";
                    else
                        document.getElementById(section).innerHTML += SectionElmts[section][i];
                }
                document.images[section+"Button"].src = "./buttons/stats_deployed.gif";
                document.anchors[section+"Link"].onclick = function() {
                                                                        inploy(section);
                                                                        return true;
                                                                      };
            }
            
            function inploy(section) {
                document.getElementById(section).innerHTML = "";
                document.images[section+"Button"].src = "./buttons/stats_inployed.gif";
                document.anchors[section+"Link"].onclick = function() {
                                                                        deploy(section);
                                                                        return true;
                                                                      };
            }
            
            function showGSQ() {
            	deploy('googleQueries');
            }
        </script>
        <!--[if lt IE 7.]>
            <script defer type="text/javascript" src="./pngfix.js"></script>
        <![endif]-->
    </head>
    
    
    <body onload="showGSQ();">
        <div id="container">
            
            <table id="statsT"><tr>
                <td>
                    <div id="stats">
                        <div id="statsHeader">
                            <table id="year">
                                <tr><td style="text-align:left;"><a href="?year=<?php echo ((int) $YEAR - 1); ?>"><img src="./buttons/stats_leftarrow.gif" title="<?php echo ((int) $YEAR - 1); ?>" alt="previous year" /></a></td><td><?php echo $YEAR; ?></td><td style="text-align:right;"><a href="?year=<?php echo ((int) $YEAR + 1); ?>"><img src="./buttons/stats_rightarrow.gif" title="<?php echo ((int) $YEAR + 1); ?>" alt="next year" /></a></td></tr>
                            </table>
                            <table id="months">
                                <tr>
                                    <?php
                                    foreach ($yearlyCounts as $key=>$value) {
                                        if ($MONTH == $key)
                                            $tabClass = "tabOn";
                                        else
                                            $tabClass = "tabOff"; ?>
                                        <td<?php echo ($tabClass=="tabOn" ? "" : " onclick=\"window.location.href='?year=$YEAR&month=$key';\"")." title=\"{$monthsTrivia[$key]} : $value visits\""; ?>><?php echo "<div class=\"$tabClass\"".($tabClass=="tabOn" ? "" : " onclick=\"window.location.href='?year=$YEAR&month=$key';\"")."><img src=\"./layout/stats_tab_".($tabClass=="tabOn" ? "on" : "off").".gif\" style=\"width:29px; height:".($value*$tabsRatio)."px;\" title=\"{$monthsTrivia[$key]} : $value visits\" alt=\"{$monthsTrivia[$key]}\" /></div>"; ?></td>
                                        <?php
                                    } ?>
                                </tr>
                            </table>
                        </div>
                        <div id="statsBody">
                            <div id="monthTotal">
                                <?php echo "<b>{$monthsTrivia[$MONTH]} : {$thisMonthCount['others']} visit".($thisMonthCount['others']>1 ? "s" : "")."</b><br /><i>(+{$thisMonthCount['robots']} search engine robot hit".($thisMonthCount['robots']>1 ? "s" : "").")</i>"; ?>
                            </div>
                            <div id="monthDetail">
                                <?php
                                echo $thisMonthAnalysis['detail'];
                                ?>
                            </div>
                            <div id="monthReferences">
                                <a href="javascript:void(0);" onclick="deploy('references');" id="referencesLink" name="referencesLink" title="deploy the References"><img src="./buttons/stats_inployed.gif" id="referencesButton" name="referencesButton" style="display:inline; cursor:pointer; margin-left:-5px;" alt="deploy/inploy" />&nbsp;<b>References</b></a><br />
                                <p id="references"></p>
                            </div>
                            <div id="monthGoogleQueries">
                                <a href="javascript:void(0);" onclick="deploy('googleQueries');" id="googleQueriesLink" name="googleQueriesLink" title="deploy the Google search queries"><img src="./buttons/stats_inployed.gif" id="googleQueriesButton" name="googleQueriesButton" style="display:inline; cursor:pointer; margin-left:-5px;" alt="deploy/inploy" />&nbsp;<b>Google search queries</b></a><br />
                                <p id="googleQueries"></p>
                            </div>
                        </div>
                        <div id="statsFooter">
                            <!-- hop -->
                        </div>
                    </div>
                </td>
                
                <td>
                    <div id="statsCopyrightNotice">
                        <a href="http://stats.simplepublisher.com/" target="_blank"><img src="./layout/stats_logo_off.jpg" onmouseover="rollon(this);" onmouseout="rolloff(this);" title="Simple Stats (by USER STUDIO)" alt="Simple Stats" /></a><br />
                        <b>Simple Stats</b> is distributed<br />for free by <a href="http://www.userstudio.fr/" title="Digital innovation experts" target="_blank"><b>USER</b>&nbsp;STUDIO</a>
                    </div>
                </td>
            </tr></table>
            
        <div>
    </body>

</html>