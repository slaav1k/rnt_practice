var TableAdapter = {
    getMapsTableHat : function () {
		return '<li class="tab-row row">' + 
					'<div class="tab-cell map-data bold col-xs-3">Название</div>' +
					'<div class="tab-cell map-data bold col-xs-2">Полицейские</div>' +
					'<div class="tab-cell map-data bold col-xs-2">Воры</div>' +
					'<div class="tab-cell map-data bold col-xs-2">Размер(Ш/В)</div>' +
					'<div class="tab-cell map-data bold col-xs-3">Автор</div>' +
				'</li>'
	},
    
    getMapTableRow : function (map) {
		return 	'<li class="tab-row row" id="' + map.id + '">' + 
					'<div class="tab-cell map-data col-xs-3">' + map.name + '</div>' +
					'<div class="tab-cell map-data col-xs-2">' + map.policeCount + '</div>' +
					'<div class="tab-cell map-data col-xs-2">' + map.thiefCount + '</div>' +
					'<div class="tab-cell map-data col-xs-2">' + map.width + '/' + map.height + '</div>' +
					'<div class="tab-cell map-data col-xs-3">' + map.owner.nativeName + '</div>' +
				'</li>'
	},
	
	getGamesTableHat : function () {
		return 	'<li class="tab-row row">' + 
					'<div class="tab-cell bold col-xs-3">Название</div>' +
					'<div class="tab-cell bold col-xs-2">Кол-во игроков в команде</div>' +
					'<div class="tab-cell bold col-xs-2">Началась в</div>' +
					'<div class="tab-cell bold col-xs-3">Автор</div>' +
					'<div class="tab-cell bold col-xs-2"></div>' +
				'</li>'	
	},
		
	getGameTableRow : function (game) {
		var startDate = (game.startedAtUTC)? new Date(game.startedAtUTC).toLocaleTimeString() : null;
		
		return 	'<li class="tab-row row" id="' + game.id + '">' + 
					'<div class="tab-cell col-xs-3">' + game.name + '</div>' +
					'<div class="tab-cell col-xs-2">' + game.maxTeamSize + '</div>' +
					'<div class="tab-cell col-xs-2">' + (startDate || '-') + '</div>' +
					'<div class="tab-cell col-xs-3">' + game.owner.nativeName + '</div>' +
					'<div class="tab-cell col-xs-2"><span class="glyphicon glyphicon-menu-right btn-start"></span><span class="glyphicon glyphicon-remove btn-kill hidden"></span></div>' +
				'</li>'
	}
}