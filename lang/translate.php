<?php
	function TranslatePage($LanguageCode, $aTranslations) {
		//Read the English HTML file
		$HtmlText = file_get_contents("../index.html");
		if ($HtmlText === false)
			echo "Unable to read index.html \n";
		
		//Change the html language code
		$HtmlText = str_replace(' lang="en"', ' lang="' . $LanguageCode . '"', $HtmlText);
		
		//Fix relative paths to other files
		$HtmlText = str_replace(' href="favicon', ' href="../favicon', $HtmlText);
		$HtmlText = str_replace(' href="styles' , ' href="../styles' , $HtmlText);
		$HtmlText = str_replace(' href="abcjs'  , ' href="../abcjs'  , $HtmlText);
		$HtmlText = str_replace(' href="lang/'  , ' href="'          , $HtmlText);
		$HtmlText = str_replace(' src="'        , ' src="../'        , $HtmlText);
		
		//Parse the html
		$HtmlDom = new DOMDocument();
		$HtmlDom->loadHTML($HtmlText, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$HtmlXpath = new DOMXPath($HtmlDom);
		
		//Translate description meta tag
		$aMeta = $HtmlXpath->query('//meta[@name="description"]');
		foreach ($aMeta as $Node) {
			$Key = "META";
			if (TranslationExists($aTranslations, $Key))
				$Node->setAttribute("content", $aTranslations[$Key]);
		}
		
		//Translate page title
		$aTitle = $HtmlXpath->query('//title');
		foreach ($aTitle as $Node) {
			$Key = "TITLE";
			ReplaceInnerHtml($aTranslations, $HtmlDom, $Node, $Key);
		}
		
		//Translate content of html tags with data-trans attribute
		$aNodes = $HtmlXpath->query('//*[@data-trans]');
		foreach ($aNodes as $Node) {
			$Key = $Node->getAttribute('data-trans');
			ReplaceInnerHtml($aTranslations, $HtmlDom, $Node, $Key);
		}
		
		//Write the new html text to the page
		$HtmlText = $HtmlDom->saveHTML();
		echo $HtmlText;
	}
	
	function TranslationExists($aTranslations, $Key) {
		if (!isset($aTranslations[$Key]) || $aTranslations[$Key] == "")
			return false;
		return true;
	}
	
	function ReplaceInnerHtml($aTranslations, $HtmlDom, $Node, $Key) {
		if (!TranslationExists($aTranslations, $Key))
			return;
		
		//Remove existing children
		while ($Node->firstChild) {
			$Node->removeChild($Node->firstChild);
		}
		
		// Load replacement HTML into a temporary fragment
		$frag = $HtmlDom->createDocumentFragment();
		// createDocumentFragment()->appendXML accepts well-formed XML; use loadHTML on a temporary DOMDocument otherwise
		$tmp = new DOMDocument();
		libxml_use_internal_errors(true);
		// wrap in container to ensure a single root
		$tmp->loadHTML('<?xml encoding="utf-8"?>' . '<div>' . $aTranslations[$Key] . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$container = $tmp->getElementsByTagName('div')->item(0);
		foreach ($container->childNodes as $child) {
			// import node into main document and append
			$frag->appendChild($HtmlDom->importNode($child, true));
		}
		$Node->appendChild($frag);
	}
?>