/**
 * Created by xreztento on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    /**
     * 进度条组件
     */
    var ProgressBarElement = Class("ProgressBarElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "ProgressBarElement"
        },
        /**
         *
         * @param width 组件宽度
         * @param height
         * @param showLabel
         */
        initialize : function(width, height, showLabel, style, striped, model) {
            ProgressBarElement.Super.call(this, width, height, model);
            this.showLabel = showLabel || false;
            this.style = style;
            this.striped = striped;
        },
        /**
         * 重写_handle方法处理ProgressBar自有的model数据绑定
         * @param key
         * @param val
         * @private
         */
        _handle : function(key, val){
            ProgressBarElement.Super.prototype._handle.call(this, key, val);
            switch(key){
                case "progress" : {
                    this.updateProgress(val.data, val.callback);
                    break;
                }
                default : break;
            }
        },
        /**
         * 初始化
         * @param where
         * @param style 进度条样式
         * @returns {ProgressBarElement}
         */
        init : function(where){
            var showLabel = this.showLabel;
            var style = this.style || "success";
            var striped = this.striped;
            var statement = "<div></div>";
            this.element = ProgressBarElement.Super.prototype.init.call(this, where, statement);

            this.element.addClass("progress");
            this.progress = $("<div></div>")
                .addClass("progress-bar progress-bar-" + style)
                .attr({
                "role" : "progressbar",
                "aria-valuenow" : "0",
                "aria-valuemin" : "0",
                "aria-valuemax" : "100"
            }).css("width","0%");

            if(striped){
                this.progress.addClass("progress-bar-striped");
            }

            if(showLabel){
                this.progress.html("0%");
            }
            this.element.append(this.progress);
            return this;
        },
        /**
         * 升级进度
         * @param data 进度数据
         * @param callback 回调函数
         * @returns {*|jQuery}
         */
        updateProgress : function(data, callback){
            var progress = this.progress;
            var showLabel = this.showLabel;
            var percentage = Math.floor(data);
            if (percentage < 100)
            {
                progress.css("width", percentage + "%").attr("aria-valuenow",percentage).addClass("active");
                if(showLabel){
                    progress.html(percentage + "%");
                }
            } else {
                progress.css("width", "100%").attr("aria-valuenow","100").removeClass("active");
                if(showLabel){
                    progress.html("100%");
                }
            }
            if (callback) {
                callback.call(this);
            }
            return progress;
        },
        /**
         * 重置进度，将进度条置为0%
         * @returns {*|jQuery} 进度条对象
         */
        resetProgress : function(){
            var progress = this.progress;
            var showLabel = this.showLabel;
            progress.css("width", "0%").attr("aria-valuenow","0").removeClass("active");
            if(showLabel){
                progress.html("0%");
            }
            return progress;

        },
        /**
         * 完成进度，将进度条置为100%
         * @returns {*|jQuery}
         */
        finishedProgress : function(){
            var progress = this.progress;
            var showLabel = this.showLabel;
            progress.css("width", "100%").attr("aria-valuenow","100").removeClass("active");
            if(showLabel){
                progress.html("100%");
            }
            return progress;
        },
        getModuleName : function(){
            return ProgressBarElement.MODULE_NAME;
        }
    });

    module.exports = ProgressBarElement;
});