/**
 * Created by xreztento@vip.sina.com on 2017/1/3.
 */
define(function (require, exports, module) {

    var Class = require("class");
    require("head");
    var Util = Class("Util", {
        STATIC: {
            NAME : "Util"
        },
        initialize : function() {

        },
        getWidthOrHeightValue : function(widthOrHeight){
            if((widthOrHeight + "").indexOf("p") !== -1){
                return parseInt(widthOrHeight.substring(0, widthOrHeight.indexOf("p")));
            }
            return widthOrHeight;
        },
        /**
         * 计算宽或高之差
         * @param widthOrHeight
         * @param value
         * @returns {number}
         */
        subWidthOrHeight : function(widthOrHeight, value){
            if((widthOrHeight + "").indexOf("p") !== -1 && (value + "").indexOf("p") !== -1){
                return (parseInt(widthOrHeight.substring(0, widthOrHeight.indexOf("p"))) - parseInt(value.substring(0, value.indexOf("p"))));
            } else if((widthOrHeight + "").indexOf("p") !== -1){
                return (parseInt(widthOrHeight.substring(0, widthOrHeight.indexOf("p"))) - value);
            } else if((value + "").indexOf("p") !== -1){
                return (widthOrHeight - parseInt(value.substring(0, value.indexOf("p"))));
            } else {
                return widthOrHeight - value;
            }
        },
        /**
         * 计算宽或高之和
         * @param widthOrHeight
         * @param value
         * @returns {*}
         */
        plusWidthOrHeight : function(widthOrHeight, value){
            if((widthOrHeight + "").indexOf("p") !== -1 && (value + "").indexOf("p") !== -1){
                return (parseInt(widthOrHeight.substring(0, widthOrHeight.indexOf("p"))) + parseInt(value.substring(0, value.indexOf("p"))));
            } else if((widthOrHeight + "").indexOf("p") !== -1){
                return (parseInt(widthOrHeight.substring(0, widthOrHeight.indexOf("p"))) + value);
            } else if((value + "").indexOf("p") !== -1){
                return (widthOrHeight + parseInt(value.substring(0, value.indexOf("p"))));
            } else {
                return widthOrHeight + value;
            }
        },
        /**
         * 获取浏览器显示宽度
         * @returns {Number|.screen.innerWidth|*}
         */
        getBrowserWidth : function(){
            return head.screen.innerWidth;
        },
        /**
         * 获取浏览器显示高度
         * @returns {Number|.screen.innerHeight|*}
         */
        getBrowserHeight : function(){
            return head.screen.innerHeight;
        },

        /**
         * 格式化字节大小
         * @param size
         * @param unit
         * @returns {*}
         */
        simpleFormatCSize : function(size, unit){
            var size = size || 0;
            var format;
            if(unit){
                switch(unit){
                    case 'k' : format = (size / 1024) + "K"; break;
                    case 'm' : format = (size / (1024 * 1024)) + "M"; break;
                    case 'g' : format = (size / (1024 * 1024 * 1024)) + "G"; break;
                    default : format = size + ""; break;
                }
            } else {
                if(size > 1024){
                    format = (size / 1024) + "K";
                } else if(size > 1024 * 1024){
                    format = (size / (1024 * 1024)) + "M";
                } else if(size > 1024 * 1024 * 1024){
                    format = (size / (1024 * 1024 * 1024)) + "G";
                }
            }

            return format;
        },


        /**
         * 删除一个数组元素
         * @param array
         * @param id
         * @private
         */
        delArray : function(array, id){
            //for(var i = id; i < array.length - 1; i++){
            //    array[i] = array[i + 1];
            //}
            //array.pop();
            array.splice(id, 1);
            return array;
        },
        /**
         * 插入一个数组元素
         * @param array
         * @param id
         * @param arrayData
         * @private
         */
        insertArray : function(array, id, arrayData){
            if(id == 0){
                array.unshift(arrayData);
            } else if(id == array.length){
                array.push(arrayData);
            } else if(id < array.length){
                for(var i = array.length; i > id; i--){
                    array[i] = array[i - 1];
                }
                array[id] = arrayData;
            }
            return array;
        },
        bubbleSortByDesc : function(array, sortby){

            for(var i = 0; i < array.length - 1;i++){
                for(var j = i + 1;j < array.length; j++){
                    if(array[i] > array[j]){//如果前面的数据比后面的大就交换
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
        },
        quickSortByDesc : function(array){
            //如果数组长度小于等于1无需判断直接返回即可
            if(array.length <= 1){
                return array;
            }
            var midIndex = Math.floor(array.length/2);//取基准点
            var midIndexVal = array.splice(midIndex,1);//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数arr[index+1]
            var left = [];//存放比基准点小的数组
            var right = [];//存放比基准点大的数组
            //遍历数组，进行判断分配
            for(var i=0; i < array.length; i++){
                if(array[i] < midIndexVal){
                    left.push(array[i]);//比基准点小的放在左边数组
                }
                else{
                    right.push(array[i]);//比基准点大的放在右边数组
                }
            }
            //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
            //return this._quickSort(left).concat(midIndexVal,this._quickSort(right));
        }

    });

    module.exports = Util;
});