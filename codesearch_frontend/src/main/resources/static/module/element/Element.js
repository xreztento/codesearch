/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 * 一个DOM元素的主类，实现了对元素的初始化和一些结合JQuery进行重新表达的方法
 */
define(function (require, exports, module) {

    require("jquery");
    require("jquery-ui");
    require("contextmenu");
    var Class = require("class");
    var Observer = require("observer");
    /**
     * 所有组件元素的超类
     */
    var Element = Class("Element", {
        Extends : Observer,
        STATIC: {
        },
        /**
         * 构造函数
         * @param width 元素的宽度
         * @param height 元素的高度
         */
        initialize: function(width, height, model) {
            Element.Super.call(this, model);
            this.width = width;
            this.height = height;
        },
        /**
         *
         * @param where 一个JQuery对象，元素将被初始化到该对象下，每个元素必须首先使用该方法进行初始化
         * @param statement 一个元素表达式
         */
        init : function(where, statement, position){
            var width = this.width;
            var height = this.height;
            position = position || "tail";

            this.element = $(statement);
            if(width){
                this.element.css( "width", width);
            }
            if(height){
                this.element.css( "height", height);
            }
            if(where instanceof Element){
            	if(position === "tail"){
                    where.getElement().append(this.element);

            	} else {
            		where.getElement().prepend(this.element);
            	}
            } else {
            	if(position === "tail"){
                    where.append(this.element);

            	} else {
            		where.prepend(this.element);
            	}
            }

            return this.element;
        },
        /**
         * 获取该元素
         * @returns {*|jQuery|HTMLElement}
         */
        getElement : function(){
            return this.element;
        },
        /**
         * 取得元素的value值
         * @returns {*}
         */
        getValue : function(){
            return this.element.val();
        },
        /**
         * 设置元素的value值
         * @param value
         */
        setValue : function(value){
            this.element.val(value);
        },
        /**
         * 取得元素内的文本值
         * @returns {*}
         */
        getText : function(){
            return this.element.text();
        },
        /**
         * 设置元素内的文本值
         * @param value
         */
        setText : function(value){
            this.element.text(value);
            return this;
        },
        /**
         * 获取元素内的HTML
         * @returns html值
         */
        getHtml : function(){
            return this.element.html();
        },
        /**
         *
         * @param html
         * @returns {HTMLElement}
         */
        setHtml : function(html){
            this.element.html(html);
            return this;
        },

        setDisabled : function(){
            this.element.attr("disabled", "disabled");
            return this;
        },
        setEnabled : function(){
            this.element.removeAttr("disabled");
            return this;
        },
        readonly : function(){
            this.element.attr("readonly", "readonly");
            return this;
        },
        noReadonly : function(){
            this.element.removeAttr("readonly");
            return this;
        },
        hide : function(speed, callback){
            this.element.hide(speed, callback);
            return this;
        },
        show : function(speed, callback){
            this.element.show(speed, callback);
            return this;
        },
        toFormElement : function(){
            this.element.addClass("form-control");
            return this;
        },
        noFormElement : function(){
            this.element.removeClass("form-control");
            return this;
        },
        inline : function(){
            if(this.element.is("div")){
                this.element.css("display", "inline-block");
            } else {
                this.element.css("display", "inline");
            }
            return this;
        },
        noInline : function(){
            this.element.css("display", "block");
            return this;
        },
        onEvent : function(event, callback){
            this.element.css("cursor", "pointer").on(event, callback);
            return this;
        },
        offEvent : function(event){
            this.element.css("cursor", "default").off(event);
            return this;
        },
        setId : function(id){
            this.element.attr("id", id);
            return this;
        },
        getId : function(){
            return this.element.attr("id");
        },
        setName : function(name){
            this.element.attr("name", name);
            return this;
        },
        getName : function(){
            return this.element.attr("name");
        },
        before : function(content){
            this.element.before(content);
            return this;
        },
        after :  function(content){
            this.element.after(content);
            return this;
        },
        layoutToLeft : function(){
            this.element.css("float", "left");
            return this;
        },
        layoutToRight : function(){
            this.element.css("float", "right");
            return this;
        },
        css : function(cssName, cssValue){
            this.element.css(cssName, cssValue);
            return this;
        },
        attr : function(attrName, attrValue){
            this.element.attr(attrName, attrValue);
            return this;
        },
        getAttr : function(attrName){
            return this.element.attr(attrName);
        },
        removeAttr : function(attrName){
            this.element.removeAttr(attrName);
            return this;
        },
        addClass : function(className){
            this.element.addClass(className);
            return this;
        },
        removeClass : function(className){
            this.element.removeClass(className);
            return this;
        },
        addContextMenu : function(menu, selectCallback){
            var that = this;
            var menu = menu || [
                    {title: "Cut <kbd>Ctrl+X</kbd>", cmd: "cut", uiIcon: "ui-icon-scissors"},
                    {title: "Copy <kbd>Ctrl+C</kbd>", cmd: "copy", uiIcon: "ui-icon-copy"},
                    {title: "Paste <kbd>Ctrl+V</kbd>", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: true },
                    {title: "----"},
                    {title: "Edit <kbd>[F2]</kbd>", cmd: "edit", uiIcon: "ui-icon-pencil"},
                    {title: "More", children: [
                        {title: "Use an 'action' callback", action: function(event, ui) {
                            alert("action callback sub1");
                        } },
                        {title: "Tooltip (static)", cmd: "sub2", tooltip: "Static tooltip"},
                        {title: "Tooltip (dynamic)", tooltip: function(event, ui){ return "" + Date(); }},
                        {title: "Custom icon", cmd: "browser", uiIcon: "ui-icon custom-icon-firefox"},
                        {title: "Disabled (dynamic)", disabled: function(event, ui){
                            return false;
                        }}
                    ]}
                ];
            var selectCallback = selectCallback || function(event, ui) {
                    var $target = ui.target;
                    console.log(ui.cmd);
                    console.log($target);
                }
            this.element.contextmenu({
                    delegate: that.element,
                    autoFocus: true,
                    preventContextMenuForPopup: true,
                    preventSelect: true,
                    taphold: true,
                    menu : menu,
                    select : selectCallback
            });
        },
        destroy : function(){
            this.element.remove();
        }

    });

    module.exports = Element;
});