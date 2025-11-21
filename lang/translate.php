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
		
		//Replace content of html tags with data-trans attribute with the translated text
		$HtmlXpath = new DOMXPath($HtmlDom);
		$aNodes = $HtmlXpath->query('//*[@data-trans]');
		foreach ($aNodes as $node) {
			$key = $node->getAttribute('data-trans');
			
			
			//Skip if not translation is available
			if (!isset($aTranslations[$key]) || $aTranslations[$key] == "")
				continue;
			
			//Remove existing children
			while ($node->firstChild) {
				$node->removeChild($node->firstChild);
			}
			
			// Load replacement HTML into a temporary fragment
			$frag = $HtmlDom->createDocumentFragment();
			// createDocumentFragment()->appendXML accepts well-formed XML; use loadHTML on a temporary DOMDocument otherwise
			$tmp = new DOMDocument();
			libxml_use_internal_errors(true);
			// wrap in container to ensure a single root
			$tmp->loadHTML('<?xml encoding="utf-8"?>' . '<div>' . $aTranslations[$key] . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
			$container = $tmp->getElementsByTagName('div')->item(0);
			foreach ($container->childNodes as $child) {
				// import node into main document and append
				$frag->appendChild($HtmlDom->importNode($child, true));
			}
			$node->appendChild($frag);
		}
		
		//Write the new html text to the page
		$HtmlText = $HtmlDom->saveHTML();
		echo $HtmlText;
	}
?>