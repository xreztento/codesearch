/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */

define(function(require, exports, module){
    require("jquery");
    require("json2");

    var Class = require("class");
    var HttpUtil = require("httpUtil");
    var Util = require("util");

    var Element = require("element");
    var ProgressBar = require("progressBarElement");
    var FileElement = require("fileElement");
    var TextElement = require("textElement");
    var ButtonElement = require("buttonElement");
    var ImageButtonElement = require("imageButtonElement");

    var FileUploader = Class("FileUploader", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "FileUploader",
            MAX_UPLOAD_SIZE : 1024 * 1024 * 10

        },

        initialize : function(width, height, uploadUrl, deleteUrl, isDone, file, maxUploadSize) {

            FileUploader.Super.call(this, width, height);
            this.uploadUrl = uploadUrl;
            this.deleteUrl = deleteUrl;
            this.isDone = isDone;
            this.file = file;
            this.maxUploadSize = maxUploadSize;
        },
        init : function(where) {
            var statement = "<div></div>";

            this.fileUploader = FileUploader.Super.prototype.init.call(this, where, statement);

            var uploadUrl = this.uploadUrl;
            var deleteUrl = this.deleteUrl;
            var isDone = this.isDone;
            var file = this.file;
            var maxUploadSize = this.maxUploadSize || FileUploader.MAX_UPLOAD_SIZE;
            var httpUtil = new HttpUtil();
            var util = new Util();
            var textElement = new TextElement("80%", null);
            textElement.init(this.fileUploader).toFormElement().setDisabled().setValue("选择上传文件");
            var progressBar = new ProgressBar("80%", "30px", true);
            progressBar.init(this.fileUploader);

            var fileElement = new FileElement();
            fileElement.init(this.fileUploader).inline().change(function(){
                textElement.setValue(fileElement.getFilePath());
            });

            var button = new ButtonElement("100px", "40px");
            button.init(this.fileUploader).setText("上传文件").inline().attr("data-clicked", "no").click(function(){

                if(button.getAttr("data-clicked") === "no"){
                    if(fileElement.getFile()){

                        var file = fileElement.getFile();
                        if(file.size > maxUploadSize){
                            alert("文件大小不能超过" + util.simpleFormatCSize(maxUploadSize) + "!");
                            return;
                        }

                        button.attr("data-clicked","yes").removeClass("btn-primary")
                            .addClass("btn-info").attr("disabled","disabled").setText("上传中...");

                        var uploadURLParam = {
                            "fileName" : encodeURIComponent(file.name)
                        };

                        var xhr = new XMLHttpRequest();
                        //指定处理上传进度的函数
                        xhr.onprogress = updateProgress;
                        xhr.upload.onprogress = updateProgress;

                        //处理上传
                        xhr.open("POST",
                            httpUtil.joinUrl(uploadUrl, uploadURLParam),
                            true);
                        xhr.overrideMimeType("application/octet-stream");
                        xhr.send(file);
                        //处理响应
                        xhr.onreadystatechange = function() {
                            if ( xhr.readyState == 4 && xhr.status == 200 ) {

                                var data = xhr.responseText;
                                var json = JSON.parse(data);
                                var dataId = json.id;

                                fileElement.attr("data-id",dataId);
                                button.attr("data-clicked","yes").removeClass("btn-info")
                                    .addClass("btn-success").setText("上传成功！");
                                deleteButton.show();

                            } else if(xhr.readyState == 4){
                                alert("上传失败！");
                                progressBar.updateProgress(0);
                                button.attr("data-clicked","no").removeClass("btn-info")
                                    .addClass("btn-primary").setText("上传文件").setEnabled();
                            }
                        };
                    } else {
                        alert("请选择上传文件!");
                    }
                }
            });

            var deleteButton = new ImageButtonElement(null, null, "fa fa-close");
            deleteButton.init(this.fileUploader).layoutToRight().hide().click(function(){
                var id = fileElement.getAttr("data-id");
                $.ajax({
                    url : deleteUrl,
                    data : {
                        id : id
                    },
                    async : true,
                    type : "POST",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(data) {
                        if(data === "success"){
                            progressBar.resetProgress();
                            fileElement.removeAttr("data-id");
                            button.attr("data-clicked","no").removeClass("btn-success")
                                .addClass("btn-primary").setText("上传文件").removeAttr("disabled");
                            deleteButton.hide();
                        }
                    },
                    error : function(data){
                        alert("删除失败！");
                    }
                });
            });

            if(isDone){
                fileElement.attr("data-id",file.id);
                textElement.setValue(file.name);
                button.attr("data-clicked","yes").removeClass("btn-success")
                    .addClass("btn-success").setDisabled().setText("上传成功！");
                progressBar.finishedProgress();
                deleteButton.show();
            }

            //处理进度条逻辑
            var updateProgress = function (event) {
                if (event.lengthComputable) {
                    var percentage = Math.round((event.loaded * 100) / event.total);
                    progressBar.updateProgress(percentage);
                }

            };

            return this;
        },
        getFileUploader : function(){
            return this.fileUploader;
        }
    });

    module.exports = FileUploader;
});