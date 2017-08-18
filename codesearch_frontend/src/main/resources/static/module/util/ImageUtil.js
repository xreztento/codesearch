/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {
    require("bluebird");
    var Class = require("class");

    var ImageUtil = Class("ImageUtil", {
        STATIC: {
            NAME : "ImageUtil"
        },
        initialize : function(){
            this.dataURL = "";
        },
        /**
         * 获取dataURL
         * @returns {string}
         */
        getDataURL : function(){
            return this.dataURL;
        },
        /**
         * 设置dataURL
         * @param dataURL
         */
        setDataURL : function(dataURL){
            this.dataURL = dataURL;
        },
        /**
         * 渲染Image到canvas
         * @param dataURL
         * @param canvas
         */
        renderImageToCanvas : function(dataURL, canvas){
            if(canvas.is("canvas")){
                var canvas = canvas[0];
                var image = new Image();
                image.src = dataURL;
                canvas.width = image.width;
                canvas.height = image.height;
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, image.width, image.height);
            }
        },
        /**
         * 渲染Image到image
         * @param dataURL
         * @param image
         */
        renderImageToImage : function(dataURL, image){
            if(image.is("image")){
                image.attr("src", dataURL);
            }
        },
        /**
         * dataURL转换为Blob
         * @param dataURL
         * @returns {Blob}
         */
        dataURLtoBlob : function(dataURL){
            var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },
        /**
         * 使用Promise构造reader.onload函数，形成调用链
         * @param file
         * @returns {Promise}
         * @private
         */
        _saveImageFileToDataURL : function(file) {
            return new Promise(function(resolve, reject){
                if(file instanceof File){
                    if(/image\/\w+/.test(file.type)){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(){
                            resolve(this.result);
                        }
                    }
                }
            })
        },
        /**
         * 将图片文件保存为DataURL
         * @param file
         * @param callback
         */
        saveImageFileToDataURL : function(file, callback) {
            if(file instanceof File){
                if(/image\/\w+/.test(file.type)){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    var that = this;
                    reader.onload = function(){
                        that.dataURL = this.result;
                        callback(that.dataURL);
                    }
                }
            }
        },
        /**
         * 将Canvas保存为DataURL
         * @param canvas
         * @param type
         * @param quility
         * @returns {string}
         */
        saveCanvasToDataURL : function(canvas, type, quility){
            var type = type || "image/png";
            var quility = quility || 10;
            if(canvas.is("canvas")){
                var canvas = canvas[0];
                this.dataURL = canvas.toDataURL(type, quility);
                return this.dataURL;
            }
        }

    });

    module.exports = ImageUtil;
});