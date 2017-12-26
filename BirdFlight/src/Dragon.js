var aux = -5;

var Dragon = cc.Class.extend({
    ctor:function(gameLayer, posicion){
        this.gameLayer = gameLayer;

        var framesAnimacion = [];
        for (var i = 1; i <= 4; i++) {
            var str = "dragon-" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        this.sprite = new cc.PhysicsSprite("#dragon-1.png");
        this.sprite.setScale(0.2);
        this.body = new cp.Body(5, cp.momentForBox(1,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height));

        this.body.setPos(posicion);
        this.body.setAngle(0);
        this.body.hasPassed = false;
        this.sprite.setBody(this.body);
        gameLayer.space.addBody(this.body);

        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width * 0.2 - 20,
            this.sprite.getContentSize().height * 0.2 - 20);
        this.shape.setCollisionType(tipoDragon);
        this.shape.setFriction(1);
        gameLayer.space.addShape(this.shape);

        this.sprite.runAction(actionAnimacionBucle);

        gameLayer.addChild(this.sprite,10);
    },
    update:function(dt){
        var pos = this.body.getPos();
        if (pos.x <= 0){
            this.sprite.flippedX = true;
            aux = 5;
        } else if (pos.x >= this.gameLayer.mapaAncho){
            this.sprite.flippedX = false;
            aux = -5;
        }
        this.body.setPos(cp.v(pos.x + aux,pos.y));

        this.body.sleep();
    }
});