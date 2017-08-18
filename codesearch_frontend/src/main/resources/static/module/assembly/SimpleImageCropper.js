/**
 * Created by xreztento@vip.sina.com on 2017/1/6.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var ImageUtil = require("imageUtil");
    require("cropper");
    var ImageElement = require("imageElement");
    var FileElement = require("fileElement");

    var SimpleImageCropper = Class("SimpleImageCropper", {
        STATIC: {
            MODULE_NAME : "SimpleImageCropper"
        },
        initialize : function(width, height, imgMaxWidth, imgMaxHeight, cropperMinWidth, cropperMinHeight, maxSize) {
            this.width = width;
            this.height = height;
            this.imgMaxWidth = imgMaxWidth;
            this.imgMaxHeight = imgMaxHeight;
            this.cropperMinWidth = cropperMinWidth;
            this.cropperMinHeight = cropperMinHeight;
            this.maxSize = maxSize;
        },
        init : function(where){
            var imgMaxWidth = this.imgMaxWidth;
            var imgMaxHeight = this.imgMaxHeight;
            var cropperMinWidth = this.cropperMinWidth;
            var cropperMinHeight = this.cropperMinHeight;
            var maxSize = this.maxSize;
            var copper = $("<div></div>");
            var imageUtil = new ImageUtil();
            var width = this.width || imgMaxWidth || "256px";
            var height = this.height || imgMaxHeight || "256px";
            var maxSize = maxSize || 1024 * 1024 * 10;
            var cropperMinWidth = cropperMinWidth || width;
            var cropperMinHeight = cropperMinHeight || height;
            copper.css({
                width : width,
                height : height
            });
            where.append(copper);

            this.imageElement = new ImageElement(width, height);
            var fileElement = new FileElement();

            this.imageElement.init(copper);
            fileElement.init(copper);
            var that = this;
            fileElement.change(function(){
                var file = fileElement.getFile();

                if(file.size <= maxSize){
                    imageUtil.saveImageFileToDataURL(file, function(dataURL){
                        that.imageElement.setImage(dataURL);
                        that.imageElement.getElement().cropper("destroy");
                        that.imageElement.getElement().cropper({
                                    dragMode : 'none',
                                    rotatable : false,
                                    scalable : true,
                                    cropBoxResizable : true,
                                    zoomOnWheel : false,
                                    minCropBoxWidth : cropperMinWidth,
                                    minCropBoxHeight : cropperMinHeight
                                });

                    });
                }
                //console.log(that.imageElement.getElement().cropper("getCroppedCanvas"));
            });

            return this;
        },
        getCropped : function(){
            //$().cropper('getCroppedCanvas').toDataURL('image/jpeg')
            var canvas = this.imageElement.getElement().cropper("getCroppedCanvas");
            return canvas.toDataURL("image/jpeg");
        },
        getModuleName : function(){
            return SimpleImageCropper.MODULE_NAME;
        }
    });

    module.exports = SimpleImageCropper;
});