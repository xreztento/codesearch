/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var InputGroup = require("inputGroup");
    require("datetimepicker");


    var DatetimeInputGroup = Class("DatetimeInputGroup", {
        Extends : InputGroup,
        STATIC: {
            MODULE_NAME : "DatetimeInputGroup"
        },
        initialize : function(width, height) {
            DatetimeInputGroup.Super.call(this, width, height, "选择日期", null, "<span class='input-group-addon'><span class='glyphicon glyphicon-time'></span></span>");
        },
        init : function(where){
            this.group = DatetimeInputGroup.Super.prototype.init.call(this, where);
            this.group.addClass("date form_datetime");
            $.fn.datetimepicker.dates['zh-CN'] = {
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                today: "今天",
                suffix: [],
                meridiem: ["上午", "下午"]
            };

            this.group.datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                pickerPosition: "bottom-left",
                language : "zh-CN",
                minView : 2,
                todayHighlight : true

            }).on("changeDate", function() {
                var validator = $($(this).parents("form")[0]).validate();
                if(validator){
                    validator.form();
                }
            });

            var datetimeValidate = [
                {
                    rule : "required",
                    value : true,
                    message : "选择一个正确的日期！"
                }
            ];
            this.getInputElement().setValidate(datetimeValidate).readonly();


            return this;
        },
        getModuleName : function(){
            return DatetimeInputGroup.MODULE_NAME;
        }
    });

    module.exports = DatetimeInputGroup;
});