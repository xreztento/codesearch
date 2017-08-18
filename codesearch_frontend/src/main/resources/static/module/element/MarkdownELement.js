/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    require("markdown");
    require("to-markdown");
    require("bootstrap-markdown");
    require("dropzone");
    var Class = require("class");
    var Element = require("./Element");
    var Util = require("util");

    var MarkdownElement = Class("MarkdownElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "MarkdownElement"
        },
        initialize : function(width, height, rows, uploadUrl) {
            MarkdownElement.Super.call(this, width, height);
            this.width = width;
            this.height = height;
            this.rows = rows;
            this.uploadUrl;
        },
        init : function(where){
            var util = new Util();
            var rows = this.rows || 5;
            var width = this.width || "inherit";
            var height = this.height || "inherit";
            var uploadUrl = this.uploadUrl || "upload.action";
            var statement = "<textarea></textarea>";
            this.element = MarkdownElement.Super.prototype.init.call(this, where, statement);
            this.element.attr({
                "rows" : rows,
                "data-iconlibrary" : "fa"
            });

           this.element.markdown({
                autofocus : false,
                savable : false,
                hideable : false,
                width : util.getWidthOrHeightValue(width),
                height : util.getWidthOrHeightValue(height),
                resize : false,
                iconlibrary : "fa",
                language : "zh",
                enableDropDataUri : false,
                dropZoneOptions : {
                    url : uploadUrl,
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 2, // MB
                    accept: function(file, done) {
                        if (file.name == "justinbieber.jpg") {
                            done("Naha, you don't.");
                        }
                        else { done(); }
                    }
                },
                onShow : function(e){
                },
                onPreview : function(e) {
                },
                onSave : function(e) {
                },
                onChange : function(e){
                },
                onFocus : function(e) {
                },
                onBlur : function(e) {
                }
            });
            return this;
        },
        getContent : function(){
            return this.element.data("markdown").getContent();
        },
        parseContent : function(){
            return this.element.data("markdown").parseContent();
        },
        showEditor : function(){
            this.element.data("markdown").showEditor();
            return this;
        },
        showPreview : function(){
            this.element.data("markdown").showPreview();
            return this;
        },
        isDirty : function(){
            return this.element.data("markdown").isDirty();
        },
        hidePreview : function(){
            this.element.data("markdown").hidePreview();
            return this;
        },
        setContent : function(content){
            this.element.data("markdown").setContent(content);
            return this;
        },
        findSelection : function(words){
            this.element.data("markdown").findSelection(words);
            return this;
        },
        getSelection : function(){
            return this.element.data("markdown").getSelection();
        },
        setSelection : function(start, end){
            this.element.data("markdown").setSelection(start, end);
            return this;
        },
        replaceSelection : function(content){
            this.element.data("markdown").setSelection(content);
            return this;
        },
        getNextTab : function(){
            return this.element.data("markdown").getNextTab();
        },
        setNextTab : function(start, end){
            this.element.data("markdown").setNextTab(start, end);
            return this;
        },
        enableButtons : function(name){
            this.element.data("markdown").enableButtons(name);
            return this;
        },
        disableButtons : function(name){
            this.element.data("markdown").disableButtons(name);
            return this;
        },
        showButtons : function(name){
            this.element.data("markdown").showButtons(name);
            return this;
        },
        hideButtons : function(name){
            this.element.data("markdown").hideButtons(name);
            return this;
        },
        getModuleName : function(){
            return MarkdownElement.MODULE_NAME;
        }
    });

    module.exports = MarkdownElement;
});



