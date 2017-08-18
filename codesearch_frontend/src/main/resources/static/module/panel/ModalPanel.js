/**
 * Created by xreztento@vip.sina.com on 2016/01/20.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    var Class = require("class");
    var Panel = require("./Panel");
    var MathUtil = require("mathUtil");


    var ModalPanel = Class("ModalPanel", {
        Extends : Panel,
        STATIC: {
            MODULE_NAME : "ModalPanel"
        },
        initialize : function(id, labelId, labelText, submitBtnText, quitBtnText) {
            var mathUtil = new MathUtil();
            ModalPanel.Super.call(this, id);
            this.labelId = labelId || mathUtil.getUUID();
            this.labelText = labelText || "对话框";
            this.submitBtnText = submitBtnText || "确定";
            this.quitBtnText = quitBtnText || "取消";
        },
        init : function(where){

            this.panel = ModalPanel.Super.prototype.init.call(this, where);
            var id = this.getId();
            var labelId = this.labelId;
            var labelText = this.labelText;
            var submitBtnText = this.submitBtnText;
            var quitBtnText = this.quitBtnText;
            this.panel.attr({
                "class" : "modal fade",
                "id" : id,
                "tabindex" : -1,
                "role" : "dialog",
                "aria-labelledby" : labelId,
                "aria-hidden" : true

            }).css({
                "text-align" : "left"
            });
            this.setHtml("<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>" +
                                        "×" +
                                    "</button>" +
                                    "<h4 class='modal-title' id='" + labelId + "'>" +
                                        labelText +
                                    "</h4>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                "<button type='button' class='btn btn-default' data-dismiss='modal'>" +
                                    quitBtnText +
                                "</button>" +
                                "<button type='button' class='btn btn-primary'>" +
                                    submitBtnText +
                                "</button>" +
                                "</div>" +
                            "</div>" +
                         "</div>");
            return this;
        },
        getPanel : function(){
            return this.panel;
        },
        getModalHeader : function(){
            return $(this.panel.find(".modal-header")[0]);
        },
        getLabelId : function(){
            return this.labelId;
        },
        getModalFooter : function(){
            return $(this.panel.find(".modal-footer")[0]);
        },
        getModalBody : function(){
            return $(this.panel.find(".modal-body")[0]);
        },
        setModalBody : function(html){
            this.getModalBody().html(html);
            return this;
        },
        addModalBodyElement : function(element){
            element.init(this.getModalBody());
            return this;
        },
        setLabelText : function(labelText){
            $(this.panel.find(".modal-title")[0]).text(labelText);
            return this;
        },
        setSubmitBtnEvent : function(callback){
            $(this.getModalFooter().find("button")[1]).on("click", callback);
            return this;
        },
        removeSubmitBtnEvent : function(callback){
            $(this.getModalFooter().find("button")[1]).off("click", callback);
            return this;
        },
        hide : function(){
            this.panel.modal("hide");
            return this;
        },
        show : function(){
            this.panel.modal("show");
            return this;
        },
        toggle : function(){
            this.panel.modal("toggle");
            return this;
        },
        onShow : function(callback){
            this.panel.on('show.bs.modal', callback);
            return this;
        },
        onShown : function(callback){
            this.panel.on('shown.bs.modal', callback);
            return this;
        },
        onHide : function(callback){
            this.panel.on('hide.bs.modal', callback);
            return this;
        },
        onHidden : function(callback){
            this.panel.on('hidden.bs.modal', callback);
            return this;
        },
        getModuleName : function(){
            return ModalPanel.MODULE_NAME;
        }
    });

    module.exports = ModalPanel;
});
