/**
 * Created by xreztento@vip.sina.com on 2017/1/9.
 */
define(function (require, exports, module) {

    require("jquery");
    require("style");
    var Class = require("class");
    var Element = require("./Element");
    var Util = require("util");
    /**
     * File组件
     */
    var FileElement = Class("FileElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "FileElement"
        },
        initialize : function(width, height, style) {
            FileElement.Super.call(this, width, height);
            this.width = width;
            this.height = height;
            this.style = style;
        },
        init : function(where){
            var statement = "<div></div>";
            var style = this.style || StyleType.primary;
            var width = this.width || "100px";
            var height = this.height || "40px";
            var util = new Util();
            this.element = FileElement.Super.prototype.init.call(this, where, statement);


            this.file = $("<input type='file'>")
                .addClass("btn btn-" + style)
                .css({
                    "display" : "inline",
                    "position" : "absolute",
                    "opacity" : 0,
                    "width" : util.subWidthOrHeight(width, 1),
                    "height" : util.subWidthOrHeight(height, 1)
                });
            this.button = $("<button type='button' class='btn btn-"+ style +"'>选择文件</button>")
                .css({
                    width : width,
                    height : height
                });

            this.element.css({
                position : "relative"
            }).append(this.file).append(this.button);
            return this;

        },
        /**
         * 选择文件事件
         * @param callback 回调函数
         * @returns {FileElement}
         */
        change : function(callback){
            this.file.change(function(){
                callback();
            });
            return this;
        },
        /**
         * 获取file元素
         * @returns {*|jQuery}
         */
        getFileElement : function(){
            return this.file;
        },
        getFilePath : function(){
            return this.file.val();
        },
        /**
         *获取所选择的文件
         * @returns {*}
         */
        getFile : function(){
            var fileUIElement = this.file[0];
            if(fileUIElement.files.length > 0){
                var file = fileUIElement.files[0];
                return file;
            }
            return null;
        },
        /**
         * 获取选择按钮元素
         * @returns {*|jQuery}
         */
        getButtonElement : function(){
            return this.button;
        },
        setImage : function(fontCss){
            this.element.append("<i class='" + fontCss + "'></i>");
            return this;
        },
        getModuleName : function(){
            return FileElement.MODULE_NAME;
        }
    });

    module.exports = FileElement;
});