/**
 * Created by xreztento@vip.sina.com on 2017/1/11.
 */
define(function (require, exports, module) {

    require("jquery");
    require("messenger");
    require("messengerPosition");
    var Class = require("class");
    var Element = require("./Element");
    var Util = require("util");
    var messengerSingleton;//单例模式标识
    var MessengerElement = Class("MessengerElement", {
        STATIC: {
            MODULE_NAME : "MessengerElement"
        },
        initialize : function(where, style, isFixed, position, width, height) {

            this.position = position;
            this.width = width;
            this.height = height;
            var where = where || "body";
            //判断是否为初次实例化
            if(!messengerSingleton){
                messengerSingleton = this;
                var extraClasses = "";
                if(isFixed){
                    extraClasses += "messenger-fixed ";
                    switch(this.position){
                        case MessengerPosition.top : extraClasses += MessengerPosition.top;break;
                        case MessengerPosition.topLeft : extraClasses += MessengerPosition.topLeft;break;
                        case MessengerPosition.topRight : extraClasses += MessengerPosition.topRight;break;
                        case MessengerPosition.bottom : extraClasses += MessengerPosition.bottom;break;
                        case MessengerPosition.bottomLeft : extraClasses += MessengerPosition.bottomLeft;break;
                        case MessengerPosition.bottomRight : extraClasses += MessengerPosition.bottomRight;break;
                        default : break;
                    }
                }

                var style = style || "air";

                Messenger.options = {
                    parentLocations : [where],
                    maxMessages : 1,
                    extraClasses: extraClasses,
                    theme: style,
                    instance: void 0
                }
            } else {//未初次实例化指向单例对象
                this.prototype = messengerSingleton;
            }
        },
        /**
         * 显示可自动隐藏的消息框
         * @param message
         * @param timeout
         * @param type
         * @returns {*}
         */
        showHidableMessenger : function(message, timeout, type){
            var timeout = timeout || 1.5;
            var type = type || "info";

            var messenger = Messenger().post({
                message: message,
                hideAfter: timeout,
                hideOnNavigate: true,
                type: type
            });

            this._toCenter(messenger);
            return messenger;

        },
        showOnlyOnceMessenger : function(message, type){
            var type = type || "info";

            var messenger = Messenger().post({
                message: message,
                singleton: true,
                type: type
            });

            this._toCenter(messenger);
            return messenger;
        },
        /**
         * 显示可关闭的消息框
         * @param message
         * @param type
         * @returns {*}
         */
        showClosableMessenger : function(message, type){
            var type = type || "info";

            var messenger = Messenger().post({
                message: message,
                showCloseButton: true,
                type: type
            });

            this._toCenter(messenger);
            return messenger;
        },
        /**
         * 显示需要确认的消息框
         * @param message
         * @param retryLabel
         * @param cancelLabel
         * @param retryCallback
         * @param cancelCallback
         * @returns {*}
         */
        showRetryMessenger : function(message, type, retryLabel, cancelLabel, retryCallback, cancelCallback){
            var retryLabel = retryLabel || "确定";
            var cancelLabel = cancelLabel || "取消";
            var type = type || "info";
            var messenger = Messenger().post({
                message: message,
                type : type,
                actions: {
                    retry: {
                        label: retryLabel,
                        action: function() {
                            if(retryCallback){
                                retryCallback(messenger);
                            }
                            return messenger.cancel();
                        }
                    },
                    cancel: {
                        label: cancelLabel,
                        action: function() {
                            if(cancelCallback){
                                cancelCallback(messenger);
                            }
                            return messenger.cancel();
                        }
                    }
                }
            });
            this._toCenter(messenger);
            return messenger;
        },
        /**
         * 消息框居中处理
         * @private
         */
        _toCenter : function(messenger){
            if(messengerSingleton.position == "center"){
                var util = new Util();
                var browserWidth = util.getBrowserWidth();
                var browserHeight = util.getBrowserHeight();
                this.width && messenger.$message.parent().parent().css("width", this.width);
                this.height && messenger.$message.parent().parent().css("height", this.height);
                var width = messenger.$message.parent().parent().css("width");
                var height = messenger.$message.parent().parent().css("height");
                var left = util.subWidthOrHeight(browserWidth, width) / 2;
                var top = util.subWidthOrHeight(browserHeight, height) / 2;
                //console.log(left + "x" + top);
                $(messenger.$message.parent().parent()).css({
                    "top" : top,
                    "left" : left
                });
            }
        },
        getModuleName : function(){
            return MessengerElement.MODULE_NAME;
        }
    });

    module.exports = MessengerElement;
});