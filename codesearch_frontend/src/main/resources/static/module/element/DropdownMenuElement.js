/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    var Class = require("class");
    var Element = require("element");
    var LinkElement = require("linkElement");

    var DropdownMenuElement = Class("DropdownMenuElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "DropdownMenuElement"
        },
        initialize : function(width, height, text, style, dropdownType) {
            DropdownMenuElement.Super.call(this, width, height);
            this.width = width;
            this.height = height;
            this.dropdownType = dropdownType || "btn"
            this.text = text;
            this.style = style;
        },
        init : function(where){
            var dropdownType = this.dropdownType;
            if(dropdownType == "btn"){
                var statement = "<div></div>";
            } else {
                var statement = "<li></li>";
            }

            var text = this.text || "Menu";
            var style = this.style || "primary";

            this.element = DropdownMenuElement.Super.prototype.init.call(this, where, statement);
            var width = this.width;
            var height = this.height;

            if(dropdownType === "btn"){
                this.element.addClass("btn-group");
                this.element.html("<button class='btn btn-" + style + " dropdown-toggle' type='button' " +
                "data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' " +
                "style='width:" + width +";height:"+ height +"'>" +
                text +
                "<span class='caret'></span></button><ul class='dropdown-menu'></ul>");
            } else {
                this.element.addClass("dropdown");
                this.element.html("<a href='#' class='dropdown-toggle' data-toggle='dropdown' " +
                "role='button' aria-haspopup='true' aria-expanded='false' " +
                "style='width:" + width +";height:"+ height +"'>" + text + "<span class='caret'></span></a>" +
                "<ul class='dropdown-menu'></ul>");
            }

            this.menuItemArray = new Array();
            return this;
        },
        addMenuItem : function(item){
            if(item instanceof LinkElement){
                var li = $("<li></li>");
                item.init(li);
                this.menuItemArray.push(li);
                this.getMenuList().append(li);
            }
            return this;
        },
        addMenuSeparator : function(){
            var li = $("<li role='separator' class='divider'></li>");
            this.menuItemArray.push(li);
            this.getMenuList().append(li);
            return this;
        },
        getMenuList : function(){
            return $(this.element.find("ul"));
        },
        getModuleName : function(){
            return DropdownMenuElement.MODULE_NAME;
        }
    });

    module.exports = DropdownMenuElement;
});

