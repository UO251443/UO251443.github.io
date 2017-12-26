var tipoJugador = 1;
var tipoEnemigo = 2;
var tipoMeta = 3;
var tipoVida = 4;
var tipoBoost = 5;
var tipoDragon = 6;

var GameLayer = cc.Layer.extend({
    dragones:[],
    pinchos:[],
    bolas:[],
    vidas:[],
    boost:[],
    formasEliminar:[],
    contadorInvulnerable:0,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.setScale(0.5);

        cc.spriteFrameCache.addSpriteFrames(res.bird_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dragon_plist);
        cc.spriteFrameCache.addSpriteFrames(res.bird_hit_plist);

        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -350);

        // Depuración
        //this.depuracion = new cc.PhysicsDebugNode(this.space);
        //this.addChild(this.depuracion, 10);

        this.jugador = new Jugador(this, cc.p(600,300));

        this.cargarMapa();
        this.scheduleUpdate();

        //Jugador y Meta
        this.space.addCollisionHandler(tipoJugador, tipoMeta,
                    null, null, this.collisionJugadorConMeta.bind(this), null);
        //Jugador y Enemigo
        this.space.addCollisionHandler(tipoJugador, tipoEnemigo,
                    null, null, this.collisionJugadorConEnemigo.bind(this), null);
        //Jugador y Dragon
                this.space.addCollisionHandler(tipoJugador, tipoDragon,
                    null, this.collisionJugadorConEnemigo.bind(this), null, null);
        //Jugador y Vida
                this.space.addCollisionHandler(tipoJugador, tipoVida,
                    null, this.collisionJugadorConVida.bind(this), null, null);
        //Jugador y Boost
                this.space.addCollisionHandler(tipoJugador, tipoBoost,
                    null, this.collisionJugadorConBoost.bind(this), null, null);

        return true;
    },
    update:function(dt){
        this.space.step(dt);

        //Scroll
        var posicionXJugador = 100;
        var posicionYJugador = this.jugador.body.p.y * 0.5 - 100;
        this.setPosition(cc.p( -posicionXJugador,-posicionYJugador));

        //Mover dragones
        for(var i = 0; i < this.dragones.length; i++)
            this.dragones[i].update(dt);

        //Girar bolas
        for(var i = 0; i < this.bolas.length; i++)
            this.bolas[i].update(dt);

        //Invulnerabilidad
        if (this.jugador.estado == estadoInvulnerable){
            this.contadorInvulnerable--;
            if (this.contadorInvulnerable == 0){
                this.jugador.sprite.stopAllActions();
                this.jugador.estado = estadoNormal;
                this.jugador.sprite.runAction(this.jugador.aaMover);
            }
        }

        //Eliminar formas
        for (var i = 0; i < this.formasEliminar.length; i++){
            var shape = this.formasEliminar[i];
            //Vidas
            for (var i = 0; i < this.vidas.length; i++) {
              if (this.vidas[i].shape == shape) {
                  this.vidas[i].eliminar();
                  this.vidas.splice(i, 1);
              }
            }
            //Boost
            for (var i = 0; i < this.boost.length; i++) {
              if (this.boost[i].shape == shape) {
                  this.boost[i].eliminar();
                  this.boost.splice(i, 1);
              }
            }
        }
        this.formasEliminar = [];

    },
    cargarMapa:function(){
        this.mapa = new cc.TMXTiledMap(nivel);
        this.addChild(this.mapa);
        this.mapaAncho = this.mapa.getContentSize().width;
        this.mapaAlto = this.mapa.getContentSize().height;

        var grupoSuelos = this.mapa.getObjectGroup("Bordes");
        var suelosArray = grupoSuelos.getObjects();

        for (var i = 0; i < suelosArray.length; i++) {
                var suelo = suelosArray[i];
                var puntos = suelo.polylinePoints;
                for(var j = 0; j < puntos.length - 1; j++){
                    var bodySuelo = new cp.StaticBody();
                    var shapeSuelo = new cp.SegmentShape(bodySuelo,
                        cp.v(parseInt(suelo.x) + parseInt(puntos[j].x),
                            parseInt(suelo.y) - parseInt(puntos[j].y)),
                        cp.v(parseInt(suelo.x) + parseInt(puntos[j + 1].x),
                            parseInt(suelo.y) - parseInt(puntos[j + 1].y)), 1);
                    shapeSuelo.setFriction(1);
                    this.space.addStaticShape(shapeSuelo);
                }
            }

        //META
        var meta = this.mapa.getObjectGroup("Meta");
            var metaArray = meta.getObjects();
            for (var i = 0; i < metaArray.length; i++) {
              var meta = new Meta(this,
                  cc.p(metaArray[i]["x"],metaArray[i]["y"]));
              this.meta = meta;
            }

        //DRAGONES
        var grupoDragones = this.mapa.getObjectGroup("Dragones");
            var dragonArray = grupoDragones.getObjects();
            for (var i = 0; i < dragonArray.length; i++) {
                var dragon = new Dragon(this,
                    cc.p(dragonArray[i]["x"],dragonArray[i]["y"]));
                this.dragones.push(dragon);
            }

        //PINCHOS
        var grupoPinchos = this.mapa.getObjectGroup("Pinchos");
            var pinchosArray = grupoPinchos.getObjects();
            for (var i = 0; i < pinchosArray.length; i++) {
                var pincho = new Spikes(this,
                    cc.p(pinchosArray[i]["x"],pinchosArray[i]["y"]));
                this.pinchos.push(pincho);
            }

        //BOLAS
        var grupoBolas = this.mapa.getObjectGroup("Bolas");
        var bolasArray = grupoBolas.getObjects();
        for (var i = 0; i < bolasArray.length; i++) {
            var bola = new Bola(this,
                cc.p(bolasArray[i]["x"],bolasArray[i]["y"]));
            this.bolas.push(bola);
        }

        //VIDAS
        var grupoVidas = this.mapa.getObjectGroup("Vidas");
        var vidasArray = grupoVidas.getObjects();
        for (var i = 0; i < vidasArray.length; i++) {
            var vida = new Vida(this,
                cc.p(vidasArray[i]["x"],vidasArray[i]["y"]));
            this.vidas.push(vida);
        }

        //BOOST
        var grupoBoost = this.mapa.getObjectGroup("Boost");
        var boostArray = grupoBoost.getObjects();
        for (var i = 0; i < boostArray.length; i++) {
            var boost = new Boost(this,
                cc.p(boostArray[i]["x"],boostArray[i]["y"]));
            this.boost.push(boost);
        }
    },
    collisionJugadorConMeta:function(arbiter, space){
        cc.director.runScene(new WinScene());
    },
    collisionJugadorConEnemigo:function(arbiter, space){
        var capaControles = this.getParent().getChildByTag(idCapaControles);
        if (this.jugador.estado == estadoNormal && capaControles.vidas >= 1){
            cc.audioEngine.playEffect(res.sonidoGolpe_mp3, false);
            this.jugador.sprite.stopAllActions();
            this.jugador.estado = estadoInvulnerable;
            if (this.jugador.boosted){
                this.jugador.boosted = false;
                var action = cc.TintBy.create(3, 255, 255, 0);
                this.jugador.sprite.runAction(action);
            }
            this.contadorInvulnerable = 200;
            this.jugador.sprite.runAction(this.jugador.aaInvulnerable);
            capaControles.quitarVida();
        }
    },
    collisionJugadorConVida:function(arbiter, space){
        var capaControles = this.getParent().getChildByTag(idCapaControles);
        var size = cc.winSize;
        if (capaControles.vidas == 2){
            var shapes = arbiter.getShapes();
            this.formasEliminar.push(shapes[1]);
            capaControles.vidas++;
            cc.audioEngine.playEffect(res.item_wav, false);
            capaControles.spriteVida3 = cc.Sprite.create(res.health_png);
            capaControles.spriteVida3.setScale(0.2);
            capaControles.spriteVida3.setPosition(cc.p(250,size.height - 50));
            capaControles.addChild(capaControles.spriteVida3);
        } else if (capaControles.vidas == 1) {
            var shapes = arbiter.getShapes();
            this.formasEliminar.push(shapes[1]);
            capaControles.vidas++;
            cc.audioEngine.playEffect(res.item_wav, false);
            capaControles.spriteVida2 = cc.Sprite.create(res.health_png);
            capaControles.spriteVida2.setScale(0.2);
            capaControles.spriteVida2.setPosition(cc.p(200,size.height - 50));
            capaControles.addChild(capaControles.spriteVida2);
        }

    },
    collisionJugadorConBoost:function(arbiter, space){
        if (this.jugador.boosted == false){
            var shapes = arbiter.getShapes();
            this.formasEliminar.push(shapes[1]);
            cc.audioEngine.playEffect(res.item_wav, false);
            this.jugador.potenciar();
        }
    }
});

var idCapaJuego = 1;
var idCapaControles = 2;

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.director.resume();
        var layer = new GameLayer();
        this.addChild(layer, 0, idCapaJuego);

        var controlesLayer = new ControlesLayer();
        this.addChild(controlesLayer, 0, idCapaControles);
    }
});