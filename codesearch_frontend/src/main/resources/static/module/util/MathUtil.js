/**
 * Created by CSIP on 2017/1/23.
 */
/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    var Class = require("class");

    var MathUtil = Class("MathUtil", {
        STATIC: {
            NAME : "MathUtil"
        },
        initialize : function() {

        },
        /**
         * 获取UUID
         * @returns {string}
         */
        getUUID : function(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();

        }

    });

    module.exports = MathUtil;
});