/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var InputGroup = require("inputGroup");
    var TextElement = require("textElement");
    require("datetimepicker");

    var DateRangeInputGroup = Class("DateRangeInputGroup", {
        Extends : InputGroup,
        STATIC: {
            MODULE_NAME : "DateRangeInputGroup"
        },
        initialize : function(width, height) {
            DateRangeInputGroup.Super.call(this, width, height);
        },
        init : function(where){
            this.group = DateRangeInputGroup.Super.prototype.init.call(this, where, "no");
            this.group.addClass("input-daterange");

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
            this.elementArray = new Array();
            this.begin = new TextElement(null, null, "开始日期");
            this.begin.init(this.group);
            this.begin.toFormElement().after("<span class='input-group-addon'>to</span>");
            this.elementArray.push(this.begin);
            this.end = new TextElement(null, null, "结束日期");
            this.end.init(this.group);
            this.end.toFormElement();
            this.elementArray.push(this.end);

            this.begin.getElement().datetimepicker({
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

            this.end.getElement().datetimepicker({
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

            var beginValidate = [
                {
                    rule : "required",
                    value : true,
                    message : "选择一个正确的起始日期！"
                }
            ];

            var endValidate = [
                {
                    rule : "required",
                    value : true,
                    message : "选择一个正确的结束日期！"
                }
            ];

            this.begin.setValidate(beginValidate).readonly();
            this.end.setValidate(endValidate).readonly();

            return this;
        },
        getBeginElement : function(){
            return this.begin;
        },
        getBeginDate : function(){
            return this.begin.getElement().text();
        },
        getEndElement : function(){
            return this.end;
        },
        getEndDate : function(){
            return this.end.getElement().text();
        },
        getModuleName : function(){
            return DateRangeInputGroup.MODULE_NAME;
        }
    });

    module.exports = DateRangeInputGroup;
});
