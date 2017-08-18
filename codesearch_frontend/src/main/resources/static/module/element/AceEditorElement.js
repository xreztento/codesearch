/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("ace");
    require("ext-language_tools");
    var Class = require("class");
    var Element = require("./Element");

    var AceEditorElement = Class("AceEditorElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "AceEditorElement"
        },
        initialize : function(width, height) {
            AceEditorElement.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = AceEditorElement.Super.prototype.init.call(this, where, statement);
            this.editor = ace.edit(this.element[0]);
            ace.require("ace/ext/language_tools");

            this.editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

            this.editor.setTheme("ace/theme/twilight");
            return this;
        },
        addExtLanguageTools : function(){

        },
        addFullScreenCommand : function(){
            var editor = this.editor;
            editor.commands.addCommand({
                name: "fullscreen",
                bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
                exec: function(editor) {
                    var vp = cantkGetViewPort();
                    if(editor.isFullScreen) {
                        div.style.width = editorW + "px";
                        div.style.height = editorH + "px";
                        div.style.position = "absolute";
                        div.style.left = editorX + "px";
                        div.style.top = (scrollTop + editorY) + "px";
                        editor.resize();
                        editor.isFullScreen = false;
                        document.body.style.overflow = "auto";
                    }
                    else {
                        div.style.width = vp.width+ "px";
                        div.style.height = vp.height+ "px";
                        div.style.position = "absolute";
                        div.style.left = 0 + "px";
                        div.style.top = (scrollTop + 0) + "px";
                        editor.resize();
                        editor.isFullScreen = true;
                        document.body.style.overflow = "hidden";
                    }
                }
            });
        },
        setMode : function(mode){
            var modeMap = {
                "actionscript" : "ace/mode/actionscript",
                "apache_config" : "ace/mode/apache_config",
                "applescipt" : "ace/mode/applescipt",
                "asciidoc" : "ace/mode/asciidoc",
                "assembly_x86" : "ace/mode/assembly_x86",
                "c_cpp" : "ace/mode/c_cpp",
                "cobol" : "ace/mode/cobol",
                "coffee" : "ace/mode/coffee",
                "csharp" : "ace/mode/csharp",
                "css" : "ace/mode/css",
                "curly" : "ace/mode/curly",
                "html" : "ace/mode/html",
                "java" : "ace/mode/java",
                "javascript" : "ace/mode/javascript",
                "json" : "ace/mode/json",
                "jsp" : "ace/mode/jsp",
                "makefile" : "ace/mode/makefile",
                "markdown" : "ace/mode/markdown",
                "perl" : "ace/mode/perl",
                "php" : "ace/mode/php",
                "plain_text" : "ace/mode/plain_text",
                "powershell" : "ace/mode/powershell",
                "properties" : "ace/mode/properties",
                "protobuf" : "ace/mode/protobuf",
                "python" : "ace/mode/python",
                "r" : "ace/mode/r",
                "ruby" : "ace/mode/ruby",
                "scala" : "ace/mode/scala",
                "shell" : "ace/mode/sh",
                "sql" : "ace/mode/shell",
                "swift" : "ace/mode/swift",
                "typescript" : "ace/mode/typescript",
                "vbscript" : "ace/mode/vbscript",
                "verilog" : "ace/mode/verilog",
                "vhdl" : "ace/mode/vhdl",
                "xml" : "ace/mode/xml"
            };

            this.editor.session.setMode(modeMap[mode]);

        },
        setTheme : function(theme){
            var themeMap = {

            }
        },
        enableUseSoftTabs : function(){
            var editor = this.editor;
            editor.session.setUseSoftTabs(true);
        },
        unableUseSoftTabs : function(){
            var editor = this.editor;
            editor.session.setUseSoftTabs(false);
        },
        enableUseWrapMode : function(){
            var editor = this.editor;
            editor.session.setUseWrapMode(true);
        },
        unableUseWrapMode : function(){
            var editor = this.editor;
            editor.session.setUseWrapMode(false);
        },
        enableHighlightActiveLine : function(){
            var editor = this.editor;
            editor.setHighlightActiveLine(true);
        },
        unableHighlightActiveLine : function(){
            var editor = this.editor;
            editor.setHighlightActiveLine(false);
        },
        setReadOnly : function(readonly){
            var editor = this.editor;
            editor.setReadOnly(true);
        },
        setValue : function(value){
            var editor = this.editor;
            editor.setValue(value);
        },
        getTextSelectionRange : function(){
            var editor = this.editor;
            editor.session.getTextRange(editor.getSelectionRange());
        },
        insert : function(value){
            var editor = this.editor;
            editor.insert(value);
        },
        getCursor : function(){
            var editor = this.editor;
            return editor.selection.getCursor();
        },
        gotoLine : function(lineNumber){
            var editor = this.editor;
            editor.gotoLine(lineNumber);
        },
        getLineCount : function(){
            var editor = this.editor;
            return editor.session.getLength();
        },
        setTabSize : function(size){
            var editor = this.editor;
            editor.session.setTabSize(size);
        },

        getValue : function(){
            var editor = this.editor;
            editor.getValue();
        },
        onChange : function(callback){
            var editor = this.editor;
            editor.getSession().on("change", callback);
        },
        onChangeSelection : function(callback){
            var editor = this.editor;
            editor.getSession().selection.on('changeSelection',callback);
        },
        onChangeCursor : function(){
            var editor = this.editor;
            editor.getSession().selection.on('changeCursor',callback);
        },
        destroy : function(){
            var editor = this.editor;
            editor.destroy();
            editor.container.remove();
        },
        getModuleName : function(){
            return AceEditorElement.MODULE_NAME;
        }
    });

    module.exports = AceEditorElement;
});
