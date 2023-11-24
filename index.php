<?php include("./simplestats/simplestats.inc"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Diatotab, Diatonic Accordion / Melodeon Tablature Generator</title>
	<link rel="icon" href="favicon.ico">
	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet" href="abcjs-audio.css">
	<script src="abcjs-basic-min.js"></script>
	<!--<script src="../abcjs-melodeon-tab/dist/abcjs-basic.js"></script>-->
	<script src="diatotab.js"></script>
</head>
<body>
	<div class="container">
		<h1>Dia To Tab</h1>
		<div class="intro">
			<div>
				Tablature generation tool for <a href=https://en.wikipedia.org/wiki/Diatonic_button_accordion>diatonic accordion / melodeon</a> and <a href=https://en.wikipedia.org/wiki/Harmonica>harmonica</a>. The tunes are entered in ABC notation, tablature is created based on instrument selection.
				<br><br>
				Many ABC tunes are available on <a href=https://folktunefinder.com>folktunefinder.com</a> and <a href="https://thesession.org">thesession.org</a>. More information about ABC notation can be found at <a href=https://abcnotation.com>abcnotation.com</a>. You can choose the required instrument and tuning, one and two row melodeons with 3th button starts and harmonicas are supported. If the key of the input ABC does not match you instrument, use the transpose control, for example to transpose from G/C to C/F set this value to 5 (half steps).
			</div>
			<img style="margin-left:25px; width:300px; height:121px;" src="logo.png">
		</div>
		<h2> Two row melodeons </h2>
		There are some special layout options for two row melodeons. Buttons 1 and 1' can either be used for low notes or for accidentals. The push and pull notes of these buttons can be flipped. Same holds for 5', to configure the layout to use 'Dutch reversal'.
		<br><br>
		There are often multiple possibilities of playing the same tune. The algorithm tries to find the easiest way, but you might not agree with the result. The push/pull direction is derived from the bass chord (written in ABC notation between ""). For chords that can be played in both directions you can add annotations to overrule the direction. In addition, annotations can be added to force the melody row number.<br>

		<h3>Push/pull annotations</h3>
		Example for G/C melodeon where the <b>F</b> chord can be played in both push and pull.<br>
		<b>&gt;</b> means push direction, write <b>"F&gt;"</b> to set F chord to push.<br>
		<b>&lt;</b> means pull direction, write <b>"F&lt;"</b> to set F chord to pull.<br>

		<h3>Row number annotations</h3>
		Example for G/C melodeon where the <b>a</b> note can be played on both the outer and the inner row (both in pull).<br>
		<b>.</b> means row 1 or outer row, write <b>"F."a</b> to play it with 11 in pull.<br>
		<b>:</b> means row 2 or inner row, write <b>"F:"a</b> to play it with 9' in pull.<br>
		
		<h2>Instrument / Tuning</h2>
		<div class="borderblock">
			<select id="instrument" size="5" onchange="AddTunings()">
			</select>
		</div>
		<div class="borderblock">
			<select id="tuning" size="5" onchange="CreateEditor()">
			</select>
		</div>
		<div class="block">
			<input type="checkbox" id="chin"  onchange="CreateEditor()" checked>
			<label for="chin" id="chin_lab"> Top accidentals (1/1')</label><br>
			<input type="checkbox" id="inv1"  onchange="CreateEditor()">
			<label for="inv1" id="inv1_lab"> Button 1 push/pull reverse</label><br>
			<input type="checkbox" id="inv1a" onchange="CreateEditor()" checked>
			<label for="inv1a" id="inv1a_lab"> Button 1' push/pull reverse</label><br>
			<input type="checkbox" id="inv5a" onchange="CreateEditor()" checked>
			<label for="inv5a" id="inv5a_lab"> Button 5' push/pull reverse</label><br>
		</div>
		<div class="blockend"></div>
	</div>
		
	<div class="float-container">
		<div class="float-child-abc">
			<h2>ABC Editor</h2>
			<button onclick="ExampleShow()">Load ABC example</button><br>
			<div class="highLite">
				<div class="highLite_colors"   id="abc_colors"></div>
				<div class="highLite_editable" id="abc_editable" contenteditable="true" spellcheck="false" onkeydown="AbcKeyDown()" onpaste="AbcPaste(event)" oninput="AbcInput()" onmousemove="AbcSelect()">
T: Andro<br>
C: Trad. (Bretagne)<br>
R: Andro<br>
Q: 1/4=160<br>
M: 4/4<br>
L: 1/4<br>
K: C<br>
|:"Am"e e/2f/2 e3/2 d/2|c B AA|"G>"ddBG |"F&lt;"A/2B/2 c/2d/2 "Em"e2|<br>
"Am"e e/2f/2 e3/2 d/2  |cB AA |"G>"ddBG |"F&lt;"A/2B/2 c/2B/2 "Am"A2:|<br>
|:"C"eg"Am"A2|"C"eg"G>"B2|ddB/2A/2G|"F&lt;"A/2B/2 c/2d/2 "Em>"e2|<br>
"C"eg"Am"A2|"C"eg"G>"B2|ddB/2A/2G|"F&lt;"A/2B/2 c/2B/2 "Am"A2:|<br>
				</div>
			</div>
			<textarea id="abc" style="display:none;" spellcheck="false">
			</textarea>
			<div id="warnings"></div>
			<label for="transpose">Transpose</label>
			<input type="number" id="transpose" value="0" min="-24" max="24" size="4" onchange="CreateEditor()">
			<button onclick="TransposeAbc()">Transpose ABC</button><br><br>
			<div id="audio"></div>
			<a href="print.html" target="_blank" id="print" onmouseover="setPrintLink()" onmousedown="setPrintLink()" onclick="setPrintLink()">Show printer friendly version</a><br>
		</div>
		<div class="float-child-tab">
			<h2>Tablature Output</h2>
			<div id="paper" class="paper"></div>
		</div>
		<div class="blockend"></div>
	</div>
	
	<div class="footer">
		The application runs client side using a fork of <a href='https://www.abcjs.net'>abcjs</a> (<a href='https://github.com/RickvanderS/abcjs-melodeon-tab'>Github repository</a>), no data is send to the server.<br>Created by Rick van der Sluijs, <a href="#" id="link" onmouseover="setLink()" onmousedown="setLink()" onclick="setLink()" onfocusout="clearLink()">mail</a> me for questions or bug reports.
	</div>
	
	<div class="overlay-container" id="example" onclick="ExampleClose()">
		<div class="overlay" onclick="event.stopPropagation()">
			<br>
			<a href="" onclick="return ExampleLoad(0)">Instrument Layout</a><br>
			<br>
			<a href="" onclick="return ExampleLoad(1)">Andro (trad. Bretange)</a><br>
			<a href="" onclick="return ExampleLoad(2)">Kerfank 1870/Den Andro</a><br>
			<a href="" onclick="return ExampleLoad(3)">Mon Père Avait un Gars Lonla</a><br>
			<a href="" onclick="return ExampleLoad(4)">What Shall We Do With the Drunken Sailor?</a><br>
			<br>
			<b><a href="" onclick="return ExampleClose()">Close</a></b><br>
		</div>
	</div>
	<script>
		window.onload = function() {
			InitPage();
		}
	</script>
</body>
</html>