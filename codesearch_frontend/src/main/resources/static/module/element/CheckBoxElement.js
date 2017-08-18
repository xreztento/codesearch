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


    var CheckBoxElement = Class("CheckBoxElement", {
        Extends: Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME: "CheckBoxElement"
        },
        initialize : function (name, data, color, layout) {
            CheckBoxElement.Super.call(this);
            this.name = name;
            this.data = data;
            this.color = color;
            this.layout = layout;
        },
        init : function (where) {
            var statement = "";
            var name = this.name;
            var data = this.data;
            var color = this.color;
            var layout = this.layout;
            var color = color || Color.blue;

            if(!layout){
                statement = "<div></div>";
            } else {
                statement = "<div class='row'></div>";
            }

            this.element = CheckBoxElement.Super.prototype.init.call(this, where, statement);
            var html = "";
            for(var i = 0, l = data.length; i < l; i++){

                if(!layout){
                    html += "<div style='display: inline-block'>";
                } else {
                    html += "<div style='display: inline-block' class='col-lg-" + layout.col-lg + " col-md-"+ layout.col-md +" col-sm-" + layout.col-sm +" col-xs-" + layout.col-xs +"'>";
                }

                html += "<input type='checkbox' name='"+ name +"' value='" + data[i].id +"'/>"+ data[i].name;
                html += "</div>";
            }
            this.element.html(html);

            this.element.iCheck({
                labelHover : false,
                cursor : true,
                checkboxClass : "icheckbox_square-" + color,
                increaseArea : "20%"

            });

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
         * 获取所有被checked的value所组成的数组
         * @returns {Array}
         */
        getChecked : function(){
            var checked = new Array();
            $(this.element.find("[type='checkbox']")).each(function(){
                if(true == $(this).is(':checked')){
                    checked.push($(this).val());
                }
            });

            return checked;
        },
        checkAll : function(){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            checkBoxs.each(function(){
                $(this).iCheck("check");
            });
            return this;

        },
        unCheckAll : function(){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            checkBoxs.each(function(){
                $(this).iCheck("uncheck");
            });
            return this;
        },
        checkSelected : function(selected){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            for(var i = 0,l = selected.length; i < l; i++){
                $(checkBoxs[selected[i]]).iCheck("check");
            }
            return this;
        },
        uncheckSelected : function(selected){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            for(var i = 0,l = selected.length; i < l; i++){
                $(checkBoxs[selected[i]]).iCheck("uncheck");
            }
            return this;
        },
        disableSelected : function(selected){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            for(var i = 0,l = selected.length; i < l; i++){
                $(checkBoxs[selected[i]]).iCheck("disable");
            }
            return this;
        },
        enableSelected : function(selected){
            var checkBoxs = $(this.element.find("[type='checkbox']"));
            for(var i = 0,l = selected.length; i < l; i++){
                $(checkBoxs[selected[i]]).iCheck("enable");
            }
            return this;
        },
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
        getCheckboxName : function(){
            return this.name;
        },
        getModuleName : function(){
            return CheckBoxElement.MODULE_NAME;
        }
    });

    module.exports = CheckBoxElement;
});
