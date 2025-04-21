function removeOptions(selectElement) {
	var i, L = selectElement.options.length - 1;
	for (i = L; i >= 0; i--) {
		selectElement.remove(i);
	}
}

function showElement(id, show) {
	if (show)
		document.getElementById(id).style.display = "";
	else
		document.getElementById(id).style.display = "none";
}

function isShown(id) {
	return document.getElementById(id).style.display != "none";
}

function AddInstruments() {
	let Instruments = document.getElementById("instrument");
	removeOptions(Instruments);
	let Instrument;
	
	Instrument = document.createElement("option");
	Instrument.text  = "Diatonic Accordion / Melodeon 1 row";
	Instrument.value = "M_1";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Diatonic Accordion / Melodeon 2 row fourth apart";
	Instrument.value    = "M_2";
	Instrument.selected = 'selected';
	Instruments.add(Instrument);

	Instrument = document.createElement("option");
	Instrument.text     = "Diatonic Accordion / Melodeon 2.5 row fourth apart, helper row";
	Instrument.value    = "M_25";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Diatonic Accordion / Melodeon 2.5 row club";
	Instrument.value    = "M_CLUB";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Diatonic Accordion / Melodeon 3 row fourth apart";
	Instrument.value    = "M_3";
	Instruments.add(Instrument);

	Instrument = document.createElement("option");
	Instrument.text  = "Diatonic Harmonica / French Harp";
	Instrument.value = "H_1";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text  = "No tablature, notes only";
	Instrument.value = "NONE";
	Instruments.add(Instrument);
	
	AddVariantsTunings();
}

function AddTunings2Row() {
	let Tunings = document.getElementById("tuning");
	
	var Tuning = document.createElement("option");
	Tuning.text     = "G/C";
	Tuning.selected = 'selected';
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "A/D";
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "B♭/E♭";
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "C/F";
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "D/G";
	Tunings.add(Tuning);
}

function AddVariantsTunings() {
	//Get selectors
	let Instruments = document.getElementById("instrument");
	let Variants    = document.getElementById("variant");
	let Tunings     = document.getElementById("tuning");
	
	//Get selected instrument, and currently selected tuning
	let Instrument    = Instruments.value;
	let RestoreTuning = Tunings.value;
	
	//Clear variants and tunings
	removeOptions(Variants);
	removeOptions(Tunings);
	
	//Load depending on the selected instrument
	let show_options_single = false;
	let show_options_mel    = true;
	let show_options_harm   = false;
	switch (Instrument) {
		case "M_1":
			show_options_single = true;
			show_options_mel    = false;
			
			//Add 1row variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "7 button";
				Variant.value      = "7";
				Variant.dataSource = "";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "10 button";
				Variant.value      = "10";
				Variant.dataSource = "http://forum.melodeon.net/files/site/keyboards/1%20Row%204%20Bass%20-%20C.jpg";
				Variant.selected   = 'selected';
				Variants.add(Variant);
			}
			
			//Add 1row tunings
			{
				var Tuning = document.createElement("option");
				Tuning.text = "B♭";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "C";
				Tuning.selected = 'selected';
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "D";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "G";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "A";
				Tunings.add(Tuning);
			}
			break;
		case "M_2":
			//Add 2row variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 3th button start, 1/1' accidentals";
				Variant.value      = "21^";
				Variant.dataSource = "https://ggms.nl/toetsenschemas/frans/2Rij-G_C-Knoppen.pdf";
				Variant.selected   = 'selected';
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 3th button start, 1/1' low notes";
				Variant.value      = "21";
				Variant.dataSource = "http://forum.melodeon.net/files/site/keyboards/2%20Row%20-%20G_C%20-%20with%20low%20notes.jpg";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 4th button start, 1/1' accidentals";
				Variant.value      = "21^>";
				Variant.dataSource = "";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 4th button start, 1/1' low notes";
				Variant.value      = "21>";
				Variant.dataSource = "";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 4th button start, 1/1' accidentals";
				Variant.value      = "23^>";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG23acc.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 4th button start, 1/1' low notes";
				Variant.value      = "23>";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG23low.gif";
				Variants.add(Variant);
			}
			
			//Add 2row tunings
			AddTunings2Row();
			break;
		case "M_25":
			//Add 2.5row variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "21+2 button, 8 bass, Hohner Merlin";
				Variant.value      = "21+2_Hohner";
				Variant.dataSource = "";
				Variant.selected   = "selected";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21+4 button, 12 bass, Hohner Galaad";
				Variant.value      = "21+4_Hohner";
				Variant.dataSource = "";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21+5 button, 12 bass, Castagnari";
				Variant.value      = "21+5_Castagnari";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG21plus5castagnari.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21+5 button, 12 bass, Saltarelle";
				Variant.value      = "21+5_Saltarelle";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG21plus5saltarelle.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+4 button, 12 bass, Saltarelle";
				Variant.value      = "23+4_Saltarelle";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG23plus4saltarelle.gif";
				Variants.add(Variant);
				
				/*var Variant = document.createElement("option");
				Variant.text       = "21+9 button, 12 bass, Rick";
				Variant.value      = "21+9_Rick";
				Variants.add(Variant);*/
			}
			
			//Add 2row tunings
			AddTunings2Row();
			break;
		case "M_CLUB":
			{
				var Variant = document.createElement("option");
				Variant.text       = "21+4 button, 8 bass, Hohner Club";
				Variant.value      = "21+4_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+4 button, 8 bass, Hohner Club";
				Variant.value      = "23+4_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+7 button, 8 bass, Hohner Club";
				Variant.value      = "23+7_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+8 button, 8 bass, Hohner Club";
				Variant.value      = "23+8_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 8 bass, Hohner Club";
				Variant.value      = "23+10_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variant.selected   = "selected";
				Variants.add(Variant);
			}
			
			//Add 2row tunings
			AddTunings2Row();
			break;
			
		case "M_3":
			//Add 3row variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "27 button, 12 bass";
				Variant.value      = "27";
				Variant.dataSource = "http://forum.melodeon.net/files/site/ADG27cheviot.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "31 button, 12 bass, Hohner Corona";
				Variant.value      = "31";
				Variant.dataSource = "http://forum.melodeon.net/files/site/gcf31corona.gif";
				Variant.selected   = "selected";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "33 button, 12 bass";
				Variant.value      = "33";
				Variant.dataSource = "http://forum.melodeon.net/files/site/ADG33.gif";
				Variants.add(Variant);
			}
			
			//Add 3row tunings
			{
				var Tuning = document.createElement("option");
				Tuning.text = "E/A/D";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "F/B♭/E♭";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "G/C/F";
				Tuning.selected = 'selected';
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "A/D/G";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "B♭/E♭/A♭";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text = "C/F/B♭";
				Tunings.add(Tuning);
			}
		
			break;
		case "H_1":
			show_options_mel  = false;
			show_options_harm = true;
			
			//Add harmonica variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "10 hole";
				Variant.value      = "10";
				Variant.dataSource = "";
				Variant.selected   = 'selected';
				Variants.add(Variant);
			}
			
			//Add harmonica tunings
			{
				var Tuning = document.createElement("option");
				Tuning.text     = "G";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "A";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "B♭";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "C";
				Tuning.selected = 'selected';
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "D";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "E♭";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "E";
				Tunings.add(Tuning);
				
				var Tuning = document.createElement("option");
				Tuning.text     = "F";
				Tunings.add(Tuning);
			}
			break;
		default:
			show_options_mel = false;
	}
	
	//Give all selector the same height
	let MaxLength = Instruments.length;
	if (Variants.length > MaxLength)
		MaxLength = Variants.length;
	if (Tunings.length > MaxLength)
		MaxLength = Tunings.length;
	Instruments.size = MaxLength;
	Variants.size    = MaxLength;
	Tunings.size     = MaxLength;
	Variants.style.height = Instruments.offsetHeight + "px";
	Tunings.style.height  = Instruments.offsetHeight + "px";
	
	//Hide empty selectors
	showElement("variantdiv", Variants.length > 0);
	showElement("tuningdiv" , Tunings.length  > 0);
	
	//Show/hide tablature options
	showElement("opt_single", show_options_single);
	showElement("opt_mel"   , show_options_mel);
	showElement("opt_harm"  , show_options_harm);
	
	//Restore previously selected tuning
	if (RestoreTuning.length > 0) {
		for (var i = 0; i < Tunings.children.length; i++) {
			var Len = RestoreTuning.length;
			if (Tunings.children[i].value.length < Len)
				Len = Tunings.children[i].value.length;
			
			if (Tunings.children[i].value.substr(0, Len) == RestoreTuning.substr(0, Len)) {
				Tunings.children[i].selected = 'selected';
			}
		}
	}
	
	ShowHideVariantOptions();
	CreateEditor();
}

function ReplaceElement(id, ori, rep) {
	let Element = document.getElementById(id);
	let Str = Element.innerText;
	Str = Str.replace(ori, rep);
	Element.innerText = Str;
}

function ConvertAbcNoteToFriendlyName(AbcNote, MakeUpperCase) {
	let RetNote = AbcNote;
	if (MakeUpperCase) {
		RetNote = RetNote.replace(",", "");
		RetNote = RetNote.replace("'", "");
		if (RetNote.indexOf("^") >= 0) {
			RetNote = RetNote.replace("^", "");
			RetNote += "♯";
		}
		if (RetNote.indexOf("_") >= 0) {
			RetNote = RetNote.replace("_", "");
			RetNote += "♭";
		}
		RetNote = RetNote.toUpperCase();
	}
	else {
		RetNote = ButtonArrayAddNames([RetNote], "")[0];
		RetNote = RetNote.substr(1);
		RetNote = RetNote.substr(0, RetNote.indexOf('"'));
		RetNote = RetNote.replace("b", "♭");
		RetNote = RetNote.replace("#", "♯");
	}
	
	return RetNote;
}

function GetRow1FirstInvButtonNumber(Instrument, Variant, StartFromZero) {
	//Check not applicable to the instrument
	if (!(Instrument == "M_2" && Variant.includes("^")) && Instrument != "M_3")
		return -1;
	
	//1 is normal
	let ButtonNumber = 1;
	
	//Special case for instrument missing the first button
	if (Instrument == "M_3" && Variant.includes("31"))
		ButtonNumber = 2;
	
	//Subtract if starting from zero
	if (StartFromZero)
		ButtonNumber--;
	
	return ButtonNumber;
}

function GetRow2FirstInvButtonNumber(Instrument, Variant, StartFromZero) {
	//Check not applicable to the instrument
	if (!(Instrument == "M_2" && Variant.includes("^")) && Instrument != "M_3")
		return -1;
	
	//1 is normal
	let ButtonNumber = 1;
	
	//Subtract if starting from zero
	if (StartFromZero)
		ButtonNumber--;
	
	return ButtonNumber;
}

function GetRow3FirstInvButtonNumber(Instrument, Variant, StartFromZero) {
	//Check not applicable to the instrument
	if (Instrument != "M_3")
		return -1;
	
	//1 is normal
	let ButtonNumber = 1;
	
	//Subtract if starting from zero
	if (StartFromZero)
		ButtonNumber--;
	
	return ButtonNumber;
}

function GetRow2MiddleInvButtonNumber(Instrument, Variant, StartFromZero) {
	//Check not applicable to the instrument
	if (Instrument != "M_2" && Instrument != "M_25" && Instrument != "M_3")
		return -1;
	
	//If this is a 4th button start instrument
	if (Variant.includes(">") || Variant.includes("23") || Variant.includes("Saltarelle")) { //TODO: Function for this
		if (StartFromZero)
			return 5;
		else
			return 6;
	}
	
	//Always button 5, StartFromZero is not applicable
	return 5;
}

function ShowHideVariantOptions() {
	//Get selected instrument and variant
	let Instrument = document.getElementById("instrument").value;
	let Variant    = document.getElementById("variant").value;
	
	//Give option to start numbering at 0 for 4th button starts
	let ShowZero = Variant.includes(">") || Variant.includes("23") || Variant.includes("Saltarelle");
	showElement("startzero", ShowZero);
	let StartFromZero = ShowZero && document.getElementById("zero").checked;
	
	//Show/hide button push/pull reverse
	let ShowInvAccidentatals1 = GetRow1FirstInvButtonNumber (Instrument, Variant, StartFromZero) >= 0;
	let ShowInvAccidentatals2 = GetRow2FirstInvButtonNumber (Instrument, Variant, StartFromZero) >= 0;
	let ShowInvAccidentatals3 = GetRow3FirstInvButtonNumber (Instrument, Variant, StartFromZero) >= 0;
	let ShowInvMiddle2        = GetRow2MiddleInvButtonNumber(Instrument, Variant, StartFromZero) >= 0;
	showElement("inv1div" , ShowInvAccidentatals1);
	showElement("inv1adiv", ShowInvAccidentatals2);
	showElement("inv1bdiv", ShowInvAccidentatals3);
	showElement("inv5adiv", ShowInvMiddle2       );
	
	//Show instrument keyboard typing
	let ShowInstrumentKeyboard = false;
	if (Instrument.substr(0, 2) == "M_")
		ShowInstrumentKeyboard = true;
	showElement("instrkey_div", ShowInstrumentKeyboard);
}

function VariantOptionsUpdateLabels() {
	//Get inputs
	let Instrument    = document.getElementById("instrument").value;
	let Variant       = document.getElementById("variant").value;
	let Tuning        = document.getElementById("tuning").value;
	let StartFromZero = isShown("startzero") && document.getElementById("zero").checked;
	let Row2Marker    = "'";
	if (document.getElementById("innerstyle").checked)
		Row2Marker    = "*";
	
	//Need a valid tablature from abcjs to display note names in labels
	let Tablature;
	let convOptions;
	if (isShown("inv1div") || isShown("inv1adiv") || isShown("inv1bdiv") || isShown("inv5adiv")) {
		Tablature = GetValidTune().tablatures[0].instance.semantics;
		
		let aRowKeys = FindRowKeys(Instrument, Tuning);
		let Key1 = aRowKeys[0];
		let Key2 = aRowKeys[aRowKeys.length - 1];
		convOptions = GetSharpFlatConverts(Key1, Key2);
	}
	
	//Label 0/1/2 reverse
	if (isShown("inv1div")) {
		let ButtonNumber = GetRow1FirstInvButtonNumber(Instrument, Variant, StartFromZero);
		let aNotes = ButtonArrayConvert([Tablature.push_row1[ButtonNumber], Tablature.pull_row1[ButtonNumber]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		document.getElementById("inv1_lab").innerText = "Button " + ButtonNumber + " " + Push + "/" + Pull + " reverse";
	}
	
	//Label 0'/1' reverse
	if (isShown("inv1adiv")) {
		let ButtonNumber = GetRow2FirstInvButtonNumber(Instrument, Variant, StartFromZero);
		let aNotes = ButtonArrayConvert([Tablature.push_row2[ButtonNumber], Tablature.pull_row2[ButtonNumber]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		document.getElementById("inv1a_lab").innerText = "Button " + ButtonNumber + Row2Marker + " " + Push + "/" + Pull + " reverse";
	}
	
	//Label 0"/1" reverse
	if (isShown("inv1bdiv")) {
		let ButtonNumber = GetRow3FirstInvButtonNumber(Instrument, Variant, StartFromZero);
		let aNotes = ButtonArrayConvert([Tablature.push_row3[ButtonNumber], Tablature.pull_row3[ButtonNumber]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		document.getElementById("inv1b_lab").innerText = "Button " + ButtonNumber + '"' + " " + Push + "/" + Pull + " reverse";
	}

	//Label 5'/6' reverse
	if (isShown("inv5adiv")) {
		let ButtonNumber = GetRow2MiddleInvButtonNumber(Instrument, Variant, StartFromZero);
		let aNotes = ButtonArrayConvert([Tablature.push_row2[ButtonNumber], Tablature.pull_row2[ButtonNumber]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		document.getElementById("inv5a_lab").innerText = "Button " + ButtonNumber + Row2Marker + " " + Push + "/" + Pull + " reverse";
		
		document.getElementById("inv5a_all").disabled = !document.getElementById("inv5a").checked;
		Push = ConvertAbcNoteToFriendlyName(aNotes[0], true);
		Pull = ConvertAbcNoteToFriendlyName(aNotes[1], true);
		if (document.getElementById("inv5a").checked && !document.getElementById("inv5a_all").checked) {
			let Tmp = Push;
			Push = Pull;
			Pull = Tmp;
		}
		document.getElementById("inv5a_all_lab").innerText = "Entire row " + Push + "/" + Pull;
	}
	
	//Disable checkboxes not applicable to the tablature style
	{
		let tabstyle = document.getElementById("single_tabstyle").value;
		document.getElementById("single_notenames").disabled = tabstyle == "0";
		
		tabstyle = document.getElementById("harm_tabstyle").value;
		document.getElementById("harm_notenames").disabled = tabstyle == "0";
		
		tabstyle = document.getElementById("tabstyle").value;
		document.getElementById("innerstyle").disabled = tabstyle == "0" || tabstyle == "3";
		document.getElementById("notenames").disabled = tabstyle == "0";
	}
}

function AddReeds() {
	let Reeds = document.getElementById("reeds");
	removeOptions(Reeds);
	let Reed;
	
	Reed = document.createElement("option");
	Reed.text  = "1 M";
	Reed.value = 130;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "2 MM+";
	Reed.value = 131;
	Reed.selected = 'selected';
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "2 MM-";
	Reed.value = 132;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "3 LMM+";
	Reed.value = 133;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "3 LMM-";
	Reed.value = 134;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "3 MM-M+";
	Reed.value = 135;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "4 LMM+H";
	Reed.value = 136;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "4 LMM-H";
	Reed.value = 137;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "4 LMM-M+";
	Reed.value = 138;
	Reeds.add(Reed);
	
	Reed = document.createElement("option");
	Reed.text  = "Off (bass only)";
	Reed.value = 129;
	Reeds.add(Reed);
}

var CursorControl = function() {
	this.onStart = function() {
		var svg = document.querySelector("#paper svg");
		var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
		cursor.setAttribute("class", "abcjs-cursor");
		cursor.setAttributeNS(null, 'x1', 0);
		cursor.setAttributeNS(null, 'y1', 0);
		cursor.setAttributeNS(null, 'x2', 0);
		cursor.setAttributeNS(null, 'y2', 0);
		svg.appendChild(cursor);
	}
	
	this.onEvent = function(event) {
		if (event.measureStart && event.left === null)
			return; // this was the second part of a tie across a measure line. Just ignore it.

		var lastSelection = document.querySelectorAll("#paper svg .highlight");
		for (var k = 0; k < lastSelection.length; k++)
			lastSelection[k].classList.remove("highlight");

		for (var i = 0; i < event.elements.length; i++ ) {
			var note = event.elements[i];
			for (var j = 0; j < note.length; j++) {
				note[j].classList.add("highlight");
			}
		}

		var cursor = document.querySelector("#paper svg .abcjs-cursor");
		if (cursor) {
			cursor.setAttribute("x1", event.left - 2);
			cursor.setAttribute("x2", event.left - 2);
			cursor.setAttribute("y1", event.top);
			cursor.setAttribute("y2", event.top + event.height);
		}
	}

	this.onFinished = function() {
		var els = document.querySelectorAll("svg .highlight");
		for (var i = 0; i < els.length; i++ ) {
			els[i].classList.remove("highlight");
		}
		var cursor = document.querySelector("#paper svg .abcjs-cursor");
		if (cursor) {
			cursor.setAttribute("x1", 0);
			cursor.setAttribute("x2", 0);
			cursor.setAttribute("y1", 0);
			cursor.setAttribute("y2", 0);
		}
	}
}
var cursorControl = new CursorControl();

function GetAbcjsParamsFromControls() {
	abcjsParams = {
		//Get ABC transpose half steps
		visualTranspose: document.getElementById("transpose").value.toString(),
		
		//Scale width, no margins
		responsive   : "resize",
		paddingtop   : 0,
		paddingbottom: 0,
		paddingleft  : 0,
		paddingright : 0
	};
	
	//Choose instrument/tuning
	let Instrument = document.getElementById("instrument").value;
	let Variant    = document.getElementById("variant").value;
	let Tuning     = document.getElementById("tuning").value;
	Tuning = Tuning.replaceAll("♭", "b");
	switch (Instrument) {
		case "M_1":
			if (Variant == "7")
				Tuning = "7" + Tuning;

			abcjsParams.tablature = [{
				instrument: 'diatonic',
				label     : '',
				tuning    : [Tuning],
				tabstyle  : Number(document.getElementById("single_tabstyle" ).value),
				tabformat :        document.getElementById("single_notenames").checked ? 1 : 0,
			}];
			break;

		case "M_2":
		case "M_25":
		case "M_CLUB":
		case "M_3":
			//Split tuning
			let TuningArray = Tuning.split("/");
			
			//Instrument specific readouts
			if (Instrument == "M_2") {
				//Get chin accidentals
				if (Variant.includes("^")) {
					TuningArray[0] += "^";
					TuningArray[1] += "^";
				}
				
				//4th button start
				if (Variant.includes(">")) {
					TuningArray[0] += ">";
					TuningArray[1] += ">";
				}
				
				//Non-default number of buttons
				if (Variant.includes("23")) {
					TuningArray[0] = "12" + TuningArray[0];
					TuningArray[1] = "11" + TuningArray[1];
				}
			}
			else if (Instrument == "M_25" || Instrument == "M_CLUB") {
				//Lookup special names for helper rows
				if (Variant == "21+2_Hohner")
					TuningArray[2] = "23Hohner";
				else if (Variant == "21+4_Hohner")
					TuningArray[2] = "25Hohner";
				else if (Variant == "21+5_Saltarelle")
					TuningArray[2] = "26Saltarelle";
				else if (Variant == "23+4_Saltarelle")
					TuningArray[2] = "27Saltarelle";
				else if (Variant == "21+5_Castagnari")
					TuningArray[2] = "26Castagnari";
				else if (Variant == "21+9_Rick")
					TuningArray[2] = "Rick";
				else if (Variant == "21+4_Club")
					TuningArray[2] = "25Club";
				else if (Variant == "23+4_Club")
					TuningArray[2] = "27Club";
				else if (Variant == "23+7_Club")
					TuningArray[2] = "30Club";
				else if (Variant == "23+8_Club")
					TuningArray[2] = "31Club";
				else if (Variant == "23+10_Club")
					TuningArray[2] = "33Club";
			}
			else if (Instrument == "M_3") {
				//Set number of buttons for each row
				if (Variant.includes("27")) {
					TuningArray[0] = "10" + TuningArray[0];
					TuningArray[1] = "9"  + TuningArray[1];
					TuningArray[2] = "8"  + TuningArray[2];
				}
				else if (Variant.includes("31")) {
					TuningArray[0] = "10" + TuningArray[0];
					TuningArray[1] = "11" + TuningArray[1];
					TuningArray[2] = "10" + TuningArray[2];
				}
				else if (Variant.includes("33")) {
					TuningArray[0] = "12" + TuningArray[0];
					TuningArray[1] = "11" + TuningArray[1];
					TuningArray[2] = "10" + TuningArray[2];
				}
			}
			
			//Add button inversion options
			{
				//Get row1 inversions
				let Row1_inv = ""; 
				if (isShown("inv1div") && document.getElementById("inv1").checked)
					Row1_inv += GetRow1FirstInvButtonNumber(Instrument, Variant, false);
				
				//Get row2 inversions
				let Row2_inv = "";
				if (isShown("inv1adiv") && document.getElementById("inv1a").checked)
					Row2_inv += GetRow2FirstInvButtonNumber(Instrument, Variant, false);
				if (isShown("inv5adiv") && document.getElementById("inv5a").checked) {
					Row2_inv += GetRow2MiddleInvButtonNumber(Instrument, Variant, false);
					if (document.getElementById("inv5a_all").checked)
						Row2_inv += "+";
				}
				
				//Get row3 inversions
				let Row3_inv = ""; 
				if (isShown("inv1bdiv") && document.getElementById("inv1b").checked)
					Row3_inv += GetRow3FirstInvButtonNumber(Instrument, Variant, false);
				
				//Add inversions to the tuning strings
				TuningArray[0] += Row1_inv;
				TuningArray[1] += Row2_inv;
				if (TuningArray.length == 3)
					TuningArray[2] += Row3_inv;
			}
			
			//Tablature options
			let StartFromZero = isShown("startzero") && document.getElementById("zero").checked;
			let showall              = false;
			let showall_ignorechords = false;
			if (document.getElementById("tabmode").value == "1") {
				showall = true;
			}
			else if (document.getElementById("tabmode").value == "2") {
				showall              = true;
				showall_ignorechords = true;
			}
			let Row2Marker = null;
			if (document.getElementById("innerstyle").checked)
				Row2Marker = "*";
			
			abcjsParams.tablature = [{
				instrument          : 'diatonic',
				label               : '',
				tuning              : TuningArray,
				tabstyle            : Number(document.getElementById("tabstyle"      ).value),
				tabformat           :        document.getElementById("notenames"     ).checked ? 1 : 0,
				changenoteheads     :        document.getElementById("changenotehead").checked,
				startzero           : StartFromZero,
				Row2Marker          : Row2Marker,
				showall             : showall,
				showall_ignorechords: showall_ignorechords
			}];
			break;
		case "H_1":
			abcjsParams.tablature = [{
				instrument     : 'diatonic',
				label          : '',
				tuning         : Array(Tuning + "~"), //Add ~ to indicate harmonica
				tabstyle       : Number(document.getElementById("harm_tabstyle"      ).value),
				tabformat      :        document.getElementById("harm_notenames"     ).checked ? 1 : 0,
				changenoteheads:        document.getElementById("harm_changenotehead").checked
			}];
			break;
		default:
			abcjsParams.tablature = [];
	}
	
	//Set tablature for multiple voices
	if (abcjsParams.tablature.length > 0)
		abcjsParams.tablature = [abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0]]
	
	return abcjsParams;
}

function SetLoop(isLooping) {
	Editor.synth.synthControl.isLooping = isLooping;
	Editor.synth.synthControl.control.pushLoop(isLooping);
	document.getElementById("repeat").value = isLooping;
}

function ToggleLoop() {
	let isLooping = Editor.synth.synthControl.isLooping
	isLooping = !isLooping;
	SetLoop(isLooping);
	Store();
}

var Editor = null;
var g_AbcPrependLength = 0;

function CreateEditor(NoUpdate, ClearSoundsCache) {
	if (!NoUpdate)
		AbcInputIntern();
	
	//Stop playback
	if (Editor) {
		try {
			Editor.synth.synthControl.pause();
		}
		catch(err) {
		}
	}
	
	//Get parameters from the input controls
	let abcjsParams = GetAbcjsParamsFromControls();
	
	//Get sound parameters from user controls
	let MidiProgram = document.getElementById("reeds").value;   //Custom mido instrument number
	g_Cents         = document.getElementById("cents").value;   //Tremolo in cents detuning
	g_FadeIn        = document.getElementById("fade").value;    //Milliseconds fade in
	let FadeOut     = g_FadeIn;                                 //Milliseconds fade out
	let ChordVol    = document.getElementById("bassvol").value; //Volume of base/chords
	
	if (g_AbcPrependLength == 0) {
		//Place some midi commands before the ABC
		var Output = document.getElementById("abc");
		let ABC = Output.value;
		Output.value = "";
		Output.value += "%%MIDI bassprog 139\n";
		Output.value += "%%MIDI chordprog 139\n";
		Output.value += "%%MIDI bassvol " + ChordVol +"\n";
		Output.value += "%%MIDI chordvol " + ChordVol +"\n";
		g_AbcPrependLength = Output.value.length;
		Output.value += ABC;
	}
	
	//Set special config for editor
	abcjsParams.paddingbottom = 30;
	abcjsParams.clickListener = clickListener;
	let Params = {
		canvas_id: "paper",
		warnings_id: "warnings",
		abcjsParams: abcjsParams,
		synth: {
			el: "#audio",
			cursorControl: cursorControl,
			options: {
				displayLoop: true,
				displayRestart: true,
				displayPlay: true,
				displayProgress: true,
				displayWarp: false,
				program: MidiProgram,
				midiTranspose: abcjsParams.visualTranspose,
				fadeLength : FadeOut
			}
		}
	};
	
	//Remove old sound font
	if (ClearSoundsCache)
		ABCJS.synth.CreateSynth(true);
	
	//Figure out the repeat state
	let isLooping = false;
	if (Editor)
		isLooping = Editor.synth.synthControl.isLooping;
	else
		isLooping = document.getElementById("repeat").value == "true";
	
	//Create the editor
	Editor = new ABCJS.Editor("abc", Params);
	
	//Restore repeat state and set handler
	SetLoop(isLooping);
	Editor.synth.synthControl.control.options.loopHandler = ToggleLoop;
	
	VariantOptionsUpdateLabels();
	CalcAbcScroll();
}

function DownloadWav() {
	Editor.synth.synthControl.runWhenReady(DownloadWav2, undefined);
}

function DownloadWav2() {
	Editor.synth.synthControl.download(document.title + ".wav");
}

let UpdateTitle = false;
let OriginalTitle = "";
let aExampleLines = new Array();
let StoreAllowed = false;
let aStoreElements = new Array("abc_editable", "instrument", "variant", "tuning", "zero", "inv1", "inv1a", "inv1b", "inv5a", "inv5a_all", "tabmode", "tabstyle", "notenames", "innerstyle", "changenotehead", "single_tabstyle", "single_notenames", "harm_tabstyle", "harm_notenames", "harm_changenotehead", "reeds", "cents", "bassvol", "fade", "repeat");

function InitPage() {
	//Test for first time load
	//window.localStorage.clear();
	
	OriginalTitle = document.title;
	aExampleLines = document.getElementById("abc_editable").textContent.split("\n");
	AddInstruments();
	AddReeds();
	ExampleLoadIntern(3);
	aAbcUndo = [];
	try {
		Load();
		CreateEditor();
	}
	catch(err) {
	}
	StoreAllowed = true;
	Store();
	setTimeout(clearLink, 500);
	
	window.addEventListener("scroll", CalcAbcScroll);
	window.addEventListener("resize", CalcAbcScroll);
}

function CalcAbcScroll() {
	let AbcTopDiv    = document.getElementById("abctop");
	let AbcHeaderDiv = document.getElementById("abcheader");
	let AbcScrollDiv = document.getElementById("abcscroll");
	let AbcFooterDiv = document.getElementById("abcfooter");
	let TabTopDiv    = document.getElementById("tabtop");
	let TabHeader    = document.getElementById("tabheader");
	let PageFooter   = document.getElementById("footer");
	
	//Use normal page rendering when abc/tab are not side by side
	if (AbcTopDiv.offsetLeft >= TabTopDiv.offsetLeft) {
		AbcTopDiv.style.paddingTop = "";
		AbcScrollDiv.style.height  = "";
		return;
	}
	
	//No padding if scroll position is above the abc/tab view
	if (AbcTopDiv.offsetTop > window.scrollY)
		AbcTopDiv.style.paddingTop = "";
	else
		AbcTopDiv.style.paddingTop = window.scrollY - AbcTopDiv.offsetTop + "px";

	//Size height to size of tab or size of view port whichever is smaller
	let HeaderMarginTop = TabHeader.offsetTop - TabTopDiv.offsetTop;
	let RequiredHeight = 0;
	if (HeaderMarginTop + TabTopDiv.scrollHeight < window.innerHeight)
		RequiredHeight = TabTopDiv.scrollHeight;
	else
		RequiredHeight = window.innerHeight;
	
	//Calculate and set the size off the scrollable div
	let ScrollHeight = RequiredHeight - AbcHeaderDiv.scrollHeight - AbcFooterDiv.scrollHeight - HeaderMarginTop - PageFooter.scrollHeight;
	if (ScrollHeight >= 300) {
		AbcScrollDiv.style.height = ScrollHeight + "px";
	}
	else {
		//Use normal page rendering if editor would become too small (many warnings in ABC)
		AbcTopDiv.style.paddingTop = "";
		AbcScrollDiv.style.height  = "";
	}
}

function Load() {
	//Load all stored form controls
	for (let i = 0; i < aStoreElements.length; ++i) {
		let ID = aStoreElements[i];
		
		//Get value from storage
		let Value = window.localStorage.getItem(ID);
		
		//If no ABC, load default example instead
		if (Value !== null) {
			//Set value in the control
			let Control = document.getElementById(ID);
			if (Control) {
				if (Control.type == "checkbox")
					Control.checked = (Value === "true");
				else if (typeof Control.value !== 'undefined')
					Control.value = Value;
				else
					Control.innerText = Value;
				
				//Call special handlers
				if (ID == "abc_editable")
					AbcInputIntern();
				else if (ID == "instrument")
					AddVariantsTunings();
				else if (ID == "variant")
					ShowHideVariantOptions();
				
				//If at least one control was stored, the update title functionality is enabled
				UpdateTitle = true;
			}
		}
	}
}

function Store() {
	if (!StoreAllowed)
		return;
	
	//Store all required form controls
	for (let i = 0; i < aStoreElements.length; ++i) {
		let ID = aStoreElements[i];
		
		//Get value from the control
		let Control = document.getElementById(ID);
		if (Control) {
			let Value;
			if (Control.type == "checkbox")
				Value = Control.checked;
			else if (typeof Control.value !== 'undefined')
				Value = Control.value;
			else
				Value = Control.innerText;
			
			//Store on client
			window.localStorage.setItem(ID, Value);
		}
	}
}

var LinkOk = false;

function setLink() {
	if (!LinkOk)
		return;
	
	let Input = new Array();
	Input.push("N1cHBvcnRAZGl");
	Input.push("bWFpbHRvOn");
	Input.push("hdG90YWIuY29t");
	
	let Link = document.getElementById("link");
	Link.href = atob(Input[1] + Input[0] + Input[2]);
}

function clearLink() {
	LinkOk = true;
	
	let Link = document.getElementById("link");
	Link.href = "#";
}

function Print() {
	window.print();
}

window.addEventListener("beforeprint", (event) => {
	//Get instrument parameters and the ABC input
	let abcjsParams = GetAbcjsParamsFromControls();
	let Abc         = document.getElementById("abc").value;
	
	//Set special print options
	abcjsParams.selectionColor = "#000000";
	abcjsParams.oneSvgPerLine = true;
	
	//Render the print on screen
	let ScrollX = window.pageXOffset;
	let ScrollY = window.pageYOffset;
	ABCJS.renderAbc("paper", Abc, abcjsParams);
	let RenderDiv = document.getElementById("paper");
	
	//Copy in to the print div
	let PrintDiv = document.getElementById("print_paper");
	PrintDiv.innerHTML = RenderDiv.innerHTML;
	
	//Restore normal rendering
	CreateEditor(true);
	window.scrollTo(ScrollX, ScrollY);
});

let aAbcUndo = new Array();

function UpdateUndoFocus() {
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Get end of selection, focus must be restore to this position
	let focusNode   = null;
	let focusOffset = 0;
	{
		let sel = window.getSelection();
		for (var i = 0; i < sel.rangeCount; ++i) {
			let range = sel.getRangeAt(i);
			if (range.endContainer == event.target) {
				focusNode   = range.endContainer.childNodes[range.endOffset];
				focusOffset = 0;
				break;
			}
			else if (range.endContainer.parentNode == event.target) {
				focusNode   = range.endContainer;
				focusOffset = range.endOffset;
				break;
			}
		}
	}
	
	//Update in last undo item
	if (focusNode) {
		for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
			if (ABC_Editor.childNodes[i] == focusNode) {
				aAbcUndo[aAbcUndo.length - 1].focusNodeIndex = i;
				aAbcUndo[aAbcUndo.length - 1].focusOffset    = focusOffset;
				Ok = true;
				break;
			}
		}
	}
}

function NewUndo() {
	//New empty undo item
	let UndoItem = {
		ABC           : "",
		focusNodeIndex:  0,
		focusOffset   :  0
	};
	aAbcUndo.push(UndoItem);
	
	//Set maximum undo size
	if (aAbcUndo.length > 100)
		aAbcUndo.splice(0, 1);
	
	//Update the last undo item content
	let ABC_Editor = document.getElementById("abc_editable");
	aAbcUndo[aAbcUndo.length - 1].ABC = ABC_Editor.innerText;
	
	//Update cursor position
	UpdateUndoFocus();
	
	//Store state
	Store();
}

function Undo() {
	//Need item not equal to current state
	if (aAbcUndo.length < 2)
		return;
	
	//Revert to previous state
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Restore the remembered value
	ABC_Editor.innerText = aAbcUndo[aAbcUndo.length - 2].ABC;
	
	//Restore the cursor position
	var sel = window.getSelection();
	sel.removeAllRanges();
	var range = document.createRange();
	range.setStart(ABC_Editor.childNodes[aAbcUndo[aAbcUndo.length - 2].focusNodeIndex], aAbcUndo[aAbcUndo.length - 2].focusOffset);
	range.setEnd  (ABC_Editor.childNodes[aAbcUndo[aAbcUndo.length - 2].focusNodeIndex], aAbcUndo[aAbcUndo.length - 2].focusOffset);
	sel.addRange(range);
	
	//Remove last item
	aAbcUndo.splice(aAbcUndo.length - 1, 1);
	aAbcUndo.splice(aAbcUndo.length - 1, 1);
	
	//Update last item to current state
	AbcInput();
}

function GetValidTune() {
	//If there is a valid tune in the editor, use it, otherwise create a temp one to obtain instrument information
	var aTunes;
	if (Editor && Editor.tunes.length > 0 && Editor.tunes[0].tablatures[0].instance) {
		aTunes = Editor.tunes;
	}
	else {
		//Get instrument from controls
		let abcjsParams = GetAbcjsParamsFromControls();
		aTunes = ABCJS.renderAbc("*", "X:1\nK:C\nA\n", abcjsParams);
	}
	
	return aTunes[0];
}

function AbcKeyDown(event) {
	//Selection might have been changed
	AbcSelect();

	//Enter must create <br>, not a <div>
	if (event.key === 'Enter') {
		document.execCommand('insertLineBreak');
		event.preventDefault();
	}
	//Note typing, determine push/pull from CTRL status, define button number for qwerty layout, but should work for any layout
	else if (isShown("instrkey_div") && document.getElementById("instrkey").checked) {
		//Overrule if user pressed control key
		if (event.ctrlKey) {
			if (event.key.length == 1)
				document.execCommand('insertText', false, event.key);
			else if (event.key == "Backspace")
				document.execCommand('delete');
			event.preventDefault();
			return;
		}
		
		//Lookup mapping to instrument button
		var PushNotPull = !event.altKey;
		var Button      = -1;
		var Row         =  0;
		switch (event.code) {
			case 'ShiftLeft':
			case 'Backslash':
				Row    = 1;
				Button = 1;
				break;
			case "KeyZ":
				Row    = 1;
				Button = 2;
				break;
			case "KeyX":
				Row    = 1;
				Button = 3;
				break;
			case "KeyC":
				Row    = 1;
				Button = 4;
				break;
			case "KeyV":
				Row    = 1;
				Button = 5;
				break;
			case "KeyB":
				Row    = 1;
				Button = 6;
				break;
			case "KeyN":
				Row    = 1;
				Button = 7;
				break;
			case "KeyM":
				Row    = 1;
				Button = 8;
				break;
			case "Comma":
				Row    = 1;
				Button = 9;
				break;
			case "Period":
				Row    = 1;
				Button = 10;
				break;
			case "Slash":
				Row    = 1;
				Button = 11;
				break;
			case 'ShiftRight':
				Row    = 1;
				Button = 12;
				break;
			case "CapsLock":
				Row    = 2;
				Button = 0;
				break;
			case "KeyA":
				Row    = 2;
				Button = 1;
				break;
			case "KeyS":
				Row    = 2;
				Button = 2;
				break;
			case "KeyD":
				Row    = 2;
				Button = 3;
				break;
			case "KeyF":
				Row    = 2;
				Button = 4;
				break;
			case "KeyG":
				Row    = 2;
				Button = 5;
				break;
			case "KeyH":
				Row    = 2;
				Button = 6;
				break;
			case "KeyJ":
				Row    = 2;
				Button = 7;
				break;
			case "KeyK":
				Row    = 2;
				Button = 8;
				break;
			case "KeyL":
				Row    = 2;
				Button = 9;
				break;
			case "Semicolon":
				Row    = 2;
				Button = 10;
				break;
			case "Quote":
				Row    = 2;
				Button = 11;
				break;
			case "KeyQ":
				Row    = 3;
				Button = 0;
				break;
			case "KeyW":
				Row    = 3;
				Button = 1;
				break;
			case "KeyE":
				Row    = 3;
				Button = 2;
				break;
			case "KeyR":
				Row    = 3;
				Button = 3;
				break;
			case "KeyT":
				Row    = 3;
				Button = 4;
				break;
			case "KeyY":
				Row    = 3;
				Button = 5;
				break;
			case "KeyU":
				Row    = 3;
				Button = 6;
				break;
			case "KeyI":
				Row    = 3;
				Button = 7;
				break;
			case "KeyO":
				Row    = 3;
				Button = 8;
				break;
			case "KeyP":
				Row    = 3;
				Button = 9;
				break;
			case "BracketLeft":
				Row    = 3;
				Button = 10;
				break;
			case "BracketRight":
				Row    = 3;
				Button = 11;
				break;
		}
		
		//If key is mapped to an instrument button
		if (Row != 0) {
			var Tune = GetValidTune();
			
			//Lookup the button row notes array
			let aNotes;
			switch (Row) {
				case 1:
					if (PushNotPull) 
						aNotes = Tune.tablatures[0].instance.semantics.push_row1;
					else
						aNotes = Tune.tablatures[0].instance.semantics.pull_row1;
					break;
				case 2:
					if (PushNotPull) 
						aNotes = Tune.tablatures[0].instance.semantics.push_row2;
					else
						aNotes = Tune.tablatures[0].instance.semantics.pull_row2;
					break;
				case 3:
					if (PushNotPull) 
						aNotes = Tune.tablatures[0].instance.semantics.push_row3;
					else
						aNotes = Tune.tablatures[0].instance.semantics.pull_row3;
					break;
			}
			
			//Does it exist on the instrument
			if (Button < aNotes.length) {
				//Ignore key repeats for instrument typing
				if (event.repeat) {
					event.preventDefault();
					return;
				}
				
				//Get cursor position or start position of selection
				let StartContainer = null;
				let StartIndex     = 0;
				var sel = window.getSelection();
				if (sel.rangeCount) {
					for (var i = 0, len = sel.rangeCount; i < len; ++i) {
						let range = sel.getRangeAt(i);
						StartContainer = range.startContainer;
						StartIndex     = range.startOffset;
						break;
					}
				}
				
				//Check selection is in the ABC editor
				let ABC_Editor = document.getElementById("abc_editable");
				
				//Calculate start character index for multiple lines
				let Start = 0;
				for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
					if (ABC_Editor.childNodes[i] == StartContainer) {
						Start += StartIndex;
						break;
					}
					Start += ABC_Editor.childNodes[i].textContent.length;
					if (ABC_Editor.childNodes[i].tagName == "BR")
						Start++;
				}
				
				//Get ABC before cursor, all upper case
				var AnalyzeABC = ABC_Editor.innerText.toUpperCase().substr(0, Start);
				
				//Detect the last key set before the position we are typing
				var Key = "C";
				var aAbcLines = AnalyzeABC.replace(" ", "").split("\n");
				for (let i = 0; i < aAbcLines.length; ++i) {
					if (aAbcLines[i].substr(0, 2) == "K:")
						Key = aAbcLines[i].substr(2);
				}
				
				//Prefer to write it as an in key note
				let Note     = "";
				let KeyIndex = FindCicrleKeyIndex(Key);
				if (IsInKey(KeyIndex, aNotes[Button]))
					Note = aNotes[Button];
				else {
					//Use best guess for out of key note
					let convOptions = GetSharpFlatConverts(Key, Key);
					let aIn = [aNotes[Button]];
					let aOut = ButtonArrayConvert(aIn, convOptions);
					Note = aOut[0];
				}
				
				//If note is not flat or sharp, it must be natural
				if (Note[0] != "_" && Note[0] != "^")
					Note = "=" + Note;
				
				//Get accidental based on key
				let KeyAccidental = "";
				if (IsInKey(KeyIndex, Note.substr(1)))
					KeyAccidental = "=";
				else if (IsInKey(KeyIndex, "_" + Note.substr(1)))
					KeyAccidental = "_";
				else if (IsInKey(KeyIndex, "^" + Note.substr(1)))
					KeyAccidental = "^";
				
				//Get capitalized ABC for this measure up to cursor
				let MeasureAbc = "";
				if (aAbcLines.length > 0) {
					MeasureAbc = aAbcLines[aAbcLines.length - 1];
					for (let i = MeasureAbc.length - 1; i >= 0; --i) {
						if (MeasureAbc[i] == "|")
							MeasureAbc = MeasureAbc.substr(i + 1);
					}
				}
				
				//Find default accidental at cursor position
				let MeasureAccidental = KeyAccidental;
				for (let i = 1; i < MeasureAbc.length; ++i) {
					if (MeasureAbc[i] == Note[1].toUpperCase()) {
						if (MeasureAbc[i-1] == "=" || MeasureAbc[i-1] == "_" || MeasureAbc[i-1] == "^")
							MeasureAccidental = MeasureAbc[i-1];
					}
				}
				
				//Drop accidental if it is default
				if (Note[0] == MeasureAccidental)
					Note = Note.substr(1);
				
				//Type the note in the editor
				document.execCommand('insertText', false, Note);
				
				//We handled the keypress, do not do anything else
				event.preventDefault();
			}
		}
	}
	//Ctrl+z pressed
	else if (event.ctrlKey && event.keyCode == 90) {
		Undo();
		event.preventDefault();
	}
}

function AbcPaste(event) {
	//Find the top of the element where the paste occurred
	let PasteTarget = event.target;
	while (PasteTarget != document.getElementById("abc_editable")) {
		PasteTarget = PasteTarget.parentNode;
		if (!PasteTarget)
			return;
	}

	//This defines the ranges that will be replaced with the paste text
	let StartNode   = null;
	let StartOffset = 0;
	let EndNode     = null;
	let EndOffset   = 0;
	
	//Get the selection range or cursor position, this is where the text will be pasted
	var sel = window.getSelection();
	for (var i = 0; i < sel.rangeCount; ++i) {
		let range = sel.getRangeAt(i);
		if (range.startContainer == PasteTarget && range.endContainer == PasteTarget) {
			StartNode   = range.startContainer.childNodes[range.startOffset];
			StartOffset = 0;
			if (range.endOffset < range.endContainer.childNodes.length) {
				EndNode   = range.endContainer.childNodes[range.endOffset];
				EndOffset = 0;
			}
			else {
				EndNode   = range.endContainer.childNodes[range.endContainer.childNodes.length - 1];
				EndOffset = EndNode.textContent.length;
			}
			
			break;
		}
		else if (range.startContainer.parentNode == PasteTarget && range.endContainer.parentNode == PasteTarget) {
			StartNode   = range.startContainer;
			StartOffset = range.startOffset;
			EndNode     = range.endContainer;
			EndOffset   = range.endOffset;
			break;
		}
	}

	//If there is no selection, try to get the cursor position instead
	if (!StartNode) {
		if (sel.focusNode == PasteTarget) {
			StartNode   = sel.focusNode.childNodes[sel.focusOffset];
			StartOffset = 0;
		}
		else if (sel.focusNode && sel.focusNode.parentNode == PasteTarget) {
			StartNode   = sel.focusNode;
			StartOffset = sel.focusOffset;
		}
		EndNode   = StartNode;
		EndOffset = StartOffset;
	}

	//If selection range was found, we will handle the pasting
	if (StartNode && EndNode) {
		//Delete text between start and end position
		let StartFound = false;
		for (let i = 0; i < PasteTarget.childNodes.length; ++i) {
			if (PasteTarget.childNodes[i] == StartNode && PasteTarget.childNodes[i] == EndNode) {
				let Text = PasteTarget.childNodes[i].textContent;
				Text = Text.substr(0, StartOffset) + Text.substr(EndOffset);
				PasteTarget.childNodes[i].textContent = Text;
				break;
			}
			else if (PasteTarget.childNodes[i] == StartNode) {
				let Text = PasteTarget.childNodes[i].textContent;
				Text = Text.substr(0, StartOffset);
				PasteTarget.childNodes[i].textContent = Text;
				
				StartFound = true;
			}
			else if (PasteTarget.childNodes[i] == EndNode) {
				let Text = PasteTarget.childNodes[i].textContent;
				Text = Text.substr(EndOffset);
				if (Text.length > 0)
					PasteTarget.childNodes[i].textContent = Text;
				else
					PasteTarget.childNodes[i].remove();
				break;
			}
			else if (StartFound) {
				PasteTarget.childNodes[i].remove();
				--i;
			}
		}
		
		//Get paste text without formatting, split it in multiple lines
		let PasteText = event.clipboardData.getData('text/plain');
		let aPasteText = new Array;
		if (PasteText.includes("\n"))
			aPasteText = PasteText.split("\n");
		else
			aPasteText[0] = PasteText;
		
		//Insert paste text at the start position
		for (let i = 0; i < PasteTarget.childNodes.length; ++i) {
			if (PasteTarget.childNodes[i] == StartNode) {
				let LastNode = null;
				let PostText = "";
				for (let l = 0; l < aPasteText.length; ++l) {
					//First line?
					if (l == 0) {
						if (PasteTarget.childNodes[i].nodeName == "BR") {
							let Line = document.createTextNode(aPasteText[l]);
							PasteTarget.childNodes[i].before(Line);
						}
						else {
							let Text = PasteTarget.childNodes[i].textContent;
							PostText = Text.substr(StartOffset);
							Text = Text.substr(0, StartOffset) + aPasteText[l];
							PasteTarget.childNodes[i].textContent = Text;
						}
						
						LastNode = PasteTarget.childNodes[i];
					}
					else {
						let Break = document.createElement("br");
						LastNode.after(Break);
						let Line = document.createTextNode(aPasteText[l]);
						Break.after(Line);
						LastNode = Line;
					}
					
					//Last line?
					if (l == aPasteText.length - 1) {
						var Offset = LastNode.textContent.length;
						LastNode.textContent = LastNode.textContent + PostText;
						
						//Set cursor position after the paste text
						var sel = window.getSelection();
						sel.removeAllRanges();
						var range = document.createRange();
						range.setStart(LastNode, Offset);
						range.setEnd  (LastNode, Offset);
						sel.addRange(range);
					}
				}
				break;
			}
		}
	}
	
	//Prevent default paste action, it gives problems because it allows formatting
	event.stopPropagation();
	event.preventDefault();
	
	//Call ADC input event to do syntax highlighting
	AbcInput();
}

function HtmlEscape(instring) {
	let outstring = "";
	for (let i = 0; i < instring.length; ++i) {
		let ch = instring[i];
		if (ch == "&")
			ch = "&amp;";
		if (ch == "<")
			ch = "&lt;";
		if (ch == ">")
			ch = "&gt;";
		if (ch == "\n")
			ch = "<br>";
		outstring += ch;
	}
	return outstring;
}

function AbcInput() {
	UpdateTitle = true;
	AbcInputIntern();
}

function AbcGetTitle() {
	//Need ABC renderer
	let RenderDiv = document.getElementById("paper");
	if (!RenderDiv.children.length)
		return "";
	
	//See if title was found by the renderer
	let Title = RenderDiv.children[0].ariaLabel;
	let Expected = "Sheet Music for \"";
	if (Title.search(Expected) < 0)
		return "";
	
	//Extract and return the title
	Title = Title.substring(Expected.length, Title.length-1);
	return Title;
}

function AbcInputIntern() {
	NewUndo();
	
	//Get the ABC input editor
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Get the enter ABC
	let ABC = "";
	for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
		if (ABC_Editor.childNodes[i].nodeName == "#text")
			ABC += ABC_Editor.childNodes[i].nodeValue;
		if (ABC_Editor.childNodes[i].nodeName == "BR")
			ABC += "\n";
	}
	
	//Split the ABC into multiple lines
	let aABC = new Array;
	if (ABC.includes("\n"))
		aABC = ABC.split("\n");
	else
		aABC[0] = ABC;
	
	//Create html formatting for each line
	let ABChtml = "";
	for (let i = 0; i < aABC.length; ++i) {
		let Line = aABC[i];
		//Empty line
		if (!Line || Line.length == 0 || !Line.trim()) {
		}
		//Aligned lyrics line
		else if (Line.trim().substr(0, 2) == "w:") {
			let Sep = Line.indexOf(":");
			ABChtml += HtmlEscape(Line.substr(0, Sep+1)) + "<span style='color:Teal'>";
			
			//Detect characters with special meaning in lyrics
			for (let j = Sep+1; j < Line.length; ++j) {
				if (Line[j].match(/[-_*~\\|]/))
					ABChtml += "</span>" + Line[j] + "<span style='color:Teal'>";
				else
					ABChtml += Line[j];
			}
			ABChtml += "</span>";
		}
		//Information field line
		else if (Line.trim().substr(0, 2).match(/[A-Za-z+]:/)) {
			let Sep = Line.indexOf(":");
			ABChtml += HtmlEscape(Line.substr(0, Sep+1)) + "<span style='color:Teal'>" + HtmlEscape(Line.substr(Sep+1)) + "</span>";
		}
		//Music line
		else {
			let InRemark    = false;
			let InComment   = false;
			let InChord     = false;
			let InDec       = false;
			let NoteColor   = false;
			let inNoteMulti = false;
			let inNote      = false;
			let inAcc       = false;
			for (let j = 0; j < Line.length; ++j) {
				let HtmlChar = HtmlEscape(Line[j]);
				
				//Detect chord begin/end
				if (!InComment && !InRemark && !InDec && !inNoteMulti && Line[j] == "\"") {
					//End previous note color
					if (inNote) {
						inNote = false;
						ABChtml += "</span>";
					}
					
					//Start/end chord color
					if (!InChord) {
						InChord = true;
						ABChtml += "<span style='color:CornflowerBlue'>";
						ABChtml += HtmlChar;
					}
					else {
						InChord = false;
						ABChtml += HtmlChar;
						ABChtml += "</span>";
					}
				}
				//Detect decoration begin/end
				else if (!InComment && !InRemark && !InChord && Line[j] == "!") {
					//End previous note color
					if (inNote) {
						inNote = false;
						ABChtml += "</span>";
					}
					
					InDec = !InDec;
					ABChtml += HtmlChar;
				}
				//Detect start of inline comment (remark)
				else if (!InComment && !InRemark && !InChord && !InDec && Line.substr(j, 3) == "[r:") {
					//End previous note color
					if (inNote) {
						inNote = false;
						ABChtml += "</span>";
					}
					
					InRemark = true;
					ABChtml += "[r:<span  style='color:Teal'>";
					j += 2;
				}
				//Detect end of inline comment (remark)
				else if (InRemark && Line[j] == "]") {
					InRemark = false;
					ABChtml += "</span>" + HtmlChar;
				}
				//Detect line/end comment
				else if (Line[j] == "%") {
					InComment = true;
					ABChtml += HtmlChar + "<span  style='color:Teal'>";
				}
				//Detect begin of multi-note
				else if (!InComment && !InRemark && !InChord && !InDec && !inNoteMulti && Line[j] == "[" && Line.substr(j, 2) != "[|") {
					//End previous note color
					if (inNote)
						ABChtml += "</span>";
					
					//Set color for the new note
					if (NoteColor)
						ABChtml += "<span style='color:green'>";
					else
						ABChtml += "<span style='color:purple'>";
					NoteColor = !NoteColor;
					
					ABChtml += HtmlChar;

					inNoteMulti = true;
				}
				//Detect begin of new note
				else if (!InComment && !InRemark && !InChord && !InDec && !inNoteMulti && Line[j].match(/[a-gxyzA-GXZ_^=~.vu]/)) {
					//If note not already started from accidental
					if (!inAcc) {
						//End previous note color
						if (inNote) {
							ABChtml += "</span>";
						}
						
						//Set color for the new note
						if (NoteColor)
							ABChtml += "<span style='color:green'>";
						else
							ABChtml += "<span style='color:purple'>";
						NoteColor = !NoteColor;
					}
					
					//Check note start from accidental/accents
					inNote = true;
					if (Line[j].match(/[_^=~.vu]/))
						inAcc = true;
					else
						inAcc = false;
					
					ABChtml += HtmlChar;
				}
				//Detect begin of something not a note
				else if (!InComment && !InRemark && !InChord && !InDec && Line[j].match(/[^',/1-9a-gxyzA-GXZ_^=~.vu]/)) {
					//Ignore end of multi-note
					if (inNoteMulti && Line[j] == "]") {
						inNoteMulti = false;
						inNote      = true;
					}
					else {
						//End previous note color
						if (inNote || inNoteMulti) {
							ABChtml += "</span>";
						}
						inNote      = false;
						inNoteMulti = false;
					}
					
					ABChtml += HtmlChar;
				}
				else
					ABChtml += HtmlChar;
			}
			if (InComment || InRemark || InChord || inNoteMulti || inNote)
				ABChtml += "</span>";
		}
		ABChtml += "<br>";
	}
	document.getElementById("abc_colors").innerHTML = ABChtml;
	
	//Copy to ABCjs hidden input
	var Output = document.getElementById("abc");
	ABC = ABC.replace("\xa0", " ");
	Output.value = ABC;
	g_AbcPrependLength = 0;
	CreateEditor(true);
	
	//Update page title
	if (UpdateTitle) {
		let Title = AbcGetTitle();
		if (Title != "")
			Title += " - Diatotab";
		else
			Title = OriginalTitle;
		document.title = Title;
	}
}

function AbcSelect() {
	UpdateUndoFocus();
	
	//Get the selection
	let StartContainer = null;
	let StartIndex     = 0;
	let EndContainer   = null;
	let EndIndex       = 0;
	var sel = window.getSelection();
	if (sel.rangeCount) {
		for (var i = 0, len = sel.rangeCount; i < len; ++i) {
			let range = sel.getRangeAt(i);
			StartContainer = range.startContainer;
			StartIndex     = range.startOffset;
			EndContainer   = range.endContainer;
			EndIndex       = range.endOffset;
			break;
		}
	}
	
	//Check selection is in the ABC editor
	let ABC_Editor = document.getElementById("abc_editable");
	if (!StartContainer || StartContainer.parentElement != ABC_Editor || !EndContainer || EndContainer.parentElement != ABC_Editor)
		return;
	
	//Calculate start character index for multiple lines
	let Start = 0;
	for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
		if (ABC_Editor.childNodes[i] == StartContainer) {
			Start += StartIndex;
			break;
		}
		Start += ABC_Editor.childNodes[i].textContent.length;
		if (ABC_Editor.childNodes[i].tagName == "BR")
			Start++;
	}
	
	//Calculate end character index for multiple lines
	let End = 0;
	for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
		if (ABC_Editor.childNodes[i] == EndContainer) {
			End += EndIndex;
			break;
		}
		End += ABC_Editor.childNodes[i].textContent.length;
		if (ABC_Editor.childNodes[i].tagName == "BR")
			End++;
	}
	
	//Compensate length for some hidden prepended text
	Start += g_AbcPrependLength;
	End   += g_AbcPrependLength;
	
	if (Start == End)
		End = End + 1;
	
	//Highlight the selection in the ABC render
	if (Editor.tunes.length > 0 && Editor.tunes[0].engraver)
		Editor.tunes[0].engraver.rangeHighlight(Start, End);
}

//https://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538#6242538
function getTextNodesIn(node) {
    var textNodes = [];
    if (node.nodeType == 3) {
        textNodes.push(node);
    } else {
        var children = node.childNodes;
        for (var i = 0, len = children.length; i < len; ++i) {
            textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
        }
    }
    return textNodes;
}
function setSelectionRange(el, start, end) {
    if (document.createRange && window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var textNodes = getTextNodesIn(el);
        var foundStart = false;
        var charCount = 0, endCharCount;

        for (var i = 0, textNode; textNode = textNodes[i++]; ) {
            endCharCount = charCount + textNode.length;
            if (!foundStart && start >= charCount
                    && (start < endCharCount ||
                    (start == endCharCount && i <= textNodes.length))) {
                range.setStart(textNode, start - charCount);
                foundStart = true;
            }
            if (foundStart && end <= endCharCount) {
                range.setEnd(textNode, end - charCount);
                break;
            }
            charCount = endCharCount;
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.moveEnd("character", end);
        textRange.moveStart("character", start);
        textRange.select();
    }
}

function clickListener(abcelem, tuneNumber, classes, analysis, drag, mouseEvent) {
	//Character positions as seen by abcjs
	let startChar = abcelem.startChar;
	let endChar   = abcelem.endChar;
	
	//Correct for length of prepended midi commands
	startChar -= g_AbcPrependLength;
	endChar   -= g_AbcPrependLength;
	
	//Get the editor without highlighting
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Correct for differences in number of newline characters
	let startCorrect = 0;
	let endCorrect   = 0;
	for (let i = 0; i < ABC_Editor.innerText.length; ++i) {
		if (ABC_Editor.innerText[i] == "\n") {
			if (i <= startChar)
				startCorrect++;
			if (i <= endChar)
				endCorrect++;
			if (i > startChar && i > endChar)
				break;
		}
	}
	startChar -= startCorrect;
	endChar   -= endCorrect;
	
	//Select the clicked note
	setSelectionRange(ABC_Editor, startChar, endChar);
}

function ExampleShow() {
	document.getElementById("example").style.display = "flex";
	return false;
}

function ExampleClose() {
	document.getElementById("example").style.display = "none";
	return false;
}

function FindCicrleKeyIndex(Key) {
	//Find key in the circle of fifths
	let i = 0;
	for (; i < 12; ++i) {
		if (GetCircleFifths(i).KeyFlat == Key || GetCircleFifths(i).KeySharp == Key)
			break;
	}
	if (i == 12)
		return 0;
	return i;
}

function ConvertFlatSharp(NoteName, Options) {
	if (Options.Dflat) {
		NoteName = NoteName.replaceAll('^C', '_D');
		NoteName = NoteName.replaceAll('^c', '_d');
	}
	else {
		NoteName = NoteName.replaceAll('_D', '^C');
		NoteName = NoteName.replaceAll('_d', '^c');
	}
	if (Options.Eflat) {
		NoteName = NoteName.replaceAll('^D', '_E');
		NoteName = NoteName.replaceAll('^d', '_e');
	}
	else {
		NoteName = NoteName.replaceAll('_E', '^D');
		NoteName = NoteName.replaceAll('_e', '^d');
	}
	if (Options.Gflat) {
		NoteName = NoteName.replaceAll('^F', '_G');
		NoteName = NoteName.replaceAll('^f', '_g');
	}
	else {
		NoteName = NoteName.replaceAll('_G', '^F');
		NoteName = NoteName.replaceAll('_g', '^f');
	}
	if (Options.Aflat) {
		NoteName = NoteName.replaceAll('^G', '_A');
		NoteName = NoteName.replaceAll('^g', '_a');
	}
	else {
		NoteName = NoteName.replaceAll('_A', '^G');
		NoteName = NoteName.replaceAll('_a', '^g');
	}
	if (Options.Bflat) {
		NoteName = NoteName.replaceAll('^A', '_B');
		NoteName = NoteName.replaceAll('^a', '_b');
	}
	else {
		NoteName = NoteName.replaceAll('_B', '^A');
		NoteName = NoteName.replaceAll('_b', '^a');
	}
	
	return NoteName;
}

function GetSharpFlatConverts(LowKey, HighKey) {
	let KeyIndex1 = FindCicrleKeyIndex(LowKey);
	let KeyIndex2 = FindCicrleKeyIndex(HighKey);
	if (KeyIndex2 - KeyIndex1 > 6)
		KeyIndex2 -= 12;
	let Dflat = null;
	let Eflat = null;
	let Gflat = null;
	let Aflat = null;
	let Bflat = null;
	for (Index = KeyIndex1; Index <= KeyIndex2 + 10; ++Index) {
		let KeyIndex = Index;
		if (Index > KeyIndex2) {
			var Diff2 = Index - KeyIndex2;
			if (Diff2 % 2 == 1)
				KeyIndex = KeyIndex1 - (Diff2+1) / 2;
			else
				KeyIndex = KeyIndex2 + Diff2 / 2;
		}
		if (KeyIndex < 0)
			KeyIndex += 12;
		let TestKey = GetCircleFifths(KeyIndex).KeyFlat;
		
		if (KeyIndex <= 6) {
			//In key sharps
			if (IsInKey(KeyIndex, "^C") && Dflat == null)
				Dflat = false;
			if (IsInKey(KeyIndex, "^D") && Eflat == null)
				Eflat = false;
			if (IsInKey(KeyIndex, "^F") && Gflat == null)
				Gflat = false;
			if (IsInKey(KeyIndex, "^G") && Aflat == null)
				Aflat = false;
			if (IsInKey(KeyIndex, "^A") && Bflat == null)
				Bflat = false;
		}
		else {
			//In key flats
			if (IsInKey(KeyIndex, "_D") && Dflat == null)
				Dflat = true;
			if (IsInKey(KeyIndex, "_E") && Eflat == null)
				Eflat = true;
			if (IsInKey(KeyIndex, "_G") && Gflat == null)
				Gflat = true;
			if (IsInKey(KeyIndex, "_A") && Aflat == null)
				Aflat = true;
			if (IsInKey(KeyIndex, "_B") && Bflat == null)
				Bflat = true;
		}
		
	}
	
	return {
		Dflat : Dflat,
		Eflat : Eflat,
		Gflat : Gflat,
		Aflat : Aflat,
		Bflat : Bflat
	};
}

function ButtonArrayConvert(RawArray, Options) {
	let aRow = new Array;
	for (let i = 0; i < RawArray.length; ++i) {
		if (RawArray[i] != "") {
			let Note = RawArray[i];
			Note = ConvertFlatSharp(Note, Options);

			aRow.push(Note);
		}
		else
			aRow.push("");
	}
	return aRow;
}

function GetNoteOctave(Note) {
	let Lower  = Note.split(",").length - 1;
	let Higher = Note.split("'").length - 1;
			
	let Octave = 5;
	if (Note.toUpperCase() == Note)
		Octave = 4;
	
	Octave -= Lower;
	Octave += Higher;
	
	return Octave;
}

function ButtonArrayAddNames(aRow, Annotations) {
	for (let i = 0; i < aRow.length; ++i) {
		if (aRow[i] != "") {
			let Sharp = aRow[i][0] == "^";
			let Flat  = aRow[i][0] == "_";
			
			let Octave = GetNoteOctave(aRow[i]);
			
			let NoteName = aRow[i].replace(/[^A-Za-z]/g,'').toUpperCase();
			if (Sharp)
				NoteName += "#";
			else if (Flat)
				NoteName += "b";
			
			switch (Octave) {
				case 0:
					Octave = '\u2080';
					break;
				case 1:
					Octave = '\u2081';
					break;
				case 2:
					Octave = '\u2082';
					break;
				case 3:
					Octave = '\u2083';
					break;
				case 4:
					Octave = '\u2084';
					break;
				case 5:
					Octave = '\u2085';
					break;
				case 6:
					Octave = '\u2086';
					break;
				case 7:
					Octave = '\u2087';
					break;
				case 8:
					Octave = '\u2088';
					break;
				case 9:
					Octave = '\u2089';
					break;
			}
			NoteName += Octave;
			
			
			
			
			aRow[i] = '"' + NoteName + Annotations + '"' + aRow[i];
		}
	}
	return aRow;
}

function GetCircleFifths(Index) {
	Index = Index % 12;
	if (Index < 0)
		Index += 12;
	switch (Index) {
		case 0:
			return {
				KeyFlat  : "C",
				KeySharp : "C",
				NoteFlat : "C",
				NoteSharp: "C",
			};
		case 1:
			return {
				KeyFlat  : "G",
				KeySharp : "G",
				NoteFlat : "G",
				NoteSharp: "G",
			};
		case 2:
			return {
				KeyFlat  : "D",
				KeySharp : "D",
				NoteFlat : "D",
				NoteSharp: "D",
			};
		case 3:
			return {
				KeyFlat  : "A",
				KeySharp : "A",
				NoteFlat : "A",
				NoteSharp: "A",
			};
		case 4:
			return {
				KeyFlat  : "E",
				KeySharp : "E",
				NoteFlat : "E",
				NoteSharp: "E",
			};
		case 5:
			return {
				KeyFlat  : "B",
				KeySharp : "B",
				NoteFlat : "B",
				NoteSharp: "B",
			};
		case 6:
			return {
				KeyFlat  : "Gb",
				KeySharp : "F#",
				NoteFlat : "_G",
				NoteSharp: "^F",
			};
		case 7:
			return {
				KeyFlat  : "Db",
				KeySharp : "C#",
				NoteFlat : "_D",
				NoteSharp: "^C",
			};
		case 8:
			return {
				KeyFlat  : "Ab",
				KeySharp : "G#",
				NoteFlat : "_A",
				NoteSharp: "^G",
			};
		case 9:
			return {
				KeyFlat  : "Eb",
				KeySharp : "D#",
				NoteFlat : "_E",
				NoteSharp: "^D",
			};
		case 10:
			return {
				KeyFlat  : "Bb",
				KeySharp : "A#",
				NoteFlat : "_B",
				NoteSharp: "^A",
			};
		case 11:
			return {
				KeyFlat  : "F",
				KeySharp : "F",
				NoteFlat : "F",
				NoteSharp: "F",
			};
	}
}

function IsInKey(CircleIndex, Note) {
	let InKey = false;
	for (let k = CircleIndex - 1; k <= CircleIndex+5; ++k) {
		let CircleEntry = GetCircleFifths(k);
		if (Note.startsWith(CircleEntry.NoteFlat) || Note.startsWith(CircleEntry.NoteSharp) || Note.startsWith(CircleEntry.NoteFlat.toLowerCase()) || Note.startsWith(CircleEntry.NoteSharp.toLowerCase())) {
			InKey = true;
			break;
		}
	}
	return InKey;
}

function GetNote(ChordNote) {
	let Note = ChordNote.substr(ChordNote.lastIndexOf('"') + 1);
	return Note;
}

function KeyTranspose(Key, TransposeSteps) {
	let renderObj = ABCJS.renderAbc("*", "K: " + Key);
	let newAbc = ABCJS.strTranspose("K: " + Key, renderObj, TransposeSteps);
	return newAbc.substr(3);
}

function ButtonArrayToKey(aRow, Key) {
	//Find key in the circle of fifths
	let KeyIndex = FindCicrleKeyIndex(Key);
	
	//For all buttons in the row
	for (let n = 0; n < aRow.length; ++n) {
		if (aRow[n].length == 0)
			continue;
		let Note = GetNote(aRow[n]);
		
		//Remove _ and ^ from buttons if within range in the circle of fifths
		let InKey = IsInKey(KeyIndex, Note);
		
		//Check sharp/flat specified
		let Acc = Note.includes('_') || Note.includes('^');
		
		//If sharp/flat within key specified, it can be removed
		if (Acc && InKey) {
			aRow[n] = aRow[n].replaceAll('"_', '"');
			aRow[n] = aRow[n].replaceAll('"^', '"');
		}
		//If no sharp/flat, but not within key, add = for natural
		else if (!Acc && !InKey) {
			aRow[n] = aRow[n].replaceAll('"', '"=');
			aRow[n] = aRow[n].substr(0, 1) + aRow[n].substr(2);
		}
	}
	
	return aRow;
}

function SplitOutOfKey(aRowPush, aRowPull, aRowPushButtons, aRowPullButtons) {
	for (let i = 0; i < aRowPush.length; ++i) {
		var OutOfKey = false;
		if (aRowPush[i].indexOf("^") >= 0 || aRowPush[i].indexOf("+") >= 0 || aRowPush[i].indexOf("=") >= 0)
			OutOfKey = true;
		if (aRowPull[i].indexOf("^") >= 0 || aRowPull[i].indexOf("+") >= 0 || aRowPull[i].indexOf("=") >= 0)
			OutOfKey = true;
		
		if (OutOfKey) {
			aRowPushButtons.push(aRowPush[i]);
			aRowPullButtons.push(aRowPull[i]);
			aRowPush.splice(i, 1);
			aRowPull.splice(i, 1);
			i--;
		}
		
	}
}

function GetNoteIndex(Note) {
	Note = Note.toLowerCase();
	Note = Note.replaceAll("_", "");
	Note = Note.replaceAll("^", "");
	Note = Note.replaceAll("=", "");
	Note = Note.replaceAll(",", "");
	Note = Note.replaceAll("'", "");
	switch (Note) {
		case "c":
			return 0;
		case "d":
			return 1;
		case "e":
			return 2;
		case "f":
			return 3;
		case "g":
			return 4;
		case "a":
			return 5;
		case "b":
			return 6;
	}
}

function GetAcc(Note) {
	if (Note.includes('^'))
		return  1;
	if (Note.includes('_'))
		return -1;
	return 0;
}

function ChordNoteCompare(Left, Right) {
	if (Left.length == 0 && Right.length == 0)
		return  0;
	if (Left.length == 0)
		return -1;
	if (Right.length == 0)
		return  1;
	
	let LeftNote  = GetNote(Left );
	let RightNote = GetNote(Right);
	
	let LeftOctave  = GetNoteOctave(LeftNote);
	let RightOctave = GetNoteOctave(RightNote);
	if (LeftOctave < RightOctave)
		return -1;
	if (LeftOctave > RightOctave)
		return  1;
	
	let LeftIndex  = GetNoteIndex(LeftNote);
	let RightIndex = GetNoteIndex(RightNote);
	if (LeftIndex < RightIndex)
		return -1;
	if (LeftIndex > RightIndex)
		return  1;
	
	let LeftAcc  = GetAcc(LeftNote);
	let RightAcc = GetAcc(RightNote);
	if (LeftAcc < RightAcc)
		return -1;
	if (LeftAcc > RightAcc)
		return  1;
	
	if (Left.includes("<") && Right.includes(">"))
		return -1;
	if (Left.includes(">") && Right.includes("<"))
		return  1;
	
	return 0;
}

function ButtonArraysToAbc(aRowPush, aRowPull) {
	let AbcRow = "";
	for (let i = 0; i < aRowPush.length; ++i) {
		let PrevLen = AbcRow.length;
		if (aRowPush[i].length != 0)
			AbcRow += aRowPush[i]
		if (i < aRowPull.length && aRowPull[i].length != 0)
			AbcRow += aRowPull[i];
		if (PrevLen != AbcRow.length && (aRowPull.length > 0 || i % 2 == 1) )
			AbcRow += "|";
	}
	return AbcRow;
}

function GetChordNotes(ChordName) {
	let aAllSharp = new Array();
	aAllSharp.push( "C,,");
	aAllSharp.push("^C,,");
	aAllSharp.push( "D,,");
	aAllSharp.push("^D,,");
	aAllSharp.push( "E,,");
	aAllSharp.push( "F,,");
	aAllSharp.push("^F,,");
	aAllSharp.push( "G,,");
	aAllSharp.push("^G,,");
	aAllSharp.push( "A,,");
	aAllSharp.push("^A,,");
	aAllSharp.push( "B,,");
	aAllSharp.push( "C,");
	aAllSharp.push("^C,");
	aAllSharp.push( "D,");
	aAllSharp.push("^D,");
	aAllSharp.push( "E,");
	aAllSharp.push( "F,");
	aAllSharp.push("^F,");
	aAllSharp.push( "G,");
	aAllSharp.push("^G,");
	aAllSharp.push( "A,");
	aAllSharp.push("^A,");
	aAllSharp.push( "B,");
	let aAllFlat = new Array();
	aAllFlat.push( "C,,");
	aAllFlat.push("_D,,");
	aAllFlat.push( "D,,");
	aAllFlat.push("_E,,");
	aAllFlat.push( "E,,");
	aAllFlat.push( "F,,");
	aAllFlat.push("_G,,");
	aAllFlat.push( "G,,");
	aAllFlat.push("_A,,");
	aAllFlat.push( "A,,");
	aAllFlat.push("_B,,");
	aAllFlat.push( "B,,");
	
	//Get the upper case base name from the chord
	let BassNote = ChordName[0];
	if (ChordName.length > 1) {
		if (ChordName[1] == "#")
			BassNote = "^" + BassNote[0];
		else if (ChordName[1] == "b")
			BassNote = "_" + BassNote[0];
	}
	BassNote = BassNote.toUpperCase();
	
	//Find it in the lookup table
	let BassIndex = 0;
	for (; BassIndex < aAllSharp.length; ++BassIndex) {
		if (aAllSharp[BassIndex].startsWith(BassNote) || aAllFlat[BassIndex].startsWith(BassNote))
			break;
	}
	if (BassIndex >= aAllSharp.length)
		return new Array();
	
	//Compute indices relive to this
	let Index1 = BassIndex + 0;
	let Index2 = BassIndex + 4;
	if (ChordName.indexOf("m") >= 0)
		Index2 = BassIndex + 3; //Minor chord
	let Index3 = BassIndex + 7;
	
	//Return the sharp upper case chord notes
	let aChordNotes = new Array();
	aChordNotes.push(aAllSharp[Index1]);
	aChordNotes.push(aAllSharp[Index2]);
	aChordNotes.push(aAllSharp[Index3]);
	
	return aChordNotes;
}

function GenChord(ChordName, aButtonNotes, Options) {
	//Convert chord to display name
	if (Options.Dflat)
		ChordName = ChordName.replaceAll('C#', 'Db');
	else
		ChordName = ChordName.replaceAll('Db', 'C#');
	if (Options.Eflat)
		ChordName = ChordName.replaceAll('D#', 'Eb');
	else
		ChordName = ChordName.replaceAll('Eb', 'D#');
	if (Options.Gflat)
		ChordName = ChordName.replaceAll('F#', 'Gb');
	else
		ChordName = ChordName.replaceAll('Gb', 'F#');
	if (Options.Aflat)
		ChordName = ChordName.replaceAll('G#', 'Ab');
	else
		ChordName = ChordName.replaceAll('Ab', 'G#');
	if (Options.Bflat)
		ChordName = ChordName.replaceAll('A#', 'Bb');
	else
		ChordName = ChordName.replaceAll('Bb', 'A#');
	
	//Get notes in the chord, low octave sharp
	let StrippedChordName = ChordName;
	let Pos = StrippedChordName.search(" ");
	if (Pos >= 0) {
		StrippedChordName = StrippedChordName.substr(0, Pos);
		if (ChordName.slice(-1) == ">" || ChordName.slice(-1) == "<")
			StrippedChordName += ChordName.slice(-1);
	}
	let aChordNotes = GetChordNotes(StrippedChordName);
	
	//Lookup all notes in the chord in all octaves
	let aBass  = new Array();
	let aOther = new Array();
	for (let Octave = 0; Octave <= 8; ++Octave) {
		//Find buttons for this octave
		for (let i = 0; i < aChordNotes.length; ++i) {
			for (let j = 0; j < aButtonNotes.length; ++j) {
				if (aChordNotes[i] == aButtonNotes[j]) {
					let NoteName = ConvertFlatSharp(aButtonNotes[j], Options);
					if (i == 0)
						aBass.push(NoteName);
					else
						aOther.push(NoteName);
					break;
				}
			}
		}
		
		//Make chord notes one octave higher
		for (let i = 0; i < aChordNotes.length; ++i) {
			//Remove ,
			if (aChordNotes[i][aChordNotes[i].length - 1] == ",")
				aChordNotes[i] = aChordNotes[i].substr(0, aChordNotes[i].length - 1);
			//Upper case to lower case
			else if (aChordNotes[i] != aChordNotes[i].toLowerCase())
				aChordNotes[i] = aChordNotes[i].toLowerCase();
			//Add '
			else
				aChordNotes[i] += "'";
		}
	}
	
	//Generate ABC string for chord and notes
	var ABC = '';
	if (aBass.length || aOther.length) {
		//Add bass
		StrippedChordName = StrippedChordName.replaceAll("b", "♭");
		let BassName = StrippedChordName;
		BassName = BassName.replaceAll("m7", "");
		BassName = BassName.replaceAll("m", "");
		let SepIndex = BassName.indexOf(" ");
		if (SepIndex >= 0)
			BassName = BassName.substr(0, SepIndex);
		ABC += '"' + BassName + '"';
		
		//Add bass notes
		if (aBass.length > 1)
			ABC += "[";
		for (let i = 0; i < aBass.length; ++i)
			ABC += aBass[i];
		if (aBass.length > 1)
			ABC += "]";
		if (aBass.length == 0)
			ABC += "z";
		
		//Add chords
		ChordName = ChordName.replaceAll("b", "♭");
		ChordName = ChordName.toLowerCase();
		ABC += '"' + ChordName + '"';
		
		//Add chord notes
		let Added = false;
		for (let i = 0; i < aOther.length; ++i) {
			if (!Added) {
				Added = true;
				ABC += "[";
			}
			ABC += aOther[i];
		}
		if (Added)
			ABC += "]";
		else
			ABC += "z";
		
		ABC += "|";
	}
	
	return ABC;
}

function ExampleLoad(Index) {
	UpdateTitle = true;
	return ExampleLoadIntern(Index);
}

function FindRowKeys(Instrument, Tuning) {
	let aRowKey = new Array();
	let TransposeSteps = LookupTransposeSteps(Instrument, Tuning);
	
	if (Instrument == "M_1") {
		let Row1Key = KeyTranspose("C", TransposeSteps);
		aRowKey.push(Row1Key);
	}
	else if (Instrument == "M_2" || Instrument == "M_25" || Instrument == "M_CLUB") {
		let Row1Key = KeyTranspose("G", TransposeSteps);
		let Row2Key = KeyTranspose("C", TransposeSteps);
		aRowKey.push(Row1Key);
		aRowKey.push(Row2Key);
	}
	//Three row melodeons
	else if (Instrument == "M_3") {
		let Row1Key = KeyTranspose("G", TransposeSteps);
		let Row2Key = KeyTranspose("C", TransposeSteps);
		let Row3Key = KeyTranspose("F", TransposeSteps);
		aRowKey.push(Row1Key);
		aRowKey.push(Row2Key);
		aRowKey.push(Row3Key);
	}
	//Harmonica
	else if (Instrument.substr(0, 1) == "H") {
		let Row1Key = KeyTranspose("G", TransposeSteps);
		aRowKey.push(Row1Key);
	}
	
	return aRowKey;
}

function LookupTransposeSteps(Instrument, Tuning) {
	if (Instrument == "M_1") {
		//From C to selected
		switch (Tuning) {
			case "B♭":
				return -2;
			case "C":
				return  0;
			case "D":
				return  2;
			case "G":
				return  7;
			case "A":
				return  9;
		}
	}
	else {
		//From G/C to selected
		switch (Tuning) {
			case "E/A/D":
				return -3;
			case "F/B♭/E♭":
				return -2;
			case "G":
			case "G/C":
			case "G/C/F":
				return  0;
			case "A♭":
				return  1;
			case "A":
			case "A/D":
			case "A/D/G":
				return  2;
			case "B♭":
			case "B♭/E♭":
			case "B♭/E♭/A♭":
				return  3;
			case "B":
				return  4;
			case "C":
			case "C/F":
			case "C/F/B♭":
				return  5;
			case "D♭":
				return  6;
			case "D":
			case "D/G":
				return  7;
			case "E♭":
				return  8;
			case "E":
				return  9;
			case "F":
				return  10;
			case "F#":
				return  11;
		}
	}
	
	return 0;
}

function ExampleLoadIntern(Index) {
	let aLines = [];
	
	let Instruments = document.getElementById("instrument");
	let Variants    = document.getElementById("variant");
	let Tunings     = document.getElementById("tuning");
	
	//Lookup the number of transpose steps
	let TransposeSteps = LookupTransposeSteps(Instruments.value, Tunings.value);
	if (Instruments.value == "M_1") {
		if (Index == 2 || Index == 3 || Index == 4)
			TransposeSteps -= 12;
	}
	
	//Lookup the example
	switch (Index) {
		case 0: //Instrument layout in scale order
		case 1: //Instrument layout in button order
			if (Instruments.value == "NONE") {
				ExampleClose();
				return false;
			}
		
			//Load a working example so we can copy the button arrays
			ExampleLoadIntern(2);
		
			//Set header
			aLines.push('T: Layout ' + Instruments[Instruments.selectedIndex].text);
			aLines.push('T: ' + Variants[Variants.selectedIndex].text + ' ' + Tunings[Tunings.selectedIndex].text);
			aLines.push('L: 1/4');
			
			//Instrument specific ABC
			if (Instruments.value == "M_1") { //Single row melodeons
				let Mini = false;
				if (Instruments.value == "M_1_7")
					Mini = true;
				
				//Get treble buttons from ABCjs
				let aRawPush = Editor.tunes[0].tablatures[0].instance.semantics.push_row1;
				let aRawPull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row1;
				
				//Get bass buttons from ABCjs
				let aRawChordRowPush = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Push;
				let aRawChordRowPull = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Pull;
				
				let Row1Key = FindRowKeys(Instruments.value, Tunings.value)[0];
				let convOptions = GetSharpFlatConverts(Row1Key, Row1Key);
				aRowPush = ButtonArrayConvert(aRawPush, convOptions);
				aRowPull = ButtonArrayConvert(aRawPull, convOptions);
				aRowPush = ButtonArrayAddNames(aRowPush, ">");
				aRowPull = ButtonArrayAddNames(aRowPull, "<");
				aRowPush = ButtonArrayToKey(aRowPush, Row1Key);
				aRowPull = ButtonArrayToKey(aRowPull, Row1Key);
				
				//Add row to ABC
				let LayoutTrebleRow = "";
				if (Index == 0) { //Diatonic scale order
					//Sort by note order
					let aRow = aRowPush.concat(aRowPull);
					aRow.sort(ChordNoteCompare);
					
					//Create note order
					LayoutTrebleRow = ButtonArraysToAbc(aRow, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					LayoutTrebleRow = ButtonArraysToAbc(aRowPush, aRowPull);
				}
				
				aLines.push('P: Treble');
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow);
				
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass');
				var Line = "]";
				for (let i = 0; i < aRawChordRowPush.length; ++i) {
					Line += GenChord(aRawChordRowPush[i] + '>', aRawPush, convOptions);
					Line += GenChord(aRawChordRowPull[i] + '<', aRawPull, convOptions);
				}
				aLines.push(Line);
			}
			else if (Instruments.value == "M_2") { //Dual row melodeons
				//Get treble buttons from ABCjs
				let aRawRow2Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row2;
				let aRawRow2Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row2;
				let aRawRow1Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row1;
				let aRawRow1Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row1;
				let aRawPush = aRawRow2Push.concat(aRawRow1Push);
				let aRawPull = aRawRow2Pull.concat(aRawRow1Pull);
				
				//Get bass chords from ABCjs
				let aRawChordRow1Push  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Push;
				let aRawChordRow1Pull  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Pull;
				let aRawChordRow2Push  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow2Push;
				let aRawChordRow2Pull  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow2Pull;
				let aRawChordCrossPush = Editor.tunes[0].tablatures[0].instance.semantics.BassCrossPush;
				let aRawChordCrossPull = Editor.tunes[0].tablatures[0].instance.semantics.BassCrossPull;
				
				//Figure out flats and sharps
				let aRowKeys = FindRowKeys(Instruments.value, Tunings.value);
				let Row1Key = aRowKeys[0];
				let Row2Key = aRowKeys[1];
				let convOptions = GetSharpFlatConverts(Row1Key, Row2Key);
				
				//Format inner row
				aRow2Push = ButtonArrayConvert(aRawRow2Push, convOptions);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, convOptions);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				aRow2Push = ButtonArrayToKey(aRow2Push, Row2Key);
				aRow2Pull = ButtonArrayToKey(aRow2Pull, Row2Key);
				
				//Format outer row
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				aRow1Push = ButtonArrayToKey(aRow1Push, Row1Key);
				aRow1Pull = ButtonArrayToKey(aRow1Pull, Row1Key);
				
				let LayoutTrebleRow2 = "";
				let LayoutTrebleRow1 = "";
				if (Index == 0) { //Diatonic scale order
					//Split buttons with out of key notes
					let aRow1PushButtons = new Array();
					let aRow1PullButtons = new Array();
					let aRow2PushButtons = new Array();
					let aRow2PullButtons = new Array();
					SplitOutOfKey(aRow1Push, aRow1Pull, aRow1PushButtons, aRow1PullButtons);
					SplitOutOfKey(aRow2Push, aRow2Pull, aRow2PushButtons, aRow2PullButtons);
					
					//Sort by note order
					let aRow2 = aRow2Push.concat(aRow2Pull);
					aRow2.sort(ChordNoteCompare);
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					
					//Create buttons + note order
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2PushButtons, aRow2PullButtons) + ButtonArraysToAbc(aRow2, new Array());
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1PushButtons, aRow1PullButtons) + ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2Push, aRow2Pull);
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1Push, aRow1Pull);
				}
				
				//Add C row to ABC
				aLines.push('P: Treble Inner Row ' + Row2Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row2Key);
				aLines.push(LayoutTrebleRow2);
				
				//Add G row to ABC
				aLines.push('P: Treble Outer Row ' + Row1Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow1);
				
				//Add ABC for bass rows
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass Outer Row');
				var Line = "]";
				for (let i = 0; i < aRawChordRow1Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				aLines.push('P:Bass Inner Row');
				Line = "]";
				for (let i = 0; i < aRawChordRow2Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow2Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow2Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				
				//Add ABC for bass cross-rows
				let Len = aRawChordCrossPush.length;
				if (aRawChordCrossPull.length > Len)
					Len = aPullCrossChord.length;
				if (Len > 0) {
					aLines.push('P:Bass Cross Row');
					Line = "]";
					for (let i = 0; i < Len; ++i) {
						if (i < aRawChordCrossPush.length)
							Line += GenChord(aRawChordCrossPush[i] + '>' , aRawPush, convOptions);
						if (i < aRawChordCrossPull.length)
							Line += GenChord(aRawChordCrossPull[i] + '<' , aRawPull, convOptions);
						
					}
					aLines.push(Line);
				}
			}
			//Three row melodeons
			else if (Instruments.value == "M_25" || Instruments.value == "M_CLUB" || Instruments.value == "M_3") {
				//Get treble buttons from ABCjs
				let aRawRow3Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row3;
				let aRawRow3Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row3;
				let aRawRow2Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row2;
				let aRawRow2Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row2;
				let aRawRow1Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row1;
				let aRawRow1Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row1;
				let aRawPush = aRawRow3Push.concat(aRawRow2Push.concat(aRawRow1Push));
				let aRawPull = aRawRow3Pull.concat(aRawRow2Pull.concat(aRawRow1Pull));
				
				//Get bass chords from ABCjs
				let aRawChordRow1Push  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Push;
				let aRawChordRow1Pull  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow1Pull;
				let aRawChordRow2Push  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow2Push;
				let aRawChordRow2Pull  = Editor.tunes[0].tablatures[0].instance.semantics.BassRow2Pull;
				let aRawChordCrossPush = Editor.tunes[0].tablatures[0].instance.semantics.BassCrossPush;
				let aRawChordCrossPull = Editor.tunes[0].tablatures[0].instance.semantics.BassCrossPull;
				
				//Figure out flats and sharps
				let aRowKeys = FindRowKeys(Instruments.value, Tunings.value);
				let Row1Key = aRowKeys[0];
				let Row2Key = aRowKeys[1];
				let Row3Key = "";
				let convOptions;
				if (aRowKeys.length > 2) {
					Row3Key = aRowKeys[2];
					convOptions = GetSharpFlatConverts(Row1Key, Row3Key);
				}
				else {
					convOptions = GetSharpFlatConverts(Row1Key, Row2Key);
				}
				
				if (Instruments.value == "M_3") {
					aRow3Push = ButtonArrayConvert(aRawRow3Push, convOptions);
					aRow3Pull = ButtonArrayConvert(aRawRow3Pull, convOptions);
					aRow3Push = ButtonArrayAddNames(aRow3Push, ">,");
					aRow3Pull = ButtonArrayAddNames(aRow3Pull, "<,");
					aRow3Push = ButtonArrayToKey(aRow3Push, Row3Key);
					aRow3Pull = ButtonArrayToKey(aRow3Pull, Row3Key);
				}
				else {
					aRow3Push = ButtonArrayConvert(aRawRow3Push, convOptions);
					aRow3Pull = ButtonArrayConvert(aRawRow3Pull, convOptions);
					aRow3Push = ButtonArrayAddNames(aRow3Push, ">,");
					aRow3Pull = ButtonArrayAddNames(aRow3Pull, "<,");
				}
				
				
				aRow2Push = ButtonArrayConvert(aRawRow2Push, convOptions);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, convOptions);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				aRow2Push = ButtonArrayToKey(aRow2Push, Row2Key);
				aRow2Pull = ButtonArrayToKey(aRow2Pull, Row2Key);
				
				
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				aRow1Push = ButtonArrayToKey(aRow1Push, Row1Key);
				aRow1Pull = ButtonArrayToKey(aRow1Pull, Row1Key);
				
				let LayoutTrebleRow3 = "";
				let LayoutTrebleRow2 = "";
				let LayoutTrebleRow1 = "";
				if (Index == 0) { //Diatonic scale order
					if (Row3Key == "") {
						//Row 3 always in button order
						LayoutTrebleRow3 = ButtonArraysToAbc(aRow3Push, aRow3Pull);
					}
					else {
						//Split buttons with out of key notes
						let aRow3PushButtons = new Array();
						let aRow3PullButtons = new Array();
						SplitOutOfKey(aRow3Push, aRow3Pull, aRow3PushButtons, aRow3PullButtons);
						
						//Sort by note order
						let aRow3 = aRow3Push.concat(aRow3Pull);
						aRow3.sort(ChordNoteCompare);
						
						//Create buttons + note order
						LayoutTrebleRow3 = ButtonArraysToAbc(aRow3PushButtons, aRow3PullButtons) + ButtonArraysToAbc(aRow3, new Array());
					}
					
					//Split buttons with out of key notes
					let aRow1PushButtons = new Array();
					let aRow1PullButtons = new Array();
					let aRow2PushButtons = new Array();
					let aRow2PullButtons = new Array();
					SplitOutOfKey(aRow1Push, aRow1Pull, aRow1PushButtons, aRow1PullButtons);
					SplitOutOfKey(aRow2Push, aRow2Pull, aRow2PushButtons, aRow2PullButtons);
					
					//Sort by note order
					let aRow2 = aRow2Push.concat(aRow2Pull);
					aRow2.sort(ChordNoteCompare);
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					
					//Create buttons + note order
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2PushButtons, aRow2PullButtons) + ButtonArraysToAbc(aRow2, new Array());
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1PushButtons, aRow1PullButtons) + ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					LayoutTrebleRow3 = ButtonArraysToAbc(aRow3Push, aRow3Pull);
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2Push, aRow2Pull);
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1Push, aRow1Pull);
				}
				
				//Add acc row to ABC
				aLines.push('[]');
				aLines.push('P: Treble Inner Row');
				if (Row3Key != "") {
					aLines[aLines.length - 1] += " " + Row3Key.replaceAll("b", "♭");
					aLines.push('K: ' + Row3Key);
				}
				aLines.push(LayoutTrebleRow3);
				
				//Add C row to ABC
				aLines.push('P: Treble Middle Row ' + Row2Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row2Key);
				aLines.push(LayoutTrebleRow2);
				
				//Add G row to ABC
				aLines.push('P: Treble Outer Row '  + Row1Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow1);
				
				//Add ABC for bass rows
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass Outer Row');
				var Line = "]";
				for (let i = 0; i < aRawChordRow1Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				aLines.push('P:Bass Inner Row');
				Line = "]";
				for (let i = 0; i < aRawChordRow2Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow2Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow2Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				
				//Add ABC for bass cross-rows
				let Len = aRawChordCrossPush.length;
				if (aRawChordCrossPull.length > Len)
					Len = aPullCrossChord.length;
				if (Len > 0) {
					aLines.push('P:Bass Cross Row');
					Line = "]";
					for (let i = 0; i < Len; ++i) {
						if (i < aRawChordCrossPush.length)
							Line += GenChord(aRawChordCrossPush[i] + '>' , aRawPush, convOptions);
						if (i < aRawChordCrossPull.length)
							Line += GenChord(aRawChordCrossPull[i] + '<' , aRawPull, convOptions);
						
					}
					aLines.push(Line);
				}
			}
			//Harmonica
			else if (Instruments.value.substr(0, 1) == "H") {
				//Get holes from ABCjs
				let aRawRow1Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row1;
				let aRawRow1Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row1;
				
				//Get bends from ABCjs
				let aRawRow2Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row2;
				let aRawRow2Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row2;
				let aRawRow3Push = Editor.tunes[0].tablatures[0].instance.semantics.push_row3;
				let aRawRow3Pull = Editor.tunes[0].tablatures[0].instance.semantics.pull_row3;
				let aRawBendsPush = aRawRow3Push.concat(aRawRow2Push);
				let aRawBendsPull = aRawRow3Pull.concat(aRawRow2Pull);
				
				//Process holes
				let Row1Key = FindRowKeys(Instruments.value, Tunings.value)[0];
				let convOptions = GetSharpFlatConverts(Row1Key, Row1Key);
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				aRow1Push = ButtonArrayToKey(aRow1Push, Row1Key);
				aRow1Pull = ButtonArrayToKey(aRow1Pull, Row1Key);
				
				//Process bends
				aBendsPush = ButtonArrayConvert(aRawBendsPush, convOptions);
				aBendsPull = ButtonArrayConvert(aRawBendsPull, convOptions);
				aBendsPush = ButtonArrayAddNames(aBendsPush, ">,");
				aBendsPull = ButtonArrayAddNames(aBendsPull, "<,");

				//Holes in scale or instrument order
				let LayoutRow1 = "";
				if (Index == 0) { //Diatonic scale order
					//Sort by note order
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					LayoutRow1 = ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Hole order, first blow then draw
					LayoutRow1 = ButtonArraysToAbc(aRow1Push , aRow1Pull );
				}
				
				//Bends always in scale order
				let aBends = aBendsPush.concat(aBendsPull);
				aBends.sort(ChordNoteCompare);
				let LayoutBends = ButtonArraysToAbc(aBends, new Array());
				
				//Add acc row to ABC
				aLines.push('[]');
				aLines.push('P: Holes ' + Row1Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutRow1);
				
				//Add C row to ABC
				aLines.push('P: Bends');
				aLines.push('K: C');
				aLines.push(LayoutBends);
			}
			
			//Add layout source URL
			for (var i = 0; i < Variants.children.length; i++) {
				if (Variants.children[i].selected != "") {
					if (Variants.children[i].dataSource != "")
						aLines.push('S: ' + Variants.children[i].dataSource);
					break;
				}
			}
			
			//Add some meta comments to fix the layout
			aLines.push('%%stretchlast');
			aLines.push('%%staffsep 80');
			
			//No transpose, already done
			TransposeSteps = 0;
			break;
		default:
			let FindExampleIndex = Index - 2; 
			
			let ExampleIndex = -1;
			for (let i = 0; i < aExampleLines.length; ++i) {
				if (aExampleLines[i].substr(0, 3) == "T: ") {
					ExampleIndex++;
					if (ExampleIndex > FindExampleIndex)
						break;
				}
				
				if (ExampleIndex == FindExampleIndex)
					aLines.push(aExampleLines[i]);
			}
			
			if (ExampleIndex < FindExampleIndex)
				return false;
			break;
	}
	
	//Write it into the ABC box
	let ABC = document.getElementById("abc_editable");
	ABC.innerText = "";
	for (let i = 0; i < aLines.length; ++i) {
		ABC.innerText += aLines[i];
		if (i != aLines.length - 1)
			ABC.innerText += "\n";
	}
	
	//Set transpose control to 0
	let Transpose = document.getElementById("transpose");
	Transpose.value = 0;
	
	//Transpose the ABC text
	if (TransposeSteps != 0) {
		let renderObj = ABCJS.renderAbc("*", ABC.innerText);
		let newAbc = ABCJS.strTranspose(ABC.innerText, renderObj, TransposeSteps);
		ABC.innerText = newAbc;
	}
	
	//Refresh and close overlay
	CreateEditor();
	ExampleClose();
	return false;
}

function TransposeAbc() {
	//Get the transpose amount that is currently only visual
	let Transpose = document.getElementById("transpose");
	let TransposeSteps = Transpose.value;
	if (TransposeSteps == 0)
		return;
	
	let ABC = document.getElementById("abc_editable");
	var renderObj = ABCJS.renderAbc("*", ABC.innerText);
	var newAbc = ABCJS.strTranspose(ABC.innerText, renderObj, TransposeSteps);
	ABC.innerText = newAbc;
	
	//Set transpose control to 0
	Transpose.value = 0;
	
	//Refresh
	CreateEditor();
}

/// Ask user where the open ABC file from, open it if not canceled
function AbcOpenFileBrowser() {
	let FileInput = document.getElementById("OpenFile");
	FileInput.click();
}

/// Loads ABC file into editor if user chose a file
function AbcOpenFile() {
	//Get information about the opened file
	let FileInput = document.getElementById("OpenFile");
	const file = FileInput.files[0];
	
	//Read the file and put it in the editor
	var Reader = new FileReader();
	Reader.onload = function(event) {
		let ABC = document.getElementById("abc_editable");
		ABC.innerText = event.target.result;
		CreateEditor();
	}
	Reader.readAsText(file);
}

/// Downloads content of the ABC editor as a text file and ask user where to save it
function AbcSaveFile() {
	//Determine filename from the tune name
	let FileName = AbcGetTitle();
	if (FileName == "")
		FileName = "abc";
	FileName += ".txt";
	
	//Get the ABC input
	let ABC = document.getElementById("abc_editable").innerText;
	
	//Ask user where to save
	var ABCfile = new File([ABC], FileName, {type: "text/plain;charset=utf-8"});
	saveAs(ABCfile);
}
