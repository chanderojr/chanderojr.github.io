var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -5,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:700,y:320},
                {type: 'sawblade',x:900,y:300},
                {type: 'sawblade',x:1400,y:325},
                {type: 'sawblade',x:1200,y:420},
                {type: 'sawblade',x:100,y:200},
                {type: 'enemy',x:1400,y:groundY-300},
                {type: 'enemy',x:800,y:groundY-350},
                {type: 'enemy',x:2000,y:groundY-400},
                {type: 'reward',x:600,y:groundY-350},
//                
//                
//                
//
//
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        
        
        // TODO 8 & 9: Level Data
        
//        function createSawBlade(x,y) {
//        var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
//            myObstacle.x = x;
//            myObstacle.y = y;
//            game.addGameItem(myObstacle);
//        var obstacleImage = draw.bitmap('img/sawblade.png');
//            myObstacle.addChild(obstacleImage);
//            obstacleImage.x = -25;
//            obstacleImage.y = -25;
//        }
//       for (var j = 0; j < levelData.gameItems.length; j++){
//          var gameItem = levelData.gameItems[j]; 
//            createSawBlade(gameItem.x, gameItem.y);
//       }
        
       // TODO 10: Roll Your Own Obstacles
        function createBox(x,y) {
        var box = game.createObstacle(hitZoneSize,damageFromObstacle);
            box.x = x;
            box.y = y;
            game.addGameItem(box);
            box.velocityX = -3
        var boxImage = draw.bitmap('http://www.pngall.com/wp-content/uploads/2/Fireball-PNG-Download-Image.png');    
            boxImage.scaleX = 0.1;
            boxImage.scaleY = 0.1;
            box.addChild(boxImage);
            boxImage.x = -40;
            boxImage.y = -45;
        }

        
        // TODO 11 & 12 & 13: Enemies!
        function createEnemy(x, y){
            var enemy =  game.createGameItem('enemy',80);
            enemy.x = x;
            enemy.y = groundY - y;
            game.addGameItem(enemy);
            enemy.velocityX = -1.75;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                enemy.onPlayerCollision = game.changeIntegrity(-50);    
            };
            enemy.onProjectileCollision = function() {
                console.log("Halle has hit the enemy");
                enemy.onProjectileCollision = game.increaseScore(500);
                enemy.shrink();
            };
            var redSquare = draw.bitmap('https://media.giphy.com/media/fRpPrq9WahpHq/giphy.gif');
            enemy.addChild(redSquare);
            redSquare.x = -125;
            redSquare.y = -150;
        }

       
       function createReward(x, y){
           var reward = game.createGameItem('reward', 25);
           reward.x = x;
           reward.y = groundY - y;
           game.addGameItem(reward);
           reward.velocityX = -2;
           var rewardImg = draw.bitmap('https://webstockreview.net/images/gas-clipart-rocket-fuel-8.png');
           rewardImg.scaleX = 0.1;
           rewardImg.scaleY = 0.1;
           reward.onPlayerCollision = function() {
               console.log('Halle has collected a reward');
               reward.onPlayerCollision = game.increaseScore(1500);
               reward.fadeOut();
           };
           
           reward.addChild(rewardImg);
           rewardImg.x = -40;
           rewardImg.y = -30;
           
       }
       
         
        for (var j = 0; j < levelData.gameItems.length; j++){
            var gameItem = levelData.gameItems[j];
            if (levelData.gameItems[j].type === 'sawblade'){
            createBox(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'enemy'){
            createEnemy(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'reward'){
            createReward(gameItem.x, gameItem.y);
            }
       }
       
       
       
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}