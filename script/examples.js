let g_aExampleLines = new Array();

function ExampleInit() {
	g_aExampleLines = document.getElementById("abc").textContent.split("\n");
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
	//Load example ABC
	ExampleLoadIntern(Index);
	
	//Close the overlay
	ExampleClose();
	
	//False to prevent default event handler
	return false;
}

function FindCircleKeyIndex(Key) {
	//Find key in the circle of fifths
	for (let KeyIndex = -7; KeyIndex <= 7; ++KeyIndex) {
		if (GetCircleFifths(KeyIndex).Key == Key)
			return KeyIndex;
	}
	return 0;
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

function ConvertChordFlatSharp(ChordName, Options) {
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
	return ChordName;
}

function GetSharpFlatConverts(LowKey, HighKey) {
	let KeyIndex1 = FindCircleKeyIndex(LowKey);
	let KeyIndex2 = FindCircleKeyIndex(HighKey);
	if (KeyIndex1 > KeyIndex2) {
		let Tmp = KeyIndex2;
		KeyIndex2 = KeyIndex1;
		KeyIndex1 = Tmp;
	}
	
	let Dflat = null;
	let Eflat = null;
	let Gflat = null;
	let Aflat = null;
	let Bflat = null;
	for (let Index = KeyIndex1; Index <= KeyIndex2 + 10; ++Index) {
		let KeyIndex = Index;
		if (Index > KeyIndex2) {
			var Diff2 = Index - KeyIndex2;
			if (Diff2 % 2 == 1)
				KeyIndex = KeyIndex1 - (Diff2+1) / 2;
			else
				KeyIndex = KeyIndex2 + Diff2 / 2;
		}
		
		if (KeyIndex < 0) {
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
		else {
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
			if (Note[0] != "^" && Note[0] != "_")
				Note = "=" + Note;

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

function GetCircleFifths(KeyIndex) {
	//Ensure within 7 flats or 7 sharps range
	if (KeyIndex < -8)
		KeyIndex = KeyIndex % 12 - 12;
	if (KeyIndex < -8)
		KeyIndex += 12;
	if (KeyIndex > 12)
		KeyIndex = KeyIndex % 12;
	
	//Lookup the key and 1st note
	switch (KeyIndex) {
		case -8:
			return {
				Key  : "",
				Note : "_F",
			};
		case -7:
			return {
				Key  : "Cb",
				Note : "_C",
			};
		case -6:
			return {
				Key  : "Gb",
				Note : "_G",
			};
		case -5:
			return {
				Key  : "Db",
				Note : "_D",
			};
		case -4:
			return {
				Key  : "Ab",
				Note : "_A",
			};
		case -3:
			return {
				Key  : "Eb",
				Note : "_E",
			};
		case -2:
			return {
				Key  : "Bb",
				Note : "_B",
			};
		case -1:
			return {
				Key  : "F",
				Note : "F",
			};
		case 0:
			return {
				Key  : "C",
				Note : "C",
			};
		case 1:
			return {
				Key  : "G",
				Note : "G",
			};
		case 2:
			return {
				Key  : "D",
				Note : "D",
			};
		case 3:
			return {
				Key  : "A",
				Note : "A",
			};
		case 4:
			return {
				Key  : "E",
				Note : "E",
			};
		case 5:
			return {
				Key  : "B",
				Note : "B",
			};
		case 6:
			return {
				Key  : "F#",
				Note : "^F",
			};
		case 7:
			return {
				Key  : "C#",
				Note : "^C",
			};
		case 8:
			return {
				Key  : "",
				Note : "^G",
			};
		case 9:
			return {
				Key  : "",
				Note : "^D",
			};
		case 10:
			return {
				Key  : "",
				Note : "^A",
			};
		case 11:
			return {
				Key  : "",
				Note : "^E",
			};
		case 12:
			return {
				Key  : "",
				Note : "^B",
			};
	}
	return {
		Key  : "",
		Note : "",
	};
}

function NoteToFlat(NoteName) {
	if      (NoteName.startsWith('_C'))
		NoteName = NoteName.replaceAll('_C', '_C');
	else if (NoteName.startsWith('C'))
		NoteName = NoteName.replaceAll('C', '');
	else if (NoteName.startsWith('^C'))
		NoteName = NoteName.replaceAll('^C', '_D');
	else if (NoteName.startsWith('_D'))
		NoteName = NoteName.replaceAll('_D', '_D');
	else if (NoteName.startsWith('D'))
		NoteName = NoteName.replaceAll('D', '');
	else if (NoteName.startsWith('^D'))
		NoteName = NoteName.replaceAll('^D', '_E');
	else if (NoteName.startsWith('_E'))
		NoteName = NoteName.replaceAll('_E', '_E');
	else if (NoteName.startsWith('E'))
		NoteName = NoteName.replaceAll('E', '_F');
	else if (NoteName.startsWith('^E'))
		NoteName = NoteName.replaceAll('^E', '');
	else if (NoteName.startsWith('_F'))
		NoteName = NoteName.replaceAll('_F', '_F');
	else if (NoteName.startsWith('F'))
		NoteName = NoteName.replaceAll('F', '');
	else if (NoteName.startsWith('^F'))
		NoteName = NoteName.replaceAll('^F', '_G');
	else if (NoteName.startsWith('_G'))
		NoteName = NoteName.replaceAll('_G', '_G');
	else if (NoteName.startsWith('G'))
		NoteName = NoteName.replaceAll('G', '');
	else if (NoteName.startsWith('^G'))
		NoteName = NoteName.replaceAll('^G', '_A');
	else if (NoteName.startsWith('_A'))
		NoteName = NoteName.replaceAll('_A', '_A');
	else if (NoteName.startsWith('A'))
		NoteName = NoteName.replaceAll('A', '');
	else if (NoteName.startsWith('^A'))
		NoteName = NoteName.replaceAll('^A', '_B');
	else if (NoteName.startsWith('_B'))
		NoteName = NoteName.replaceAll('_B', '_B');
	else if (NoteName.startsWith('B'))
		NoteName = NoteName.replaceAll('B', '_C');
	else if (NoteName.startsWith('^B'))
		NoteName = NoteName.replaceAll('^B', '');
	return NoteName;
}

function NoteToNatural(NoteName) {
	if      (NoteName.startsWith('_C'))
		NoteName = NoteName.replaceAll('_C', 'B');
	else if (NoteName.startsWith('C'))
		NoteName = NoteName.replaceAll('C', 'C');
	else if (NoteName.startsWith('^C'))
		NoteName = NoteName.replaceAll('^C', '');
	else if (NoteName.startsWith('_D'))
		NoteName = NoteName.replaceAll('_D', '');
	else if (NoteName.startsWith('D'))
		NoteName = NoteName.replaceAll('D', 'D');
	else if (NoteName.startsWith('^D'))
		NoteName = NoteName.replaceAll('^D', '');
	else if (NoteName.startsWith('_E'))
		NoteName = NoteName.replaceAll('_E', '');
	else if (NoteName.startsWith('E'))
		NoteName = NoteName.replaceAll('E', 'E');
	else if (NoteName.startsWith('^E'))
		NoteName = NoteName.replaceAll('^E', 'F');
	else if (NoteName.startsWith('_F'))
		NoteName = NoteName.replaceAll('_F', 'E');
	else if (NoteName.startsWith('F'))
		NoteName = NoteName.replaceAll('F', 'F');
	else if (NoteName.startsWith('^F'))
		NoteName = NoteName.replaceAll('^F', '');
	else if (NoteName.startsWith('_G'))
		NoteName = NoteName.replaceAll('_G', '');
	else if (NoteName.startsWith('G'))
		NoteName = NoteName.replaceAll('G', 'G');
	else if (NoteName.startsWith('^G'))
		NoteName = NoteName.replaceAll('^G', '');
	else if (NoteName.startsWith('_A'))
		NoteName = NoteName.replaceAll('_A', '');
	else if (NoteName.startsWith('A'))
		NoteName = NoteName.replaceAll('A', 'A');
	else if (NoteName.startsWith('^A'))
		NoteName = NoteName.replaceAll('^A', '');
	else if (NoteName.startsWith('_B'))
		NoteName = NoteName.replaceAll('_B', '');
	else if (NoteName.startsWith('B'))
		NoteName = NoteName.replaceAll('B', 'B');
	else if (NoteName.startsWith('^B'))
		NoteName = NoteName.replaceAll('^B', 'C');
	return NoteName;
}

function NoteToSharp(NoteName) {
	if      (NoteName.startsWith('_C'))
		NoteName = NoteName.replaceAll('_C', '');
	else if (NoteName.startsWith('C'))
		NoteName = NoteName.replaceAll('C', '^B');
	else if (NoteName.startsWith('^C'))
		NoteName = NoteName.replaceAll('^C', '^C');
	else if (NoteName.startsWith('_D'))
		NoteName = NoteName.replaceAll('_D', '^C');
	else if (NoteName.startsWith('D'))
		NoteName = NoteName.replaceAll('D', '');
	else if (NoteName.startsWith('^D'))
		NoteName = NoteName.replaceAll('^D', '^D');
	else if (NoteName.startsWith('_E'))
		NoteName = NoteName.replaceAll('_E', '^D');
	else if (NoteName.startsWith('E'))
		NoteName = NoteName.replaceAll('E', '');
	else if (NoteName.startsWith('^E'))
		NoteName = NoteName.replaceAll('^E', '^E');
	else if (NoteName.startsWith('_F'))
		NoteName = NoteName.replaceAll('_F', '');
	else if (NoteName.startsWith('F'))
		NoteName = NoteName.replaceAll('F', '^E');
	else if (NoteName.startsWith('^F'))
		NoteName = NoteName.replaceAll('^F', '^F');
	else if (NoteName.startsWith('_G'))
		NoteName = NoteName.replaceAll('_G', '^F');
	else if (NoteName.startsWith('G'))
		NoteName = NoteName.replaceAll('G', '');
	else if (NoteName.startsWith('^G'))
		NoteName = NoteName.replaceAll('^G', '^G');
	else if (NoteName.startsWith('_A'))
		NoteName = NoteName.replaceAll('_A', '^G');
	else if (NoteName.startsWith('A'))
		NoteName = NoteName.replaceAll('A', '');
	else if (NoteName.startsWith('^A'))
		NoteName = NoteName.replaceAll('^A', '^A');
	else if (NoteName.startsWith('_B'))
		NoteName = NoteName.replaceAll('_B', '^A');
	else if (NoteName.startsWith('B'))
		NoteName = NoteName.replaceAll('B', '');
	else if (NoteName.startsWith('^B'))
		NoteName = NoteName.replaceAll('^B', '^B');
	return NoteName;
}

function IsInKey(CircleIndex, Note, IncludeAlternatives) {
	//Remove chord notation before the note if present
	Note = GetNote(Note);
	
	//Remove natural marker before the note if present
	if (Note.startsWith("="))
		Note = Note.substr(1);
	
	//Convert to upper case since this is how the circle of fifths defines the notes
	Note = Note.toUpperCase();
	
	//Load all allowed notations
	let NoteFlat    = "";
	let NoteNatural = "";
	let NoteSharp   = "";
	if (IncludeAlternatives) {
		NoteFlat    = NoteToFlat   (Note);
		NoteNatural = NoteToNatural(Note);
		NoteSharp   = NoteToSharp  (Note);
	}
	else {
		NoteNatural = Note;
	}
	
	//Search the key for exactly this note
	for (let k = CircleIndex - 1; k <= CircleIndex+5; ++k) {
		let CircleEntry = GetCircleFifths(k);
		
		//If a match found, this note is in key
		if (NoteFlat   .startsWith(CircleEntry.Note))
			return true;
		if (NoteNatural.startsWith(CircleEntry.Note))
			return true;
		if (NoteSharp  .startsWith(CircleEntry.Note))
			return true;
	}
	
	//Not found therefore not in key
	return false;
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

function PushPullButtonArrayToKey(aPushRow, aPullRow, Key) {
	//Find key in the circle of fifths
	let KeyIndex = FindCircleKeyIndex(Key);
	
	//For all buttons in the row
	for (let n = 0; n < aPushRow.length; ++n) {
		if (aPushRow[n].length == 0)
			continue;
		
		//Check push note is in key
		let PushNote  = GetNote(aPushRow[n]);
		let PushInKey = IsInKey(KeyIndex, PushNote);
		
		//If -, _ or ^ agrees with the key, remove them
		if (PushInKey) {
			//Remove natural/flat/sharp
			aPushRow[n] = aPushRow[n].replaceAll('=', '');
			aPushRow[n] = aPushRow[n].replaceAll('_', '');
			aPushRow[n] = aPushRow[n].replaceAll('^', '');
		}
		
		//Check pull note is in key
		let PullNote  = GetNote(aPullRow[n]);
		let PullInKey = IsInKey(KeyIndex, PullNote);
		
		//If push notes has accidental modifiers
		if (aPushRow[n].includes('=') || aPushRow[n].includes('_') || aPushRow[n].includes('^')) {
			let PushIndex = PushNote.search(/[=_^]/g, '');
			let PullIndex = PullNote.search(/[=_^]/g, '');
			PushNote = PushNote.substr(PushIndex+1).toLowerCase();
			PullNote = PullNote.substr(PullIndex+1).toLowerCase();
			if (PushNote == PullNote)
				PullInKey = false;
		}
		
		//If -, _ or ^ agrees with the key and not changed by push note, remove them
		if (PullInKey) {
			//Remove natural/flat/sharp
			aPullRow[n] = aPullRow[n].replaceAll('=', '');
			aPullRow[n] = aPullRow[n].replaceAll('_', '');
			aPullRow[n] = aPullRow[n].replaceAll('^', '');
		}
	}
}

function SplitOutOfKey(Key, aRowPush, aRowPull, aRowPushButtons, aRowPullButtons) {
	//Find key in the circle of fifths
	let KeyIndex = FindCircleKeyIndex(Key);
	
	for (let i = 0; i < aRowPush.length; ++i) {
		var OutOfKey = false;
		if (!IsInKey(KeyIndex, aRowPush[i], true))
			OutOfKey = true;
		if (!IsInKey(KeyIndex, aRowPull[i], true))
			OutOfKey = true;
		
		if (OutOfKey) {
			if (aRowPush[i] != "" || aRowPull[i] != "") {
				aRowPushButtons.push(aRowPush[i]);
				aRowPullButtons.push(aRowPull[i]);
			}
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

function GenChord(ChordName, aButtonNotes, Options, BassOnly = false) {
	//Convert chord to display name
	ChordName = ConvertChordFlatSharp(ChordName, Options);
	
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
	let aBass   = new Array();
	let aThirds = new Array();
	let aFifths = new Array();
	for (let Octave = 0; Octave <= 8; ++Octave) {
		//Find buttons for this octave
		for (let i = 0; i < aChordNotes.length; ++i) {
			for (let j = 0; j < aButtonNotes.length; ++j) {
				if (aChordNotes[i] == aButtonNotes[j]) {
					let NoteName = ConvertFlatSharp(aButtonNotes[j], Options);
					if (i == 0)
						aBass.push(NoteName);
					else if (i == 1)
						aThirds.push(NoteName);
					else if (i == 2)
						aFifths.push(NoteName);
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
	if (aBass.length || ((aThirds.length || aFifths.length) && !BassOnly)) {
		//Add bass with chord name
		StrippedChordName = StrippedChordName.replaceAll("b", "♭");
		ABC += '"' + StrippedChordName + '"';
		
		//Add bass notes
		if (aBass.length > 1)
			ABC += "[";
		for (let i = 0; i < aBass.length; ++i)
			ABC += aBass[i];
		if (aBass.length > 1)
			ABC += "]";
		if (aBass.length == 0)
			ABC += "z";
		
		if (!BassOnly) {
			//Add third name
			ABC += '"' + ConvertFlatSharp(aChordNotes[1].replaceAll("'", ""), Options).replaceAll("^", "#").replaceAll("_", "♭") + '"';
			
			//Add third notes
			let Added = false;
			for (let i = 0; i < aThirds.length; ++i) {
				if (!Added) {
					Added = true;
					ABC += "[";
				}
				ABC += aThirds[i];
			}
			if (Added)
				ABC += "]";
			else
				ABC += "z";
			
			//Add fifth name
			ABC += '"' + ConvertFlatSharp(aChordNotes[2].replaceAll("'", ""), Options).replaceAll("^", "#").replaceAll("_", "♭") + '"';
			
			//Add fifth notes
			Added = false;
			for (let i = 0; i < aFifths.length; ++i) {
				if (!Added) {
					Added = true;
					ABC += "[";
				}
				ABC += aFifths[i];
			}
			if (Added)
				ABC += "]";
			else
				ABC += "z";
		}
		
		ABC += "|";
	}
	
	return ABC;
}

function FindRowKeys(Instrument, Tuning) {
	let aRowKey = new Array();
	let TransposeSteps = LookupTransposeSteps(Instrument, Tuning);
	
	if (Instrument == "M_1") {
		let Row1Key = KeyTranspose("C", TransposeSteps);
		aRowKey.push(Row1Key);
	}
	//Two row fourth apart (plus helper row)
	else if (Instrument == "M_2" || Instrument == "M_25" || Instrument == "M_CLUB" || Instrument == "M_35") {
		let Row1Key = KeyTranspose("G", TransposeSteps);
		let Row2Key = KeyTranspose("C", TransposeSteps);
		aRowKey.push(Row1Key);
		aRowKey.push(Row2Key);
	}
	//Two row semitone apart
	else if (Instrument == "M_2S") {
		let Row1Key = KeyTranspose("B", TransposeSteps);
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
	//Semitone apart
	else if (Instrument == "M_2S") {
		//From B/C to selected
		switch (Tuning) {
			case "B/C":
				return 0;
			case "C/C#":
				return 1;
			case "C#/D":
				return 2;
		}
	}
	//Fourth apart
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
				return;
			}
		
			//Get loaded tablature or temperary tablature to copy the button arrays
			let Tablature = GetValidTune().tablatures[0].instance.semantics;
		
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
				let aRawPush = Tablature.push_row1;
				let aRawPull = Tablature.pull_row1;
				
				//Get bass buttons from ABCjs
				let aRawChordRowPush = Tablature.BassRow1Push;
				let aRawChordRowPull = Tablature.BassRow1Pull;
				
				//Find row keys and convert flats and sharps
				let Row1Key = FindRowKeys(Instruments.value, Tunings.value)[0];
				let convOptions = GetSharpFlatConverts(Row1Key, Row1Key);
				Row1Key = ConvertChordFlatSharp(Row1Key, convOptions);
				
				//Add chord notation
				aRowPush = ButtonArrayConvert(aRawPush, convOptions);
				aRowPull = ButtonArrayConvert(aRawPull, convOptions);
				aRowPush = ButtonArrayAddNames(aRowPush, ">");
				aRowPull = ButtonArrayAddNames(aRowPull, "<");
				
				//Remove flat, natural and sharp indicators that are redundant
				PushPullButtonArrayToKey(aRowPush, aRowPull, Row1Key);
				
				//Format ABC layout per row
				let LayoutTrebleRow = "";
				if (Index == 0) { //Diatonic scale order
					//Sort in key notes by scale order
					let aRow = aRowPush.concat(aRowPull);
					aRow.sort(ChordNoteCompare);
					
					//Create ABC in note order
					LayoutTrebleRow = ButtonArraysToAbc(aRow, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					//Create ABC for buttons
					LayoutTrebleRow = ButtonArraysToAbc(aRowPush, aRowPull);
				}
				
				//Add treble row to ABC
				aLines.push('P: Treble');
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow);
				
				//Add ABC for bass rows
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
			else if (Instruments.value == "M_2" || Instruments.value == "M_2S") { //Dual row melodeons
				//Get treble buttons from ABCjs
				let aRawRow2Push = Tablature.push_row2;
				let aRawRow2Pull = Tablature.pull_row2;
				let aRawRow1Push = Tablature.push_row1;
				let aRawRow1Pull = Tablature.pull_row1;
				let aRawPush = aRawRow2Push.concat(aRawRow1Push);
				let aRawPull = aRawRow2Pull.concat(aRawRow1Pull);
				
				//Get bass chords from ABCjs
				let aRawChordRow1Push  = Tablature.BassRow1Push;
				let aRawChordRow1Pull  = Tablature.BassRow1Pull;
				let aRawChordRow2Push  = Tablature.BassRow2Push;
				let aRawChordRow2Pull  = Tablature.BassRow2Pull;
				let aRawChordCrossPush = Tablature.BassCrossPush;
				let aRawChordCrossPull = Tablature.BassCrossPull;
				
				//Find row keys and convert flats and sharps
				let aRowKeys = FindRowKeys(Instruments.value, Tunings.value);
				let Row1Key = aRowKeys[0];
				let Row2Key = aRowKeys[1];
				let convOptions = GetSharpFlatConverts(Row1Key, Row2Key);
				if (Instruments.value == "M_2S") {
					convOptions.Aflat = false;
					convOptions.Bflat = false;
					convOptions.Dflat = false;
					convOptions.Eflat = false;
					convOptions.Gflat = false;
				}
				Row1Key = ConvertChordFlatSharp(Row1Key, convOptions);
				Row2Key = ConvertChordFlatSharp(Row2Key, convOptions);
				
				//Add chord notation to inside row
				aRow2Push = ButtonArrayConvert(aRawRow2Push, convOptions);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, convOptions);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				
				//Add chord notation to outside row
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				
				//Format ABC layout per row
				let LayoutTrebleRow2 = "";
				let LayoutTrebleRow1 = "";
				if (Index == 0) { //Diatonic scale order
					//Split buttons with out of key notes
					let aRow2PushButtons = new Array();
					let aRow2PullButtons = new Array();
					let aRow1PushButtons = new Array();
					let aRow1PullButtons = new Array();
					SplitOutOfKey(Row2Key, aRow2Push, aRow2Pull, aRow2PushButtons, aRow2PullButtons);
					SplitOutOfKey(Row1Key, aRow1Push, aRow1Pull, aRow1PushButtons, aRow1PullButtons);
					
					//Sort in key notes by scale order
					let aRow2 = aRow2Push.concat(aRow2Pull);
					aRow2.sort(ChordNoteCompare);
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					
					//Remove flat, natural and sharp indicators that are redundant
					PushPullButtonArrayToKey(aRow2PushButtons, aRow2PullButtons, Row2Key);
					PushPullButtonArrayToKey(aRow2           , aRow2           , Row2Key);
					PushPullButtonArrayToKey(aRow1PushButtons, aRow1PullButtons, Row1Key);
					PushPullButtonArrayToKey(aRow1           , aRow1           , Row1Key);
					
					//Create ABC for out of key buttons + note order
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2PushButtons, aRow2PullButtons) + ButtonArraysToAbc(aRow2, new Array());
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1PushButtons, aRow1PullButtons) + ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					//Remove flat, natural and sharp indicators that are redundant
					PushPullButtonArrayToKey(aRow2Push, aRow2Pull, Row2Key);
					PushPullButtonArrayToKey(aRow1Push, aRow1Pull, Row1Key);
					
					//Create ABC for buttons
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2Push, aRow2Pull);
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1Push, aRow1Pull);
				}
				
				//Add inside row to ABC
				aLines.push('P: Treble Inside Row ' + Row2Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row2Key);
				aLines.push(LayoutTrebleRow2);
				
				//Add outside row to ABC
				aLines.push('P: Treble Outside Row ' + Row1Key.replaceAll("b", "♭"));
				aLines.push('%%keywarn 0');
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow1);
				
				//Add ABC for bass rows
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass Outside Row');
				var Line = "]";
				for (let i = 0; i < aRawChordRow1Push.length; ++i) {
					let Ann = ".";
					if (i > 0)
						Ann = ":";
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				aLines.push('P:Bass Inside Row');
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
			else if (Instruments.value == "M_25" || Instruments.value == "M_CLUB" || Instruments.value == "M_3" || Instruments.value == "M_35") {
				//Get treble buttons from ABCjs
				let aRawRow3Push = Tablature.push_row3;
				let aRawRow3Pull = Tablature.pull_row3;
				let aRawRow2Push = Tablature.push_row2;
				let aRawRow2Pull = Tablature.pull_row2;
				let aRawRow1Push = Tablature.push_row1;
				let aRawRow1Pull = Tablature.pull_row1;
				let aRawPush = aRawRow3Push.concat(aRawRow2Push.concat(aRawRow1Push));
				let aRawPull = aRawRow3Pull.concat(aRawRow2Pull.concat(aRawRow1Pull));
				
				//Get bass chords from ABCjs
				let aRawChordRow1Push  = Tablature.BassRow1Push;
				let aRawChordRow1Pull  = Tablature.BassRow1Pull;
				let aRawChordRow2Push  = Tablature.BassRow2Push;
				let aRawChordRow2Pull  = Tablature.BassRow2Pull;
				let BassRow3ChordLess  = Tablature.BassRow3ChordLess;
				let aRawChordRow3Push  = Tablature.BassRow3Push;
				let aRawChordRow3Pull  = Tablature.BassRow3Pull;
				let aRawChordCrossPush = Tablature.BassCrossPush;
				let aRawChordCrossPull = Tablature.BassCrossPull;
				
				//Find row keys and convert flats and sharps
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
				
				//Add chord notation to inside row
				aRow3Push = ButtonArrayConvert(aRawRow3Push, convOptions);
				aRow3Pull = ButtonArrayConvert(aRawRow3Pull, convOptions);
				aRow3Push = ButtonArrayAddNames(aRow3Push, ">,");
				aRow3Pull = ButtonArrayAddNames(aRow3Pull, "<,");
				
				//Add chord notation to middle row
				aRow2Push = ButtonArrayConvert(aRawRow2Push, convOptions);
				aRow2Pull = ButtonArrayConvert(aRawRow2Pull, convOptions);
				aRow2Push = ButtonArrayAddNames(aRow2Push, ">:");
				aRow2Pull = ButtonArrayAddNames(aRow2Pull, "<:");
				
				//Add chord notation to outside row
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				
				//Format ABC layout per row
				let LayoutTrebleRow3 = "";
				let LayoutTrebleRow2 = "";
				let LayoutTrebleRow1 = "";
				if (Index == 0) { //Diatonic scale order
					if (Row3Key == "") {
						//Remove flat, natural and sharp indicators that are redundant
						PushPullButtonArrayToKey(aRow3Push, aRow3Pull, Row3Key);
						
						//Helper row 3 is always in button order
						LayoutTrebleRow3 = ButtonArraysToAbc(aRow3Push, aRow3Pull);
					}
					else {
						//Split buttons with out of key notes
						let aRow3PushButtons = new Array();
						let aRow3PullButtons = new Array();
						SplitOutOfKey(Row3Key, aRow3Push, aRow3Pull, aRow3PushButtons, aRow3PullButtons);
						
						//Sort in key notes by scale order
						let aRow3 = aRow3Push.concat(aRow3Pull);
						aRow3.sort(ChordNoteCompare);
						
						//Remove flat, natural and sharp indicators that are redundant
						PushPullButtonArrayToKey(aRow3PushButtons, aRow3PullButtons, Row3Key);
						PushPullButtonArrayToKey(aRow3           , aRow3           , Row3Key);
						
						//Create ABC for out of key buttons + note order
						LayoutTrebleRow3 = ButtonArraysToAbc(aRow3PushButtons, aRow3PullButtons) + ButtonArraysToAbc(aRow3, new Array());
					}
					
					//Split buttons with out of key notes
					let aRow2PushButtons = new Array();
					let aRow2PullButtons = new Array();
					let aRow1PushButtons = new Array();
					let aRow1PullButtons = new Array();
					SplitOutOfKey(Row2Key, aRow2Push, aRow2Pull, aRow2PushButtons, aRow2PullButtons);
					SplitOutOfKey(Row1Key, aRow1Push, aRow1Pull, aRow1PushButtons, aRow1PullButtons);
					
					//Sort in key notes by scale order
					let aRow2 = aRow2Push.concat(aRow2Pull);
					aRow2.sort(ChordNoteCompare);
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					
					//Remove flat, natural and sharp indicators that are redundant
					PushPullButtonArrayToKey(aRow2PushButtons, aRow2PullButtons, Row2Key);
					PushPullButtonArrayToKey(aRow2           , aRow2           , Row2Key);
					PushPullButtonArrayToKey(aRow1PushButtons, aRow1PullButtons, Row1Key);
					PushPullButtonArrayToKey(aRow1           , aRow1           , Row1Key);
					
					//Create ABC for out of key buttons + note order
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2PushButtons, aRow2PullButtons) + ButtonArraysToAbc(aRow2, new Array());
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1PushButtons, aRow1PullButtons) + ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Button order, first push then pull
					//Remove flat, natural and sharp indicators that are redundant
					PushPullButtonArrayToKey(aRow3Push, aRow3Pull, Row3Key);
					PushPullButtonArrayToKey(aRow2Push, aRow2Pull, Row2Key);
					PushPullButtonArrayToKey(aRow1Push, aRow1Pull, Row1Key);

					//Create ABC for buttons
					LayoutTrebleRow3 = ButtonArraysToAbc(aRow3Push, aRow3Pull);
					LayoutTrebleRow2 = ButtonArraysToAbc(aRow2Push, aRow2Pull);
					LayoutTrebleRow1 = ButtonArraysToAbc(aRow1Push, aRow1Pull);
				}
				
				//Add acc row to ABC
				aLines.push('[]');
				aLines.push('P: Treble Inside Row');
				if (Row3Key != "") {
					aLines[aLines.length - 1] += " " + Row3Key.replaceAll("b", "♭");
					aLines.push('K: ' + Row3Key);
				}
				aLines.push(LayoutTrebleRow3);
				
				//Add C row to ABC
				aLines.push('P: Treble Middle Row ' + Row2Key.replaceAll("b", "♭"));
				aLines.push('%%keywarn 0');
				aLines.push('K: ' + Row2Key);
				aLines.push(LayoutTrebleRow2);
				
				//Add G row to ABC
				aLines.push('P: Treble Outside Row '  + Row1Key.replaceAll("b", "♭"));
				aLines.push('K: ' + Row1Key);
				aLines.push(LayoutTrebleRow1);
				
				//Add ABC for bass rows
				aLines.push('K: C style=x');
				aLines.push('L: 1');
				aLines.push('P:Bass Outside Row');
				var Line = "]";
				for (let i = 0; i < aRawChordRow1Push.length; ++i) {
					let Ann = "";
					Line += GenChord(aRawChordRow1Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow1Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				if (!aRawChordRow3Push.length)
					aLines.push('P:Bass Inside Row');
				else
					aLines.push('P:Bass Middle Row');
				Line = "]";
				for (let i = 0; i < aRawChordRow2Push.length; ++i) {
					let Ann = "";
					Line += GenChord(aRawChordRow2Push[i] + '>' + Ann, aRawPush, convOptions);
					Line += GenChord(aRawChordRow2Pull[i] + '<' + Ann, aRawPull, convOptions);
				}
				aLines.push(Line);
				if (aRawChordRow3Push.length) {
					aLines.push('P:Bass Inside Row');
					Line = "]";
					for (let i = 0; i < aRawChordRow3Push.length; ++i) {
						let Ann = "";
						Line += GenChord(aRawChordRow3Push[i] + '>' + Ann, aRawPush, convOptions, BassRow3ChordLess);
						Line += GenChord(aRawChordRow3Pull[i] + '<' + Ann, aRawPull, convOptions, BassRow3ChordLess);
					}
					aLines.push(Line);
				}
				
				//Add ABC for bass cross-rows
				let Len = aRawChordCrossPush.length;
				if (aRawChordCrossPull.length > Len)
					Len = aRawChordCrossPull.length;
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
				let aRawRow1Push = Tablature.push_row1;
				let aRawRow1Pull = Tablature.pull_row1;
				
				//Get bends from ABCjs
				let aRawRow2Push = Tablature.push_row2;
				let aRawRow2Pull = Tablature.pull_row2;
				let aRawRow3Push = Tablature.push_row3;
				let aRawRow3Pull = Tablature.pull_row3;
				let aRawBendsPush = aRawRow3Push.concat(aRawRow2Push);
				let aRawBendsPull = aRawRow3Pull.concat(aRawRow2Pull);
				
				//Find row keys and convert flats and sharps
				let Row1Key = FindRowKeys(Instruments.value, Tunings.value)[0];
				let convOptions = GetSharpFlatConverts(Row1Key, Row1Key);
				Row1Key = ConvertChordFlatSharp(Row1Key, convOptions);
				
				//Add chord notation to the row
				aRow1Push = ButtonArrayConvert(aRawRow1Push, convOptions);
				aRow1Pull = ButtonArrayConvert(aRawRow1Pull, convOptions);
				aRow1Push = ButtonArrayAddNames(aRow1Push, ">.");
				aRow1Pull = ButtonArrayAddNames(aRow1Pull, "<.");
				
				//Add chord notation to the bend
				aBendsPush = ButtonArrayConvert(aRawBendsPush, convOptions);
				aBendsPull = ButtonArrayConvert(aRawBendsPull, convOptions);
				aBendsPush = ButtonArrayAddNames(aBendsPush, ">,");
				aBendsPull = ButtonArrayAddNames(aBendsPull, "<,");
				
				//Remove flat, natural and sharp indicators that are redundant
				PushPullButtonArrayToKey(aRow1Push , aRow1Pull , Row1Key);
				PushPullButtonArrayToKey(aBendsPush, aBendsPull, Row1Key);

				//Holes in scale or instrument order
				let LayoutRow1 = "";
				if (Index == 0) { //Diatonic scale order
					//Sort notes by scale order
					let aRow1 = aRow1Push.concat(aRow1Pull);
					aRow1.sort(ChordNoteCompare);
					
					//Create ABC in note order
					LayoutRow1 = ButtonArraysToAbc(aRow1, new Array());
				}
				else if (Index == 1) { //Hole order, first blow then draw
					//Create ABC in button order
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
			for (let i = 0; i < g_aExampleLines.length; ++i) {
				if (g_aExampleLines[i].substr(0, 3) == "T: ") {
					ExampleIndex++;
					if (ExampleIndex > FindExampleIndex)
						break;
				}
				
				if (ExampleIndex == FindExampleIndex)
					aLines.push(g_aExampleLines[i]);
			}
			
			if (ExampleIndex < FindExampleIndex)
				return;
			break;
	}
	
	//Convert to string with newlines
	let ABC = "";
	for (let i = 0; i < aLines.length; ++i) {
		ABC += aLines[i];
		if (i != aLines.length - 1)
			ABC += "\n";
	}
	
	//Set transpose control to 0
	let Transpose = document.getElementById("transpose");
	Transpose.value = 0;
	
	//Transpose the ABC text
	if (TransposeSteps != 0) {
		let renderObj = ABCJS.renderAbc("*", ABC);
		ABC = ABCJS.strTranspose(ABC, renderObj, TransposeSteps);
	}
	
	//Set the new ABC text
	AbcEditorSetText(ABC);
}