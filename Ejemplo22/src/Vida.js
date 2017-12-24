var Vida = cc.Class.extend({
    ctor:function (gameLayer, posicion) {
        this.gameLayer = gameLayer;

        this.sprite = new cc.PhysicsSprite("res/health.png");
        this.sprite.setScale(0.4);
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.sprite.setBody(body);
        this.shape = new cp.BoxShape(body,
                this.sprite.getContentSize().width * 0.2 - 20,
                this.sprite.getContentSize().height * 0.2 - 20);
        this.shape.setCollisionType(tipoVida);
        this.shape.setSensor(true);
        gameLayer.space.addStaticShape(this.shape);
        gameLayer.addChild(this.sprite,10);
    },
    eliminar:function(){
        this.gameLayer.space.removeShape(this.shape);
        this.gameLayer.removeChild(this.sprite);
    }
});