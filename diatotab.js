function removeOptions(selectElement) {
	var i, L = selectElement.options.length - 1;
	for (i = L; i >= 0; i--) {
		selectElement.remove(i);
	}
}

function showElement(id, show) {
	if (show)
		document.getElementById(id).style.visibility = "visible";
	else
		document.getElementById(id).style.visibility = "hidden";
}

function AddInstruments() {
	let Instruments = document.getElementById("instrument");
	removeOptions(Instruments);
	
	var Instrument = document.createElement("option");
	Instrument.text  = "1 row, 10 button, Diatonic Accordion / Melodeon";
	Instrument.value = "M_1_10";
	Instruments.add(Instrument);
	
	var Instrument = document.createElement("option");
	Instrument.text     = "2 row, 21 button, Diatonic Accordion / Melodeon";
	Instrument.value    = "M_2_21";
	Instrument.selected = 'selected';
	Instruments.add(Instrument);
	
/*	var Instrument = document.createElement("option");
	Instrument.text  = "2.5 row, 21+5 button Saltarelle, Diatonic Accordion / Melodeon";
	Instrument.value = "M_2_21+5s";
	Instruments.add(Instrument);
	
	var Instrument = document.createElement("option");
	Instrument.text  = "2.5 row, 21+5 button Castagnari, Diatonic Accordion / Melodeon";
	Instrument.value = "M_2_21+5c";
	Instruments.add(Instrument);*/
	
	var Instrument = document.createElement("option");
	Instrument.text  = "10 hole, Diatonic Harmonica / French Harp";
	Instrument.value = "H_10";
	Instruments.add(Instrument);
	
/*	var Instrument = document.createElement("option");
	Instrument.text  = "TEST Guitar";
	Instrument.value = "G_TEST";
	Instruments.add(Instrument);
*/
	
	AddTunings();
}

function AddTunings() {
	let Tunings = document.getElementById("tuning");
	removeOptions(Tunings);
	
	let show_options = false;
	let Instrument = document.getElementById("instrument").value;
	switch (Instrument) {
		case "M_1_10":
			var Tuning = document.createElement("option");
			Tuning.text = "Bb";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "C";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "D";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text     = "G";
			Tuning.selected = 'selected';
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "A";
			Tunings.add(Tuning);
			break;
		case "M_2_21":
		case "M_2_21+5s":
		case "M_2_21+5c":
			show_options = true;
			var Tuning = document.createElement("option");
			Tuning.text     = "G/C";
			Tuning.selected = 'selected';
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "A/D";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "Bb/Eb";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "C/F";
			Tunings.add(Tuning);
			
			var Tuning = document.createElement("option");
			Tuning.text = "D/G";
			Tunings.add(Tuning);
			break;
		case "H_10":
			var Tuning = document.createElement("option");
			Tuning.text     = "C";
			Tuning.selected = 'selected';
			Tunings.add(Tuning);
			break;
		default:
			var Tuning = document.createElement("option");
			Tuning.text     = "TEST";
			Tuning.selected = 'selected';
			Tunings.add(Tuning);
			break;
	}
	
	showElement("chin"     , show_options);
	showElement("chin_lab" , show_options);
	showElement("inv1"     , show_options);
	showElement("inv1_lab" , show_options);
	showElement("inv1a"    , show_options);
	showElement("inv1a_lab", show_options);
	showElement("inv5a"    , show_options);
	showElement("inv5a_lab", show_options);
	
	CreateEditor();
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
		
		//No margins, scale to container
		responsive   : "resize",
		paddingtop   : 0,
		paddingbottom: 30,
		paddingleft  : 0,
		paddingright : 0,
	};
	
	//Choose instrument/tuning
	let Instrument = document.getElementById("instrument").value;
	let Tuning     = document.getElementById("tuning").value;
	switch (Instrument) {
		case "M_1_10":
			abcjsParams.tablature = [{
				instrument: 'melodeon',
				label: '',
				tuning: [Tuning],
			}];
			break;
		case "M_2_21":
		case "M_2_21+5s":
		case "M_2_21+5c":
			//Get chin accidentals
			let chinacc = false;
			if (document.getElementById("chin").checked)
				chinacc = true;
			
			//Get row1 inversions
			let Row1_inv = "";
			if (document.getElementById("inv1").checked)
				Row1_inv += "1";
			
			//Get row2 inversions
			let Row2_inv = "";
			if (document.getElementById("inv1a").checked)
				Row2_inv += "1";
			if (document.getElementById("inv5a").checked)
				Row2_inv += "5";
			
			//Split tuning and add inversions
			let TuningArray = Tuning.split("/");
			TuningArray[0] += Row1_inv;
			TuningArray[1] += Row2_inv;
			
			//Set row3 system
			if (Instrument == "M_2_21+5s")
				TuningArray[2] = "saltarelle";
			else if (Instrument == "M_2_21+5c")
				TuningArray[2] = "castagnari";
			
			abcjsParams.tablature = [{
				instrument: 'melodeon',
				label: '',
				tuning: TuningArray,
				chinacc: chinacc,
			}];
			break;
		case "H_10":
			abcjsParams.tablature = [{
				instrument: 'harmonica',
				label: '',
				tuning: [Tuning],
			}];
			break;
		case "G_TEST":
			abcjsParams.tablature = [{
				instrument: 'guitar',
				label: '',
				tuning: ['D,', 'A,', 'D', 'G', 'A', 'd'],
				capo: 0
			}];
			break;
	}
	
	return abcjsParams;
}

var Editor = null;

function CreateEditor(NoUpdate) {
	if (!NoUpdate)
		AbcInput();
		
	
	//Stop playback
	if (Editor)
		Editor.synth.synthControl.pause();
	
	//Get parameters from the input controls
	let abcjsParams = GetAbcjsParamsFromControls();
	
	abcjsParams.clickListener =  clickListener;
	
	//Set special config for editor
	let Params = {
		canvas_id: "paper",
		warnings_id: "warnings",
		abcjsParams: abcjsParams,
		synth: {
			el: "#audio",
			cursorControl: cursorControl,
			options: {
				displayLoop: false,
				displayRestart: false,
				displayPlay: true,
				displayProgress: true,
				displayWarp: false,
				midiTranspose: abcjsParams.visualTranspose
			}
		}
	};
	
	//Create the editor
	Editor = new ABCJS.Editor("abc", Params);
}

function CreatePrint() {
	//Get configuration and ABC from URL
	let UrlParams   = new URL(document.location).searchParams;
	let abcjsParams = JSON.parse(decodeURI(UrlParams.get("params")));
	let Abc         = decodeURI(UrlParams.get("abc"));
	
	//Render the print
	ABCJS.renderAbc("paper", Abc, abcjsParams);
	
	//Update document title
	document.title = document.title.replace("Sheet Music for \"", "Diatotab ");
	if (document.title[document.title.length - 1] == "\"")
		document.title = document.title.substring(0, document.title.length - 1);
	
	//Show print preview dialog
	window.print();
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

function setPrintLink() {
	//Get instrument parameters and the ABC input
	let abcjsParams = GetAbcjsParamsFromControls();
	let Abc         = document.getElementById("abc").value;
	
	//Encode in print link
	let Print = document.getElementById("print");
	Print.href = "print.html?params=" + encodeURI(JSON.stringify(abcjsParams)) + "&abc=" + encodeURIComponent(Abc);
}

function AbcKeyDown() {
	//Selection might have been changed
	AbcSelect();

	//Enter must create <br>, not a <div>
	if (event.key === 'Enter') {
		document.execCommand('insertLineBreak')
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
		else if (sel.focusNode.parentNode == event.target) {
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
		//Info line
		else if (Line.trim()[0].match(/[A-Za-z+]/) && Line.trim()[1] == ":") {
			let Sep = Line.indexOf(":");
			ABChtml += HtmlEscape(Line.substr(0, Sep+1)) + "<span style='color:Teal'>" + HtmlEscape(Line.substr(Sep+1)) + "</span>";
		}
		//Music line
		else {
			let InRemark  = false;
			let InComment = false;
			let InChord   = false;
			let InDec     = false;
			let NoteColor = false;
			let inAcc     = false;
			let inNote    = false;
			for (let j = 0; j < Line.length; ++j) {
				let HtmlChar = HtmlEscape(Line[j]);
				
				//Detect chord begin/end
				if (!InComment && !InRemark && !InDec && Line[j] == "\"") {
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
				//Detect note begin
				else if (!InComment && !InRemark && !InChord && !InDec && Line[j].match(/[a-gA-GxXzZ_^=~.vu]/)) {
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
				//Detect note end
				else if (!InComment && !InRemark && !InChord && !InDec && Line[j].match(/[\]\[:|\-{}() ]/)) {
					//End previous note color
					if (inNote) {
						ABChtml += "</span>";
					}
					inNote = false;
					
					ABChtml += HtmlChar;
				}
				else
					ABChtml += HtmlChar;
			}
			if (InComment || InRemark || InChord || inNote)
				ABChtml += "</span>";
		}
		ABChtml += "<br>";
	}
	document.getElementById("abc_colors").innerHTML = ABChtml;
	
	//Copy to ABCjs hidden input
	var Output = document.getElementById("abc");
	ABC = ABC.replace("\xa0", " ");
	Output.value = ABC;
	CreateEditor(true);
}

function AbcSelect() {
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
	//Get the editor without highlighting
	let ABC_Editor = document.getElementById("abc_editable");
	
	//Correct for differences in number of newline characters
	let startCorrect = 0;
	let endCorrect   = 0;
	for (let i = 0; i < ABC_Editor.innerText.length; ++i) {
		if (ABC_Editor.innerText[i] == "\n") {
			if (i <= abcelem.startChar)
				startCorrect++;
			if (i <= abcelem.endChar)
				endCorrect++;
			if (i > abcelem.startChar && i > abcelem.endChar)
				break;
		}
	}
	
	//Select the clicked note
	setSelectionRange(ABC_Editor, abcelem.startChar - startCorrect, abcelem.endChar - endCorrect);
}

function ExampleShow() {
	document.getElementById("example").style.display = "flex";
	return false;
}

function ExampleClose() {
	document.getElementById("example").style.display = "none";
	return false;
}

function ExampleLoad(Index) {
	let aLines = [];
	
	let Instruments = document.getElementById("instrument");
	let Tunings     = document.getElementById("tuning");
	
	//Lookup the example
	switch (Index) {
		case 0:
			//Set header
			aLines.push('T: Layout ' + Instruments[Instruments.selectedIndex].text + ' ' + Tunings[Tunings.selectedIndex].text);
			aLines.push('L: 1/4');
			
			//Instrument specific ABC
			if (Instruments.value.substr(0, 3) == "M_1") {
				//Add G row
				aLines.push('K: G');
				aLines.push('"B>"B,,|"D<"D,| "D>"D,|"F#<"F,| "G>"G,|"A<"A,| "B>"B,|"C<"C| "D>"D|"E<"E| "F#<"F|"G>"G| "A<"A|"B>"B| "C<"c|"D>"d| "E<"e|"F#<"f| "G>"g|"B>"b|');
			}
			else if (Instruments.value.substr(0, 3) == "M_2") {
				//Add C row
				aLines.push('K: C');
				aLines.push('|');
				
				//Add G row
				aLines.push('K: G');
				aLines.push('|');
				
				//Set button 1 and 1'
				if (document.getElementById("chin").checked) {
					aLines[3] += '"G#:"^G|"Bb:"_B|';  //C row button 1
					aLines[5] += '"C#."^C|"Eb."_E|'; //G row button 1
				}
				else {
					aLines[3] += '"E:"E,|"G:"G,|';  //C row button 1
					aLines[5] += '"B."B,,|"D."D,|'; //G row button 1
				}
				
				//C row        2'               3'             4'             5'            6'            7'             8'
				aLines[3] += ' "G>:"G,|"B<:"B,| "C>:"C|"D<:"D| "E>:"E|"F<:"F| "G:"G|"A>:"A| "B:"B|"C>:"c| "D<:"d|"E>:"e| "F<:"f|"G>:"g| "A<:"a|"B<:"b| "C>:"c\'|"E>:"e\'|';
				
				//G row        2                 3                4               5               6               7              8
				aLines[5] += ' "D>."D,|"F#<."F,| "G>."G,|"A<."A,| "B>."B,|"C<."C| "D>." D|"E<."E| "F#>."F|"G>."G| "A<."A|"B>."B| "C<."c|"D>."d| "E<."e|"F#<."f| "G>."g|"A<."a| "B>."b|"D>."d\'|';
			}
			else if (Instruments.value.substr(0, 1) == "H") {
				//Add C row
				aLines.push('K: C');
				//           1                  2                      3                             4                 5          
				aLines.push('|"C"C|"Db"_D|"D"D| "E"E|"F"F|"Gb"_G|"G"G| "G"G|"Ab"_A|"A"A|"Bb"_B|"B"B| "C"c|"Db"_d|"D"d| "E"e|"F"f|');
				//           6                 7            8                       9                       10
				aLines.push('"G"g|"A"a|"Bb"_b| "B"b|"C"c\'| "D"d\'|"Eb"_e\'|"E"e\'| "F"f\'|"Gb"_g\'|"G"g\'| "A"a\'|"Bb"_b\'|"B"b\'|');
			}
			break;
		case 1:
			aLines.push('T: Andro');
			aLines.push('C: Trad. (Bretagne)');
			aLines.push('R: Andro');
			aLines.push('Q: 1/4=160');
			aLines.push('M: 4/4');
			aLines.push('L: 1/4');
			aLines.push('K: C');
			aLines.push('|:"Am"e e/2f/2 e3/2 d/2|c B AA|"G>"ddBG |"F<"A/2B/2 c/2d/2 "Em"e2|');
			aLines.push('"Am"e e/2f/2 e3/2 d/2  |cB AA |"G>"ddBG |"F<"A/2B/2 c/2B/2 "Am"A2:|');
			aLines.push('|:"C"eg"Am"A2|"C"eg"G>"B2|ddB/2A/2G|"F<"A/2B/2 c/2d/2 "Em>"e2|');
			aLines.push('"C"eg"Am"A2|"C"eg"G>"B2|ddB/2A/2G|"F<"A/2B/2 c/2B/2 "Am"A2:|');
			break;
		case 2:
			aLines.push('T: Kerfank 1870/Den Andro');
			aLines.push('S: Gonnagles Balfolksessieboekje 1');
			aLines.push('C: Trad. (Bretagne)');
			aLines.push('R: Andro');
			aLines.push('Q: 1/4=160');
			aLines.push('M: 4/4');
			aLines.push('L: 1/4');
			aLines.push('K: C');
			aLines.push('|:"Am"Aeed/e/|"F<"fed/c/ B/c/|"G>"dB"C"ed/c/|B/c/ A/B/"Em"cB|');
			aLines.push('|"Am"Aeed/e/|"F<"fed/c/ B/c/|"G>"dB"C"ed/c/|"Em"B/A/ B/c/"Am"A2:|');
			aLines.push('|:"Am"AA"G<"Bc/B/|"F<"AA"Em"BB/c/|"G>"dB"C"ed/c/|"F"B/c/ A/B/"Em"cB|');
			aLines.push('|"Am"AA"G<"Bc/B/|"F<"AA"Em"BB/c/|"G>"dB"C"ed/c/|"Em"B/A/ B/c/"Am"A2:|');
			break;
		case 3:
			aLines.push('T: Mon Père Avait un Gars Lonla');
			aLines.push('S: Gonnagles Balfolksessieboekje 1');
			aLines.push('C: Trad.');
			aLines.push('R: Hanter dro');
			aLines.push('Q: 1/4=160');
			aLines.push('M: 6/4');
			aLines.push('L: 1/4');
			aLines.push('K: C');
			aLines.push('|:"Am"AB/c/BA"Dm"G/F/E|"F"AB/c/Ad"G"cB|"Am"AB/c/BA"Dm"G/F/E|"F"AB/c/"G"AG"Am"A2:|');
			aLines.push('|:"Am"AB/c/dBc/d/e|"G"cB/A/dcB2|"F"AB/c/dBc/d/e|"G"cB/A/"Em"Bc"Am"A2:|');
			break;
		case 4:
			aLines.push('T: What Shall We Do With the Drunken Sailor?');
			aLines.push('C: Trad. (England)');
			aLines.push('M: 4/4');
			aLines.push('L: 1/8');
			aLines.push('Q: 1/4=160');
			aLines.push('K: C');
			aLines.push('"Am"E2EE E2EE|"Am"E2A,2C2E2|"G"D2DD D2DD|"G"D2G,2B,2D2|');
			aLines.push('w: What shall we do with the drunk-en sail-or, what shall we do with the drunk-en sail-or');
			aLines.push('"Am"E2EE E2EE|"Am"E2F2G2A2|"Em"G2E2 "G"D2B,2|"Am"A,4A,2 z2|');
			aLines.push('w: What shall we do with the drunk-en sail-or, earl-y in the morn-ing?');
			aLines.push('"Am"E4 E3E|"Am"E2A,2C2E2|"G"D4 D3D|"G"D2G,2B,2D2|');
			aLines.push('w: Way-hay, and up she ris-es, way-hay, and up she ris-es');
			aLines.push('"Am"E4 E3E|"Am"E2F2G2A2|"Em"G2E2 "G"D2B,2|"Am"A,4A,2 z2|');
			aLines.push('w: Way-hay, and up she ris-es, earl-y in the morn-ing.');
			break;
		default:
			return;
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
	
	//Lookup the number of transpose steps
	let TransposeSteps = 0;
	if (Instruments.value.substr(0, 3) == "M_1") {
		//From G to selected
		switch (Tunings.value) {
			case "Bb":
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
	else if (Instruments.value.substr(0, 3) == "M_2") {
		//From G/C to selected
		switch (Tunings.value) {
			case "G/C":
				TransposeSteps = 0;
				break;
			case "A/D":
				TransposeSteps = 2;
				break;
			case "Bb/Eb":
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
	
	//Transpose the ABC text
	if (TransposeSteps != 0) {
		var renderObj = ABCJS.renderAbc("*", ABC.innerText);
		var newAbc = ABCJS.strTranspose(ABC.innerText, renderObj, TransposeSteps);
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
