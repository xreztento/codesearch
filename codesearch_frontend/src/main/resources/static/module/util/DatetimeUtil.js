/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    var Class = require("class");

    var DatetimeUtil = Class("DatetimeUtil", {
        STATIC: {
            NAME : "DatetimeUtil"
        },
        initialize : function() {

        },
        //相差天数比较
        dateDiff : function(sDate1, sDate2){
            var  aDate,  oDate1,  oDate2,  iDays;
            aDate  =  sDate1.split("-");
            oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
            aDate  =  sDate2.split("-");
            oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
            iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
            return  iDays;
        },
        getTimestamp : function(datetime){
            var datetime =  datetime;
            var timestamp;

            timestamp = Date.parse(new Date(datetime));
            timestamp = timestamp / 1000;


            return timestamp;
        },
        compareDatetime : function(sDate1, sDate2){

            var timestamp1 = this.getTimestamp(sDate1);
            var timestamp2 = this.getTimestamp(sDate2);
            return timestamp1 - timestamp2;
        }
        //checkDateFormat : function(datetime){
        //    if(datetime.length > 0){
        //        var reg= /^(\d )-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        //        if(!reg.test(datetime)){
        //            return false;
        //        }
        //    }
        //    return true;
        //}

    });

    module.exports = DatetimeUtil;
});