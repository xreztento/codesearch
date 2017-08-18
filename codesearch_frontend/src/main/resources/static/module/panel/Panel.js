/**
 * Created by xreztento@vip.sina.com on 2016/01/20.
 * 一个Panel的主类，实现了对元素的初始化和一些结合JQuery进行重新表达的方法
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var MathUtil = require("mathUtil");

    /**
     * 所有组件元素的超类
     */
    var Panel = Class("Panel", {
        STATIC: {
        },
        /**
         * 构造函数
         * @param width 元素的宽度
         * @param height 元素的高度
         */
        initialize: function(id) {
            this.id = id;
        },
        /**
         *
         * @param where 一个JQuery对象，元素将被初始化到该对象下，每个元素必须首先使用该方法进行初始化
         * @param statement 一个元素表达式
         */
        init : function(where){
            var mathUtil = new MathUtil();
            var id = this.id || mathUtil.getUUID();
            this.panel = $("<div></div>");
            if(id){
                this.panel.attr( "id", id);
            }

            where.append(this.panel);
            return this.panel;
        },
        /**
         * 获取该元素
         * @returns {*|jQuery|HTMLpanel}
         */
        getPanel : function(){
            return this.panel;
        },
        /**
         * 获取元素内的HTML
         * @returns html值
         */
        getHtml : function(){
            return this.panel.html();
        },
        /**
         *
         * @param html
         * @returns {HTMLpanel}
         */
        setHtml : function(html){
            this.panel.html(html);
            return this;
        },
        hide : function(speed, callback){
            this.panel.hide(speed, callback);
            return this;
        },
        show : function(speed, callback){
            this.panel.show(speed, callback);
            return this;
        },
        onEvent : function(event, callback){
            this.panel.css("cursor", "pointer").on(event, callback);
            return this;
        },
        offEvent : function(event){
            this.panel.css("cursor", "default").off(event);
            return this;
        },
        setId : function(id){
            this.panel.attr("id", id);
            return this;
        },
        getId : function(){
            return this.panel.attr("id");
        },
        setName : function(name){
            this.panel.attr("name", name);
            return this;
        },
        getName : function(){
            return this.panel.attr("name");
        }
    });

    module.exports = Panel;
});
