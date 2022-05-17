namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Flies = SpriteKind.create()
    export const Climb = SpriteKind.create()
    export const ClimbRight = SpriteKind.create()
    export const ClimbFire = SpriteKind.create()
    export const ClimbLeft = SpriteKind.create()
    export const Fire = SpriteKind.create()
    export const Orb = SpriteKind.create()
    export const Burn = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const ClimbCenter = SpriteKind.create()
    export const Trap = SpriteKind.create()
    export const Boulder = SpriteKind.create()
    export const Block = SpriteKind.create()
    export const RockFire = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite5, location2) {
    game.splash(blockSettings.readString("Name"), "You lose")
    game.reset()
})
sprites.onOverlap(SpriteKind.ClimbRight, SpriteKind.Projectile, function (sprite, otherSprite) {
    Fire.destroy(effects.fire, 0)
    sprite.destroy()
    CRight = false
})
function MoveGroundEnemy () {
    for (let GEnemy of sprites.allOfKind(SpriteKind.Bumper)) {
        if (GEnemy.isHittingTile(CollisionDirection.Left)) {
            GEnemy.vx = randint(30, 60)
            GEnemy.setImage(assets.image`myImage`)
        } else if (GEnemy.isHittingTile(CollisionDirection.Right)) {
            GEnemy.vx = randint(-60, -30)
            GEnemy.setImage(assets.image`myImage1`)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        if (COUNT % 2 != 0) {
            otherSprite.destroy(effects.spray, 200)
            otherSprite.vy = -50
            sprite.vy = -2 * pixelToMeter
            info.changeScoreBy(5)
        } else {
            statusbar.value += -3
        }
    } else {
        statusbar.value += -3
    }
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        if (COUNT % 2 == 0) {
            mySprite.vy = -110
        } else {
            mySprite.vy = -160
        }
    }
})
function CreatClimbEnemy () {
    for (let CEnemyLeft of tiles.getTilesByType(assets.tile`myTile16`)) {
        CLeft = true
        ClimbEnemyLeft = sprites.create(assets.image`myImage8`, SpriteKind.ClimbLeft)
        tiles.placeOnTile(ClimbEnemyLeft, CEnemyLeft)
        tiles.setTileAt(CEnemyLeft, assets.tile`transparency16`)
    }
    for (let CEnemyRight of tiles.getTilesByType(assets.tile`myTile24`)) {
        CRight = true
        ClimbEnemyRight = sprites.create(assets.image`myImage33`, SpriteKind.ClimbRight)
        tiles.placeOnTile(ClimbEnemyRight, CEnemyRight)
        tiles.setTileAt(CEnemyRight, assets.tile`transparency16`)
    }
    for (let CenemyCenter of tiles.getTilesByType(assets.tile`myTile23`)) {
        Ccenter = true
        ClimbEnemyCenter = sprites.create(assets.image`myImage4`, SpriteKind.Climb)
        tiles.placeOnTile(ClimbEnemyCenter, CenemyCenter)
        tiles.setTileAt(CenemyCenter, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flies, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        if (COUNT % 2 != 0) {
            otherSprite.destroy(effects.spray, 200)
            otherSprite.vy = -50
            sprite.vy = -2 * pixelToMeter
            info.changeScoreBy(7)
        } else {
            statusbar.value += -3
        }
    } else {
        statusbar.value += -3
    }
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
function Play () {
    Icon.destroy()
    Icon2.destroy()
    textSprite.destroy()
    startLevel()
    creatPlayer()
    scene.setBackgroundImage(img`
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
        `)
    pixelToMeter = 30
    gravity = 9.81 * pixelToMeter
    mySprite.ay = 350
    info.setScore(0)
    info.setLife(2)
    CreatCoin()
    CreatBurn()
    CreatGroundEnemy()
    CreatClimbEnemy()
    CreatFlyEnemy()
    CreatHeart()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vx == 0) {
        ChangeForm()
    }
})
function CreatFlyEnemy () {
    for (let FEnemy of tiles.getTilesByType(assets.tile`myTile19`)) {
        FlyEnemy = sprites.create(assets.image`FlyEnemey`, SpriteKind.Flies)
        tiles.placeOnTile(FlyEnemy, FEnemy)
        tiles.setTileAt(FEnemy, assets.tile`transparency16`)
        animation.runImageAnimation(
        FlyEnemy,
        assets.animation`myAnim3`,
        50,
        true
        )
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Burn, function (sprite, otherSprite) {
    statusbar.value += -0.5
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite3, location) {
    Level += 1
    startLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (COUNT % 2 == 0) {
        if (character.matchesRule(mySprite, character.rule(Predicate.MovingLeft))) {
            mySprite.setImage(img`
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
                `)
            Fire = sprites.createProjectileFromSprite(img`
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
                `, mySprite, -64, 0)
        }
        if (character.matchesRule(mySprite, character.rule(Predicate.MovingRight))) {
            mySprite.setImage(img`
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
                `)
            Fire = sprites.createProjectileFromSprite(img`
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
                `, mySprite, 64, 0)
        }
    }
})
sprites.onOverlap(SpriteKind.Bumper, SpriteKind.Projectile, function (sprite4, otherSprite3) {
    Fire.destroy(effects.fire, 1)
    sprite4.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ClimbFire, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value += -15
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    character.loopFrames(
    mySprite,
    assets.animation`Left`,
    100,
    character.rule(Predicate.MovingLeft)
    )
})
function CreatHeart () {
    for (let Heart of tiles.getTilesByType(assets.tile`myTile10`)) {
        HeartLife = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f . f f f f f f . 
            . f f 3 3 3 3 f f f 3 3 3 3 f f 
            . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
            . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
            . f 3 3 3 3 b b b b b 3 3 3 3 f 
            . f f 3 3 b b b b b b b 3 3 f f 
            . . f f 3 b b b b b b b 3 f f . 
            . . . f f b b b b b b b f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Heart)
        tiles.placeOnTile(HeartLife, Heart)
        tiles.setTileAt(Heart, assets.tile`transparency16`)
        animation.runImageAnimation(
        HeartLife,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . f f f f f . . 
            . . f f 3 3 3 f f f 3 3 3 f f . 
            . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 3 b b b 3 3 3 f f . 
            . . . f f 3 b b b b b 3 f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f . f f f f f f . 
            . f f 3 3 3 3 f f f 3 3 3 3 f f 
            . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
            . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
            . f 3 3 3 3 b b b b b 3 3 3 3 f 
            . f f 3 3 b b b b b b b 3 3 f f 
            . . f f 3 b b b b b b b 3 f f . 
            . . . f f b b b b b b b f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f . f f f . . . . 
            . . . . f 3 3 3 f 3 3 3 f . . . 
            . . . . f 3 3 3 3 3 1 3 f . . . 
            . . . . f 3 3 3 3 3 3 3 f . . . 
            . . . . . f 3 b b b 3 f . . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(1)
})
function FlyEnemyFollow () {
    for (let Fly of sprites.allOfKind(SpriteKind.Flies)) {
        if (Math.abs(Fly.x) - Math.abs(mySprite.x) < 60) {
            if (Fly.x - mySprite.x < -5) {
                Fly.vx = 25
            } else if (Fly.x - mySprite.x > 5) {
                Fly.vx = -25
            }
            if (Fly.y - mySprite.y < -5) {
                Fly.vy = 25
            } else if (Fly.y - mySprite.y > 5) {
                Fly.vy = -25
            }
        } else {
            Fly.vy = -25
            Fly.vx = 0
        }
    }
}
function Climb2 () {
    if (mySprite.isHittingTile(CollisionDirection.Left) || mySprite.isHittingTile(CollisionDirection.Right) && mySprite.vy >= 0) {
        mySprite.vy = 0
        mySprite.ay = 0
        mySprite.setImage(img`
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
            `)
        if (COUNT % 2 == 0 && controller.A.isPressed()) {
            Fire = sprites.createProjectileFromSprite(img`
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
                `, mySprite, 0, -64)
        }
    } else {
        mySprite.ay = 350
    }
    if (mySprite.isHittingTile(CollisionDirection.Left) || mySprite.ax < 0) {
        mySprite.setImage(img`
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
            `)
        mySprite.setImage(mySprite.image)
        if (COUNT % 2 == 0 && controller.A.isPressed()) {
            Fire = sprites.createProjectileFromSprite(img`
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
                `, mySprite, 0, -64)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile29`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile29`)
    Boulder = sprites.create(assets.image`myImage7`, SpriteKind.Boulder)
    tiles.placeOnTile(Boulder, tiles.getTileLocation(30, 45))
    tiles.setTileAt(tiles.getTileLocation(30, 45), assets.tile`transparency16`)
    Boulder.vx = -100
    Boulder.ay = 0
    animation.runImageAnimation(
    Boulder,
    assets.animation`myAnim6`,
    50,
    true
    )
    sprite.vy = -5 * pixelToMeter
    Boulder.lifespan = 5000
    statusbar.value += -10
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
sprites.onOverlap(SpriteKind.Flies, SpriteKind.Projectile, function (sprite4, otherSprite3) {
    Fire.destroy(effects.fire, 1)
    sprite4.destroy()
    info.changeScoreBy(7)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flies, function (sprite2, otherSprite2) {
    otherSprite2.destroy()
    statusbar.value += -5
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    character.loopFrames(
    mySprite,
    assets.animation`Right`,
    100,
    character.rule(Predicate.MovingRight)
    )
})
sprites.onOverlap(SpriteKind.ClimbLeft, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    Fire.destroy(effects.fire, 1)
    CLeft = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.RockFire, function (sprite2, otherSprite2) {
    statusbar.value += -2.5
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
function CreatGroundEnemy () {
    for (let GEnemy2 of tiles.getTilesByType(assets.tile`myTile18`)) {
        Enemies = sprites.create(assets.image`myImage1`, SpriteKind.Bumper)
        tiles.placeOnTile(Enemies, GEnemy2)
        tiles.setTileAt(GEnemy2, assets.tile`transparency16`)
        Enemies.ay = gravity
        if (Math.percentChance(100)) {
            Enemies.vx = randint(50, 100)
        } else {
            Enemies.vx = randint(-100, -50)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile27`)
    Trap = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . f . . . f f . . . f . . . 
        . . . f . . f f f f . . f . . . 
        . . . f . . f b b f . . f . . . 
        . . f f f . f b b f . f f f . . 
        . . f b f . f d 1 f . f d f . . 
        . . f b f d f 1 d f . f d f . . 
        . 1 f b f d c d d d f f d f 1 . 
        . f d d d f b d d c f d b b f . 
        . f c d d f b d d c f c d d f 1 
        1 f d d d f b d d d f b d d f d 
        f c b d b f c d d c f c b d c f 
        f c b d b f c d d c b c b d c f 
        `, SpriteKind.Trap)
    animation.runImageAnimation(
    Trap,
    assets.animation`myAnim4`,
    50,
    false
    )
    tiles.placeOnTile(Trap, location)
    Trap.lifespan = 450
    statusbar.value += -5
    sprite.vy = -3 * pixelToMeter
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
function ChangeForm () {
    if (controller.B.isPressed()) {
        COUNT += 1
        if (COUNT % 2 == 0) {
            mySprite.changeScale(0.4, ScaleAnchor.Middle)
        }
        if (COUNT % 2 != 0) {
            mySprite.changeScale(-0.4, ScaleAnchor.Middle)
        }
    }
}
function CreatBurn () {
    for (let Burn of tiles.getTilesByType(assets.tile`myTile12`)) {
        BurnE = sprites.create(assets.image`myImage6`, SpriteKind.Burn)
        tiles.placeOnTile(BurnE, Burn)
        tiles.setTileAt(Burn, assets.tile`transparency16`)
        animation.runImageAnimation(
        BurnE,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 4 . . . . . 
            . . . . 2 . . . . 4 4 . . . . . 
            . . . . 2 4 . . 4 5 4 . . . . . 
            . . . . . 2 4 d 5 5 4 . . . . . 
            . . . . . 2 5 5 5 5 4 . . . . . 
            . . . . . . 2 5 5 5 5 4 . . . . 
            . . . . . . 2 5 4 2 4 4 . . . . 
            . . . . . . 4 4 . . 2 4 4 . . . 
            . . . . . 4 4 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . 3 . . . . . . . . . . . 4 . . 
            . 3 3 . . . . . . . . . 4 4 . . 
            . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
            . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
            . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
            . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
            . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
            . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
            . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
            . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
            . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
            . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
            . 4 4 d d 4 d d d 4 3 d d 4 . . 
            . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
            . 4 5 4 . . 4 4 4 . . . 4 4 . . 
            . 4 4 . . . . . . . . . . 4 4 . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b . b b b . . . . . 
            . . . . b 1 1 b 1 1 1 b . . . . 
            . . b b 3 1 1 d d 1 d d b b . . 
            . b 1 1 d d b b b b b 1 1 b . . 
            . b 1 1 1 b . . . . . b d d b . 
            . . 3 d d b . . . . . b d 1 1 b 
            . b 1 d 3 . . . . . . . b 1 1 b 
            . b 1 1 b . . . . . . b b 1 d b 
            . b 1 d b . . . . . . b d 3 d b 
            . b b d d b . . . . b d d d b . 
            . b d d d d b . b b 3 d d 3 b . 
            . . b d d 3 3 b d 3 3 b b b . . 
            . . . b b b d d d d d b . . . . 
            . . . . . . b b b b b . . . . . 
            `],
        100,
        true
        )
    }
}
function startLevel () {
    if (Level == 0) {
        tiles.setCurrentTilemap(tilemap`level9`)
    } else if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`level4`)
        CreatFlyEnemy()
        CreatGroundEnemy()
        FlyEnemyFollow()
        MoveGroundEnemy()
    } else if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`level4`)
        CreatFlyEnemy()
        CreatGroundEnemy()
        MoveGroundEnemy()
        FlyEnemyFollow()
    } else {
        game.splash(blockSettings.readString("Name"), "You win")
        game.reset()
    }
}
function CreatCoin () {
    for (let Coin of tiles.getTilesByType(assets.tile`myTile14`)) {
        EarnCoin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(EarnCoin, Coin)
        tiles.setTileAt(Coin, assets.tile`transparency16`)
        animation.runImageAnimation(
        EarnCoin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 3 d 5 b . 
            b 5 3 5 1 5 b . 
            c 5 3 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 3 1 5 b . 
            . c 5 3 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 3 5 b . 
            . c d 1 3 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        100,
        true
        )
    }
}
function creatPlayer () {
    mySprite = sprites.create(img`
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
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 50, 0)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(68, 2))
    scene.cameraFollowSprite(mySprite)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.attachToSprite(mySprite)
    statusbar.max = 100
}
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "How to play") {
        game.setDialogFrame(img`
            333333333333333333333333
            3dddddddddddddddddddddd3
            b3dddddddddddddddddddd3b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            b3333333333333333333333b
            bb33333333333333333333bb
            bccccccccccccccccccccccb
            cccccccccccccccccccccccc
            `)
        game.showLongText("Mode WASD", DialogLayout.Full)
    } else if (option == "Play") {
        blockMenu.setControlsEnabled(false)
        Game_Started = true
        blockMenu.closeMenu()
        blockSettings.writeString("Name", game.askForString("Please input a name:", 10))
        Play()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile30`)
    Boulder = sprites.create(assets.image`myImage7`, SpriteKind.Boulder)
    tiles.placeOnTile(Boulder, tiles.getTileLocation(68, 32))
    tiles.setTileAt(tiles.getTileLocation(68, 32), assets.tile`transparency16`)
    Boulder.vx = -100
    Boulder.ay = 0
    animation.runImageAnimation(
    Boulder,
    assets.animation`myAnim6`,
    50,
    true
    )
    Boulder.lifespan = 2500
    sprite.vy = -5 * pixelToMeter
    statusbar.value += -10
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile28`)
    TrapLeft = sprites.create(assets.image`myImage2`, SpriteKind.Trap)
    animation.runImageAnimation(
    TrapLeft,
    assets.animation`myAnim5`,
    50,
    false
    )
    tiles.placeOnTile(TrapLeft, location)
    TrapLeft.lifespan = 450
    statusbar.value += -5
    sprite.vx = -3 - pixelToMeter
    if (statusbar.value == 0) {
        info.changeLifeBy(-1)
        statusbar.value += 100
    }
    if (info.life() == 0) {
        game.splash(blockSettings.readString("Name"), "You lose")
        game.reset()
    }
})
let RockFire: Sprite = null
let FireClimbCenter: Sprite = null
let FireClimbRight: Sprite = null
let FireClimbLeft: Sprite = null
let TrapLeft: Sprite = null
let EarnCoin: Sprite = null
let BurnE: Sprite = null
let Trap: Sprite = null
let Enemies: Sprite = null
let Boulder: Sprite = null
let HeartLife: Sprite = null
let Level = 0
let FlyEnemy: Sprite = null
let gravity = 0
let ClimbEnemyCenter: Sprite = null
let Ccenter = false
let ClimbEnemyRight: Sprite = null
let ClimbEnemyLeft: Sprite = null
let CLeft = false
let mySprite: Sprite = null
let statusbar: StatusBarSprite = null
let pixelToMeter = 0
let COUNT = 0
let CRight = false
let Fire: Sprite = null
let Icon2: TextSprite = null
let Icon: TextSprite = null
let textSprite: TextSprite = null
let Game_Started = false
class ActionKind {
    static Walking = 0
    static Idle = 1
    static Jumping = 2
}
blockMenu.showMenu(["Play", "How to play"], MenuStyle.Grid, MenuLocation.BottomHalf)
blockMenu.setColors(1, 15)
Game_Started = false
textSprite = textsprite.create("Adventure Dinosaur")
textSprite.setMaxFontHeight(9)
textSprite.setPosition(80, 34)
Icon = textsprite.create("")
Icon.setIcon(img`
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
    `)
Icon.setPosition(13, 32)
Icon2 = textsprite.create("")
Icon2.setIcon(img`
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
    `)
Icon2.setPosition(146, 32)
game.onUpdate(function () {
    if (Game_Started) {
        MoveGroundEnemy()
        FlyEnemyFollow()
        Climb2()
    }
})
game.onUpdateInterval(1500, function () {
    if (CLeft) {
        FireClimbLeft = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . 1 1 1 1 1 1 1 . . . . 
            . . . 1 1 3 3 3 3 3 3 3 1 1 . . 
            . . 1 3 . . . 3 1 3 . . . 3 1 . 
            . . 1 . . . 2 3 1 3 2 . . . 1 . 
            . . 3 3 . . 2 3 1 3 2 . . 3 3 . 
            . . . 3 3 2 3 3 1 3 3 2 3 3 . . 
            . . . . 2 2 1 1 1 1 1 2 2 . . . 
            . . . . 2 1 1 1 1 1 1 1 2 . . . 
            . . . . 3 3 1 1 1 1 1 3 3 . . . 
            . . . . . 3 3 3 3 3 3 3 . . . . 
            . . . . . . . . . . . . . . . . 
            `, ClimbEnemyLeft, 0, 64)
        FireClimbLeft.setKind(SpriteKind.ClimbFire)
    }
    if (CRight) {
        FireClimbRight = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . 1 1 1 1 1 1 1 . . . . 
            . . . 1 1 3 3 3 3 3 3 3 1 1 . . 
            . . 1 3 . . . 3 1 3 . . . 3 1 . 
            . . 1 . . . 2 3 1 3 2 . . . 1 . 
            . . 3 3 . . 2 3 1 3 2 . . 3 3 . 
            . . . 3 3 2 3 3 1 3 3 2 3 3 . . 
            . . . . 2 2 1 1 1 1 1 2 2 . . . 
            . . . . 2 1 1 1 1 1 1 1 2 . . . 
            . . . . 3 3 1 1 1 1 1 3 3 . . . 
            . . . . . 3 3 3 3 3 3 3 . . . . 
            . . . . . . . . . . . . . . . . 
            `, ClimbEnemyRight, 0, 64)
        FireClimbRight.setKind(SpriteKind.ClimbFire)
    }
    for (let value of sprites.allOfKind(SpriteKind.Climb)) {
        if (Ccenter) {
            FireClimbCenter = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 1 2 . . . . . . 
                . . . . . . . 2 1 2 . . . . . . 
                . . . . . . . 2 1 2 . . . . . . 
                . . . . . 1 1 1 1 1 1 1 . . . . 
                . . . 1 1 3 3 3 3 3 3 3 1 1 . . 
                . . 1 3 . . . 3 1 3 . . . 3 1 . 
                . . 1 . . . 2 3 1 3 2 . . . 1 . 
                . . 3 3 . . 2 3 1 3 2 . . 3 3 . 
                . . . 3 3 2 3 3 1 3 3 2 3 3 . . 
                . . . . 2 2 1 1 1 1 1 2 2 . . . 
                . . . . 2 1 1 1 1 1 1 1 2 . . . 
                . . . . 3 3 1 1 1 1 1 3 3 . . . 
                . . . . . 3 3 3 3 3 3 3 . . . . 
                . . . . . . . . . . . . . . . . 
                `, value, 0, 64)
            FireClimbCenter.setKind(SpriteKind.ClimbFire)
        }
    }
})
game.onUpdateInterval(1500, function () {
    let ishookshotactive = 0
    if (!(ishookshotactive)) {
        for (let value of tiles.getTilesByType(assets.tile`myTile15`)) {
            RockFire = sprites.create(img`
                f c b d b f c d d c b c b d c f 
                f c b d b f c d d c f c b d c f 
                1 f d d d f b d d d f b d d f d 
                . f c d d f b d d c f c d d f 1 
                . f d d d f b d d c f d b b f . 
                . 1 f b f d c d d d f f d f 1 . 
                . . f b f d f 1 d f . f d f . . 
                . . f b f . f d 1 f . f d f . . 
                . . f f f . f b b f . f f f . . 
                . . . f . . f b b f . . f . . . 
                . . . f . . f f f f . . f . . . 
                . . . f . . . f f . . . f . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . . f f . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.RockFire)
            tiles.placeOnRandomTile(RockFire, assets.tile`myTile15`)
            RockFire.setFlag(SpriteFlag.DestroyOnWall, true)
            RockFire.vx = 0
            RockFire.vy = 200
        }
    }
})
