/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {
    require("jquery");
    var Class = require("class");

    var DomUtil = Class("DomUtil", {
        STATIC: {
            NAME : "DomUtil"
        },
        initialize : function() {

        },
        loadCss : function(css){
            var head = $("head");
            css.forEach(function(item){
                var link = "<link rel='stylesheet' href='" + item + "'>";
                head.append($(link));
            });
        }

    });

    module.exports = DomUtil;
});