var angle = 0;
var Bola = cc.Class.extend({
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("res/skull.png");
    this.sprite.setScale(0.2);

    this.body = new cp.Body(1, cp.momentForCircle(5, 0, this.sprite.width * 0.2 /2, cp.vzero));
    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    gameLayer.space.addBody(this.body);

    this.shape = shape = new cp.CircleShape(this.body, this.sprite.width * 0.2 /2, cp.vzero);
    this.shape.setCollisionType(tipoEnemigo);
    this.shape.setFriction(0);
    gameLayer.space.addShape(this.shape);

    gameLayer.addChild(this.sprite);
},update:function(dt){
    this.body.setAngle(angle += 0.1);
}
});