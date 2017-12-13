
// create Phaser.Game object named "game"
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'my-game',
    { preload: preload, create: create, update: update });

var Modes = {
    PREGAME: 0,
    NORMAL: 1,
    BOSS: 2
};
var backstoryText = "In a world where wizards and witches reside, our hero Callistus was 13 when he met his best friend Crispin. It was the news of the town, the hero Callistus befriended the weak Crispin. Many bullied Crispin, calling him Crispi and Pinhead. One day, Crispin couldn't take it anymore and ran away. 10 years later, he has come back to terrorize the town and Callistus must stop him or else. The world will end. Press Spacebar to start.";
    // declare global variables for game
    //arrowkey, enemy, back grounds,
var player, bricks, platformGroup, firstAidGroup, door, enemyGroup, startText, arrowKey, spacebar, healthBar, scoreText, laser, fireKey ,enemySound, powerUpSound, MCDeath, bulletSound, instructionText, winText, loseText;
var score=0;

    //sound variables
var backgroundMusic, bossBackgroundMusic;

var currentMode = Modes.PREGAME;
    // preload game assets - runs once at start
function preload() {
    game.load.image('bullet', 'assets/images/bullet.png');

    //player
    game.load.spritesheet('dude', 'assets/images/callistus.png', 32, 48);
   //health heart
    game.load.image('heart', 'assets/images/heart.png');
    //enemy
    game.load.spritesheet('enemy', 'assets/images/enemy.png', 32,36);
    //backgrounds
    game.load.image('bricks', 'assets/images/bricks.jpg');
    //platforms
    game.load.image('platform-125', 'assets/images/platform-125.png');
    game.load.image('platform-150', 'assets/images/platform-150.png');
    game.load.image('platform-175', 'assets/images/platform-175.png');
    game.load.image('platform-200', 'assets/images/platform-200.png');
    game.load.image('platform-225', 'assets/images/platform-225.png');
    game.load.image('platform-650', 'assets/images/platform-650.png');


    game.load.audio('background', 'assets/sounds/background.mp3');
    game.load.audio('death','assets/sounds/Callistus-Death.mp3');
    game.load.audio('bullet-noise','assets/sounds/shooting.mp3');
    //enemy
    //spit sound
    game.load.audio('fire', 'assets/sounds/shooting.mp3');
    game.load.audio('enemy-Sound', 'assets/sounds/enemydying.mp3');
    //enemy acid


    //health
    game.load.image('red-bar', 'assets/images/bar-red.png');
    game.load.image('green-bar', 'assets/images/bar-green.png');
    game.load.image('bar-outline', 'assets/images/bar-outline.png');
    //heart
    game.load.audio('power', 'assets/sounds/first-aid.mp3');
    //door
    game.load.spritesheet('door','assets/images/pixeldoor.png',30,42 );

}
    // create game world - runs once after "preload" finished
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1000, 1500);

    //background
     //>set in order like layers
        //background
    bricks = game.add.tileSprite(0, 0, 1000, 1500, 'bricks');
       // bricks.fixedToCamera = true;


            //actual platforms

    platformGroup = game.add.group();
    platformGroup.enableBody = true;

      //first platforms
    platformGroup.create(50,125, 'platform-175');
    platformGroup.create(50,1475, 'platform-175');
    platformGroup.create(150,250, 'platform-175');
    platformGroup.create(725,525, 'platform-175');
    platformGroup.create(50,775, 'platform-175');
    platformGroup.create(25,350, 'platform-175');
    platformGroup.create(50,925, 'platform-175');
    platformGroup.create(575,1150, 'platform-175');

    //second platform
    platformGroup.create( 350,1450, 'platform-150');
    platformGroup.create( 700,1350, 'platform-150');
    platformGroup.create( 525,1300, 'platform-150');
    platformGroup.create( 350,1225, 'platform-150');
    platformGroup.create( 825,325, 'platform-150');
    platformGroup.create( 300,875, 'platform-150');
    platformGroup.create( 625,975, 'platform-150');
    platformGroup.create( 375,1025, 'platform-150');
    platformGroup.create(750 ,725, 'platform-150');

    //third
    platformGroup.create(275,1350, 'platform-200');
    platformGroup.create(425,200, 'platform-200');
    platformGroup.create(825,325, 'platform-200');
    platformGroup.create(375,575, 'platform-200');
    platformGroup.create(40,625, 'platform-200');
    platformGroup.create(275,725, 'platform-200');
    platformGroup.create(75,1075, 'platform-200');
    platformGroup.create(650,425, 'platform-200');
    platformGroup.create(325,385, 'platform-200');

    //fourth
    platformGroup.create(525 ,1400, 'platform-125');
    platformGroup.create(550 ,125, 'platform-125');
    platformGroup.create(750 ,215, 'platform-125');
    platformGroup.create(875 ,925, 'platform-125');
    platformGroup.create(825 ,1075, 'platform-125');
    //platformGroup.create(275 ,1125, 'platform-125');


    //fifth
    platformGroup.create(50 ,475, 'platform-225');
    platformGroup.create(525 ,825, 'platform-225');
    platformGroup.create(25 ,1200, 'platform-225');

    //sixth
    platformGroup.create(175,50,'platform-650');

    platformGroup.setAll('body.immovable', true);

    //player
    door=game.add.sprite(425, 5,'door');

    firstAidGroup=game.add.group();
    firstAidGroup.enableBody = true;
    firstAidGroup.create(25 ,1175, 'heart');
    firstAidGroup.create(950,300, 'heart');
    firstAidGroup.setAll('anchor.set', 0.5);



    backgroundMusic = game.add.audio('background', 1);
    backgroundMusic.loop = true;
    backgroundMusic.play();



    //enemys
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;

    //add enemies to the game

    var enemyData = [
        { x:150, y:1440 }, { x:600, y:1263  }, { x:150, y:1163 },
        { x:450, y:990 }, { x:350, y:850 }, { x:350, y:560 },
        { x:800, y:510 }, { x:100, y:460 }, { x:525, y:285 },
        { x:750, y:180 }, { x:500, y:15 }
        // no comma after last item in array
        ];
      for (var i = 0; i < enemyData.length; i++) {
        var enemy = enemyGroup.create(enemyData[i].x, enemyData[i].y, 'enemy');
        enemy.anchor.set(0.5, 0.5);
        enemy.body.gravity.y = 300;
     //   enemy.body.bounce.x = 1;
        enemy.body.collideWorldBounds = true;
        enemy.animations.add('left', [0, 1, 2, 3], 10, true);
        enemy.animations.add('right', [5,6, 7,8], 10, true);
        enemy.body.velocity.x = Math.random() * 50 + 100; // between 100-150
        if (Math.random() < 0.5) enemy.body.velocity.x *= -1; // reverse direction
    }

    enemySound= game.add.audio('enemy-Sound', 1.5);
    powerUpSound=game.add.audio('power', 0.8);
    MCDeath=game.add.audio('death',1.5);
    bulletSound = game.add.audio('bullet-noise',0.8);
    laser = game.add.weapon(10, 'bullet');
    laser.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    laser.bulletSpeed = 600;
    laser.fireRate = 250;

      // set bullet collision area to match its visual size
    laser.setBulletBodyOffset(10, 10, 1, 1);

    player = game.add.sprite(0, 1500, 'dude');
   // player.anchor.set(0.5,0.5);


    game.physics.arcade.enable(player);
    player.body.gravity.y =450;
    player.body.collideWorldBounds = true;
    player.frame = 4;
    player.health = 100;
    player.maxHealth = 100;

    game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
    arrowKey = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    player.animations.add('left',[0,1,2,3,], 10,true);
    player.animations.add('right',[5,6,7,8,], 10,true);

    game.camera.follow(player);

    player.events.onKilled.add(function() {
      // player.reset(0, 1500, 100); //(x, y, health)
       healthBar.scale.setTo(player.health / player.maxHealth, 1);
       MCDeath.play();
    });

    laser.trackSprite(player, 20, 20, false);


      scoreText = game.add.text(20, 40, 'Score: ' + score, { fontSize: '20px', fill: '#222222' });
    //score moves when the camera moves
    scoreText.fixedToCamera = true;

    var healthText= game.add.text(20,20,'Health', {fontSize: '20px', fill: '#222222' });
    healthText.fixedToCamera=true;

    var barBackground, barOutline;
    barBackground = game.add.image(85, 20, 'red-bar');
    barBackground.fixedToCamera = true;
    healthBar= game.add.image(85,20, 'green-bar');
    healthBar.fixedToCamera= true;
    barOutline = game.add.image(85, 20, 'bar-outline');
    barOutline.fixedToCamera = true;
//distance traveled

//enemy spit acid

    startText=game.add.text(game.world.centerX, game.world.centerY+175, 'The Hero, Callistus', {font:'Georgia', fontSize:'30px', fontStyle:'bold', fill:'#CF0000'});
    startText.anchor.set(0.5,0.5);
    instructionText=game.add.text(game.world.centerX, game.world.centerY+275, 'Instructions: Arrow Keys to move...Press Spacebar To Begin!', {font:'Georgia', fontSize:'30px', fontStyle:'bold', fill:'#CF0000'});
        instructionText.anchor.set(0.5,0.5);

        winText=game.add.text(game.world.centerX, game.world.centerY+100, 'Congratulations! You have beat the demo. Press spacebar to dismiss.', {font:'Georgia', fontSize:'30px', fontStyle:'bold', fill:'black'});
        winText.anchor.set(0.5,0.5);
        winText.visible=false;

        loseText=game.add.text(game.world.centerX, game.world.centerY+100, 'Sorry, you need to kill all of the enemies. Press Spacebar to dismiss.', {font:'Georgia', fontSize:'30px', fontStyle:'bold', fill:'#CF0000'});
        loseText.anchor.set(0.5,0.5);
        loseText.visible=false;
}

// update gameplay - runs in continuous loop after "create" finished
function update() {

        game.physics.arcade.collide(player, enemyGroup);
        //game.physics.arcade.collide(enemyGroup, platformGroup);
        //Diamond, the code above kind of duplicates the one below, so I think only the first was happening
        game.physics.arcade.collide(enemyGroup, platformGroup, patrolPlatform, null, this);
        game.physics.arcade.overlap(player, enemyGroup, touchEnemy,null,this);
        game.physics.arcade.collide(laser.bullets , enemyGroup, shootEnemy, null,this);
        game.physics.arcade.overlap(player, firstAidGroup, refillLife, null, this);
        game.physics.arcade.collide(player,door,endGame,null,this);

    //console.log(arrowKey.up.justDown);
    if(currentMode == Modes.PREGAME) {
        if(spacebar.justDown) {
            startGame();
        }
    } else {
        game.physics.arcade.collide(player, platformGroup);

         if (arrowKey.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
           laser.fireAngle=0;
        }
        else if (arrowKey.left.isDown){
            player.body.velocity.x= -150;
            player.animations.play('left');
            laser.fireAngle=180;
        }

        else {
            player.body.velocity.x=0 ;
            player.animations.stop();
            player.frame= 4;
        }
    }
        //Only jump if on floor or platform
        if (arrowKey.up.justDown & (player.body.onFloor() || player.body.touching.down)){
            player.body.velocity.y= -350;
        }

        if (spacebar.justDown){
            laser.fire();
            bulletSound.play();
        }





        //background movements
      // bricks.tilePosition.x = game.camera.x* -0.2;
        //collision w/ enemy and other harmful objects

         // CHECK Enemy ANIMATIONS
        enemyGroup.forEach(function (enemy) {
            if (enemy.body.velocity.x < 0) enemy.animations.play('left');
            else enemy.animations.play('right');
        });

    }




// add custom functions (for collisions, etc.)
function startGame() {
    // fade out start text
    currentMode = Modes.NORMAL;
    game.add.tween(startText).to({alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);
    game.add.tween(instructionText).to({alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);
 }

function patrolPlatform(enemy, platform) {
    // if enemy/cat about to go over right or left edge of platform
    if (enemy.body.velocity.x > 0 && enemy.right > platform.right
    || enemy.body.velocity.x < 0 && enemy.left < platform.left) {
        enemy.body.velocity.x *= -1; // reverse direction
    }
}
function endGame(player,door){
    if(enemyGroup.countLiving() >= 0){
        winText.visible=true;
        game.add.tween(winText).to({alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);
    }

    else{
        loseText.visible=true;
        game.add.tween(loseText).to({alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);

    }

}
function touchEnemy(player, enemy){
    enemy.body.velocity.x *= -1;
    enemy.body.velocity.y = 100;
    if (player.x < enemy.x) enemy.x += 20;
    else enemy.x -= 20;
    player.damage(20);
    healthBar.scale.setTo(player.health / player.maxHealth, 1);

}

function shootEnemy (laser, enemy){
    enemy.kill();
    laser.kill();
    enemySound.play();

     score = score + 250;
     scoreText.text= 'Score ' + score
}
function refillLife(player, firstAid) {
    firstAid.kill();
    player.health = 100;
    healthBar.scale.setTo(player.health / player.maxHealth, 1)
    powerUpSound.play();}
