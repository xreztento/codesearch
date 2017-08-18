/**
 * Created by xreztento@vip.sina.com on 2016/01/20.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Panel = require("./Panel");


    var SimplePanel = Class("SimplePanel", {
        Extends : Panel,
        STATIC: {
            MODULE_NAME : "SimplePanel"
        },
        initialize : function(width, height, labelText) {
            SimplePanel.Super.call(this);
            this.labelText = labelText || "对话框";
            this.width = width;
            this.height = height;
        },
        init : function(where){
            var width = this.width;
            var height = this.height;
            var labelText = this.labelText;

            this.panel = SimplePanel.Super.prototype.init.call(this, where);
            this.panel.attr({
                "class" : "panel panel-default"
            }).css({
                "text-align" : "left"
            });

            if(width){
                this.panel.css("width", width);
            }
            if(height){
                this.panel.css("height", height);
            }
            this.setHtml("<div class='panel-heading' style='height:18%;'>" +
            "<h3 class='panel-title' style='display: inline-block'>" +
                labelText +
            "</h3>" +
            "<div class='panel-toolbar' style='display: inline-block; float: right'>" +
            "</div>" +
            "</div>" +
            "<div class='panel-body' style='height:74%;overflow-y: auto;overflow-x: hidden'>" +
            "</div>" +
            "<div class='panel-footer' style='height:8%;'></div>");
            return this;
        },
        getPanel : function(){
            return this.panel;
        },
        getHeader : function(){
            return $(this.panel.find(".panel-heading")[0]);
        },
        getFooter : function(){
            return $(this.panel.find(".panel-footer")[0]);
        },
        getBody : function(){
            return $(this.panel.find(".panel-body")[0]);
        },
        getToolBar : function(){
            return $(this.panel.find(".panel-toolbar")[0]);
        },
        setBody : function(html){
            this.getBody().html(html);
            return this;
        },
        addBodyElement : function(element){
            if(element instanceof Element){
                element.init(this.getBody());
            } else {
                this.getBody().append(element);
            }
            return this;
        },
        addToolBarButton : function(element){
            element.init(this.getToolBar());
            return this;
        },
        addFooterElement : function(element){
            element.init(this.getFooter());
            return this;
        },
        setLabelText : function(labelText){
            $(this.panel.find(".panel-title")[0]).text(labelText);
            return this;
        },
        getModuleName : function(){
            return SimplePanel.MODULE_NAME;
        }
    });

    module.exports = SimplePanel;
});
