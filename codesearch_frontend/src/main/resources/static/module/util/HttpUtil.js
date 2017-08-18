/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    var Class = require("class");

    var HttpUtil = Class("HttpUtil", {
        STATIC: {
            NAME : "HttpUtil"
        },
        initialize : function() {

        },
        /**
         * 拼接HTTP协议中GET方法的URL
         * @param url
         * @param param GET方法请求参数
         * @returns {*}
         */
        joinUrl : function(url, param){
            var url = url;
            if(typeof(param) == "object") {
                url += "?";
                for(var obj in param){
                    if(param.hasOwnProperty(obj)){
                        url += obj;
                        url += "=";
                        url += param[obj];
                        url += "&";
                    }
                }
                url = url.substring(0, url.length - 1);
            }
            return url;
        }

    });

    module.exports = HttpUtil;
});