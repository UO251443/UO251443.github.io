var estadoNormal = 1;
var estadoInvulnerable = 2;

var Jugador = cc.Class.extend({
    estado: estadoNormal,
    aaMover:null,
    aaInvulnerable:null,
    gameLayer:null,
    sprite:null,
    shape:null,
    body:null,
    boosted:false,
    ctor:function (gameLayer, posicion) {
        this.gameLayer = gameLayer;

        var framesAnimacion = [];
        for (var i = 1; i <= 8; i++) {
            var str = "bird-" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        this.aaMover= actionAnimacionBucle;
        this.aaMover.retain();

        var framesAnimacionInvulnerable= [];
            for (var i = 1; i <= 2; i++) {
                var str = "bird_hit-" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                framesAnimacionInvulnerable.push(frame);
            }
        var animacionInvulnerable = new cc.Animation(framesAnimacionInvulnerable, 0.2);
        this.aaInvulnerable  =
            new cc.RepeatForever(new cc.Animate(animacionInvulnerable));

        this.aaInvulnerable.retain();

        this.sprite = new cc.PhysicsSprite("#bird-1.png");
        this.sprite.setScale(0.15);
        //mass(mass,width,heigth)
        this.body = new cp.Body(5, cp.momentForBox(1,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height));

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.sprite.setBody(this.body);

        gameLayer.space.addBody(this.body);

        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width * 0.15 - 20,
            this.sprite.getContentSize().height * 0.15 - 20);
        this.shape.setCollisionType(tipoJugador);
        this.shape.setFriction(1);

        gameLayer.space.addShape(this.shape);
        this.sprite.runAction(actionAnimacionBucle);

        gameLayer.addChild(this.sprite,10);
    },
    saltar:function(){
        if(this.boosted)
            this.body.applyImpulse(cp.v(0, 5000), cp.v(0, 0));
        else
            this.body.applyImpulse(cp.v(0, 2000), cp.v(0, 0));
    },
    moverIzqda:function(){
        this.body.applyImpulse(cp.v(-1000, 0), cp.v(0, 0));
    },
    moverDcha:function(){
        this.body.applyImpulse(cp.v(1000, 0), cp.v(0, 0));
    },
    potenciar:function(){
        this.boosted = true;
        var action = cc.TintTo.create(3, 0, 0, 255);
        //this.sprite.stopAllActions();
        this.sprite.runAction(action);
    }
});
