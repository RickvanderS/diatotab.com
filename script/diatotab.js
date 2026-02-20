/// Show/hide language choice dropdown
function ClickLanguage() {
	document.getElementById("Language").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show'))
				openDropdown.classList.remove('show');
		}
	}
} 

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
	
	//Remove natural markers
	RetNote = RetNote.replaceAll("=", "");
	
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

function Is4thButtonStart(Instrument, Variant) {
	//Detect 4th button start symbol
	if (Variant.includes(">"))
		return true;
	
	//Detect club with 4th button start
	if (Variant.includes("23+") && Variant.includes("_Club"))
		return true;
	
	//Detect semitone with 4th button start
	if (Instrument == "M_2S" && Variant.includes("23"))
		return true;
	
	//Lookup 2.5 rows with 4th button start
	if (Variant.includes("Saltarelle") || Variant.includes("21+5_young") || Variant.includes("gaillard") || Variant.includes("milleret") || Variant.includes("pignol"))
		return true;
	
	return false;
}

function GetRow2MiddleInvButtonNumber(Instrument, Variant, StartFromZero) {
	//Check not applicable to the instrument
	if (Instrument != "M_2" && Instrument != "M_25" && Instrument != "M_3")
		return -1;
	
	//If this is a 4th button start instrument
	if (Is4thButtonStart(Instrument, Variant)) {
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
	let Variant    = document.getElementById("variant"   ).value;
	
	//Give option to start numbering at 0 for 4th button starts
	let BeginUnaligned = (Instrument == "M_3" && Variant == "31") || (Instrument == "M_35" && (Variant == "34gaillard" || Variant == "34milleret"));
	let Start4         = Is4thButtonStart(Instrument, Variant);
	let Row25          = Instrument == "M_25" || Instrument == "M_CLUB";
	AllowMelodeonNumbering(BeginUnaligned, Start4, Row25);
	
	//Show/hide button push/pull reverse
	let StartFromZero = GetOptNumStart() == 0;
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

function ReplaceBetweenNonBreakingSpaces(Input, Replace) {
	let Pre      = Input;
	let PreIndex = Pre.indexOf("\u00A0");
	    Pre      = Pre.substr(0, PreIndex+1);
	
	let Post      = Input.substr(PreIndex+1);
	let PostIndex = Post.indexOf("\u00A0");
	    Post      = Post.substr(PostIndex);
	
	let Output = Pre + Replace + Post;
	return Output;
}

let aMelodeonNumbering = new Array();

function CopyMelodeonNumbering() {
	let Numbering = document.getElementById('numbering');

	for (let i = 0; i < Numbering.length; i++) {
		let Pair = {
			Value : Numbering[i].value,
			Text  : Numbering[i].text ,
		};
		aMelodeonNumbering.push(Pair);
	}
}

function AllowMelodeonNumbering(BeginUnaligned, Start4, Row25) {
	let Numbering = document.getElementById('numbering');
	let SelectedValue = Numbering.value;
	
	//Clear all existing items
	Numbering.options.length = 0;
	
	let SelectionExists = false;
	for (let i = 0; i < aMelodeonNumbering.length; i++) { 
		let Add = false;
		if (aMelodeonNumbering[i].Value.substr(0, 1) == "1")
			Add = true;
		if (aMelodeonNumbering[i].Value.substr(1, 1) == "1")
			Add = true;
		if (aMelodeonNumbering[i].Value.substr(1, 1) == "0" && Start4)
			Add = true;
		if (aMelodeonNumbering[i].Value.substr(2, 1) == "0" && !BeginUnaligned)
			Add = false;
		if (aMelodeonNumbering[i].Value.substr(2, 1) == "2" && !Row25)
			Add = false;
		
		if (Add) {
			var option = document.createElement("option");
			option.value = aMelodeonNumbering[i].Value;
			option.text  = aMelodeonNumbering[i].Text;
			if (option.value == SelectedValue)
				SelectionExists = true;
			Numbering.add(option); 
		}
	}
	
	//Restore original selection if possible
	if (SelectionExists)
		Numbering.value = SelectedValue;
}

function GetElementIdPrefix() {
	let ElementIdPrefix = "";
	if (isShown("opt_single"))
		ElementIdPrefix = "single_";
	else if (isShown("opt_harm"))
		ElementIdPrefix = "harm_";
	return ElementIdPrefix;
}

function GetOptNumbering() {
	let ElementIdPrefix = GetElementIdPrefix();
	let Numbering = document.getElementById(ElementIdPrefix + "numbering").value;
	return Numbering;
}

function GetOptNumFormat() {
	let NumFormat = parseInt(GetOptNumbering().substr(0, 1));
	return NumFormat;
}

function GetOptNumStart() {
	let NumStart = parseInt(GetOptNumbering().substr(1, 1));
	return NumStart;
}

function GetOptNumAlign() {
	let NumAlign = parseInt(GetOptNumbering().substr(2, 1));
	return NumAlign;
}

function GetRowMarker(RowNumber) {
	let RowMarker = document.getElementById("rowlabels").value.substr(RowNumber - 1, 1);
	if (RowMarker ==  "" || RowMarker == " ") {
		switch (RowNumber) {
			case 1:
				return "";
			case 2:
				return "'";
			case 3:
				return '"';
		}
	}
	return RowMarker;
}

function GetOptRow1Marker() {
	return GetRowMarker(1);
}

function GetOptRow2Marker() {
	return GetRowMarker(2);
}

function GetOptRow3Marker() {
	return GetRowMarker(3);
}

function GetOptTabStyle() {
	let ElementIdPrefix = GetElementIdPrefix();
	let TabStyle = parseInt(document.getElementById(ElementIdPrefix + "tabstyle").value);
	return TabStyle;
}

function GetOptChangeNoteHeads() {
	let ElementIdPrefix = GetElementIdPrefix();
	let ChangeNoteHeads = document.getElementById(ElementIdPrefix + "changenotehead").checked;
	return ChangeNoteHeads;
}

function GetPushPullMarker(PullNotPush) {
	let ElementIdPrefix = GetElementIdPrefix();
	
	let PushPullMarker = document.getElementById(ElementIdPrefix + "pushpulllabels").value.substr(PullNotPush, 1);
	if (PushPullMarker ==  "" || PushPullMarker == " ") {
		switch (PullNotPush) {
			case 0:
				return "";
			case 1:
				return "-";
		}
	}
	return PushPullMarker;
}

function GetOptPushMarker() {
	return GetPushPullMarker(0);
}

function GetOptPullMarker() {
	return GetPushPullMarker(1);
}

function VariantOptionsUpdateLabels() {
	//Get inputs
	let Instrument    = document.getElementById("instrument").value;
	let Variant       = document.getElementById("variant").value;
	let Tuning        = document.getElementById("tuning").value;
	let StartFromZero = GetOptNumStart() == 0;
	let Row1Marker    = GetOptRow1Marker();
	let Row2Marker    = GetOptRow2Marker();
	let Row3Marker    = GetOptRow3Marker();
	
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
		let ButtonIndex = ButtonNumber - (StartFromZero ? 0 : 1);
		let aNotes = ButtonArrayConvert([Tablature.push_row1[ButtonIndex], Tablature.pull_row1[ButtonIndex]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		let Text = ButtonNumber + Row1Marker + " " + Push + "/" + Pull;
		let Obj = document.getElementById("inv1_lab");
		Obj.innerText = ReplaceBetweenNonBreakingSpaces(Obj.innerText, Text);
	}
	
	//Label 0'/1' reverse
	if (isShown("inv1adiv")) {
		let ButtonNumber = GetRow2FirstInvButtonNumber(Instrument, Variant, StartFromZero);
		let ButtonIndex = ButtonNumber - (StartFromZero ? 0 : 1);
		let aNotes = ButtonArrayConvert([Tablature.push_row2[ButtonIndex], Tablature.pull_row2[ButtonIndex]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		let Text = ButtonNumber + Row2Marker + " " + Push + "/" + Pull;
		let Obj = document.getElementById("inv1a_lab");
		Obj.innerText = ReplaceBetweenNonBreakingSpaces(Obj.innerText, Text);
	}
	
	//Label 0"/1" reverse
	if (isShown("inv1bdiv")) {
		let ButtonNumber = GetRow3FirstInvButtonNumber(Instrument, Variant, StartFromZero);
		let ButtonIndex = ButtonNumber - (StartFromZero ? 0 : 1);
		let aNotes = ButtonArrayConvert([Tablature.push_row3[ButtonIndex], Tablature.pull_row3[ButtonIndex]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		let Text = ButtonNumber + Row3Marker + " " + Push + "/" + Pull;
		let Obj = document.getElementById("inv1b_lab");
		Obj.innerText = ReplaceBetweenNonBreakingSpaces(Obj.innerText, Text);
	}

	//Label 5'/6' reverse
	if (isShown("inv5adiv")) {
		let ButtonNumber = GetRow2MiddleInvButtonNumber(Instrument, Variant, StartFromZero);
		let ButtonIndex = ButtonNumber - (StartFromZero ? 0 : 1);
		let aNotes = ButtonArrayConvert([Tablature.push_row2[ButtonIndex], Tablature.pull_row2[ButtonIndex]], convOptions);
		let Push = ConvertAbcNoteToFriendlyName(aNotes[0], false);
		let Pull = ConvertAbcNoteToFriendlyName(aNotes[1], false);
		let Text = ButtonNumber + Row2Marker + " " + Push + "/" + Pull;
		let Obj = document.getElementById("inv5a_lab");
		Obj.innerText = ReplaceBetweenNonBreakingSpaces(Obj.innerText, Text);
		
		document.getElementById("inv5a_all").disabled = !document.getElementById("inv5a").checked;
		Push = ConvertAbcNoteToFriendlyName(aNotes[0], true);
		Pull = ConvertAbcNoteToFriendlyName(aNotes[1], true);
		if (document.getElementById("inv5a").checked && !document.getElementById("inv5a_all").checked) {
			let Tmp = Push;
			Push = Pull;
			Pull = Tmp;
		}
		let Text2 = Push + "/" + Pull;
		let Obj2 = document.getElementById("inv5a_all_lab");
		Obj2.innerText = ReplaceBetweenNonBreakingSpaces(Obj2.innerText, Text2);
	}
	
	//Disable checkboxes not applicable to the tablature style
	{
		let tabstyle = document.getElementById("single_tabstyle").value;
		document.getElementById("single_pushpulllabels").disabled = tabstyle == "0" || tabstyle == "2";
		document.getElementById("single_numbering"     ).disabled = tabstyle == "0";
		
		tabstyle = document.getElementById("harm_tabstyle").value;
		document.getElementById("harm_pushpulllabels").disabled = tabstyle == "0" || tabstyle == "2";
		document.getElementById("harm_numbering"     ).disabled = tabstyle == "0";
		
		tabstyle = document.getElementById("tabstyle").value;
		document.getElementById("pushpulllabels").disabled = tabstyle == "0" || tabstyle == "2";
		document.getElementById("rowlabels"     ).disabled = tabstyle == "0" || tabstyle == "3";
		document.getElementById("numbering"     ).disabled = tabstyle == "0";
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
	
	//Translate strings to set language
	for (var i = 0; i < Reeds.length; i++) {
		let Obj = Reeds.children[i];
		
		switch (document.documentElement.lang) {
			case "nl":
				Obj.textContent = Obj.textContent.replaceAll("Off (bass only)", "Uit (alleen bas)");
				break;
			case "de":
				Obj.textContent = Obj.textContent.replaceAll("Off (bass only)", "Aus (nur Bass)");
				break;
			case "fr":
				Obj.textContent = Obj.textContent.replaceAll("Off (bass only)", "Désactivé (basse uniquement)");
				break;
		}
	}
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
		case "M_1": {
			if (Variant == "7")
				Tuning = "7" + Tuning;
			
			abcjsParams.tablature = [{
				instrument: 'diatonic',
				label     : '',
				tuning    : [Tuning],
				tabstyle  : GetOptTabStyle(),
				numformat : GetOptNumFormat(),
				PullMarker: GetOptPullMarker(),
				PushMarker: GetOptPushMarker(),
			}];
			break;
		}
		case "M_2":
		case "M_2S":
		case "M_25":
		case "M_CLUB":
		case "M_3":
		case "M_35": {
			//Split tuning
			let TuningArray = Tuning.split("/");
			
			//Instrument specific readouts
			if (Instrument == "M_2" || Instrument == "M_2S") {
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
				
				//Alternative basses
				if (Variant.includes("$")) {
					TuningArray[0] += "$";
					TuningArray[1] += "$";
				}
				if (Variant.includes("%")) {
					TuningArray[0] += "%";
					TuningArray[1] += "%";
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
				else if (Variant == "21+5_young")
					TuningArray[2] = "26young";
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
			else if (Instrument == "M_35") {
				if (Variant.length)
					TuningArray[2] = Variant;
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
			let showall              = false;
			let showall_ignorechords = false;
			if (document.getElementById("tabmode").value == "1") {
				showall = true;
			}
			else if (document.getElementById("tabmode").value == "2") {
				showall              = true;
				showall_ignorechords = true;
			}
		
			abcjsParams.tablature = [{
				instrument          : 'diatonic',
				label               : '',
				tuning              : TuningArray,
				tabstyle            : GetOptTabStyle(),
				numformat           : GetOptNumFormat(),
				numalign            : GetOptNumAlign(),
				numstart            : GetOptNumStart(),
				changenoteheads     : GetOptChangeNoteHeads(),
				Row1Marker          : GetOptRow1Marker(),
				Row2Marker          : GetOptRow2Marker(),
				Row3Marker          : GetOptRow3Marker(),
				PullMarker          : GetOptPullMarker(),
				PushMarker          : GetOptPushMarker(),
				showall             : showall,
				showall_ignorechords: showall_ignorechords
			}];
			break;
		}
		case "H_1": {
			//Tablature options
			abcjsParams.tablature = [{
				instrument     : 'diatonic',
				label          : '',
				tuning         : Array(Tuning + "~"), //Add ~ to indicate harmonica
				tabstyle       : GetOptTabStyle(),
				numformat      : GetOptNumFormat(),
				changenoteheads: GetOptChangeNoteHeads(),
				PullMarker     : GetOptPullMarker(),
				PushMarker     : GetOptPushMarker(),
			}];
			break;
		}
		default:
			abcjsParams.tablature = [];
	}
	
	//Set tablature for multiple voices
	if (abcjsParams.tablature.length > 0)
		abcjsParams.tablature = [abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0], abcjsParams.tablature[0]]
	
	return abcjsParams;
}

function SetLoop(isLooping) {
	g_AbcJs.synth.synthControl.isLooping = isLooping;
	g_AbcJs.synth.synthControl.control.pushLoop(isLooping);
	document.getElementById("repeat").value = isLooping;
}

function ToggleLoop() {
	let isLooping = g_AbcJs.synth.synthControl.isLooping
	isLooping = !isLooping;
	SetLoop(isLooping);
	SettingsStore();
}

function OnInstrumentChange() {
	RenderAbc();
	SettingsStore();
}

function OnPlaybackChange() {
	RenderAbc(true);
	SettingsStore();
}

let g_AbcJs = null;
let g_AbcPrependLength = 0;
let g_AbcPrependLines = 0;

function RenderAbc(ClearSoundsCache) {
	//Do things with the old editor
	let isLooping = false;
	if (g_AbcJs) {
		//Get repeat state
		isLooping = g_AbcJs.synth.synthControl.isLooping;
		
		//Stop playback
		try {
			g_AbcJs.synth.synthControl.pause();
		}
		catch(err) {
		}
	}
	else {
		//Get stored repeat state from hidden element
		isLooping = document.getElementById("repeat").value == "true";
	}
	
	//Get parameters from the input controls
	let abcjsParams = GetAbcjsParamsFromControls();
	
	//Get sound parameters from user controls
	let MidiProgram = document.getElementById("reeds").value;   //Custom mido instrument number
	g_Cents         = document.getElementById("cents").value;   //Tremolo in cents detuning
	g_FadeIn        = document.getElementById("fade").value;    //Milliseconds fade in
	let FadeOut     = g_FadeIn;                                 //Milliseconds fade out
	let ChordVol    = document.getElementById("bassvol").value; //Volume of base/chords
	
	//Set special config for editor
	abcjsParams.paddingbottom = 30;
	abcjsParams.clickListener = clickListener;
	let Params = {
		canvas_id  : "paper",
		abcjsParams: abcjsParams,
		synth      : {
			el: "#audio",
			cursorControl: cursorControl,
			options: {
				displayLoop    : true,
				displayRestart : true,
				displayPlay    : true,
				displayProgress: true,
				displayWarp    : false,
				program        : MidiProgram,
				midiTranspose  : abcjsParams.visualTranspose,
				fadeLength     : FadeOut
			}
		}
	};
	
	//Remove old sound font
	if (ClearSoundsCache)
		ABCJS.synth.CreateSynth(true);

	//Based on the playback options, set text to prepend to the ABC
	//Last command counts, so if user want to set a MIDI command himself that is still possible
	let Prepend = "";
	{
		Prepend += "%%MIDI bassprog 139\n";
		Prepend += "%%MIDI chordprog 139\n";
		Prepend += "%%MIDI bassvol "  + ChordVol +"\n";
		Prepend += "%%MIDI chordvol " + ChordVol +"\n";
		g_AbcPrependLength = Prepend.length;
		g_AbcPrependLines  = 4;
	}
	
	//Set the ABC in the hidden text control
	let ABC = AbcEditorGetText();
	var ABChidden = document.getElementById("abc");
	ABChidden.value = Prepend + ABC;
	
	//Create the editor
	g_AbcJs = new ABCJS.Editor("abc", Params);

	//Add warnings with line numbers corrected
	document.getElementById("warnings").innerHTML = "";
	if (g_AbcJs.warnings) {
		for (let i = 0; i < g_AbcJs.warnings.length; ++i) {
			let Warning = g_AbcJs.warnings[i];
			let From = -1;
			let To   = -1;
			for (let i = 0; i < Warning.length; ++i) {
				if (Warning[i] == ":") {
					if (From < 0)
						From = i;
					else {
						To = i;
						break;
					}
				}
			}
			
			if (From >= 0 && To >= 0) {
				let strLineNumber = Warning.substr(From + 1, To - From - 1);
				let intLineNumber = parseInt(strLineNumber) - g_AbcPrependLines;
				
				Warning = Warning.substr(0, From+1) + intLineNumber + Warning.substr(To);
			}
			
			if (i != 0)
				document.getElementById("warnings").innerHTML += "<br>";
			document.getElementById("warnings").innerHTML += Warning;
		}
	}
	
	//Restore repeat state and set handler
	SetLoop(isLooping);
	g_AbcJs.synth.synthControl.control.options.loopHandler = ToggleLoop;
	
	VariantOptionsUpdateLabels();
	OnScrollResize();
	
	//Update page title, the title in the ABC tune might have changed
	UpdatePageTitle();
}

function DownloadWav() {
	g_AbcJs.synth.synthControl.runWhenReady(DownloadWav2, undefined);
}

function DownloadWav2() {
	g_AbcJs.synth.synthControl.download(document.title + ".wav");
}

/// Called after loading the page
function PageInit() {
	//Get parameters from the URL
	{
		//Parse page URL
		let Url = window.location.href;
		let objUrl = new URL(Url);
		
		//Revert settings to default
		let parDefault = objUrl.searchParams.get("default");
		if (parDefault || parDefault == "")
			window.localStorage.clear();
	}

	//Detect dark mode
	let DarkMode = false;
	{
		const MediaDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		if (MediaDark && MediaDark.matches)
			DarkMode = true;
	}
	
	//Create the codemirror ABC editor in dark or light mode
	let EditorDiv = document.getElementById("abceditor");
	AbcEditorCreate(EditorDiv, DarkMode, OnAbcEditorUpdate, OnAbcEditorKeyDown);
	
	//Get examples from hidden element on the html page
	ExampleInit();
	
	//Get the available tablature button number options (not all options will be shown for every layout)
	CopyMelodeonNumbering();
	
	//Load instruments, layouts and tunings
	AddInstruments();
	
	//Load playback voices
	AddReeds();
	
	//Load an example for first time visitors (page title will not be updated to the name of the example)
	ExampleLoadIntern(3);
	
	//Load settings and abc tune from last visit
	SettingsLoad();
	
	//All changes made will be stored from now on
	SettingsStore(true, true);
	
	LinkInit();
}

/// Update page title if enabled
function UpdatePageTitle(Enabled) {
	//On first call, get the original html page title
	if (typeof UpdatePageTitle.OriginalTitle == 'undefined')
		UpdatePageTitle.OriginalTitle = document.title;
	
	//Change update title enabled, quit if not enabled
	if (typeof Enabled != 'undefined')
		UpdatePageTitle.Enabled = Enabled;
	if (typeof UpdatePageTitle.Enabled == 'undefined')
		UpdatePageTitle.Enabled = false;
	if (!UpdatePageTitle.Enabled)
		return;
	
	//Get title from the ABC tune, use original title if there is none
	let Title = AbcGetTitle();
	if (Title != "")
		Title += " - Diatotab";
	else
		Title = UpdatePageTitle.OriginalTitle;
	document.title = Title;
}

/// All element names with user settings that will be saved
const g_aSettingsElements = new Array("abc_editable", "instrument", "variant", "tuning", "inv1", "inv1a", "inv1b", "inv5a", "inv5a_all", "tabstyle", "pushpulllabels", "numbering", "rowlabels", "tabmode", "changenotehead", "single_tabstyle", "single_pushpulllabels", "single_numbering", "harm_tabstyle", "harm_pushpulllabels", "harm_numbering", "harm_notenames", "harm_changenotehead", "reeds", "cents", "bassvol", "fade", "repeat");

/// Load settings from local storage
function SettingsLoad() {
	//Load all stored form controls
	for (let i = 0; i < g_aSettingsElements.length; ++i) {
		let ID = g_aSettingsElements[i];
		
		//Get value from storage
		let Value = window.localStorage.getItem(ID);
		
		//If value set, otherwise keep default
		if (Value !== null) {
			//If at least one control was stored, the update title functionality is enabled
			UpdatePageTitle(true);
			
			//If special value for abc editor
			if (ID == "abc_editable") {
				//Set the ABC text
				AbcEditorSetText(Value);
			}
			else {
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
					if (ID == "instrument")
						AddVariantsTunings();
					else if (ID == "variant")
						ShowHideVariantOptions();
				}
			}
		}
	}
}

/// Save settings to local storage if enabled
function SettingsStore(Enabled, NoTitleUpdate) {
	//Change store enabled, quit if not enabled
	if (typeof Enabled != 'undefined')
		SettingsStore.Enabled = Enabled;
	if (typeof SettingsStore.Enabled == 'undefined')
		SettingsStore.Enabled = false;
	if (!SettingsStore.Enabled)
		return;
	
	//User changed something show update title is enabled
	if (!NoTitleUpdate)
		UpdatePageTitle(true);
	
	//Store all required form controls
	for (let i = 0; i < g_aSettingsElements.length; ++i) {
		let ID = g_aSettingsElements[i];
		let Value;
		
		//If special value for abc editor
		if (ID == "abc_editable") {
			//Get the ABC text
			Value = AbcEditorGetText();
		}
		else {
			//Get value from the control
			let Control = document.getElementById(ID);
			if (Control) {
				if (Control.type == "checkbox")
					Value = Control.checked;
				else if (typeof Control.value !== 'undefined')
					Value = Control.value;
				else
					Value = Control.innerText;
			}
		}
		
		//Store on client
		window.localStorage.setItem(ID, Value);
	}
}

function LinkInit() {
	setTimeout(Link(false), 500);
}

function Link(Set) {
	if (typeof Link.Enabled == 'undefined')
		Link.Enabled = false;
	
	let LinkElement = document.getElementById("link");
	if (Set) {
		if (!Link.Enabled)
			return;
		
		let Input = new Array();
		Input.push("N1cHBvcnRAZGl");
		Input.push("bWFpbHRvOn");
		Input.push("hdG90YWIuY29t");
		LinkElement.href = atob(Input[1] + Input[0] + Input[2]);
	}
	else {
		Link.Enabled = true;
		LinkElement.href = "#";
	}
}

//Variables for restoring scroll position after print (is changed due to show/hide of divs by css during print)
let g_ScrollRestore = false;
let g_ScrollX;
let g_ScrollY;

///Print function used by click on "Print" button
function Print() {
	//Render the print here and not in beforeprint handler to make Firefox handle the print as a user invoked print
	//This ensures print to PDF has page title as default filename
	OnBeforePrint();
	
	//Remove beforeprint handler, the print is already rendered
	window.removeEventListener("beforeprint", OnBeforePrint);
	
	//Show print dialog
	window.print();
	
	//Re-add the beforeprint handler, this ensure the print is rendered when CTRL+P is used
	window.addEventListener("beforeprint", OnBeforePrint);
}

//Add beforeprint handler to render the print on CTRL+P
window.addEventListener("beforeprint", OnBeforePrint);
function OnBeforePrint() {
	g_ScrollX = window.pageXOffset;
	g_ScrollY = window.pageYOffset;
	
	//Get instrument parameters and the ABC input
	let abcjsParams = GetAbcjsParamsFromControls();
	let ABC         = AbcEditorGetText();
	
	//Set special print options
	abcjsParams.selectionColor = "#000000"; //Prevent selected dot to be red
	abcjsParams.oneSvgPerLine  = true;      //For page break handling
	
	//Render the print on screen
	ABCJS.renderAbc("paper", ABC, abcjsParams);
	let RenderDiv = document.getElementById("paper");
	
	//Copy in to the print div
	let PrintDiv = document.getElementById("print_paper");
	PrintDiv.innerHTML = RenderDiv.innerHTML;
	
	//Restore normal rendering
	RenderAbc();
}

//Add after print handler so we know when to restore scroll position
window.addEventListener("afterprint", OnAfterPrint);
function OnAfterPrint() {
	g_ScrollRestore = true;
}

window.addEventListener("scroll", OnScrollResize);
window.addEventListener("resize", OnScrollResize);
function OnScrollResize() {
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
	
	//Restore scroll position after print
	if (g_ScrollRestore) {
		window.scrollTo(g_ScrollX, g_ScrollY);
		g_ScrollRestore = false;
	}
}

/// Called when the ABC editor text or seleciton is changed
function OnAbcEditorUpdate(update) {
	if (update.docChanged) {
		RenderAbc();
		SettingsStore();
	}
	if (update.selectionSet)
		AbcSelect();
}

/// Called when key is pressed with ABC editor having the focus
function OnAbcEditorKeyDown(event) {
	//Note typing, determine push/pull from CTRL status, define button number for qwerty layout, but should work for any layout
	if (isShown("instrkey_div") && document.getElementById("instrkey").checked) {
		//Overrule if user pressed control key
		if (event.ctrlKey) {
			if (event.key.length == 1)
				document.execCommand('insertText', false, event.key);
			else if (event.key == "Backspace")
				document.execCommand('delete');
			event.preventDefault();
			return false;
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
			var Tablature = GetValidTune().tablatures[0].instance.semantics;
			
			//Lookup the button row notes array
			let aNotes;
			switch (Row) {
				case 1:
					if (PushNotPull) 
						aNotes = Tablature.push_row1;
					else
						aNotes = Tablature.pull_row1;
					break;
				case 2:
					if (PushNotPull) 
						aNotes = Tablature.push_row2;
					else
						aNotes = Tablature.pull_row2;
					break;
				case 3:
					if (PushNotPull) 
						aNotes = Tablature.push_row3;
					else
						aNotes = Tablature.pull_row3;
					break;
			}
			
			//Convert button number to array index
			Button--;
			
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
				
				//Get ABC text before the cursor position
				let AnalyzeABC = AbcEditorGetText().substr(0, AbcEditorGetSelection().From);
				
				//Detect the last key set before the position we are typing
				var Key = "C";
				var aAbcLines = AnalyzeABC.replace(" ", "").split("\n");
				for (let i = 0; i < aAbcLines.length; ++i) {
					if (aAbcLines[i].substr(0, 2) == "K:")
						Key = aAbcLines[i].substr(2);
				}
				
				//Prefer to write it as an in key note
				let Note     = "";
				let KeyIndex = FindCircleKeyIndex(Key);
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

function GetValidTune() {
	//If there is a valid tune in the g_AbcJs, use it, otherwise create a temp one to obtain instrument information
	var aTunes;
	if (g_AbcJs && g_AbcJs.tunes.length > 0 && g_AbcJs.tunes[0].tablatures[0].instance) {
		aTunes = g_AbcJs.tunes;
	}
	else {
		//Get instrument from controls
		let abcjsParams = GetAbcjsParamsFromControls();
		aTunes = ABCJS.renderAbc("*", "X:1\nK:C\nA\n", abcjsParams);
	}
	
	return aTunes[0];
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

function AbcSelect() {
	//Get the selection from the codemirror editor
	let Selection = AbcEditorGetSelection();
	let From      = Selection.From;
	let To        = Selection.To;
	
	//Compensate for prepended text that does not show in the editor
	From += g_AbcPrependLength;
	To   += g_AbcPrependLength;
	
	//Highlight the selection in the ABC render
	if (g_AbcJs.tunes.length > 0 && g_AbcJs.tunes[0].engraver)
		g_AbcJs.tunes[0].engraver.rangeHighlight(From, To);
}

function clickListener(abcelem, tuneNumber, classes, analysis, drag, mouseEvent) {
	//Character positions as reported by abcjs
	let startChar = abcelem.startChar;
	let endChar   = abcelem.endChar;
	
	//Correct for length of prepended midi commands
	startChar -= g_AbcPrependLength;
	endChar   -= g_AbcPrependLength;
	
	//Select in the codemirror editor
	AbcEditorSetSelection(startChar, endChar);
	
	return true;
}

/// Called when user clicks the "Transpose ABC" button
function AbcTranspose() {
	//Get the transpose amount that is currently only visual
	let Transpose = document.getElementById("transpose");
	let TransposeSteps = Transpose.value;
	if (TransposeSteps == 0)
		return;
	
	//Set transpose control to 0
	Transpose.value = 0;
	
	//Transpose the abc text
	let ABC = AbcEditorGetText();
	var renderObj = ABCJS.renderAbc("*", ABC);
	ABC = ABCJS.strTranspose(ABC, renderObj, TransposeSteps);
	AbcEditorSetText(ABC);
}

/// Ask user where the open ABC file from, open it if not canceled
function AbcOpenFileBrowser() {
	let FileInput = document.getElementById("OpenFile");
	FileInput.click(); //Calls AbcOpenFile() through event handler of hidden "OpenFile" element
}

/// Loads ABC file into editor if user chose a file
function AbcOpenFile() {
	//Get information about the opened file
	let FileInput = document.getElementById("OpenFile");
	const file = FileInput.files[0];
	
	//Read the file and put it in the editor
	var Reader = new FileReader();
	Reader.onload = function(event) {
		AbcEditorSetText(event.target.result);
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
	let ABC = AbcEditorGetText();
	
	//Ask user where to save
	var ABCfile = new File([ABC], FileName, {type: "text/plain;charset=utf-8"});
	saveAs(ABCfile);
}
