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

/// Reads all the options and convert them to ABCJS parameters
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