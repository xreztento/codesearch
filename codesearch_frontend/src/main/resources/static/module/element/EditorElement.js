/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Util = require("util");
    require("editor")($);
    /**
     * 编辑器组件
     */
    var EditorElement = Class("EditorElement", {
        STATIC: {
            MODULE_NAME : "EditorElement"
        },
        initialize : function(id, width, height, placeholder, template) {
            this.id = id;
            this.width = width;
            this.height = height;
            this.placeholder = placeholder;
            this.template = template;
        },
        init : function(where){
            var id = this.id || "editor"
            var width = this.width || "1024px";
            var height = this.height || "400px";
            var util = new Util();
            var maxHeight = util.plusWidthOrHeight(height, 100);
            var placeholder = this.placeholder || ""
            var template = this.template;
            var container = $("<div style='width:" + width +"'><div id='"+ id +"' style='height:"+ height +";max-height:"+ maxHeight +";'><p>" + placeholder + "</p></div></div>");
            where.append(container);

            wangEditor.config.mapAk = template["mapAk"];
            wangEditor.config.printLog = false;

            this.editor = new wangEditor(id);
            for(var config in template) {
                if (template.hasOwnProperty(config)) {
                    this.editor.config[config] = template[config];
                }
            }

            this.editor.config.uploadParams = {

            };
            this.editor.config.uploadHeaders = {
                'Accept' : 'text/x-json'
            };

            this.editor.create();
            return this;
        },
        setHtml : function(html){
            this.editor.$txt.html(html);
            return this;
        },
        append : function(html){
            this.editor.$txt.append(html);
            return this;
        },
        clear : function(){
            this.editor.$txt.html("<p><br></p>");
            return this;
        },
        getHtml : function(){
            return this.editor.$txt.html();
        },
        getText : function(){
            return this.editor.$txt.text();
        },
        getFormatText : function(){
            return this.editor.$txt.formatText();
        },
        /**
         * 销毁编辑器
         */
        destroy : function(){
            this.editor.destroy();
            return this;
        },
        /**
         * 恢复编辑器
         */
        undestroy : function(){
            this.editor.undestroy();
            return this;
        },
        setDisabled : function(){
            this.editor.disable();
            return this;
        },
        setEnabled : function(){
            this.editor.enable();
            return this;
        },
        onchange : function(callback){
            this.editor.onchange = callback;
            return this;
        },
        _uploadImage : function(){

        },
        getModuleName : function(){
            return EditorElement.MODULE_NAME;
        }
    });

    module.exports = EditorElement;
});
