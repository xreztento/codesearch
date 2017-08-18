/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var Util = require("util");
    var LinkElement = require("linkElement");

    var UListElement = Class("UListElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "UListElement"
        },
        initialize : function(width, height) {
            UListElement.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<ul></ul>";
            this.element = UListElement.Super.prototype.init.call(this, where, statement);

            this.liArray = new Array();
            return this;
        },
        addIList : function(text, href, isActive){
            var text = text || "";
            var href = href || "#";
            var a = new LinkElement(text, href);
            var li = $("<li></li>");
            this.element.append(li);
            a.init(li);
            if(isActive){
                li.addClass("active");
            }
            this.liArray.push(li);
        },
        addIListFromLinkElement : function(a, isActive){
            if(a instanceof LinkElement){
                var li = $("<li></li>");
                this.element.append(li);
                a.init(li);
                if(isActive){
                    li.addClass("active");
                }
                this.liArray.push(li);
            }
        },
        addSeparator : function(){
            var li = $("<li role='separator' class='divider'></li>");
            this.element.append(li);
            //this.liArray.push(li);
        },
        getListItem : function(id){
            if(id < this.liArray.length){
                return this.liArray[id];
            }
        },
        getModuleName : function(){
            return UListElement.MODULE_NAME;
        }
    });

    module.exports = UListElement;
});
