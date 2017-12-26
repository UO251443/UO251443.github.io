var WinLayer = cc.LayerColor.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
        var size = cc.director.getWinSize();

        cc.audioEngine.playMusic(res.victory_mp3, true);

        var spriteTitulo = new cc.Sprite(res.victory_png);
        spriteTitulo.setPosition(cc.p(size.width / 2, size.height / 1.5));
        this.addChild(spriteTitulo);

        var menuBotonJugar = new cc.MenuItemSprite( new cc.Sprite(res.btnMenu_png), new cc.Sprite(res.btnMenu_png), this.pulsarBotonJugar, this);
        var menu = new cc.Menu(menuBotonJugar);
        menu.setPosition(cc.p(size.width / 2, size.height * 0.25));
        this.addChild(menu);

         return true;
    },
    pulsarBotonJugar : function(){
        cc.audioEngine.playEffect(res.sonidoClick_wav, false);
        cc.director.runScene(new MenuScene());
    }
});

var WinScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new WinLayer();
        this.addChild(layer);
    }
});