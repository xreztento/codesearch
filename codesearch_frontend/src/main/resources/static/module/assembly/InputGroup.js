/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var TextElement = require("textElement");
    var Element = require("element");

    var InputGroup = Class("InputGroup", {
        STATIC: {
            MODULE_NAME : "InputGroup"
        },
        /**
         *
         * @param width
         * @param height
         * @param placeholder 提示内容
         * @param prefix group的前置占位元素
         * @param postfix group的后置占位元素
         */
        initialize : function(width, height, placeholder, prefix, postfix) {
            this.width = width;
            this.height = height;
            this.placeholder = placeholder;
            this.prefix = prefix;
            this.postfix = postfix;
        },
        /**
         *
         * @param where 一个JQuery对象，元素将被初始化到该对象下，每个元素必须首先使用该方法进行初始化
         * @param defaultAuto 是否自动添加textElement
         * @returns {*|jQuery|HTMLElement}
         */
        init : function(where, defaultAuto){
            var placeholder = this.placeholder;
            var prefix = this.prefix;
            var postfix = this.postfix;
            var defaultAuto = defaultAuto || "auto";
            this.group = $("<div class='input-group'></div>");
            where.append(this.group);
            this.elementArray = new Array();
            if(defaultAuto === "auto"){
                this.text = new TextElement(null, null, placeholder);
                this.text.init(this.group);
                this.text.toFormElement().before(prefix).after(postfix);
                this.elementArray.push(this.text);
            }
            return this.group;
        },
        /**
         * 获取InputGroup内的输入框input对象
         * @returns {TextElement|*}
         */
        getInputElement : function(){
            return this.text;
        },
        addElement : function(element){
            if(element instanceof Element){
                element.init(this.group);
                this.elementArray.push(element);
            }
        },
        getGroup : function(){
            return this.group;
        },
        html : function(html){
            this.group.html(html);
        },
        getModuleName : function(){
            return InputGroup.MODULE_NAME;
        }
    });

    module.exports = InputGroup;
});