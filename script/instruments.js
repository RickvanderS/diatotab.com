function AddInstruments() {
	let Instruments = document.getElementById("instrument");
	removeOptions(Instruments);
	let Instrument;
	
	Instrument = document.createElement("option");
	Instrument.text  = "Melodeon / Diatonic Accordion 1 row";
	Instrument.value = "M_1";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 2 row, fourth apart";
	Instrument.value    = "M_2";
	Instrument.selected = 'selected';
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 2 row, semitone apart";
	Instrument.value    = "M_2S";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 3 row, fourth apart";
	Instrument.value    = "M_3";
	Instruments.add(Instrument);

	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 2.5 row, fourth apart, club row";
	Instrument.value    = "M_CLUB";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 2.5 row, fourth apart, helper row";
	Instrument.value    = "M_25";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text     = "Melodeon / Diatonic Accordion 3 row, fourth apart, helper row";
	Instrument.value    = "M_35";
	Instruments.add(Instrument);

	Instrument = document.createElement("option");
	Instrument.text  = "Diatonic Harmonica / French Harp";
	Instrument.value = "H_1";
	Instruments.add(Instrument);
	
	Instrument = document.createElement("option");
	Instrument.text  = "No tablature, notes only";
	Instrument.value = "NONE";
	Instruments.add(Instrument);
	
	//Translate strings to set language
	for (var i = 0; i < Instruments.length; i++) {
		let Obj = Instruments.children[i];
		
		switch (document.documentElement.lang) {
			case "nl":
				Obj.textContent = Obj.textContent.replaceAll("Melodeon / Diatonic Accordion"   , "Trekharmonica / Diatonische Accordeon");
				Obj.textContent = Obj.textContent.replaceAll("Diatonic Harmonica / French Harp", "Diatonische Mondharmonica");
				Obj.textContent = Obj.textContent.replaceAll("fourth apart"                    , "kwart afstand");
				Obj.textContent = Obj.textContent.replaceAll("semitone apart"                  , "halve toon afstand");
				Obj.textContent = Obj.textContent.replaceAll("2.5"                             , "2,5");
				Obj.textContent = Obj.textContent.replaceAll("club row"                        , "club rij");
				Obj.textContent = Obj.textContent.replaceAll("helper row"                      , "hulprij");
				Obj.textContent = Obj.textContent.replaceAll("row"                             , "rij");
				Obj.textContent = Obj.textContent.replaceAll("No tablature, notes only"        , "Geen tabulatuur, alleen noten");
				break;
			case "de":
				Obj.textContent = Obj.textContent.replaceAll("Melodeon / Diatonic Accordion"   , "Diatonisches Akkordeon / Ziehharmonika");
				Obj.textContent = Obj.textContent.replaceAll("Diatonic Harmonica / French Harp", "Mundharmonika");
				Obj.textContent = Obj.textContent.replaceAll("fourth apart"                    , "Quart abstand");
				Obj.textContent = Obj.textContent.replaceAll("semitone apart"                  , "Halbton abstand");
				Obj.textContent = Obj.textContent.replaceAll("2.5"                             , "2,5");
				Obj.textContent = Obj.textContent.replaceAll("club row"                        , "club reihe");
				Obj.textContent = Obj.textContent.replaceAll("helper row"                      , "Hilfsreihe");
				Obj.textContent = Obj.textContent.replaceAll("row"                             , "Reihe");
				Obj.textContent = Obj.textContent.replaceAll("No tablature, notes only"        , "Keine Tabulatur, nur Noten");
				break;
			case "fr":
				Obj.textContent = Obj.textContent.replaceAll("Melodeon / Diatonic Accordion"   , "Accordéon Diatonique");
				Obj.textContent = Obj.textContent.replaceAll("Diatonic Harmonica / French Harp", "Harmonica Diatonique");
				Obj.textContent = Obj.textContent.replaceAll("fourth apart"                    , "dséparés d'une quarte");
				Obj.textContent = Obj.textContent.replaceAll("semitone apart"                  , "dséparés d'une demi-ton");
				Obj.textContent = Obj.textContent.replaceAll("2.5"                             , "2,5");
				Obj.textContent = Obj.textContent.replaceAll("club row"                        , "Rangée d'clubs");
				Obj.textContent = Obj.textContent.replaceAll("helper row"                      , "Rangée d'assistance");
				Obj.textContent = Obj.textContent.replaceAll("row"                             , "rangées");
				Obj.textContent = Obj.textContent.replaceAll("No tablature, notes only"        , "Pas de tablatures, seulement des notes");
				break;
		}
	}
	
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

function AddTunings2RowSemitone() {
	let Tunings = document.getElementById("tuning");
	
	var Tuning = document.createElement("option");
	Tuning.text     = "B/C";
	Tuning.selected = 'selected';
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "C/C#";
	Tunings.add(Tuning);
	
	var Tuning = document.createElement("option");
	Tuning.text = "C#/D";
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
				Variant.text       = "23 button, 3th button start, 1/1' accidentals";
				Variant.value      = "23^";
				Variant.dataSource = "";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 3th button start, 1/1' low notes";
				Variant.value      = "23";
				Variant.dataSource = "";
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
			
		case "M_2S":
			//Add 2row variants
			{
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 3th button start, modern basses";
				Variant.value      = "21";
				Variant.dataSource = "https://forum.melodeon.net/files/site/BC21modernbass.gif";
				Variant.selected   = 'selected';
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 3th button start, traditional basses";
				Variant.value      = "21%";
				Variant.dataSource = "https://forum.melodeon.net/files/site/BC21tradbass.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21 button, 3th button start, Hohner basses";
				Variant.value      = "21$";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 4th button start, modern basses";
				Variant.value      = "23";
				Variant.dataSource = "https://forum.melodeon.net/files/site/BC23modernbass.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 4th button start, traditional basses";
				Variant.value      = "23%";
				Variant.dataSource = "https://forum.melodeon.net/files/site/BC23tradbass.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23 button, 4th button start, Hohner basses";
				Variant.value      = "23$";
				Variants.add(Variant);
			}
			
			//Add 2row semitone tunings
			AddTunings2RowSemitone();
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
				Variant.text       = "21+5 button, 12 bass, Saltarelle (4th start)";
				Variant.value      = "21+5_Saltarelle";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG21plus5saltarelle.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+4 button, 12 bass, Saltarelle (4th start)";
				Variant.value      = "23+4_Saltarelle";
				Variant.dataSource = "http://forum.melodeon.net/files/site/DG23plus4saltarelle.gif";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "21+5 button, 12 bass, Young (4th start)";
				Variant.value      = "21+5_young";
				Variant.dataSource = "https://www.paulyoungfolk.co.uk/layouts";
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
				Variant.text       = "23+4 button, 8 bass, Hohner Club (4th start)";
				Variant.value      = "23+4_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+7 button, 8 bass, Hohner Club (4th start)";
				Variant.value      = "23+7_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+8 button, 8 bass, Hohner Club (4th start)";
				Variant.value      = "23+8_Club";
				Variant.dataSource = "http://www.delaguerre.com/delaguerre/pedagogy/club/layout.html";
				Variants.add(Variant);
				
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 8 bass, Hohner Club (4th start)";
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
			
		case "M_35":
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Corgeron";
				Variant.value      = "33corgeron";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/trois-rangs_33_8_corgeron-sol-do.pdf";
				Variant.selected   = 'selected';
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+11 button, 16 bass, Gaillard";
				Variant.value      = "34gaillard";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/trois_rangs_33_18_sol-do-_gaillard_0.pdf";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Le Tron / Laloy";
				Variant.value      = "33letron";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/trois_rangs_33_18_sol-do-_ltl_0.pdf";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Heim 1";
				Variant.value      = "33heima";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/trois-rangs_33_8_heim-sol-do.pdf";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "21+9 button, 12 bass, van der Sluijs";
				Variant.value      = "30rick";
				Variant.dataSource = "";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Bottasso";
				Variant.value      = "33bottasso";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/trois_rangs_33_18_sol-do-_bottasso.pdf";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Heim 2";
				Variant.value      = "33heimb";
				Variant.dataSource = "Chordia Android app by diatotrad.fr";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+11 button, 18 bass, Milleret / Pignol";
				Variant.value      = "34milleret";
				Variant.dataSource = "https://dia.to/sites/default/files/plans/milleret-pignol.pdf";
				Variants.add(Variant);
			}
			
			{
				var Variant = document.createElement("option");
				Variant.text       = "23+10 button, 18 bass, Young";
				Variant.value      = "33young";
				Variant.dataSource = "https://www.paulyoungfolk.co.uk/layouts";
				Variants.add(Variant);
			}
			
			//Add 2row tunings
			AddTunings2Row();
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
	
	//Translate variant strings to set language
	for (var i = 0; i < Variants.length; i++) {
		let Obj = Variants.children[i];
		
		switch (document.documentElement.lang) {
			case "nl":
				Obj.textContent = Obj.textContent.replaceAll("button"            , "knop");
				Obj.textContent = Obj.textContent.replaceAll("3th"               , "3e");
				Obj.textContent = Obj.textContent.replaceAll("4th"               , "4e");
				Obj.textContent = Obj.textContent.replaceAll("start"             , "start");
				Obj.textContent = Obj.textContent.replaceAll("accidentals"       , "kruis/mol");
				Obj.textContent = Obj.textContent.replaceAll("low notes"         , "lage noten");
				Obj.textContent = Obj.textContent.replaceAll("traditional basses", "traditionele basssen");
				Obj.textContent = Obj.textContent.replaceAll("modern basses"     , "moderne basssen");
				Obj.textContent = Obj.textContent.replaceAll("Hohner basses"     , "Hohner basssen");
				Obj.textContent = Obj.textContent.replaceAll("bass"              , "bas");
				Obj.textContent = Obj.textContent.replaceAll("hole"              , "gat");
				break;
			case "de":
				Obj.textContent = Obj.textContent.replaceAll("button"            , "Knopf");
				Obj.textContent = Obj.textContent.replaceAll("3th"               , "3.");
				Obj.textContent = Obj.textContent.replaceAll("4th"               , "4.");
				Obj.textContent = Obj.textContent.replaceAll("start"             , "Start");
				Obj.textContent = Obj.textContent.replaceAll("accidentals"       , "Kreuz/Be");
				Obj.textContent = Obj.textContent.replaceAll("low notes"         , "tiefe Töne");
				Obj.textContent = Obj.textContent.replaceAll("traditional basses", "traditionelle Bässe");
				Obj.textContent = Obj.textContent.replaceAll("modern basses"     , "moderne Bässe");
				Obj.textContent = Obj.textContent.replaceAll("Hohner basses"     , "Hohner Bässe");
				Obj.textContent = Obj.textContent.replaceAll("bass"              , "Bass");
				Obj.textContent = Obj.textContent.replaceAll("hole"              , "Loch");
				break;
			case "fr":
				Obj.textContent = Obj.textContent.replaceAll("button"            , "bouton");
				Obj.textContent = Obj.textContent.replaceAll("3th"               , "3ème");
				Obj.textContent = Obj.textContent.replaceAll("4th"               , "4ème");
				Obj.textContent = Obj.textContent.replaceAll("start"             , "début");
				Obj.textContent = Obj.textContent.replaceAll("accidentals"       , "altérations");
				Obj.textContent = Obj.textContent.replaceAll("low notes"         , "notes graves");
				Obj.textContent = Obj.textContent.replaceAll("traditional basses", "basss traditionnelles");
				Obj.textContent = Obj.textContent.replaceAll("modern basses"     , "basss modernes");
				Obj.textContent = Obj.textContent.replaceAll("Hohner basses"     , "basss Hohner");
				Obj.textContent = Obj.textContent.replaceAll("bass"              , "basse");
				Obj.textContent = Obj.textContent.replaceAll("hole"              , "trou");
				break;
		}
	}
	
	ShowHideVariantOptions();
}