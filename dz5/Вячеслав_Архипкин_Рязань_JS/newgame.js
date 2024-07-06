(function (_, table) {
	var api = new GameApi();
    var mapAdapter = null;
	var selectedMap = null;
    var canvas = document.getElementById('map');
	var isTest = false;
	mapAdapter = new MapAdapter(canvas);
	
	if (api) {		
		if (canvas) {
			resizeMapBlock(canvas);
		}		
        
		$('#games').append(table.getMapsTableHat());
		api.maps.get(function (maps) { displayMaps(maps) });
    }
	
	function displayMaps(maps) {
		for (var i = 0; i < maps.length; i++) {
			var map = maps[i];
			var mapRow = table.getMapTableRow(map);
			$('#games').append(mapRow);
		}
		
		$('.tab-row').click(function(event) {
			var mapId = $(event.target).parent()[0].id
			if (mapId) {
				selectMap(mapId)
			} else {
				selectedMap = null;
			};
		});		
	};
	
	function selectMap(mapId) {
		if (mapId) {
			api.maps.getMap(mapId, function(map) {
				showMapPreview(map);
				selectedMap = map;
			});
		}
	};
	
	function showMapPreview(map) {
		if (map) {
			map = _.unpackMap(map);
			mapAdapter.showMap(map);
		}
	};		
	
	function createGame() {
		if (selectedMap) {
			var game = {
				name : $('#gameName').val(),
				mapId: selectedMap.id,
				switchTimeout: $('#gameSwitchTime').val() * 1000,
				startupTeamLives: $('#gameStartLives').val(),
				policeSpeed: $('#gamePoliceSpeed').val(),
				thiefSpeed: $('#gameThiefSpeed').val()
			};
			
			if (isTest) {
				api.games.createTest(game, onGameCreating);
			} else {
				api.games.create(game, onGameCreating);
			}
		} else {
            alert('Карта не выбрана');
        }
	};
	
	function resizeMapBlock(mapBlock) {
		if (mapBlock) {
			mapBlock.style.height = mapBlock.clientWidth + 'px';
			mapBlock.width = mapBlock.clientWidth;
			mapBlock.height = mapBlock.clientHeight;
			showMapPreview(selectedMap);
		}
	};
	
	function onGameCreating(game) {
		if (game != null) {
			var id = (isTest) ? 'test' : game.id;
			_.setNewPageUrl('game.html?gameID=' + id);
		} else {
			alert('Невозможно создать игру');
		}
	};
	
	$('#btnNewGame').click(function (event) {
		isTest = false;		
		if (!selectedMap) {
			alert('Карта не выбрана');
			return false;
		}
	});
	
	$('#btnTestGame').click(function (event) {
		isTest = true;
		if (!selectedMap) {
			alert('Карта не выбрана');
			return false;
		}
	});
	
	$('#btnCreate').click(function (event) {			
	});
	
	$('#btnExit').click(function (event) {
		_.setNewPageUrl('index.html');
	});	
	
	$('#gameSettings').submit(function (event) {
		createGame();
		return false;
	});
	
	$(window).resize(function () {
		var mapBlock = $('#map')[0];
		if (mapBlock) {
			resizeMapBlock(mapBlock);
		}
	});
})(jsHelper, TableAdapter);