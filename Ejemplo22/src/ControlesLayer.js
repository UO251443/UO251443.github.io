var ControlesLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;

        this.vidas = 3;
        this.spriteVida1 = cc.Sprite.create(res.health_png);
        this.spriteVida1.setScale(0.2);
        this.spriteVida1.setPosition(cc.p(150,size.height - 50));
        this.addChild(this.spriteVida1);

        this.spriteVida2 = cc.Sprite.create(res.health_png);
        this.spriteVida2.setScale(0.2);
        this.spriteVida2.setPosition(cc.p(200,size.height - 50));
        this.addChild(this.spriteVida2);

        this.spriteVida3 = cc.Sprite.create(res.health_png);
        this.spriteVida3.setScale(0.2);
        this.spriteVida3.setPosition(cc.p(250,size.height - 50));
        this.addChild(this.spriteVida3);

        this.spriteBotonSaltar = cc.Sprite.create(res.btnSalto_png);
        this.spriteBotonSaltar.setScale(0.4);
        this.spriteBotonSaltar.setPosition(cc.p(size.width - 100, 50));
        this.addChild(this.spriteBotonSaltar);

        this.spriteBotonIzqda = cc.Sprite.create(res.btnIzqda_png);
        this.spriteBotonIzqda.setScale(0.4);
        this.spriteBotonIzqda.setPosition(cc.p(150, 50));
        this.addChild(this.spriteBotonIzqda);

        this.spriteBotonDcha = cc.Sprite.create(res.btnDcha_png);
        this.spriteBotonDcha.setScale(0.4);
        this.spriteBotonDcha.setPosition(cc.p(250, 50));
        this.addChild(this.spriteBotonDcha);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.procesarMouseDown
        }, this)

        cc.eventManager.addListener({
             event: cc.EventListener.KEYBOARD,
             onKeyPressed: this.procesarKeyDown
        }, this)

        this.scheduleUpdate();
        return true;
    },
    update:function (dt) {

    },
    procesarMouseDown:function(event){
        var instancia = event.getCurrentTarget();

        //SALTO
        var areaBoton = instancia.spriteBotonSaltar.getBoundingBox();

        if (cc.rectContainsPoint(areaBoton,
            cc.p(event.getLocationX(), event.getLocationY()) )){
            var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
            gameLayer.jugador.saltar();
        }

        //IZQUIERDA
        areaBoton = instancia.spriteBotonIzqda.getBoundingBox();

        if (cc.rectContainsPoint(areaBoton,
             cc.p(event.getLocationX(), event.getLocationY()) )){
             var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
             gameLayer.jugador.moverIzqda();
        }

        //DERECHA
        areaBoton = instancia.spriteBotonDcha.getBoundingBox();

        if (cc.rectContainsPoint(areaBoton,
             cc.p(event.getLocationX(), event.getLocationY()) )){
             var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
             gameLayer.jugador.moverDcha();
        }
    },
    procesarKeyDown:function(keyCode, event){
        var instancia = event.getCurrentTarget();

        //SALTO (Space)
        if( keyCode == 32){
            var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
            gameLayer.jugador.saltar();
        }
        //IZQUIERDA (A)
        if( keyCode == 65){
            var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
            gameLayer.jugador.moverIzqda();
        }
        //DERECHA (D)
        if( keyCode == 68){
            var gameLayer = instancia.getParent().getChildByTag(idCapaJuego);
            gameLayer.jugador.moverDcha();
        }
    },
    quitarVida:function(){
        this.vidas--;
        if (this.vidas == 2)
            this.removeChild(this.spriteVida3);
        else if (this.vidas == 1)
            this.removeChild(this.spriteVida2);
        else if (this.vidas == 0){
            this.removeChild(this.spriteVida1);
            cc.director.runScene(new GameOverScene());
        }
    }
});