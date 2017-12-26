var MenuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        cc.audioEngine.playMusic(res.musicaFondo_mp3, true);

        var spriteFondoTitulo = new cc.Sprite(res.background_png);
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        this.addChild(spriteFondoTitulo);

        var spriteTitulo = new cc.Sprite(res.title_png);
        spriteTitulo.setPosition(cc.p(size.width / 2, size.height / 1.5));
        this.addChild(spriteTitulo);

        var menuBotonJugar = new cc.MenuItemSprite( new cc.Sprite(res.btnStart_png), new cc.Sprite(res.btnStart_png), this.pulsarBotonJugar, this);
        var menu = new cc.Menu(menuBotonJugar);
        menu.setPosition(cc.p(size.width / 2, size.height * 0.25));
        this.addChild(menu);

        return true;
    },
    pulsarBotonJugar : function(){
        cc.audioEngine.playEffect(res.sonidoClick_wav, false);
        cc.director.runScene(new LevelScene());
    }

});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});