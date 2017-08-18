/**
 * Created by xreztento@vip.sina.com on 2017/2/9.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var ImageButtonElement = require("imageButtonElement");
    var FileUploader = require("fileUploader");

    var FileUploaderGroup = Class("FileUploaderGroup", {
        STATIC: {
            MODULE_NAME : "FileUploaderGroup"
        },

        initialize : function(width, height, uploadUrl, deleteUrl) {
            this.width = width;
            this.height = height;
            this.uploadUrl = uploadUrl;
            this.deleteUrl = deleteUrl;
        },

        init : function(where){
            this.group = $("<div style='margin-bottom: 10px;margin-left: 4px;'></div>");
            this.fileUploaderArray = new Array();
            where.append(this.group);
            var that = this;
            var addButton = new ImageButtonElement(null, null, "fa fa-plus");
            addButton.init(this.group).inline().click(function(){
                that.addFileUploader();
            });

            var removeButton = new ImageButtonElement(null, null, "fa fa-minus");
            removeButton.init(this.group).inline().click(function(){
                that.removeFileUploader();
            });

            this.addFileUploader();
            return this;
        },
        getGroup : function(){
          return this.group;
        },
        addFileUploader : function(){
            var uploadUrl = this.uploadUrl;
            var deleteUrl = this.deleteUrl;
            var fileUploader = new FileUploader("90%", "90%", uploadUrl, deleteUrl);
            fileUploader.init(this.group).getElement().css({
                "border-bottom" : "dashed 2px #bfbfbf",
                "padding-bottom" : "5px",
                "margin-bottom" : "5px"
            });
            this.fileUploaderArray.push(fileUploader);
        },
        removeFileUploader : function(){
            if(this.fileUploaderArray.length > 0){
                var fileUploader = this.fileUploaderArray.pop();
                fileUploader.destroy();
            }

        },
        addDoneFileUploader : function(file){
            var uploadUrl = this.uploadUrl;
            var deleteUrl = this.deleteUrl;
            var fileUploader = new FileUploader("90%", "90%", uploadUrl, deleteUrl, true, file);
            fileUploader.init(this.group);
            this.fileUploaderArray.push(fileUploader);
        },
        getModuleName : function(){
            return FileUploaderGroup.MODULE_NAME;
        }
    });

    module.exports = FileUploaderGroup;
});
