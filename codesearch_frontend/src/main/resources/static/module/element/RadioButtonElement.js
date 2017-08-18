/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("color");
    require("gridLayout");
    require("iCheck");
    var Class = require("class");
    var Element = require("./Element");
    var ValidateElement = require("./ValidateElement");


    var RadioButtonElement = Class("RadioButtonElement", {
        Extends: Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME: "RadioButtonElement"
        },
        initialize : function (name, data, color, layout) {
            RadioButtonElement.Super.call(this);
            this.name = name;
            this.data = data;
            this.color = color;
            this.layout = layout;
        },
        init : function (where) {
            var statement = "";
            var name = this.name;
            var color = this.color || Color.blue;
            var layout = this.layout;
            var data = this.data;
            if(!layout){
                statement = "<div></div>";
            } else {
                statement = "<div class='row'></div>";
            }

            this.element = RadioButtonElement.Super.prototype.init.call(this, where, statement);
            var html = "";
            for(var i = 0, l = data.length; i < l; i++){

                if(!layout){
                    html += "<div style='display: inline-block'>";
                } else {
                    html += "<div style='display: inline-block' class='col-lg-" + layout.col-lg + " col-md-"+ layout.col-md +" col-sm-" + layout.col-sm +" col-xs-" + layout.col-xs +"'>";
                }

                html += "<input type='radio' name='"+ name +"' value='" + data[i].id +"'/>"+ data[i].name;
                html += "</div>";
            }
            this.element.html(html);

            this.element.iCheck({
                labelHover : false,
                cursor : true,
                radioClass : "iradio_square-" + color,
                increaseArea : "20%"
            });
            //当发生checked和uncheck事件时，触发form的验证功能
            this.element.on("ifChecked", function(event){
                if($(this).parents("form")[0]){
                    var validator = $($(this).parents("form")[0]).validate();
                    if(validator){
                        validator.form();
                    }
                }


            }).on("ifUnchecked", function(event){
                if($(this).parents("form")[0]){
                    var validator = $($(this).parents("form")[0]).validate();
                    if(validator){
                        validator.form();
                    }
                }

            });

            return this;
        },
        /**
         * 获取被选择项
         * @returns {Array}
         */
        getChecked : function(){
            var checked = new Array();
            $(this.element.find("[type='radio']")).each(function(){
                if(true == $(this).is(':checked')){
                    checked.push($(this).val());
                }
            });

            return checked;
        },
        /**
         * 选择指定项
         * @param selected
         * @returns {RadioButtonElement}
         */
        checkSelected : function(selected){
            var radioButtons = $(this.element.find("[type='radio']"));
            $(radioButtons[selected]).iCheck("check");
            return this;
        },
        /**
         * 不选择指定项
         * @param selected
         * @returns {RadioButtonElement}
         */
        uncheckSelected : function(selected){
            var radioButtons = $(this.element.find("[type='radio']"));
            $(radioButtons[selected]).iCheck("uncheck");
            return this;
        },
        /**
         * 设置指定项不可用
         * @param selected
         * @returns {RadioButtonElement}
         */
        disableSelected : function(selected){
            var radioButtons = $(this.element.find("[type='radio']"));
            $(radioButtons[selected]).iCheck("disable");
            return this;
        },
        /**
         * 设置指定项可用
         * @param selected
         * @returns {RadioButtonElement}
         */
        enableSelected : function(selected){
            var radioButtons = $(this.element.find("[type='radio']"));
            $(radioButtons[selected]).iCheck("enable");
            return this;
        },
        /**
         * 设置该RadioButton在form中为必选
         */
        mustRequired : function(){
            var validate = [
                {
                    rule: "required",
                    value: true,
                    message: "必须选择一个项目"
                }
            ];
            this.setValidate(validate);
        },
        /**
         * 获取name
         * @returns {*}
         */
        getRadioButtonName : function(){
            return this.name;
        },
        getModuleName : function(){
            return RadioButtonElement.MODULE_NAME;
        }
    });

    module.exports = RadioButtonElement;
});

