/**
 * Created by xreztento@vip.sina.com on 2017/3/3.
 */
define(function (require, exports, module) {

    require("jquery");
    require("steps");
    var Class = require("class");
    var Panel = require("./Panel");
    var DivElement = require("divElement");

    var StepsPanel = Class("StepsPanel", {
        Extends : Panel,
        STATIC: {
            MODULE_NAME : "StepsPanel"
        },
        initialize : function(width, height) {
            StepsPanel.Super.call(this);
            this.width = width;
            this.height = height;
        },
        init : function(where){
            var width = this.width;
            var height = this.height;
            this.panel = StepsPanel.Super.prototype.init.call(this, where);
            this.panel.addClass(".wizard");

            if(width){
                this.panel.css("width", width);
            }
            if(height){
                this.panel.css("height", height);
            }

            return this;
        },
        getPanel : function(){
            return this.panel;
        },
        getModuleName : function(){
            return StepsPanel.MODULE_NAME;
        }
    });

    module.exports = StepsPanel;
});
