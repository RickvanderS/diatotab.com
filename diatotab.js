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
	let show_options = true;
	switch (Instrument) {
		case "M_1":
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
			}
		
			break;
		case "H_1":
			show_options = false;
			
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
				Tuning.text     = "C";
				Tuning.selected = 'selected';
				Tunings.add(Tuning);
			}
			break;
		default:
			show_options = false;
			
/*			var Tuning = document.createElement("option");
			Tuning.text     = "\xa0";
			Tuning.selected = 'selected';
			Tunings.add(Tuning);
			break;*/
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
	showElement("optdiv", show_options);
	
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

function ShowHideVariantOptions() {
	//Get selectors
	let Instruments = document.getElementById("instrument");
	let Variants    = document.getElementById("variant");
	
	//Get selected instrument and variant
	let Instrument = Instruments.value;
	let Variant    = Variants.value;
	
	//Give option to start numbering at 0 for 4th button starts
	let ShowZero = Variant.includes(">") || Variant.includes("23") || Variant.includes("Saltarelle");
	showElement("startzero", ShowZero);
	
	//Show/hide accidental at 1 inverses
	let ShowInvAccidentatals1_1 = false;
	let ShowInvAccidentatals1_2 = false;
	let ShowInvAccidentatals2_1 = false;
	let ShowInvAccidentatals3_1 = false;
	if (Instrument == "M_2" && Variant.includes("^")) {
		ShowInvAccidentatals1_1 = true;
		ShowInvAccidentatals2_1 = true;
	}
	else if (Instrument == "M_3") {
		if (Variant.includes("31"))
			ShowInvAccidentatals1_2 = true;
		else
			ShowInvAccidentatals1_1 = true;
		ShowInvAccidentatals2_1 = true;
		ShowInvAccidentatals3_1 = true;
	}
	showElement("inv1div" , ShowInvAccidentatals1_1);
	showElement("inv2div" , ShowInvAccidentatals1_2);
	showElement("inv1adiv", ShowInvAccidentatals2_1);
	showElement("inv1bdiv", ShowInvAccidentatals3_1);
	
	//Give 1/2 the same value
	if (ShowInvAccidentatals1_1)
		document.getElementById("inv2").checked = document.getElementById("inv1").checked;
	if (ShowInvAccidentatals1_2)
		document.getElementById("inv1").checked = document.getElementById("inv2").checked;
	
	//Show/hide 5'/6' inverse
	let ShowInv5 = false;
	let ShowInv6 = false;
	if (Instrument == "M_2" || Instrument == "M_25" || Instrument == "M_3") {
		if (!ShowZero)
			ShowInv5 = true;
		else
			ShowInv6 = true;
	}
	showElement("inv5adiv", ShowInv5);
	showElement("inv6adiv", ShowInv6);
	
	//Give 5'/6' the same value
	if (ShowInv5)
		document.getElementById("inv6a").checked = document.getElementById("inv5a").checked;
	if (ShowInv6)
		document.getElementById("inv5a").checked = document.getElementById("inv6a").checked;
	
	//Rename labels depending on starting at 0 or starting at 1
	if (!ShowZero || (ShowZero && !document.getElementById("zero").checked)) {
		ReplaceElement("inv1_lab" , "0", "1");
		ReplaceElement("inv1a_lab", "0", "1");
		ReplaceElement("inv1b_lab", "0", "1");
		ReplaceElement("inv6a_lab", "5", "6");
	}
	else {
		ReplaceElement("inv1_lab" , "1", "0");
		ReplaceElement("inv1a_lab", "1", "0");
		ReplaceElement("inv1b_lab", "1", "0");
		ReplaceElement("inv6a_lab", "6", "5");
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
			if (Variant == "7") {
				abcjsParams.tablature = [{
					instrument: 'melodeon',
					label: '',
					tuning: [Tuning + "7"],
				}];
			}
			else if (Variant == "10") {
				abcjsParams.tablature = [{
					instrument: 'melodeon',
					label: '',
					tuning: [Tuning],
				}];
			}
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
					Row1_inv += "1";
				if (isShown("inv2div") && document.getElementById("inv2").checked)
					Row1_inv += "2";
				
				//Get row2 inversions
				let Row2_inv = "";
				if (isShown("inv1adiv") && document.getElementById("inv1a").checked)
					Row2_inv += "1";
				if (isShown("inv5adiv") && document.getElementById("inv5a").checked)
					Row2_inv += "5";
				if (isShown("inv6adiv") && document.getElementById("inv6a").checked)
					Row2_inv += "6";
				
				//Get row3 inversions
				let Row3_inv = ""; 
				if (isShown("inv1bdiv") && document.getElementById("inv1b").checked)
					Row3_inv += "1";
				
				//Add inversions to the tuning strings
				TuningArray[0] += Row1_inv;
				TuningArray[1] += Row2_inv;
				if (TuningArray.length == 3)
					TuningArray[2] += Row3_inv;
			}
			
			//Tablature options
			let startzero = document.getElementById("zero").checked;
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
			let changenoteheads = document.getElementById("changenotehead").checked;
			
			abcjsParams.tablature = [{
				instrument: 'melodeon',
				label: '',
				tuning: TuningArray,
				startzero: startzero,
				showall: showall,
				showall_ignorechords: showall_ignorechords,
				Row2Marker: Row2Marker,
				changenoteheads: changenoteheads,
			}];
			break;
		case "H_1":
			abcjsParams.tablature = [{
				instrument: 'harmonica',
				label: '',
				tuning: [Tuning],
			}];
			break;
	}
	
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
		AbcInput();
	
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
	
	CalcAbcScroll();
}

function DownloadWav() {
	Editor.synth.synthControl.runWhenReady(DownloadWav2, undefined);
}

function DownloadWav2() {
	Editor.synth.synthControl.download(document.title + ".wav");
}

let OriginalTitle = "";
let aExampleLines = new Array();
let StoreAllowed = false;
let aStoreElements = new Array("abc_editable", "instrument", "variant", "tuning", "zero", "inv1", "inv2", "inv1a", "inv1b", "inv5a", "inv6a", "tabmode", "innerstyle", "changenotehead", "reeds", "cents", "bassvol", "fade", "repeat");

function InitPage() {
	//Test for first time load
	//localStorage.clear();
	
	OriginalTitle = document.title;
	aExampleLines = document.getElementById("abc_editable").textContent.split("\n");
	AddInstruments();
	AddReeds();
	ExampleLoad(2);
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
	//For all stored controls
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
					AbcInput();
				else if (ID == "instrument")
					AddVariantsTunings();
				else if (ID == "variant")
					ShowHideVariantOptions();
			}
		}
	}
}

function Store() {
	if (!StoreAllowed)
		return;
	
	//For all controls to store
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
			localStorage.setItem(ID, Value);
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
	
	
	
	//TODO: Cursor position
	
	//Remove last item
	aAbcUndo.splice(aAbcUndo.length - 1, 1);
	aAbcUndo.splice(aAbcUndo.length - 1, 1);
	
	//Update last item to current state
	AbcInput();
}

function AbcKeyDown() {
	//Selection might have been changed
	AbcSelect();

	//Enter must create <br>, not a <div>
	if (event.key === 'Enter') {
		document.execCommand('insertLineBreak')
		event.preventDefault()
	}
	//Ctrl+z pressed
	else if (event.keyCode == 90 && event.ctrlKey) {
		Undo();
		event.preventDefault()
	}
}

function AbcPaste(event) {
	//Get the selection range or cursor position, this is where the text will be pasted
	let StartNode   = null;
	let StartOffset = 0;
	let EndNode     = null;
	let EndOffset   = 0;
	var sel = window.getSelection();
	for (var i = 0; i < sel.rangeCount; ++i) {
		let range = sel.getRangeAt(i);
		if (range.startContainer == event.target && range.endContainer == event.target) {
			StartNode   = range.startContainer.childNodes[range.startOffset];
			StartOffset = 0;
			if (range.endOffset < range.endContainer.childNodes.length) {
				EndNode     = range.endContainer.childNodes[range.endOffset];
				EndOffset   = 0;
			}
			else {
				EndNode   = range.endContainer.childNodes[range.endContainer.childNodes.length - 1];
				EndOffset = EndNode.textContent.length;
			}
			
			break;
		}
		else if (range.startContainer.parentNode == event.target && range.endContainer.parentNode == event.target) {
			StartNode   = range.startContainer;
			StartOffset = range.startOffset;
			EndNode     = range.endContainer;
			EndOffset   = range.endOffset;
			break;
		}
	}
	if (!StartNode) {
		if (sel.focusNode == event.target) {
			StartNode   = sel.focusNode.childNodes[sel.focusOffset];
			StartOffset = 0;
		}
		else if (sel.focusNode && sel.focusNode.parentNode == event.target) {
			StartNode   = sel.focusNode;
			StartOffset = sel.focusOffset;
		}
		EndNode   = StartNode
		EndOffset = StartOffset;
	}
	
	//If selection range was found, we will handle the pasting
	if (StartNode && EndNode) {
		//Delete text between start and end position
		let StartFound = false;
		for (let i = 0; i < event.target.childNodes.length; ++i) {
			if (event.target.childNodes[i] == StartNode && event.target.childNodes[i] == EndNode) {
				let Text = event.target.childNodes[i].textContent;
				Text = Text.substr(0, StartOffset) + Text.substr(EndOffset);
				event.target.childNodes[i].textContent = Text;
				break;
			}
			else if (event.target.childNodes[i] == StartNode) {
				let Text = event.target.childNodes[i].textContent;
				Text = Text.substr(0, StartOffset);
				event.target.childNodes[i].textContent = Text;
				
				StartFound = true;
			}
			else if (event.target.childNodes[i] == EndNode) {
				let Text = event.target.childNodes[i].textContent;
				Text = Text.substr(EndOffset);
				if (Text.length > 0)
					event.target.childNodes[i].textContent = Text;
				else
					event.target.childNodes[i].remove();
				break;
			}
			else if (StartFound) {
				event.target.childNodes[i].remove();
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
		for (let i = 0; i < event.target.childNodes.length; ++i) {
			if (event.target.childNodes[i] == StartNode) {
				let LastNode = null;
				let PostText = "";
				for (let l = 0; l < aPasteText.length; ++l) {
					//First line?
					if (l == 0) {
						if (event.target.childNodes[i].nodeName == "BR") {
							let Line = document.createTextNode(aPasteText[l]);
							event.target.childNodes[i].before(Line);
						}
						else {
							let Text = event.target.childNodes[i].textContent;
							PostText = Text.substr(StartOffset);
							Text = Text.substr(0, StartOffset) + aPasteText[l];
							event.target.childNodes[i].textContent = Text;
						}
						
						LastNode = event.target.childNodes[i];
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
		
		//Prevent default paste action
		event.stopPropagation();
		event.preventDefault();
		
		//Call ADC input event
		if (event.target == document.getElementById("abc_editable"))
			AbcInput();
	}
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
	NewUndo();
	
	//Get the ABC input editor
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Get the enter ABC
	let ABC = "";
	for (let i = 0; i < ABC_Editor.childNodes.length; ++i) {
		if (ABC_Editor.childNodes[i].nodeValue)
			ABC += ABC_Editor.childNodes[i].nodeValue;
		else
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
	let RenderDiv = document.getElementById("paper");
	if (RenderDiv.children.length) {
		let Title = RenderDiv.children[0].ariaLabel;
		let Expected = "Sheet Music for \"";
		if (Title.search(Expected) >= 0) {
			Title = Title.substring(Expected.length, Title.length-1) + " - Diatotab";
			document.title = Title;
		}
		else {
			document.title = OriginalTitle;
		}
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

function ButtonArrayConvert(RawArray, AsInsteadOfGis) {
	let aRow = new Array;
	for (let i = 0; i < RawArray.length; ++i) {
		if (RawArray[i] != "") {
			//Treble note preferences (not in key), want Bes and Es, all others -is
			let Note = RawArray[i].SharpName;
			Note = Note.replaceAll('^A', '_B');
			Note = Note.replaceAll('^a', '_b');
			Note = Note.replaceAll('^D', '_E');
			Note = Note.replaceAll('^d', '_e');
			if (AsInsteadOfGis) {
				Note = Note.replaceAll('^G', '_A');
				Note = Note.replaceAll('^g', '_a');
			}
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
	let i = 0;
	for (; i < 12; ++i) {
		if (GetCircleFifths(i).KeyFlat == Key || GetCircleFifths(i).KeySharp == Key)
			break;
	}
	if (i == 12)
		return;
	
	//For all buttons in the row
	for (let n = 0; n < aRow.length; ++n) {
		if (aRow[n].length == 0)
			continue;
		let Note = GetNote(aRow[n]);
		
		//Remove _ and ^ from buttons if within range in the circle of fifths
		let InKey = false;
		for (let k = i - 1; k <= i+5; ++k) {
			let CircleEntry = GetCircleFifths(k);
			if (Note.startsWith(CircleEntry.NoteFlat) || Note.startsWith(CircleEntry.NoteSharp) || Note.startsWith(CircleEntry.NoteFlat.toLowerCase()) || Note.startsWith(CircleEntry.NoteSharp.toLowerCase())) {
				InKey = true;
				break;
			}
		}
		
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

function GetChordNotes(ChordName, ForceSharp) {
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
	aAllFlat.push( "C,");
	aAllFlat.push("_D,");
	aAllFlat.push( "D,");
	aAllFlat.push("_E,");
	aAllFlat.push( "E,");
	aAllFlat.push( "F,");
	aAllFlat.push("_G,");
	aAllFlat.push( "G,");
	aAllFlat.push("_A,");
	aAllFlat.push( "A,");
	aAllFlat.push("_B,");
	aAllFlat.push( "B,");
	
	let BassSearch = ChordName[0];
	if (ChordName.length > 1) {
		if (ChordName[1] == "#")
			BassSearch = "^" + BassSearch[0];
		else if (ChordName[1] == "b")
			BassSearch = "_" + BassSearch[0];
	}
	
	let UseFlat = false;
	let BassIndex = 0;
	for (; BassIndex < aAllSharp.length; ++BassIndex) {
		if (aAllSharp[BassIndex].startsWith(BassSearch))
			break;
		else if (aAllFlat[BassIndex].startsWith(BassSearch)) {
			UseFlat = true;
			break;
		}
	}
	if (ChordName[0] == "G")
		UseFlat = true;
	
	if (ForceSharp)
		UseFlat = false;
	
	if (BassIndex >= aAllSharp.length)
		return "";
	
	
	let aChordNotes = new Array();
	//Major chord
	let Index1 = BassIndex + 0;
	let Index2 = BassIndex + 4;
	let Index3 = BassIndex + 7;
	//Minor chord
	if (ChordName.indexOf("m") >= 0)
		Index2 = BassIndex + 3;
	
	if (!UseFlat) {
		aChordNotes.push(aAllSharp[Index1]);
		aChordNotes.push(aAllSharp[Index2]);
		aChordNotes.push(aAllSharp[Index3]);
	}
	else {
		aChordNotes.push(aAllFlat[Index1]);
		aChordNotes.push(aAllFlat[Index2]);
		aChordNotes.push(aAllFlat[Index3]);
	}
	
	if (ChordName.indexOf("m7") >= 0) {
		let Index4 = BassIndex + 10;
		if (!UseFlat)
			aChordNotes.push(aAllSharp[Index4]);
		else
			aChordNotes.push(aAllFlat[Index4]);
	}
	
	return aChordNotes;
}

function GenChord(ChordName, aButtonNotes) {
	let StrippedChordName = ChordName;
	let Pos = StrippedChordName.search(" ");
	if (Pos >= 0) {
		StrippedChordName = StrippedChordName.substr(0, Pos);
		if (ChordName.slice(-1) == ">" || ChordName.slice(-1) == "<")
			StrippedChordName += ChordName.slice(-1);
	}
	let aChordNotes = GetChordNotes(StrippedChordName.replaceAll("m7", "m"));
	
	let aBass  = new Array();
	let aOther = new Array();
	for (let Octave = 0; Octave <= 8; ++Octave) {
		for (let i = 0; i < aChordNotes.length; ++i) {
			for (let j = 0; j < aButtonNotes.length; ++j) {
				if (aChordNotes[i] == aButtonNotes[j].FlatName || aChordNotes[i] == aButtonNotes[j].SharpName) {
					if (i == 0)
						aBass.push(aChordNotes[i]);
					else
						aOther.push(aChordNotes[i]);
					break;
				}
			}
		}
		
		//Make chord one octave higher
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
	
	var ABC = '';
	if (aBass.length || aOther.length) {
		StrippedChordName = StrippedChordName.replaceAll("b", "♭");
		ChordName         = ChordName.replaceAll("b", "♭");
		
		let BassName = StrippedChordName;
		BassName = BassName.replaceAll("m7", "");
		BassName = BassName.replaceAll("m", "");
		let SepIndex = BassName.indexOf(" ");
		if (SepIndex >= 0)
			BassName = BassName.substr(0, SepIndex);
		
		
		//Add bass notes
		ABC += '"' + BassName + '"';
		if (aBass.length > 1)
			ABC += "[";
		for (let i = 0; i < aBass.length; ++i)
			ABC += aBass[i];
		if (aBass.length > 1)
			ABC += "]";
		if (aBass.length == 0)
			ABC += "z";
		
		ChordName = ChordName.toLowerCase();
		
		//Add chord notes
		ABC += '"' + ChordName + '"';
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
	let aLines = [];
	
	let Instruments = document.getElementById("instrument");
	let Variants    = document.getElementById("variant");
	let Tunings     = document.getElementById("tuning");
	
	//Lookup the number of transpose steps
	let TransposeSteps = 0;
	if (Instruments.value.substr(0, 3) == "M_1") {
		//From G to selected
		switch (Tunings.value) {
			case "B♭":
				TransposeSteps = -9;
				break;
			case "C":
				TransposeSteps = -7;
				break;
			case "D":
				TransposeSteps = -5;
				break;
			case "G":
				TransposeSteps = 0;
				break;
			case "A":
				TransposeSteps = 2;
				break;
		}
	}
	else if (Instruments.value.substr(0, 3) == "M_2" || Instruments.value.substr(0, 3) == "M_3") {
		//From G/C to selected
		switch (Tunings.value) {
			case "E/A/D":
				TransposeSteps = -3;
				break;
			case "F/B♭/E♭":
				TransposeSteps = -2;
				break;
			case "G/C":
			case "G/C/F":
				TransposeSteps = 0;
				break;
			case "A/D":
			case "A/D/G":
				TransposeSteps = 2;
				break;
			case "B♭/E♭":
				TransposeSteps = 3;
				break;
			case "C/F":
				TransposeSteps = 5;
				break;
			case "D/G":
				TransposeSteps = 7;
				break;
		}
	}
	else if (Instruments.value.substr(0, 1) == "H") {
		//TODO:
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
			ExampleLoad(2);
		
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
				
				let RowKey = KeyTranspose("G", TransposeSteps);
				aRowPush = ButtonArrayConvert(aRawPush, false);
				aRowPull = ButtonArrayConvert(aRawPull, false);
				aRowPush = ButtonArrayAddNames(aRowPush, ">");
				aRowPull = ButtonArrayAddNames(aRowPull, "<");
				aRowPush = ButtonArrayToKey(aRowPush, RowKey);
				aRowPull = ButtonArrayToKey(aRowPull, RowKey);
				
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
				aLines.push('K: ' + RowKey);
				aLines.push(LayoutTrebleRow);
				
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass');
				var Line = "]";
				for (let i = 0; i < aRawChordRowPush.length; ++i) {
					Line += GenChord(aRawChordRowPush[i] + '>', aRawPush);
					Line += GenChord(aRawChordRowPull[i] + '<', aRawPull);
				}
				aLines.push(Line);
			}
			else if (Instruments.value == "M_2") { //Dual row melodeons
				let AsInsteadOfGis = Tunings.value == "B♭/E♭";
				
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
				
				let Row2Key = KeyTranspose("C", TransposeSteps);
				aRow2Push = ButtonArrayConvert(aRawRow2Push, AsInsteadOfGis);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, AsInsteadOfGis);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				aRow2Push = ButtonArrayToKey(aRow2Push, Row2Key);
				aRow2Pull = ButtonArrayToKey(aRow2Pull, Row2Key);
				
				let Row1Key = KeyTranspose("G", TransposeSteps);
				aRow1Push = ButtonArrayConvert(aRawRow1Push, AsInsteadOfGis);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, AsInsteadOfGis);
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
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull);
				}
				aLines.push(Line);
				aLines.push('P:Bass Inner Row');
				Line = "]";
				for (let i = 0; i < aRawChordRow2Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow2Push[i] + '>' + Ann, aRawPush);
					Line += GenChord(aRawChordRow2Pull[i] + '<' + Ann, aRawPull);
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
							Line += GenChord(aRawChordCrossPush[i] + '>' , aRawPush);
						if (i < aRawChordCrossPull.length)
							Line += GenChord(aRawChordCrossPull[i] + '<' , aRawPull);
						
					}
					aLines.push(Line);
				}
			}
			//Three row melodeons
			else if (Instruments.value == "M_25" || Instruments.value == "M_CLUB" || Instruments.value == "M_3") {
				let AsInsteadOfGis = Tunings.value == "B♭/E♭";
				
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
				
				let Row3Key = "";
				if (Instruments.value == "M_3") {
					Row3Key = KeyTranspose("F", TransposeSteps);
					aRow3Push = ButtonArrayConvert(aRawRow3Push, AsInsteadOfGis);
					aRow3Pull = ButtonArrayConvert(aRawRow3Pull, AsInsteadOfGis);
					aRow3Push = ButtonArrayAddNames(aRow3Push, ">,");
					aRow3Pull = ButtonArrayAddNames(aRow3Pull, "<,");
					aRow3Push = ButtonArrayToKey(aRow3Push, Row3Key);
					aRow3Pull = ButtonArrayToKey(aRow3Pull, Row3Key);
				}
				else {
					aRow3Push = ButtonArrayConvert(aRawRow3Push, AsInsteadOfGis);
					aRow3Pull = ButtonArrayConvert(aRawRow3Pull, AsInsteadOfGis);
					aRow3Push = ButtonArrayAddNames(aRow3Push, ">,");
					aRow3Pull = ButtonArrayAddNames(aRow3Pull, "<,");
				}
				
				let Row2Key = KeyTranspose("C", TransposeSteps);
				aRow2Push = ButtonArrayConvert(aRawRow2Push, AsInsteadOfGis);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, AsInsteadOfGis);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				aRow2Push = ButtonArrayToKey(aRow2Push, Row2Key);
				aRow2Pull = ButtonArrayToKey(aRow2Pull, Row2Key);
				
				let Row1Key = KeyTranspose("G", TransposeSteps);
				aRow1Push = ButtonArrayConvert(aRawRow1Push, AsInsteadOfGis);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, AsInsteadOfGis);
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
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull);
				}
				aLines.push(Line);
				aLines.push('P:Bass Inner Row');
				Line = "]";
				for (let i = 0; i < aRawChordRow2Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow2Push[i] + '>' + Ann, aRawPush);
					Line += GenChord(aRawChordRow2Pull[i] + '<' + Ann, aRawPull);
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
							Line += GenChord(aRawChordCrossPush[i] + '>' , aRawPush);
						if (i < aRawChordCrossPull.length)
							Line += GenChord(aRawChordCrossPull[i] + '<' , aRawPull);
						
					}
					aLines.push(Line);
				}
			}
			else if (Instruments.value.substr(0, 1) == "H") {
				//Add C row
				//           1                  2                      3                             4                 5          
				aLines.push('|"C"C|"Db"_D|"D"D| "E"E|"F"F|"Gb"_G|"G"G| "G"G|"Ab"_A|"A"A|"Bb"_B|"B"B| "C"c|"Db"_d|"D"d| "E"e|"F"f|');
				//           6                 7            8                       9                       10
				aLines.push('"G"g|"A"a|"Bb"_b| "B"b|"C"c\'| "D"d\'|"Eb"_e\'|"E"e\'| "F"f\'|"Gb"_g\'|"G"g\'| "A"a\'|"Bb"_b\'|"B"b\'|');
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

