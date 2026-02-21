/// Show/hide language choice dropdown
function ClickLanguage() {
	document.getElementById("Language").classList.toggle("show");
}

/// Close the language dropdown menu when the user clicks outside of it
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

/// Called when one of the instrument options is changed
function OnInstrumentChange() {
	RenderAbc();
	SettingsStore();
}

/// Called when one of the playback options is changed
function OnPlaybackChange() {
	RenderAbc(true);
	SettingsStore();
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

let g_AbcJs = null;
let g_AbcPrependLength = 0;
let g_AbcPrependLines = 0;

/// Render music score from the ABC input
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
	abcjsParams.clickListener = AbcJsClickListener;
	let Params = {
		canvas_id  : "paper",
		abcjsParams: abcjsParams,
		synth      : {
			el: "#audio",
			cursorControl: g_AbcJsCursorControl,
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
			
			//If the warning is about a music line
			const ExpectedStart = "Music Line:";
			if (Warning.startsWith(ExpectedStart)) {
				//Search for the : after the line number
				const LineNumberLength = Warning.substr(ExpectedStart.length).indexOf(":");
				
				//Correct the line number
				if (LineNumberLength >= 1) {
					let strLineNumber = Warning.substr(ExpectedStart.length, LineNumberLength);
					let intLineNumber = parseInt(strLineNumber) - g_AbcPrependLines;
					Warning = ExpectedStart + intLineNumber + Warning.substr(ExpectedStart.length + LineNumberLength);
				}
			}
			
			//Add one warning per line
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

/// Used for selecting text in the editor when a note is clicked on the rendered score
function AbcJsClickListener(abcelem, tuneNumber, classes, analysis, drag, mouseEvent) {
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

/// Used for showing cursor during playback
var AbcJsCursorControl = function() {
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
var g_AbcJsCursorControl = new AbcJsCursorControl();

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
	if (!g_AbcJs)
		return;
	
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

function DownloadWav() {
	if (!g_AbcJs)
		return;
	g_AbcJs.synth.synthControl.runWhenReady(DownloadWav2, undefined);
}

function DownloadWav2() {
	if (!g_AbcJs)
		return;
	g_AbcJs.synth.synthControl.download(document.title + ".wav");
}

function SetLoop(isLooping) {
	if (!g_AbcJs)
		return;
	g_AbcJs.synth.synthControl.isLooping = isLooping;
	g_AbcJs.synth.synthControl.control.pushLoop(isLooping);
	document.getElementById("repeat").value = isLooping;
}

function ToggleLoop() {
	if (!g_AbcJs)
		return;
	let isLooping = g_AbcJs.synth.synthControl.isLooping
	isLooping = !isLooping;
	SetLoop(isLooping);
	SettingsStore();
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
