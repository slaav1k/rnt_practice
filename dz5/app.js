var api = new GameApi();
(function (_, table) {
	
	if (api) {
		var user = api.questor.user;
		var usersMaps = [];
		var games = [];
		var testGameId;
		
		api.users.maps(user.id, function (maps) { usersMaps = maps; });
		getGames();
		
	}
	
	function displayGames(games) {
		var $games = $('#games');
		$games.empty();
		$games.append(table.getGamesTableHat());
		
		for (var i = 0; i < games.length; i++) {
			var game = games[i];
			var gameRow = table.getGameTableRow(game);
			$games.append(gameRow);
		}
        
        $('.btn-start').click(function(event) {
			var gameId = $(event.target).parents('.tab-row')[0].id;
            if (gameId === testGameId) gameId = 'test';
			
			if (gameId) {
				_.setNewPageUrl('game.html?gameID=' + gameId);
            }
		});	
		
		if (user.isAdmin) {
			$('.btn-kill').removeClass('hidden');
			$('.btn-kill').click(function(event) {
				var gameId = $(event.target).parents('.tab-row')[0].id;
				if (gameId) {
					if (gameId === testGameId) {
						api.games.cancelTest(getGames);
					} else {
						api.games.cancel(gameId, getGames);
					}
				}
			});
		}
	};
								 
	function getGames() {
		api.games.get(function (g) {			
			games = g; 
			api.games.getTest(function (t) {
				if (t) {
					if (t.status !== GameApi.GameStatus.canceled && t.status !== GameApi.GameStatus.finished) {
						games.push(t);
						testGameId = t.id;
					}
				}
				displayGames(games); 
			});			
		});				
	};
	
	$('#btnNewGame').click(function () {
		_.setNewPageUrl('newgame.html');		
	});
	
	$('#btnExit').click(function () {
		window.close();		
	});
})(jsHelper, TableAdapter);