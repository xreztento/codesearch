/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    /**
     * 观察者模式，用于对model对象数据的绑定
     */
    var Observer = Class("Observer", {

        initialize : function(model) {
            this.model = model;
            //console.log(model);
            if(model){
                for(var key in model){
                    if(model.hasOwnProperty(key)){
                        var val = model[key];
                        //if(typeof model[key] === "object"){
                        //    new Observer(model[key]);
                        //} else {
                        //    this._convert(key, val);
                        //}
                        this._convert(key, val);
                    }
                }
            }
        },
        _convert : function(key, val){
            var that = this;

            Object.defineProperty(this.model, key, {
                        configurable : true,
                        enumerable : true,
                        set : function(newVal){
                            val = newVal;
                            that._handle(key, val);
                        },
                        get : function(){
                            return val;
                        }
            })
        },
        _handle : function(key, val){

            switch(key){
                case "val" : {
                    this.element.val(val);
                    break;
                }
                case "text" : {
                    this.element.text(val);
                    break;
                }
                default : break;
            }
        }
    });

    module.exports = Observer;
});

