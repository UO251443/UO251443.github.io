var Spikes = cc.Class.extend({
    ctor:function (gameLayer, posicion) {
        this.gameLayer = gameLayer;

        this.sprite = new cc.PhysicsSprite("res/spikes.png");
        this.sprite.setScale(0.3);
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.sprite.setBody(body);
        this.shape = new cp.BoxShape(body,
            this.sprite.getContentSize().width * 0.3 - 20,
            this.sprite.getContentSize().height * 0.3 - 20);
        this.shape.setCollisionType(tipoEnemigo);
        gameLayer.space.addStaticShape(this.shape);
        gameLayer.addChild(this.sprite);
    }
});