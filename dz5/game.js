let canvas = document.getElementById('map');
let gameController = new GameController(canvas);
let dif_time;


function displayMap(map) {
    if (map) {
        let context = canvas.getContext('2d');
        let blockSizeX = canvas.clientWidth / map.width;
        let blockSizeY = canvas.clientHeight / map.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < map.cells.length; i++) {
            let cell = map.cells[i];
            let x = parseInt(i / map.height);
            let y = i % map.height;
            displayCell(context, x, y, cell, blockSizeX, blockSizeY);
        }
    }
}

function displayCell(context, x, y, type, blockSizeX, blockSizeY) {
    let img = defineCellType(type);
    if (img) {
        context.drawImage(img, x * blockSizeX, y * blockSizeY, blockSizeX, blockSizeY);
    }
}

function defineCellType(type) {
    switch (type) {
        case GameApi.MapCellType.empty:
        default:
            return gameController.icons.empty || null;
        case GameApi.MapCellType.wall:
            return gameController.icons.wall || null;
        case GameApi.MapCellType.coin:
            return gameController.icons.coin || null;
        case GameApi.MapCellType.life:
            return gameController.icons.life || null;
        case GameApi.MapCellType.swtch:
            return gameController.icons.switch || null;
        case GameApi.MapCellType.thiefRespawn:
            return gameController.icons.empty || null;
        case GameApi.MapCellType.policeRespawn:
            return gameController.icons.empty || null;
        case 7:
            return gameController.icons.police || null;
        case 8:
            return gameController.icons.thief || null;
    }
}


function displayPlayers(players) {
    if (players) {
        let context = canvas.getContext('2d');
        let blockSizeX = canvas.clientWidth / gameController.game.map.width;
        let blockSizeY = canvas.clientHeight / gameController.game.map.height;

        players.forEach(player => {
            let x = player.location.x * blockSizeX;
            let y = player.location.y * blockSizeY;
            context.drawImage(player.icon, x, y, blockSizeX, blockSizeY);
        });
    }
}

function incrementProgress() {
    let progressBar = document.getElementById('progressBar');
    if (progressBar) {
        let currentProgress = parseFloat(progressBar.style.width) || 0;

        dif_time = gameController.game.switchTimeout - gameController.remainingSwitchTime;
        console.log(dif_time);
        let stepIncrement;
        if (dif_time != gameController.game.switchTimeout)
            {
                stepIncrement = 100 / ((gameController.game.switchTimeout - dif_time) / 100);
            }
        else
        {
            stepIncrement = 100 / (gameController.game.switchTimeout / 100);
        }
        currentProgress = (currentProgress + stepIncrement) % 100;
        progressBar.style.width = currentProgress + '%';
    }
}



// Функция для логирования
function log(message) {
    let logBox = document.getElementById('log');
    if (logBox) {
        logBox.value += message + '\n';
        logBox.scrollTop = logBox.scrollHeight; 
    }
}



document.getElementById('btnStart').addEventListener('click', function() {
    gameController.start();
    
});

document.getElementById('btnStop').addEventListener('click', function() {
    gameController.stop();
});

document.getElementById('btnCancel').addEventListener('click', function() {
    gameController.cancel();
});

document.getElementById('btnRestart').addEventListener('click', function() {
    gameController.reconnect();
});

document.getElementById('btnDisconnect').addEventListener('click', function() {
    gameController.disconnect();
});

document.getElementById('btnExit').addEventListener('click', function() {
    gameController.leave();
});

document.getElementById('btnConnetct').addEventListener('click', function() {
    gameController.join();
});


document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: 
            gameController.movePlayer(1); 
            break;
        case 38:
            gameController.movePlayer(0); 
            break;
        case 39: 
            gameController.movePlayer(2); 
            break;
        case 40: 
            gameController.movePlayer(3); 
            break;
    }
});

gameController.displayMap = displayMap;
gameController.displayPlayers = displayPlayers;
gameController.incrementProgress = incrementProgress;
gameController.log = log;
