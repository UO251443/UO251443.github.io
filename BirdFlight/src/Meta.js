var Meta = cc.Class.extend({
    ctor:function (gameLayer, posicion) {
        this.gameLayer = gameLayer;

        this.sprite = new cc.PhysicsSprite("res/exit.png");
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.sprite.setBody(body);
        this.shape = new cp.BoxShape(body,
                 this.sprite.getContentSize().width,
                 this.sprite.getContentSize().height);
        this.shape.setCollisionType(tipoMeta);
        gameLayer.space.addStaticShape(this.shape);
        gameLayer.addChild(this.sprite);
    }
});