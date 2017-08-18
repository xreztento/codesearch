/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var DivElement = Class("DivElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "DivElement"
        },
        initialize : function(width, height) {
            DivElement.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = DivElement.Super.prototype.init.call(this, where, statement);
            return this;
        },
        getModuleName : function(){
            return DivElement.MODULE_NAME;
        }
    });

    module.exports = DivElement;
});
