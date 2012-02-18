$(document).ready(function(){
	
	var mpclient= new MPClient({});
	
	function getRandomEntry(){
	//replace this with json call to 
	//https://api.pearson.com/longman/dictionary/entry/random.json?apikey=d3763a222381e9f09fe6328aa87f07ae
		var r = 
{"Entry":{"@id":"6e2b450a_1150373ac67_-bde","@field":"159","Head":{"HWD":{"#text":"coastal"},"HYPHENATION":{"#text":"coast‧al"},"PronCodes":{"PRON":{"#text":"ˈkəʊstl"},"AMEVARPRON":{"#text":"ˈkoʊstl"}},"POS":{"#text":"adjective"},"GRAM":{"#text":"only before noun"}},"Sense":{"@id":"6e2b450a_1150373ac67_-bd5","DEF":{"#text":"in the sea or on the land near the coast"},"EXAMPLE":[{"@id":"6e2b450a_1150373ac67_-bd2","#text":["the "," of Britain"],"COLLOINEXA":{"#text":"coastal waters"},"multimedia":{"@href":"\/multimedia\/exa_pron\/p008-000868745.mp3","@type":"EXA_PRON","#text":"\/multimedia\/exa_pron\/p008-000868745.mp3"}},{"@id":"6e2b450a_1150373ac67_-bd0","#text":"the ","COLLOINEXA":{"#text":"coastal path"},"multimedia":{"@href":"\/multimedia\/exa_pron\/p008-001688157.mp3","@type":"EXA_PRON","#text":"\/multimedia\/exa_pron\/p008-001688157.mp3"}}]},"multimedia":[{"@href":"\/multimedia\/us_hwd\/coastal.mp3","@type":"US_PRON","#text":"\/multimedia\/us_hwd\/coastal.mp3"},{"@href":"\/multimedia\/gb_hwd\/ld41coastal.mp3","@type":"GB_PRON","#text":"\/multimedia\/gb_hwd\/ld41coastal.mp3"}]}};

	return r;
	}

$('#entry_holder').hide();
$('#ready_button').click(function(){
	game();	
});

var player_count = 0;
mpclient.receive('player_join', function(event, arg){
	var player_id = 'player'+player_count;
	var player = $('<div class="player not_ready" id="'+player_id+'">Player</div>');

	player_count++;
	$('#player_holder').append(player);		
});

mpclient.receive('player_join', function(event, arg){
	var player = $('#player0');//get the player
	player.removeClass('not_ready');
});

function game(){
	$('#ready_button').hide();
	$('#entry_holder').empty();
	$('#entry_holder').append('<p>click two that might be related</p>');
	var entries = new Array();
	// get 4 random entries
	/*
	for (var i = 0; i <5; i++){
		var entry = getRandomEntry();
		entries.push(entry);
	}*/
	entries[0] = 'http://dellone2one.com/wp-content/uploads/2009/11/cart.jpg';
	entries[1] = 'http://www.fatburningfurnace.com/images/Banana%20nutrition%20facts.jpg';
	entries[2] = 'http://bbsimg.ngfiles.com/1/20556000/ngbbs4b3d8a0293337.jpg';
	entries[3] = 'http://thumbs.ifood.tv/files/images/How_to_store_biscuits.jpg'; 
	entries[4] = 'http://i.telegraph.co.uk/multimedia/archive/01794/champagne_1794439a.jpg';

/*
	// get a related entry for one of the 4
	var rand = Math.floor(Math.random()*5);
	var a_random_entry = entries[rand];
	var related_name = a_random_entry.Entry.Sense.EXAMPLE[0].COLLOINEXA['#text'].toString();
	// search for a related entry
	// var result = https://api.pearson.com/longman/dictionary/entry.json?q=related&jsonp=success&apikey=d3763a222381e9f09fe6328aa87f07ae
	// put related_name as param!
	// push it on the list
	// entries.push(result);
	// shuffle the array?!
*/
	var select_count = 0;
	function select_entry(){
		if (select_count < 2){
			$(this).addClass('selected');
			select_count++;
		}
		if (select_count == 2){
			select_count++;
			// send your turn to the server
			console.log('turn over!');
			//mpclient.send('player_ready');
			$('#entry_holder').append('<p>Move done! Waiting for other players.</p>');
			var selected = $('.selected');
			if ($(selected[0]).attr('id') == 2 && $(selected[1]).attr('id') ==4){
			console.log('correct');
			}
			console.log(selected);
		}
	}

	// draw the list items to the screen
	$.each(entries, function(i, item){
		//var image_url = item.Entry.
		var image_url = item; 
		var img = $('<img width="100"/>');
		img.attr('src', image_url);
		var div = $('<div class="entry" id='+i+' />');
		div.click(select_entry);
		div.append(img);
		$('#entry_holder').append(div);
	});
	$('#entry_holder').show();
}
});
