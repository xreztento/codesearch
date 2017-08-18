/**
 * Created by xreztento@vip.sina.com on 2016/01/20.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    require("headingLevel");
    var Class = require("class");
    var Panel = require("./Panel");
    var MathUtil = require("mathUtil");
    var DivElement = require("divElement");
    var HeadingElement = require("headingElement");

    var NormalPanel = Class("NormalPanel", {
        Extends : Panel,
        STATIC: {
            MODULE_NAME : "NormalPanel"
        },
        initialize : function(id, width, height, headingText) {
            var mathUtil = new MathUtil();
            NormalPanel.Super.call(this, id);
            this.width = width;
            this.height = height;
            this.headingText = headingText;
        },
        init : function(where){
            var width = this.width;
            var height = this.height;
            var headingText = this.headingText || "";
            this.panel = NormalPanel.Super.prototype.init.call(this, where);
            this.panel.addClass("todo-panels");

            var heading = $("<div class='todo-panel-heading'></div>");
            this.body = $("<div class='todo-panel-body'></div>");
            if(width){
                this.panel.css("width", width);
                heading.css("width", width);
                this.body.css("width", width);
            }
            if(height){
                this.body.css("height", height);
            }
            heading.css("color", "#8f8f8f");

            this.panel.append(heading).append(this.body);

            var headingElement = new HeadingElement(headingText, HeadingLevel.level5);
            headingElement.init(heading);

            var options = $("<div class='todo-panel-options'></div>");

            var collapse = $("<a href='#' class='collapse-link'>"
            + "<i class='fa fa-chevron-down'></i>"
            + "</a>");

            var that = this;
            collapse.click(function(){
                var i = $(this).find("i");
                if(i.attr("class") === "fa fa-chevron-down"){
                    i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                } else {
                    i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                }
                that.body.slideToggle("slow");
            });

            var operators = $("<span class='dropdown'>"
                + "<a href='#' class='dropdown-toggle dropdown-bar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"
                + "<i class='fa fa-ellipsis-v'></i>"
                + "</a>"
                + "</span>");

            this.ul = $("<ul class='dropdown-menu'></ul>");
            operators.append(this.ul);

            var close = $("<a href='#' class='collapse-link'>"
                + "<i class='fa fa-close'></i>"
                + "</a>");
            close.click(function(){
                that.panel.remove();
            });

            options.append(collapse)
                .append(operators)
                .append(close);
            heading.append(options);
            return this;
        },
        addOperator : function(text, callback){
            var text = text || "";
            var li = $("<li><a class='click-link'>" + text + "</a></li>");
            if(typeof(callback) === "function"){
                li.click(callback);
            }
            this.ul.append(li);
        },
        addBodyContent : function(body){
            if(body instanceof DivElement || body.is("div")){
                if(body instanceof DivElement){
                    body.init(this.body);
                } else {
                    this.body.append(body);
                }
            }
        },
        getBody : function(){
            return this.body();
        },
        getPanel : function(){
            return this.panel;
        },
        getModuleName : function(){
            return NormalPanel.MODULE_NAME;
        }
    });

    module.exports = NormalPanel;
});
