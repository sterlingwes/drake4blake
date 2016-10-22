var game = new Phaser.Game(640, 640, Phaser.AUTO, null, {preload: preload, create: create, update: update});

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

	game.load.tilemap('roads', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/levels.png');
	game.load.image('player', 'assets/player.png');
}

var map;
var layer;
var backgroundLayer;
var player;
var cursors;

function create() {
	game.physics.startSystem(Phaser.Physics.P2JS);

    map = game.add.tilemap('roads');
    map.addTilesetImage('Level', 'tiles');

    backgroundLayer = map.createLayer('Background');
	backgroundLayer.resizeWorld();
	backgroundLayer.debug = true;
	console.log(map.setCollision(0, true, backgroundLayer));
	console.log(game.physics.p2.convertTilemap(map, backgroundLayer, true));

	layer = map.createLayer('Roads').resizeWorld();

	var start = map.objects['Start'][0];
	player = game.add.sprite(start.x, start.y, 'player');

	game.physics.p2.enable(player, true);
	//player.body.collideWorldBounds = true;

	game.physics.p2.setBoundsToWorld(true, true, true, true, false);

	cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	player.body.setZeroVelocity();

    if (cursors.left.isDown) {
        player.body.moveLeft(400);
    } else if (cursors.right.isDown) {
        player.body.moveRight(400);
    }

    if (cursors.up.isDown) {
        player.body.moveUp(400);
    } else if (cursors.down.isDown) {
        player.body.moveDown(400);
    }
}