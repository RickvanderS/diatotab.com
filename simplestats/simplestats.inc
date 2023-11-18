<?php
session_start();


if (is_dir("./simplestats/log"))
    $SSLOGDIR = "./simplestats/log";
elseif (is_dir("../simplestats/log"))
    $SSLOGDIR = "../simplestats/log";
else {
    $SSLOGDIR = "./simplestats/log";
    mkdir($SSLOGDIR, 0755);
}
    

if (!$_SESSION['stats']['done'] && !isset($_GET['nostats'])) { // pour comptabiliser les visites uniques
    
    
    // on vérifie encore dans le recent log
    $logged = false;
    $newrecentlog = array();
    $filepath = "$SSLOGDIR/log_recent.txt";
    if (!file_exists($filepath)) {
        $fp = fopen($filepath, "w");
        fwrite($fp, "");
        fclose($fp);
    }
    $recentlog = file($filepath);
    rsort($recentlog); // plus de chance de breaker rapidement du foreach
    $now = time() - 15*60; // dans les 15 minutes
    foreach ($recentlog as $rl) {
        list($date,$ip) = explode(":::", trim($rl));
        if ($date > $now) {
            $newrecentlog[] = "$date:::$ip"; // encore bon pour être dans les récents
            if ($_SERVER['REMOTE_ADDR'] == $ip) {
                $logged = true;
                break;
            }
        }
    }
    if (!$logged)
        $newrecentlog[] = time().":::".$_SERVER['REMOTE_ADDR'];
    $fp = fopen($filepath, "w");
    fwrite($fp, implode("\n", $newrecentlog));
    fclose($fp);
    
    
    if (!$logged) {
    
    
        // mise en variables session
        $_SESSION['stats']['visit'] = 1;
        $_SESSION['stats']['date'] = time();
        $_SESSION['stats']['ip'] = $_SERVER['REMOTE_ADDR'];
        $_SESSION['stats']['browser'] = $_SERVER['HTTP_USER_AGENT'];
        $_SESSION['stats']['page'] = $_SERVER['PHP_SELF']."?".$_SERVER['QUERY_STRING'];
        $_SESSION['stats']['ref'] = $_SERVER['HTTP_REFERER'];    
        
        
        // on teste si c'est un robot
        $browser = $_SESSION['stats']['browser'];
        if (strstr(strtoupper($browser),"MSIE") || strstr(strtoupper($browser),"FIREFOX") || strstr(strtoupper($browser),"SAFARI") || strstr(strtoupper($browser),"OPERA") || strstr(strtoupper($browser),"CHROME") || strstr(strtoupper($browser),"NETSCAPE") || strstr(strtoupper($browser),"CAMINO") || strstr(strtoupper($browser),"SEAMONKEY") || strstr(strtoupper($browser),"ICAB") || strstr(strtoupper($browser),"K-MELEON") || strstr(strtoupper($browser),"AMAYA") || strstr(strtoupper($browser),"FLOCK") || strstr(strtoupper($browser),"GALEON") || strstr(strtoupper($browser),"MAXTHON") || strstr(strtoupper($browser),"DILLO") || strstr(strtoupper($browser),"SLIM") || strstr(strtoupper($browser),"KIDROCKET") || strstr(strtoupper($browser),"PHASEOUT") || strstr(strtoupper($browser),"OMNIWEB") || strstr(strtoupper($browser),"ICEWEASEL")) {
            
            // ce n'est pas un robot
            $ROBOT = false;
        
            // filepath : if new month, new file will be created when writing below
            $filepath = "$SSLOGDIR/log_visits_".date("Ym").".txt";
            // écriture de la visite dans le fichier courant
            $fp = fopen($filepath, "a"); // append
            fwrite($fp, $_SESSION['stats']['date'].":::".$_SESSION['stats']['ip']."\n");
            fclose($fp);
        
            // filepath : if new month, new file will be created when writing below
            $filepath = "$SSLOGDIR/log_references_".date("Ym").".txt";
            // écriture de la visite dans le fichier courant
            if (!empty($_SESSION['stats']['ref'])) {
                $fp = fopen($filepath, "a"); // append
                fwrite($fp, $_SESSION['stats']['ref']."\n");
                fclose($fp);
            }
            
        } else {
        
            // c'est un robot
            $ROBOT = true;
            
        }
        
        
        // filepath : if new year, new file will be created when writing below
        $filepath = "$SSLOGDIR/log_".date("Y").".txt";
        if (!file_exists($filepath)) {
            $fp = fopen($filepath, "w");
            fwrite($fp, "01:::0;0\n02:::0;0\n03:::0;0\n04:::0;0\n05:::0;0\n06:::0;0\n07:::0;0\n08:::0;0\n09:::0;0\n10:::0;0\n11:::0;0\n12:::0;0");
            fclose($fp);
        }
        
        // lecture du file ligne par ligne
        $statsRaw = file($filepath);
        $statsStr = "";
        foreach ($statsRaw as $month) {
            list($key,$values) = explode(":::",trim($month));
            if ($key == date("m")) {
                list($others,$robots) = explode(";",$values);
                if ($ROBOT)
                    $robots++;
                else
                    $others++;
                $values = "$others;$robots";
            }
            $statsStr .= "$key:::$values\n";
        }
        $fp = fopen($filepath, "w");
        fwrite($fp, $statsStr);
        fclose($fp);
        
        
    }


}


$_SESSION['stats']['done'] = true;


?>