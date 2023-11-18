<?php
include("./iptocountry/data/countries.php");

function utf8_strlen($str) {
  return preg_match_all('/[\x00-\x7F\xC0-\xFD]/', $str, $dummy);
}

function utf8_substr($str,$from,$len) {
  return preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$from.'}'.
                       '((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$len.'}).*#s',
                       '$1',$str);
}

function lenLimiter($input,$limit) {
    if (utf8_strlen($input) > $limit) { // limite a x caractères pour l'affichage
        $output = utf8_substr($input, 0, $limit)."...";
    } else {
        $output = $input;
    }
    return preg_replace("#\040\.\.\.$#","...",$output);   
}



function iptocountry($ip) {
    $numbers = preg_split( "/\./", $ip);
    include("./iptocountry/data/".$numbers[0].".php");
    $code=($numbers[0] * 16777216) + ($numbers[1] * 65536) + ($numbers[2] * 256) + ($numbers[3]);
    foreach ($ranges as $key => $value) {
        if ($key<=$code) {
            if ($ranges[$key][0]>=$code) {
                $two_letter_country_code=$ranges[$key][1];
                break;
            }
        }
    }
    if ($two_letter_country_code=="")
        $two_letter_country_code = "unknown";
    return $two_letter_country_code;
}



function flagImg($two_letter_country_code) {
    global $countries;
    $flagImgFile="./iptocountry/flags_png/".strtolower($two_letter_country_code).".png";
    if (file_exists($flagImgFile))
        return "<img src=\"$flagImgFile\" width=\"16px\" height=\"16px\" style=\"margin-top:-2px; vertical-align: middle;\" title=\"{$countries[$two_letter_country_code][1]}\" alt=\"{$countries[$two_letter_country_code][1]}\" />";
    else
        return "<img src=\"./layout/stats_unknown.png\" width=\"16px\" height=\"16px\" style=\"margin-top:-3px; vertical-align: middle;\" title=\"Unknown location\" alt=\"Unknown location\" />";
}



function monthAnalysis($yearmonth) {
    // reading file line by line
    $statsArray = file("./log/log_visits_$yearmonth.txt");
    rsort($statsArray); // latest in time comes first
    
    // classer les lignes par date et pays et lister les references
    $statsAnalysis = array();
    foreach ($statsArray as $visit) {
        list($date,$ip) = explode(":::", trim($visit));
        if (!empty($ip)) {
            $two_letter_country_code = iptocountry($ip);
            $statsAnalysis[date("Y-m-d",$date)][$two_letter_country_code]++;
            ksort($statsAnalysis[date("Y-m-d",$date)]); // pays par ordre alphabétique
            arsort($statsAnalysis[date("Y-m-d",$date)]); // et surtout par ordre de fréquentation
        }
    }
    
    // count and generate html to display count per day and country
    $monthDetail = "<table>";
    foreach ($statsAnalysis as $date=>$countries) {
        list($year,$month,$day) = explode("-",$date);
        $weekDay = date("D", mktime(0,0,0,$month,$day,$year));
        $monthDetail .= "<tr><td class=\"day\"><b>$day</b><br /><span style=\"font-size:9px; line-height:12px;\">$weekDay</span></td><td class=\"dayContent\">";
        if (!empty($countries))
            foreach ($countries as $country=>$count)
                $monthDetail .= flagImg($country)."<b style=\"margin-left:3px; margin-right:8px;\">$count</b>";
        $monthDetail .= "</td></tr>";
    }
    $monthDetail .= "</table>";
    
    
    // reading references file line by line
    $refArray = array();
    if (file_exists("./log/log_references_$year$month.txt"))
        $statsArray = file("./log/log_references_$yearmonth.txt");
    else
        $statsArray = array();
    foreach ($statsArray as $ref)
        $refArray[trim($ref)]++;
    
    // generate html to display references with their hits count
    $monthReferences = "";
    $monthGoogleQueriesArray = array();
    arsort($refArray); // reverse sorting with keys maintained
    foreach ($refArray as $url=>$count) {
        $monthReferences .= "SectionElmts[\"references\"].push({\"url\" : \"$url\", \"link\" : \"".lenLimiter($url,60)."\", \"hits\" : \"$count hit".($count>1 ? "s" : "")."\"});\n";
        $parsed = parse_url($url);
        if (strstr($parsed["host"], "google")) {
            $get = explode("&", $parsed["query"]);
            foreach ($get as $param) {
                list($k, $v) = explode("=", $param);
                if ($k=="q")
                    $monthGoogleQueriesArray[urldecode($v)]+=$count;
            }
        }
    }
    
    // generate html to display google queries words cloud
    $monthGoogleQueries = "";
    ksort($monthGoogleQueriesArray);
    foreach ($monthGoogleQueriesArray as $query=>$count)
        $monthGoogleQueries .= "SectionElmts[\"googleQueries\"].push(\"<span style=\\\"font-size:".(8+$count*3)."px;\\\">".str_replace(" ","&nbsp;",htmlentities($query,ENT_QUOTES,"UTF-8"))."</span> &middot; \");\n";
    
    
    // return monthly data
    return array("detail"=>$monthDetail, "references"=>$monthReferences, "googleQueries"=>$monthGoogleQueries);
}
?>