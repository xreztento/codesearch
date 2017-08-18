/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var ButtonElement = require("buttonElement");
    var ImageButtonElement = require("imageButtonElement");

    var ButtonGroupElement = Class("ButtonGroupElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "ButtonGroupElement"
        },
        initialize : function(width, height, role, orient, isJustified) {
            ButtonGroupElement.Super.call(this, width, height);
            this.role = role;
            this.orient = orient;
            this.isJustified = isJustified;
        },
        init : function(where){
            var statement = "<div></div>";
            var role = this.role || "group";
            var orient = this.orient || "horizontal";
            var isJustified = this.isJustified;
            this.element = ButtonGroupElement.Super.prototype.init.call(this, where, statement);
            this.element.attr({
                role : role
            });
            if(orient !== "horizontal"){
                this.element.addClass("btn-group-vertical");
            } else {
                this.element.addClass("btn-group");
            }
            if(isJustified){
                this.element.addClass("btn-group-justified");
            }
            return this;
        },
        addButtonElement : function(element){
            if(element instanceof ButtonElement
                || element instanceof ImageButtonElement
                || element instanceof ButtonGroupElement){
                element.init(this.element);
            }
        },
        getModuleName : function(){
            return ButtonGroupElement.MODULE_NAME;
        }
    });

    module.exports = ButtonGroupElement;
});
