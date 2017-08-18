/**
 * Created by xreztento@vip.sina.com on 2017/3/1.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var MathUtil = require("mathUtil");
    var FormElement = require("formElement");
    var ButtonElement = require("buttonElement");
    var UListElement = require("uListElement");
    var PlainTextElement = require("plainTextElement");
    var DropdownMenuElement = require("dropdownMenuElement");
    var LinkElement = require("linkElement");
    var ImageElement = require("imageElement");

    var NavElement = Class("NavElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "NavElement"
        },
        initialize : function(position, inverse) {
            NavElement.Super.call(this, null, null);
            this.position = position;
            this.inverse = inverse;
        },
        init : function(where){
            var position = this.position;
            var inverse = this.inverse;
            var mathUtil = new MathUtil();
            var id = mathUtil.getUUID();

            var statement = "<nav class='navbar navbar-default'></nav>";
            this.element = NavElement.Super.prototype.init.call(this, where, statement);
            if(position){
                this.element.addClass("navbar-" + position);
            }
            if(inverse){
                this.element.addClass("navbar-inverse");
            }
            var container = $("<div class='container-fluid'></div>");
            this.header = $("<div class='navbar-header'></div>");
            this.toggleButton = $("<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#"+ id +"' aria-expanded='false'>"
                + "<span class='sr-only'>Toggle navigation</span>"
                + "<span class='icon-bar'></span>"
                + "<span class='icon-bar'></span>"
                + "<span class='icon-bar'></span>"
                + "</button>");
            this.header.append(this.toggleButton);

            this.collapse = $("<div class='collapse navbar-collapse' id='" + id + "'></div>");

            container.append(this.header).append(this.collapse);

            this.element.append(container);

            this.elementArray = new Array();

            return this;
        },
        addForm : function(form, float){
            var float = float || "left";
            if(form instanceof FormElement){
                form.init(this.collapse);
                form.addClass("navbar-form navbar-" + float);
                this.elementArray.push(form);
            }
        },
        addButton : function(button, float){
            var float = float || "left";
            if(button instanceof ButtonElement){
                button.init(this.collapse);
                button.addClass("navbar-btn navbar-" + float);
                this.elementArray.push(button);
            }
        },
        addPlainText : function(plainText, float, link){
            var float = float || "left";
            if(plainText instanceof PlainTextElement){
                plainText.init(this.collapse);
                plainText.addClass("navbar-text");

                if(link instanceof LinkElement){
                    link.init(plainText.getElement());
                    link.addClass("navbar-link");
                }

                this.elementArray.push(plainText);
            }
        },
        addUList : function(uList, float){
            var float = float || "left";
            if(uList instanceof UListElement){
                uList.init(this.collapse);
                uList.addClass("nav navbar-nav navbar-" + float);
                this.elementArray.push(uList);
            }
        },
        addDropdownMenu : function(dropdownMenu, float){
            var float = float || "left";
            if(dropdownMenu instanceof DropdownMenuElement){

                var uList = new UListElement();
                uList.init(this.collapse);
                uList.addClass("nav navbar-nav navbar-" + float);
                dropdownMenu.init(uList);
                this.elementArray.push(uList);
            }
        },
        addBrand : function(href, alt, src, isLazyLoad){
            var href = href || "#";
            var alt = alt || "";

            if(src){
                var a = new LinkElement("", href);
                a.init(this.header);
                a.addClass("navbar-brand");
                var image = new ImageElement(null, null, src);
                image.init(a.getElement());
                if(isLazyLoad){
                    image.lazyLoad(src, 2000);
                }
            } else {
                var a = new LinkElement(alt, href);
                a.init(this.header);
                a.addClass("navbar-brand");
            }

        },
        getModuleName : function(){
            return NavElement.MODULE_NAME;
        }
    });

    module.exports = NavElement;
});


