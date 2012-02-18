$(document).ready(function(){
	
	var mpclient= new MPClient({});
	
	function getRandomEntry(){
	//replace this with json call to 
	//https://api.pearson.com/longman/dictionary/entry/random.json?apikey=d3763a222381e9f09fe6328aa87f07ae
		var r = 
{"Entry":{"@id":"6e2b450a_1150373ac67_-bde","@field":"159","Head":{"HWD":{"#text":"coastal"},"HYPHENATION":{"#text":"coast‧al"},"PronCodes":{"PRON":{"#text":"ˈkəʊstl"},"AMEVARPRON":{"#text":"ˈkoʊstl"}},"POS":{"#text":"adjective"},"GRAM":{"#text":"only before noun"}},"Sense":{"@id":"6e2b450a_1150373ac67_-bd5","DEF":{"#text":"in the sea or on the land near the coast"},"EXAMPLE":[{"@id":"6e2b450a_1150373ac67_-bd2","#text":["the "," of Britain"],"COLLOINEXA":{"#text":"coastal waters"},"multimedia":{"@href":"\/multimedia\/exa_pron\/p008-000868745.mp3","@type":"EXA_PRON","#text":"\/multimedia\/exa_pron\/p008-000868745.mp3"}},{"@id":"6e2b450a_1150373ac67_-bd0","#text":"the ","COLLOINEXA":{"#text":"coastal path"},"multimedia":{"@href":"\/multimedia\/exa_pron\/p008-001688157.mp3","@type":"EXA_PRON","#text":"\/multimedia\/exa_pron\/p008-001688157.mp3"}}]},"multimedia":[{"@href":"\/multimedia\/us_hwd\/coastal.mp3","@type":"US_PRON","#text":"\/multimedia\/us_hwd\/coastal.mp3"},{"@href":"\/multimedia\/gb_hwd\/ld41coastal.mp3","@type":"GB_PRON","#text":"\/multimedia\/gb_hwd\/ld41coastal.mp3"}]}};

	return r;
	}

function game(){
	var entries = new Array();
	// get 4 random entries
	for (var i = 0; i <5; i++){
		var entry = getRandomEntry();
		entries.push(entry);
	}
	
	// get a related entry for one of the 4
	var rand = Math.floor(Math.random()*5);
	var a_random_entry = entries[rand];
	var related_name = a_random_entry.Entry.Sense.EXAMPLE[0].COLLOINEXA['#text'].toString();
	// search for a related entry
	// var result = https://api.pearson.com/longman/dictionary/entry.json?q=related&jsonp=success&apikey=d3763a222381e9f09fe6328aa87f07ae
	// put related_name as param!
	// push it on the list
	// entries.push(result);

	// draw the list items to the screen
	$.each(entries, function(i, item){
		//var image_url = item.Entry.
		var image_url = 'http://placekitten.com/100/100';
		var img = $('<img/>');
		img.attr('src', image_url);
		$('body').append(img);
	});
}
game();
});
