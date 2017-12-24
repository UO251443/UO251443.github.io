var nivel = res.mapa1_tmx;

var LevelLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;

        var spriteFondoTitulo = new cc.Sprite(res.background_png);
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        this.addChild(spriteFondoTitulo);

        var menuBotonJugar = new cc.MenuItemSprite( new cc.Sprite(res.level1_png), new cc.Sprite(res.level1_png), this.pulsarBotonJugar1, this);
        var menu = new cc.Menu(menuBotonJugar);
        menu.setPosition(cc.p(size.width / 2, size.height * 0.85));
        this.addChild(menu);

        menuBotonJugar = new cc.MenuItemSprite( new cc.Sprite(res.level2_png), new cc.Sprite(res.level2_png), this.pulsarBotonJugar2, this);
        menu = new cc.Menu(menuBotonJugar);
        menu.setPosition(cc.p(size.width / 2, size.height * 0.5));
        this.addChild(menu);

        menuBotonJugar = new cc.MenuItemSprite( new cc.Sprite(res.level3_png), new cc.Sprite(res.level3_png), this.pulsarBotonJugar3, this);
        menu = new cc.Menu(menuBotonJugar);
        menu.setPosition(cc.p(size.width / 2, size.height * 0.15));
        this.addChild(menu);
    },
    pulsarBotonJugar1:function(){
        nivel = res.mapa1_tmx;
        cc.audioEngine.playEffect(res.sonidoClick_wav, false);
        cc.director.runScene(new GameScene());
    },
    pulsarBotonJugar2:function(){
        nivel = res.mapa2_tmx;
        cc.audioEngine.playEffect(res.sonidoClick_wav, false);
        cc.director.runScene(new GameScene());
    },
    pulsarBotonJugar3:function(){
        nivel = res.mapa3_tmx;
        cc.audioEngine.playEffect(res.sonidoClick_wav, false);
        cc.director.runScene(new GameScene());
    }
});

var LevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LevelLayer();
        this.addChild(layer);
    }
});