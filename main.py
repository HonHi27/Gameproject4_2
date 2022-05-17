class ActionKind(Enum):
    Walking = 0
    Idle = 1
    Jumping = 2
@namespace
class SpriteKind:
    Bumper = SpriteKind.create()
    Flies = SpriteKind.create()
def MoveGroundEnemy():
    for GEnemy in sprites.all_of_kind(SpriteKind.Bumper):
        if GEnemy.is_hitting_tile(CollisionDirection.LEFT):
            GEnemy.vx = randint(30, 60)
            GEnemy.set_image(assets.image("""
                myImage
            """))
        elif GEnemy.is_hitting_tile(CollisionDirection.RIGHT):
            GEnemy.vx = randint(-60, -30)
            GEnemy.set_image(assets.image("""
                myImage1
            """))

def on_on_overlap(sprite, otherSprite):
    if sprite.vy > 0 and not (sprite.is_hitting_tile(CollisionDirection.BOTTOM)) or sprite.y < otherSprite.top:
        if COUNT % 2 != 0:
            otherSprite.destroy(effects.spray, 200)
            otherSprite.vy = -50
            sprite.vy = -2 * pixelToMeter
        else:
            statusbar.value += -3
    else:
        statusbar.value += -3
    if statusbar.value == 0:
        info.change_life_by(-1)
        statusbar.value += 100
sprites.on_overlap(SpriteKind.player, SpriteKind.Bumper, on_on_overlap)

def on_up_pressed():
    global COUNT
    if controller.B.is_pressed():
        COUNT += 1
    if mySprite.vy == 0:
        if COUNT % 2 == 0:
            mySprite.vy = -175
        else:
            mySprite.vy = -215
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap2(sprite2, otherSprite2):
    otherSprite2.destroy()
    statusbar.value += -5
    if statusbar.value == 0:
        info.change_life_by(-1)
        statusbar.value += 100
sprites.on_overlap(SpriteKind.player, SpriteKind.Flies, on_on_overlap2)

def on_b_pressed():
    ChangeForm()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def CreatFlyEnemy():
    global FlyEnemy
    for FEnemy in tiles.get_tiles_by_type(assets.tile("""
        myTile1
    """)):
        FlyEnemy = sprites.create(assets.image("""
            myImage0
        """), SpriteKind.Flies)
        tiles.place_on_tile(FlyEnemy, FEnemy)
        tiles.set_tile_at(FEnemy, assets.tile("""
            transparency16
        """))
        animation.run_image_animation(FlyEnemy,
            [img("""
                    . . f f f . . . . . . . . f f f 
                                . f f c c . . . . . . f c b b c 
                                f f c c . . . . . . f c b b c . 
                                f c f c . . . . . . f b c c c . 
                                f f f c c . c c . f c b b c c . 
                                f f c 3 c c 3 c c f b c b b c . 
                                f f b 3 b c 3 b c f b c c b c . 
                                . c 1 b b b 1 b c b b c c c . . 
                                . c 1 b b b 1 b b c c c c . . . 
                                c b b b b b b b b b c c . . . . 
                                c b 1 f f 1 c b b b b f . . . . 
                                f f 1 f f 1 f b b b b f c . . . 
                                f f 2 2 2 2 f b b b b f c c . . 
                                . f 2 2 2 2 b b b b c f . . . . 
                                . . f b b b b b b c f . . . . . 
                                . . . f f f f f f f . . . . . .
                """),
                img("""
                    . . f f f . . . . . . . . . . . 
                                f f f c c . . . . . . . . f f f 
                                f f c c c . c c . . . f c b b c 
                                f f c 3 c c 3 c c f f b b b c . 
                                f f c 3 b c 3 b c f b b c c c . 
                                f c b b b b b b c f b c b c c . 
                                c c 1 b b b 1 b c b b c b b c . 
                                c b b b b b b b b b c c c b c . 
                                c b 1 f f 1 c b b c c c c c . . 
                                c f 1 f f 1 f b b b b f c . . . 
                                f f f f f f f b b b b f c . . . 
                                f f 2 2 2 2 f b b b b f c c . . 
                                . f 2 2 2 2 2 b b b c f . . . . 
                                . . f 2 2 2 b b b c f . . . . . 
                                . . . f f f f f f f . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . c c . c c . . . . . . . . 
                                . . f 3 c c 3 c c c . . . . . . 
                                . f c 3 b c 3 b c c c . . . . . 
                                f c b b b b b b b b f f . . . . 
                                c c 1 b b b 1 b b b f f . . . . 
                                c b b b b b b b b c f f f . . . 
                                c b 1 f f 1 c b b f f f f . . . 
                                f f 1 f f 1 f b c c b b b . . . 
                                f f f f f f f b f c c c c . . . 
                                f f 2 2 2 2 f b f b b c c c . . 
                                . f 2 2 2 2 2 b c c b b c . . . 
                                . . f 2 2 2 b f f c c b b c . . 
                                . . . f f f f f f f c c c c c . 
                                . . . . . . . . . . . . c c c c
                """),
                img("""
                    . f f f . . . . . . . . f f f . 
                                f f c . . . . . . . f c b b c . 
                                f c c . . . . . . f c b b c . . 
                                c f . . . . . . . f b c c c . . 
                                c f f . . . . . f f b b c c . . 
                                f f f c c . c c f b c b b c . . 
                                f f f c c c c c f b c c b c . . 
                                . f c 3 c c 3 b c b c c c . . . 
                                . c b 3 b c 3 b b c c c c . . . 
                                c c b b b b b b b b c c . . . . 
                                c 1 1 b b b 1 1 b b b f c . . . 
                                f b b b b b b b b b b f c c . . 
                                f b c b b b c b b b b f . . . . 
                                . f 1 f f f 1 b b b c f . . . . 
                                . . f b b b b b b c f . . . . . 
                                . . . f f f f f f f . . . . . .
                """)],
            100,
            True)
def Climb():
    global Fire
    if mySprite.is_hitting_tile(CollisionDirection.LEFT) or mySprite.is_hitting_tile(CollisionDirection.RIGHT) and mySprite.vy >= 0:
        mySprite.vy = 0
        mySprite.ay = 0
        mySprite.set_image(img("""
            ........ccc.............
                        .......c555cccc.........
                        ......c5555b555c........
                        .....c555d5b335cc....cc.
                        .....c555553335cdc...cc.
                        ....c55555513b5ccccccdc.
                        ....c5551f5bb5dbbbbcddc.
                        ....c555ff5b55dbccbbcdc.
                        ....c555f5555ddb55cbbccc
                        ...cc55555555dbb55cbccdc
                        ..ccc5555555ddb55b555d5c
                        ..cccc555555dd555c555d5c
                        ..cc.c55555ddd55b555dd5c
                        .....cb5555dddbbdd5ddddc
                        ....cccb5555ddddddddbbdc
                        ....ccc.b5555ddddddbbccc
                        ....cc..cb555dddddddbbc.
                        .......cccbbdddddddddbc.
                        .......cc...cbdddddddc..
                        ...........cc.cccbdddc..
                        ...........cc.ccccddc...
                        ..............cc.cddc...
                        .................cdc....
                        .................cc.....
        """))
        if COUNT % 2 == 0 and controller.A.is_pressed():
            Fire = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . 3 3 3 3 3 3 3 . . . . 
                                    . . . . 3 3 1 1 1 1 1 3 3 . . . 
                                    . . . . 2 1 1 1 1 1 1 1 2 . . . 
                                    . . . . 2 2 1 1 1 1 1 2 2 . . . 
                                    . . . 3 3 2 3 3 1 3 3 2 3 3 . . 
                                    . . 3 3 . . 2 3 1 3 2 . . 3 3 . 
                                    . . 1 . . . 2 3 1 3 2 . . . 1 . 
                                    . . 1 3 . . . 3 1 3 . . . 3 1 . 
                                    . . . 1 1 3 3 3 3 3 3 3 1 1 . . 
                                    . . . . . 1 1 1 1 1 1 1 . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                mySprite,
                0,
                -64)
    else:
        mySprite.ay = 350
    if mySprite.is_hitting_tile(CollisionDirection.LEFT) or mySprite.ax < 0:
        mySprite.set_image(img("""
            .............ccc........
                        .........cccc555c.......
                        ........c555b5555c......
                        .cc....cc533b5d555c.....
                        .cc...cdc533355555c.....
                        .cdcccccc5b31555555c....
                        .cddcbbbbd5bb5f1555c....
                        .cdcbbccbd55b5ff555c....
                        cccbbc55bdd5555f555c....
                        cdccbc55bbd55555555cc...
                        c5d555b55bdd5555555ccc..
                        c5d555c555dd555555cccc..
                        c5dd555b55ddd55555c.cc..
                        cdddd5ddbbddd5555bc.....
                        cdbbdddddddd5555bccc....
                        cccbbdddddd5555b.ccc....
                        .cbbddddddd555bc..cc....
                        .cbdddddddddbbccc.......
                        ..cdddddddbc...cc.......
                        ..cdddbccc.cc...........
                        ...cddcccc.cc...........
                        ...cddc.cc..............
                        ....cdc.................
                        .....cc.................
        """))
        mySprite.set_image(mySprite.image)
        if COUNT % 2 == 0 and controller.A.is_pressed():
            Fire = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . 3 3 3 3 3 3 3 . . . . 
                                    . . . . 3 3 1 1 1 1 1 3 3 . . . 
                                    . . . . 2 1 1 1 1 1 1 1 2 . . . 
                                    . . . . 2 2 1 1 1 1 1 2 2 . . . 
                                    . . . 3 3 2 3 3 1 3 3 2 3 3 . . 
                                    . . 3 3 . . 2 3 1 3 2 . . 3 3 . 
                                    . . 1 . . . 2 3 1 3 2 . . . 1 . 
                                    . . 1 3 . . . 3 1 3 . . . 3 1 . 
                                    . . . 1 1 3 3 3 3 3 3 3 1 1 . . 
                                    . . . . . 1 1 1 1 1 1 1 . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . 2 1 2 . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                mySprite,
                0,
                -64)

def on_a_pressed():
    global Fire
    if COUNT % 2 == 0:
        if character.matches_rule(mySprite, character.rule(Predicate.MOVING_LEFT)):
            mySprite.set_image(img("""
                ........................
                                ........................
                                ........................
                                ..........ccc...........
                                .........cccc...........
                                .....ccccccc..ccc.......
                                ...cc555555cccccc.......
                                ..c5555555555bcc........
                                .c555555555555b..cc.....
                                c555555ccb55555bccc.....
                                c55d55c555555555bc......
                                c5555555555555555b......
                                .cbbb1bb5555dd555b.cc...
                                .c533bbbb5ddddd55dcc....
                                .c533bbbb5ddddddddbcc...
                                .c533bbb55dddddddddcccc.
                                .c5333bb5bb55bdddddcccdc
                                .c5333b5bb555bddddddbddc
                                .c53335b5555bddddddddddc
                                ..c5555c55bb55dbddddddcc
                                ...cccbccc55ddbbbddddcc.
                                ....cdddccddddbcbbbcc...
                                ....cccccd555ddcccc.....
                                ........cccccccc........
            """))
            Fire = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . 3 1 1 . . . . . . . 
                                    . . . . . 3 3 . 3 1 . . . . . . 
                                    . . 3 2 2 3 . . . 1 . . . . . . 
                                    . 3 3 1 2 2 . . . 3 1 . . . . . 
                                    . 3 1 1 1 3 2 2 . 3 1 . . . . . 
                                    . 3 1 1 1 3 3 3 3 3 1 2 2 2 . . 
                                    . 3 1 1 1 1 1 1 1 3 1 1 1 1 . . 
                                    . 3 1 1 1 3 3 3 3 3 1 2 2 2 . . 
                                    . 3 1 1 1 3 2 2 . 3 1 . . . . . 
                                    . 3 3 1 2 2 . . . 3 1 . . . . . 
                                    . . 3 2 2 3 . . . 1 . . . . . . 
                                    . . . . . 3 3 . 3 1 . . . . . . 
                                    . . . . . . 3 1 1 . . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                mySprite,
                -64,
                0)
        if character.matches_rule(mySprite, character.rule(Predicate.MOVING_RIGHT)):
            mySprite.set_image(img("""
                ........................
                                ........................
                                ........................
                                ...........ccc..........
                                ...........cccc.........
                                .......ccc..ccccccc.....
                                .......cccccc555555cc...
                                ........ccb5555555555c..
                                .....cc..b555555555555c.
                                .....cccb55555bcc555555c
                                ......cb555555555c55d55c
                                ......b5555555555555555c
                                ...cc.b555dd5555bb1bbbc.
                                ....ccd55ddddd5bbbb335c.
                                ...ccbdddddddd5bbbb335c.
                                .ccccddddddddd55bbb335c.
                                cdcccdddddb55bb5bb3335c.
                                cddbddddddb555bb5b3335c.
                                cddddddddddb5555b53335c.
                                ccddddddbd55bb55c5555c..
                                .ccddddbbbdd55cccbccc...
                                ...ccbbbcbddddccdddc....
                                .....ccccdd555dccccc....
                                ........cccccccc........
            """))
            Fire = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . 1 1 3 . . . . . . 
                                    . . . . . . 1 3 . 3 3 . . . . . 
                                    . . . . . . 1 . . . 3 2 2 3 . . 
                                    . . . . . 1 3 . . . 2 2 1 3 3 . 
                                    . . . . . 1 3 . 2 2 3 1 1 1 3 . 
                                    . . 2 2 2 1 3 3 3 3 3 1 1 1 3 . 
                                    . . 1 1 1 1 3 1 1 1 1 1 1 1 3 . 
                                    . . 2 2 2 1 3 3 3 3 3 1 1 1 3 . 
                                    . . . . . 1 3 . 2 2 3 1 1 1 3 . 
                                    . . . . . 1 3 . . . 2 2 1 3 3 . 
                                    . . . . . . 1 . . . 3 2 2 3 . . 
                                    . . . . . . 1 3 . 3 3 . . . . . 
                                    . . . . . . . 1 1 3 . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                mySprite,
                64,
                0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    character.loop_frames(mySprite,
        assets.animation("""
            Left
        """),
        100,
        character.rule(Predicate.MOVING_LEFT))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_overlap_tile(sprite3, location):
    global Level
    Level += 1
    startLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile3
    """),
    on_overlap_tile)

def FlyEnemyFollow():
    for Fly in sprites.all_of_kind(SpriteKind.Flies):
        if abs(Fly.x) - abs(mySprite.x) < 60:
            if Fly.x - mySprite.x < -5:
                Fly.vx = 25
            elif Fly.x - mySprite.x > 5:
                Fly.vx = -25
            if Fly.y - mySprite.y < -5:
                Fly.vy = 25
            elif Fly.y - mySprite.y > 5:
                Fly.vy = -25
        else:
            Fly.vy = -25
            Fly.vx = 0

def on_on_overlap3(sprite4, otherSprite3):
    Fire.destroy(effects.fire, 1)
    sprite4.destroy()
sprites.on_overlap(SpriteKind.Bumper, SpriteKind.projectile, on_on_overlap3)

def on_right_pressed():
    character.loop_frames(mySprite,
        assets.animation("""
            Right
        """),
        100,
        character.rule(Predicate.MOVING_RIGHT))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def CreatGroundEnemy():
    global Enemies
    for GEnemy2 in tiles.get_tiles_by_type(assets.tile("""
        myTile
    """)):
        Enemies = sprites.create(assets.image("""
            myImage1
        """), SpriteKind.Bumper)
        tiles.place_on_tile(Enemies, GEnemy2)
        tiles.set_tile_at(GEnemy2, assets.tile("""
            transparency16
        """))
        Enemies.ay = gravity
        if Math.percent_chance(100):
            Enemies.vx = randint(50, 100)
        else:
            Enemies.vx = randint(-100, -50)

def on_overlap_tile2(sprite5, location2):
    game.over(False)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile2)

def ChangeForm():
    global COUNT
    COUNT += 1
    if COUNT % 2 == 0:
        mySprite.change_scale(0.35, ScaleAnchor.MIDDLE)
    if COUNT % 2 != 0:
        mySprite.change_scale(-0.35, ScaleAnchor.MIDDLE)
def startLevel():
    if Level == 0:
        tiles.set_current_tilemap(tilemap("""
            level4
        """))
    elif Level == 1:
        tiles.set_current_tilemap(tilemap("""
            level9
        """))
        CreatFlyEnemy()
        CreatGroundEnemy()
        FlyEnemyFollow()
        MoveGroundEnemy()
    elif Level == 2:
        tiles.set_current_tilemap(tilemap("""
            level4
        """))
        CreatFlyEnemy()
        CreatGroundEnemy()
        MoveGroundEnemy()
        FlyEnemyFollow()
    else:
        game.over(True, effects.slash)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        myTile0
    """))
def creatPlayer():
    global mySprite, statusbar
    mySprite = sprites.create(img("""
            ........................
                    ........................
                    ...........ccc..........
                    ...........cccc.........
                    .......ccc..ccccccc.....
                    .......cccccc555555cc...
                    ........ccb5555555555c..
                    .....cc..b555555555555c.
                    .....cccb555555ff155555c
                    ......cb55555555ff55d55c
                    ......b5555555555555555c
                    ...cc.b555dd5555bb13bbc.
                    ...cccd55ddddd555b3335c.
                    .....bdddddddddd55b335c.
                    ..cccdddddb55bbddd5555c.
                    ..cccdddddb555bbbbcccc..
                    ...ccddddddb5555cbcdc...
                    ccccbdddddd5cb55cbcc....
                    cddddddddd5555ccbbc.....
                    .cddddddbdd555bbbcc.....
                    ..ccdddbbbdd55cbcdc.....
                    ....ccbbcbddddccdddcc...
                    ......cccdd555dcccccc...
                    ........cccccccc........
        """),
        SpriteKind.player)
    controller.move_sprite(mySprite, 30, 0)
    scene.camera_follow_sprite(mySprite)
    statusbar = statusbars.create(20, 4, StatusBarKind.health)
    statusbar.attach_to_sprite(mySprite)
    statusbar.max = 100
Enemies: Sprite = None
Level = 0
Fire: Sprite = None
FlyEnemy: Sprite = None
statusbar: StatusBarSprite = None
COUNT = 0
mySprite: Sprite = None
gravity = 0
pixelToMeter = 0
startLevel()
creatPlayer()
scene.set_background_image(img("""
    fffffffcbccffffffffffcfbddddddddddd111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbffcddffffffcfcfffff
        fffffffccffffcffffffbfddddddddd11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfccdbffffffffffffff
        fffffffcffffffbffffffddddddddd1111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffcbfffffffffffcdcf
        ffffffcffffffffbdffffddddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffdfbfffffff
        fcfffffffcdcdffdffdccdddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbffffffdffffffff
        fffffffffdbddcfffffcddddd1111111111111111111111111111111111111111111dddd1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfcfffffcfffbfff
        fcffffbffbffffffffbbddddd111111111111111111111111111111111111111111d11dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdcfffffffffbffff
        fcbffffffcfffffffcdddd1111111111111111111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffffffffff
        fdcccffffdbffcffccdddd111111111111111111cc1111111111111111111111111d111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffff
        fffffffffffffffcdddd1111111111111111111cccc111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfcfffffffffffff
        ffffffffffffffcbddd11111111111111111111cccc11111111111111111111111111111dddd1ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffffff
        fffffffddcfffdddddd11111111111111111111ccccc11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff
        fffffffdddbffbddd111111111111111111111cccccc111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffcffffffffff
        ffffffcbfcccddddd111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfffffffffffff
        fffffffffcfddddd1111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffff
        ffffffffdfcdddd1111111d11111d111111111cccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfbfffcfffffff
        ffffffffcfbddd11111111111111111111111ccccccccc1111111111111111111111111111111111d1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfffdffffffff
        fffffffcdcdddd11111111111111111111111cccccccccc1111111ccc111111111ccc111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffff
        fffffbfffcddd11111111111111111111111ccccccccccc1111111cccc111c1111ccc11111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        fccffdcbfbddd11111111111111111111111cccccccccccc111111cccc11ccc111ccc1111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        fffcffcdfbdd11111111111111111111111ccccccccccccccc1111cc1c11ccc11cccc111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        ffddfffbbbdd1111111111111111111111cccccccccccccccc1111cc1c11ccc11c11c111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfccfffffffff
        cfdffffbcdd11111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfcdfffffffff
        ffffffccdd111111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfbfffffffff
        ffcfffbdb111111111111111111111111111cccccccccccc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbdddddddddddddddcfdbffffffff
        fffffcddddd1111111111111111111111111cc1cc1ccd1cc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbfcfffffffff
        fffffbdddd11111111111111111111111111cc1cc1ccc1cc1111111ccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddcfcfffffffff
        ffffcbddddd1111111111111111111111111cccccccccccc11111111ccccccccccc11111111111111111d1ddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbcfffffffffff
        fffccddddd11111111111111111111111111cccccccccccc111111111cccccccccc11111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbdddddddddddddddbbffffffffffff
        ffdcbddddd11111111111111111111111111cccccccccccc111111111ccccccccc111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbffffffffffcf
        ffccddddddd11111111111111111111111111cccccccccc1111111111ccccccccc1111111111111111111dddddddddddddddddddddddddddddddddddddddddddddbddddddbbdddddddbcffffffffffff
        ffcbdddddd1111111111111111111111111111cccccccc11b11111111ccccccccc111111111111bb1111ddddddddddddddddddddddddddddddddddddddddddbbddbbdddddbbdddddddbccfffffffffff
        ffcbddddd111111111111111111111111111111cccccccbccccccc111ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbddbddddddbddddddddfffffffffffff
        fcbbdddddd1111111111cccb1ccc1111cccc111ccccccccccccccccc1ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbbdbbdddddbdbddddbbbcfffffffffff
        fcddddddd1111111111ccccb1cccc11ccccc111cccccccccbbccbbbccccccccccc1111111111111b111ddddddddddddddddddddddddddbdddddddddddddddddddbddbbddddbbbddbbbcfffffffffffff
        ccddddddd1111111111cccccbcccc11ccccc111cccccccccbbcccbbccccccccccc111111111111111111dddddddddddddddddddddddddbbdddddddddddddddddddbddbddddbbddbbbbffffffffffffff
        ddddddddd1111111111ccc1ccccccccc1ccc111ccccccccccccccccccccccccccc1111111111111b111bdddddddddddddddddddddddddbbdddddddddddddddddddbbbbddddbddbbbbccfffffffffffff
        dddddddd11111111111cc11ccc11cccc1ccc111ccccccccc1111cccccccccccccc1111111111111b111bddd1dddddddddddddddddddddbdddbdddddddddddddddddbbbddddbbbbbbbccfffffffffffff
        dddddddd11111111111cccccccbcccccccccc11cccccccc1111111cccccccccccc1111111111111b111bddd1dddddddddddddddddddddbddbbdddddddddddddddddbbbdddbbbbbbbbccfffffffffffff
        dddddddd11111111111ccccccccccccccccc111ccccccc1111b1111ccccccccccc1111111111111b1dbb1ddddddddddddddbbbbddddddbddbdddddddddddddddddddbbdddbbbbbbbccffffffffffffff
        dddddddddd111111111cccccccccccccccc1bb1ccccccc1111bb111ccccccccccc11111b1111111b1dbbdddddddddddddddbddbbbddddbdbddddddddddddddddddddbbddbbbbbbbbcbffffffffffffff
        dddddddddd1111111111cccccccccccccccccccccccccc111111111cccccccccccbb11111111111b1db1dddddddddddddddbdddbbddddbbdddddddddddddddddddddbbdbbbbbbbbccfffffffffffffff
        dddddddddd11111111111cccccccccccccbccbbccccccc1111111b1cccccccccccbbbb111111111b1db1ddd1ddddddddddbbdddbbbddbbdddddddddddbbddddddddbbbbbbbbbbbcbbcffffffffffffff
        ddddddddd1d11111111111ccccccccccccbbcbbccccccc1111111b1cccccccccccc1b1111111111bbbddddd1dddddddddbbdddddbbdbbddddddddddddbdddddddddbbbbbbbbbbccbcfffffffffffffff
        ddddddddd1d11b11111111ccccccccccccbccbcccccccc111111bb1cccccccccccc111111111111bbbdddddddddddddddbbdddddbbbbbddddddddddddbdddddddddbbbbbbbbbbbbcffffffffffffffff
        ddddddddd1d11b11111111cccccccccccccccccccccccc1111111bbcccccccccccc11111111111bbbdddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbccfffffffffffffffff
        dddddddddddddbbd1bb111cccccccccccc111d1cccccccd1d1111bbcccccccccccc11111111111bbb1ddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbbccffffffffffffffff
        dddddddddddddbbd1b1111ccccccccccccddbccccccccccc1ddddbccccccccccccc11111111bb1bb11dddbddddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddbd1b11bbccccccccccccccccccccccccccbcccccccccccccccccb1d111111bbbbbdddddbbdddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddbb1b11bbccccccccccccccccccccccccccccccccccccccccccccd1111b1111bbb11ddddbbdddddddddddddddddbbbbddddddddddddbbdddddbbbbbbbbbbbbbbcffffffffffffffffff
        dddddddddddddddb1b1db1ccccccccccccccccccccccccccccccccccccccccccccc1111d1111bbb11dddddbbddddddddddddddddbbbbbddddddddddddbdddddbbbbbbbbbbbbbbbcfffffffffffffffff
        ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1111d1111bbbddddddddbddddddddddddddddbbbbbddddddddddddbbdddbbbbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1b11d1111bbbddddddddbbdbbddddddddddddbbbbbddddddddddddbbddbbbbbbbbbbbbbbbcfcffffffffffffffcff
        ddddddddddddddddbb1b11cccccccccccccccccccccccccccccccccccccccccccccbbb111111bbbddddddddbbdbdddddddbbddddbbbbbdddddddddddbbbbbbbbbbbbbbbbbbbccfffffffffffffffffff
        ddddddddddddddddbddbd1ccccccccccccccccccccccccccccccccccccccccccccbbb111d111bbbb1dddddddbbbdddddddbbddddbbbbbddddddddbdbbbbbbbbbbbbbbbbbbbbcfcffffffffffffffffff
        ddddddddddddddddbbb111cccccccccccccccccccccccccccccccccccccccccccc1bb1111111bbbbddddddddbbbdddddddbdddddbbbbbddddbdddbdbbbbbbbbbbbbbbbbbbbbffffffffffffffffffcff
        ddddddddddddddddbbd111ccccccccccccccccccccccccccccccccccccccccccccd1bbb11111bbbbdddddddddbbddddddbbdddddbbbbbdddbbdddbbbbbbbbdbbbbbbbbbbbbcfffffffffffffffffffff
        ddddddddddddddddbbdd1dcccccccccccccccccccccccccccccccccccccccccccc111bb11111bbbbdddd1ddddbbddddddbbdddddbbbbbdddbbddddddbdddddddddbbbbbbbbcfffffffcfffffffffffff
        dddddddbbdddddbbbbddddcccccccccccccccccccccccccccccccccccccccccccc111bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbddddbdbdddddddddddddddddddddddfffffffffffffffffffff
        dbddddddddbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccbcccccb11bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbbdddddddddddddddbddddddddddbbcfffffffffffffffffffff
        ddbddbddbbbbbbbbbbbbbbcccccccccccccccccccccccccccccbccccccccccccccd11b11111bbbbbbddddddddbbbdddddbbddddbbbbbbdddddddddddddddddddddddddddbcffffffffffffffffffffff
        dbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccc111bb111bbbbbbbbdddddddbbbbddddbbdddbbbbbbddddddddddddddddddddddddddbbbcdfffffffffffffffffffff
        bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbb1bb1bbbbbbbbbbbbdddddbbbbddddbbddbbbbddbbdddddddddddddddddddbddddbccfddfffffffffffffffffffff
        dbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddbdddddddddddddbcffffffffffffffffffffffffff
        bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbdbddddbdddddddddddddddddddddddddddccffffffffffffffffffffffffff
        bbbbbbbbddbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbddddddddddddddddddddddbdddddbbbffbdfffffffffffffffffffffff
        bbbbbbbdddddbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbddddbddddddddbdddddddddddddddddddddddddddbddfcbfdffffffffffffffffffffff
        bbbbddddddddddddddbbbbcccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddbdffdffbcfffffffffffffffffffff
        bbbddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccbbbdbbdbdddddddbddddbddddddddddddddddddddddddddddddddddddddcffcdfffffffffffffffffcfffffff
        bbdddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbcccbbbbbddbdddddddddddddddddddddddddddddddddddddddddddddddddbcdffdfcdfffffffffffffffffffffff
        bddddddddddddddbdbbbbccccccccccccccccccccccccccccccccccccccccccbcbbbcbddddddddddddbddddddddddddddddddddddddddddddddddbddddddddddbfcffffcffffffffffffffffffffffff
        ddddddddddddddddbdbbbcccccccccccccccccccccccccccccccccccccccccbbcddddcdbddddbbddddbbdddddddddddbdddddddddddddddddddbddddddddddddcbdffffffffffbfffffcffffffffcbff
        dbdbddddddddbdbdbbbbccccccccccccccccccccccccccccccccccbcccbcbbdbcddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddddcffffffffffffffffffffffffcfffddf
        ddddddbddddddddbbbbbcccccccccccccccccccccccccccccccbbcbccbbbbdbdddddddddddbbbddddddddddddddddddddddddddddddddddddddddddddddddddbffffffffffffffffffffffffcdfffcff
        ddddddddddddbdbbbbbbccccccccccccccccccccccccccccccbbbbbbdddddddbddddddddddddbddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffdffff
        dddddddddddddbbbbbbcccccccccccccccccccccccccccccbbbcddddbdbcdddcddddddddddddddddbdddbddddddddddbdddddddddddddddddddddddddddddddccfffffffffffffffffffffffffffffff
        ddddddddddddbbbbbbbcccccccccccccccccccccccccccbbddddddddbdbddddbdddddddddddddddddddddddddbbbddddddddddddddddddddddddddddddddddcfcffffffffffffffffcffffffffffffff
        bdbddddddbddbbbbbbccccccccccccccccccccccccccbddddbbdddddddddddddddddddbddddddddddddddddddddddddddddbdbdddddddddddddddddddddddbffffffffcffffffffffffffffcfcffffff
        dbddbdddddddbbbbcccccccccccccccccccccccccccdbdbdddddddddddddddddddddddbddddddddbdcbddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffcffffff
        dddddddddddddddddbcbcccccccccccccccccccccbddcbbcdddbddddddddddddcdbddddddddddddddddddddbdddddddddddddddddddddddddddddddddddddfffbffffffffffffffffffffffffffcffff
        ddddddddddddcddddddbbccccccccccccccccbcbcbddddddbdbcddddddddddddddddddddddddddcbddddddddddddbdddddddddddddddddddddddddddddddcfffdfffffffffffffffffffffffffffffff
        dddddddddddbcdddddbddcbbcccccccbcccbbbbbccddbddddbdbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddbffffcfffffffffffffffffffffffffffffff
        bdddddddddcdddddddddbcbbbcbbbcbbbdddbddddbddddddddddddddddbddddddddddddddddbcdddcddddddddddddddddddddddddddccddddddddddddddbddfffffffffffcffffffffffffffffcccfff
        ddddddddddddbddddbdddbbdbcbddbdbddddddddddbdddddddbdddddcddddddddddddbddddddddddddddddbddddddddbdddddddddddddddddddddddddddcdfffffffffffffffffffffffffffffccfffc
        dddcdddddddddddddddddcdddddddbdbbbdddbddddddddddddccdddddbddddddddcddddddddcddddddddddddddddddddddddddddddddddddddddcddddddcffffffffffffffffffffffffffffffffffff
        dddbdddddddddddddddddcdddddddcbddddbbddddddcdbddbdddddddddddbcbbbdcbddddddcbddddddddddddddddddddddddddddbddddddddddddddddddcfffffffffffffffcffffffffffffffffffff
        bdddddddddddddddddddddddddddbddbdbcbdbbddddbdddddddddddddbbbbbbcbbbbcdbbddddbddbcddddddddddddddddbdddddddddddddddddddddddddcffffbdcffffffffcffffffffffcfffffffff
        dddddddddddddddddddddddddddbbdddddbcdddddddbddddcdbbdbbbbcccbbccccbcbcbbbbbbbbccbcbbbdbbbbddddddddddddddddddddddddddbbbbdddcffffcfbfffffffffffffffffffffffffffff
        dddddddddddddddddddbdddddcbbddddddbbdddddddbbddddbbbbbccccccccccccccccccccccccccccbccbcbbccbdbbdddddddddddddddddddbbbbbbddbccfddfffffffffffbbfffffffffffffffffff
        bbbdddddddbddddddddddddbddcddbdddddbbddbccbcccbbcbbbcbccccccccccccccccccccccccccbcccccccccccccbbbdddddddddddddbbbbccccbbddccfffffcffffffffffffffffffffffffffffff
        cccbddddddddddddddddddddddbdddddbbbcbcccccbcccccccccccccccccccccccccccccccccccccccccccccccccccbccccbdbdddbdbbbcccbccbbbdddbfffffdfffffffffffffffffffffffffffffff
        ccccddbdddddddddddcddddccbbbccbbcbbccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbdddddfffffffffffffffcfffffffffffffffffffff
        ccbbbbbddddddddddbcdddcccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccbbddddddbfffffffffffffffffffffffffffffffffffff
        ccccccbcbbbdddddbcccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbddddddddbfffffffffffffffffffffffffffffffffffff
        cccccccbccbbbcbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbdddddddddbcffffffffffffffffcbfffffffffffffffffff
        cccccccccccbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccbbdddddbdddbcfffffffffffffffffffffffffffffffffffff
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbbcccccccccccccbbbbddddddddddbcffcffffffffffffffffffffffffffffffffff
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbbcccccbbcccccccbbbbdddddddddddbccffffffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbddddddbbcbbbdbccccbbdddddbdddddddddcffdffdffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccccccbbccccccccccccccccccccccccccccccccccccccccbcccbbbbbbddddddddddddddbbbbbbdddddcdddddddddddbcfffffffffffffffffffffffffffffffffffffc
        cccccccccccccccccccccccccccccbbddcbccccbccccccccccccccccccccccccccccccbdbbbbddddbdddddbddddddddddddddddddddddccdddddddddcfffffffffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccbbbcddbbcbbbbbccbbcccccccccccccccccccccbbbddddbbdddddbdccddbdddddddddddddddddddddddddddddddbcffffffffffffffffffffcfffffffffffffffffff
        ccccccccccccccccccccccccccbddddddbbbbddbbbbdbccccccccccccccccccbcddddddddddbddcbdccbddddddddddddddddddddddddddddddddcbfdffffffffffffffffffffffffffffffffffffffff
        cccccccccccccccbccccccccbcdddddddddbddddddbbbddbbbbccccccccccccdbdddddddddddbddddddddddddddddddddddddddddddddddddddcfcfffffffffffffffffcbffffffffffffffcffffffff
        cccccccccccccccccccccfccccbddddddddddddddbcbcdddddbbbcccccbbbcdddddddbdddddddddddddddddddddddddddddddddddddddddddcdffbffffffffffffffffffbffffffffffffcbcffffffff
        ccccccccccccccccccfccffffccbdddddddddddddddbdbddddddcdbcbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffdffcfffffbfffffffffdccfffffffffffffffffffff
        cccccccccccccccffcffcccffffccdddddddddddddcccdddddbdbddbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffddfffffffffffffffddffffffffffffffffffffff
        cccccccfccffffcffffffcdfffffcfddddddddddddbccbddddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffffffdfffffffffcffffffffffffffbffffffffffffff
        ccfcccfffffffffffffffffffffcfccddddddddddbdcdddddddddddddddddddddddddddddddddddddddddddddbccbbccbcbbbdbbbdbfffdffffffffffffffffcfffffffffffffddfffffffffffffffff
        cffcccffffffffffffffffffffffbcfcdddddddddccbdbdddddddddddddddddddddddddddddddddddddddbddfccccbfcfffffcbcfffcffcffffffffffccfffcffffffffffffffdbfffffffffffffffff
        fcfffffffffffffffffffffffffffffbcbbdddddbcbcdbbbcbdbddddddddddddddddddddddddddddddbbccffffffffffffffffcbfffffffffffdffffcfffffffffffffffffffccffffffffffffffffff
        fffffffffffffffffffffffffffffffcfffcdcfffcbcfcbccfccbddddddddddddddddddddddddddddbbbcfffffffffffffffffffcdbffffffffffffcdfdfffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffcffffffdffdfcffffccddddddddddddddddddddddddbdccfffffffffffffffffffffcffffcffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffdfffffbfbfffffbcfbffffffcccbcbcbdddddddddddddccccffffffffffffffffffffffffffffffffffffffffffcfffffffccfffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffccffffffffffffffdfdcfffffddffcffccccffbdbbbdddcfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffffffffffffffffffffffff
        fffffffffffffffffffcffffffffffffffffffffffffffffffffddfcfbfffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffcfffffdcfffddffffffffffffffffbffffcbffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffcfffff
        ffffffffffffffffffffffdfffffffffcfffffffbffffffffffdffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffbffffdfffcddcfffffffffffffffff
        fffffffffffffffffffffffffffffffffbffffffbffffffffffffffffffffffbfcffffcfffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffdddffffffffffccffffff
"""))
pixelToMeter = 30
gravity = 9.81 * pixelToMeter
mySprite.ay = 350
info.set_life(2)
CreatGroundEnemy()
CreatFlyEnemy()

def on_on_update():
    Climb()
    MoveGroundEnemy()
    FlyEnemyFollow()
game.on_update(on_on_update)
