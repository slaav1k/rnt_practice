function MapAdapter(canvas) {
    var context = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var blockSizeX = 0, blockSizeY = 0;
    var icons = initIcons();
    
    var _mapAdapter = {
        showMap : showMap,
        displayCell: displayCell,
		refreshMap: refreshMap,
		displayPlayers: displayPlayers,
		icons: icons
    };
    
    //Public --------------------------------------------------------------------------
	
	function showMap (map) {
        if (map) {
			blockSizeX = canvas.clientWidth / map.width;
			blockSizeY = canvas.clientHeight / map.height;

			context.drawImage(icons.empty, 0, 0, canvas.clientWidth, canvas.clientHeight);
			
			if (context) {
				for (var i = 0; i < map.cells.length; i++) {
					var cell = map.cells[i];
					var x = parseInt(i/map.height);
					var y = i - x * map.height;
					displayCell(x, y, cell);
				}
			}
		}
	};
	
	function refreshMap (map) {
        if (map) {
			blockSizeX = canvas.clientWidth / map.width;
			blockSizeY = canvas.clientHeight / map.height;

			for (var i = 0; i < map.cells.length; i++) {
				var cell = map.cells[i];
				if (cell !== GameApi.MapCellType.wall) {
					var x = parseInt(i/map.height);
					var y = i - x * map.height;
					displayCell(x, y, cell);
				}
			}
		}
    };
	
    function displayCell (x, y, type) {
		var x = x * blockSizeX;
		var y = y * blockSizeY;
		
		var img = defineCellType(type);
		if (img) {
			context.drawImage(img, x, y, blockSizeX, blockSizeY);
        }
    };
	
	function displayPlayers (players) {
		for (var i = 0; i < players.length; i++) {
			var p = players[i];
			var x = p.location.x * blockSizeX;
			var y = p.location.y * blockSizeY;
			context.drawImage(p.icon, x, y, blockSizeX, blockSizeY)
		}
	};
	//---------------------------------------------------------------------------------
	
	
	//Private--------------------------------------------------------------------------

    function defineCellType (type) {
		switch(type) {
			case GameApi.MapCellType.empty:
			default:
				return icons.empty || null;
			case GameApi.MapCellType.wall:
				return icons.wall || null;
			case GameApi.MapCellType.coin:
				return icons.coin || null;
			case GameApi.MapCellType.life:
				return icons.life || null;
			case GameApi.MapCellType.swtch:
				return icons.switch || null;
			case GameApi.MapCellType.thiefRespawn:
				return icons.empty || null;
			case GameApi.MapCellType.policeRespawn:
				return icons.empty || null;
			case 7:
				return icons.police || null; //полицейский
			case 8:
				return icons.thief || null; //вор
		}
	};
    
    function initIcons () {
        var icons = {
            empty: null,
            wall: null,
            coin: null,
            life: null,
            switch: null,
            police: null,
            thief: null,
            playerPolice: null,
            playerThief: null
        };
        
        for(var img in icons) {
            var image = new Image();
            image.src = img + '.png';
            icons[img] = image;
        }
        
        return icons;
    };
	
	//---------------------------------------------------------------------------------
    
    return _mapAdapter;        
}