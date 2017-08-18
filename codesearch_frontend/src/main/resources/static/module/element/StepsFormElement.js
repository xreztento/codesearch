/**
 * Created by xreztento@vip.sina.com on 2017/3/7.
 */
define(function (require, exports, module) {

    require("jquery");
    require("validate");
    require("steps");
    var Class = require("class");
    var Element = require("./Element");
    var InputGroup = require("inputGroup");
    var DateRangeInputGroup = require("dateRangeInputGroup");
    /**
     * 表单组件
     */
    var StepsFormElement = Class("StepsFormElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "StepsFormElement"
        },
        initialize : function() {
            StepsFormElement.Super.call(this);
        },
        init : function(where){
            var statement = "<form role='form'></form>";
            this.element = StepsFormElement.Super.prototype.init.call(this, where, statement);
            this.content = $("<div class='content clearfix'></div>");
            this.element.append(this.content);

            this.steps = new Array();
            return this;

        },
        addStep : function(title, legend){
            this.content.append($("<h3>" + title + "</h3>"));
            var step = $("<fieldset></fieldset>");
            step.append($("<legend>" + legend + "</legend>"));
            this.content.append(step);
            this.steps.push(step);
            return this;
        },

        getStep : function(stepId){
            return this.steps[stepId];
        },
        render : function(){

            var validate = this.getValidate();
            var stepNum = this.steps.length;
            var form = this.element;
            this.validator = form.steps({
                headerTag: "h3",
                bodyTag: "fieldset",
                onStepChanging: function (event, currentIndex, newIndex)
                {
                    // Allways allow previous action even if the current form is not valid!
                    if (currentIndex > newIndex)
                    {
                        return true;
                    }
                    // Needed in some cases if the user went back (clean up)
                    if (currentIndex < newIndex)
                    {
                        // To remove error styles
                        form.find(".body:eq(" + newIndex + ") label.error").remove();
                        form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
                    }
                    form.validate().settings.ignore = ":disabled,:hidden";
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex)
                {

                },
                onFinishing: function (event, currentIndex)
                {
                    form.validate().settings.ignore = ":disabled";
                    return form.valid();
                },
                onFinished: function (event, currentIndex)
                {
                    alert("Submitted!");
                }
            }).validate(
                validate
            );
        },
        /**
         * 自动填充
         */
        autoComplete : function(){
            this.element.attr("autocomplete", "on");
        },
        /**
         * 取消自动填充
         */
        noAutoComplete : function(){
            this.element.attr("autocomplete", "off");
        },
        addInputElement : function(stepId, label, element, id, name){

            var step = this.getStep(stepId);
            step.append($("<label for='"+ id +"'>"+ label +"</label>"));

            element.init(step);
            if(element instanceof DateRangeInputGroup){
                this._addInputElement(element.getBeginElement(), id + "-begin", name + "-begin");
                this._addInputElement(element.getEndElement(), id + "-end", name + "-end");
            } else if(element instanceof InputGroup){
                this._addInputElement(element.getInputElement(), id, name);
            } else {
                this._addInputElement(element, id, name);
            }
        },
        _addInputElement : function(element, id, name){
            if(id){
                element.setId(id);
            }

            if(name){
                element.setName(name);
            }

            this._elementMap[id || name] =  element;
            return this;
        },
        /**
         * 从表单内移除id或name对象的元素
         * @param idOrName
         */
        removeInputElement : function(idOrName){
            if(idOrName){
                if(this._elementMap[idOrName].getElement().parent().hasClass("form-group")){
                    this._elementMap[idOrName].getElement().parent().remove();
                } else if(this._elementMap[idOrName].getElement().parent().hasClass("input-group")){
                    this._elementMap[idOrName].getElement().parent().parent().remove();
                } else {
                    this._elementMap[idOrName].getElement().remove();
                }

                delete this._elementMap[idOrName];

            }
        },
        /**
         * 从表单内移除所有元素
         */
        removeAllInputElement : function(){
            for(var i in this._elementMap){
                if(this._elementMap.hasOwnProperty(i)){
                    delete this._elementMap[i];
                }
            }
            this.element.empty();
        },
        /**
         * 获取所有元素对象的Map
         * @returns {*}
         */
        getAllInputElement : function(){
            return this._elementMap;
        },
        /**
         * 通过元素id或name获取表单内的元素对象
         * @param idOrName
         * @returns {*}
         */
        getInputElementByIdOrName : function(idOrName){
            return this._elementMap[idOrName];
        },
        /**
         * 设置表单验证规则
         * @param validate
         */
        setValidate : function(validate){
            this._validate = validate || this.getValidate();
        },
        /**
         * 获取表单验证规则
         * @returns {*}
         */
        getValidate : function(){
            for(var i in this._elementMap){
                if(this._elementMap.hasOwnProperty(i)){
                    var element = this._elementMap[i];
                    if(element.getValidate()){
                        if(element.getModuleName() === "CheckBoxElement"){
                            this._validate.rules[element.getCheckboxName()] = element.getValidate().rules;
                            this._validate.messages[element.getCheckboxName()] = element.getValidate().messages;
                        } else if(element.getModuleName() === "RadioButtonElement"){
                            this._validate.rules[element.getRadioButtonName()] = element.getValidate().rules;
                            this._validate.messages[element.getRadioButtonName()] = element.getValidate().messages;
                        } else {
                            this._validate.rules[element.getId() || element.getName()] = element.getValidate().rules;
                            this._validate.messages[element.getId() || element.getName()] = element.getValidate().messages;
                        }
                    }
                }
            }
            //console.log(this._validate);
            return this._validate;
        },
        getValidator : function(){
            return this.validator;
            //return this.element.validate();
        },
        /**
         * 保存验证规则，该规则符合jquery.validate要求
         */
        _validate : {
            rules : {},
            messages : {},
            /**
             * 验证错误后message的显示处理
             * @param error
             * @param element
             */
            errorPlacement: function(error, element) {
                if (element.is(":radio")){
                    element.parent().parent().parent().after(error);
                } else if (element.is(":checkbox")){
                    element.parent().parent().parent().after(error);
                } else if($(element.parent()).hasClass("input-group")) {
                    $(element.parent()).after(error);
                } else {
                    element.after(error);
                }
            },
            /**
             * 验证错误后的处理
             * @param element
             * @param errorClass
             * @param validClass
             */
            highlight: function( element, errorClass, validClass ) {

                if ($(element).is(":radio")){
                    if($(element).parent().parent().parent().hasClass("form-group")){
                        $(element).parent().parent().parent().addClass("has-warning");
                    }
                } else if ($(element).is(":checkbox")){
                    if($(element).parent().parent().parent().hasClass("form-group")){
                        $(element).parent().parent().parent().addClass("has-warning");
                    }
                } else {
                    if($(element).parent().hasClass("form-group")){
                        $(element).parent().addClass("has-warning");
                    } else if($(element).parent().parent().hasClass("form-group")){
                        $(element).parent().parent().addClass("has-warning");
                    }
                }

            },
            /**
             * 验证成功后的处理
             * @param element
             * @param errorClass
             * @param validClass
             */
            unhighlight: function( element, errorClass, validClass ) {

                if ($(element).is(":radio")){
                    if($(element).parent().parent().parent().hasClass("form-group")){
                        $(element).parent().parent().parent().removeClass("has-warning");
                    }
                } else if ($(element).is(":checkbox")){
                    if($(element).parent().parent().parent().hasClass("form-group")){
                        $(element).parent().parent().parent().removeClass("has-warning");
                    }
                } else {
                    if($(element).parent().hasClass("form-group")){
                        $(element).parent().removeClass("has-warning");
                    } else if($(element).parent().parent().hasClass("form-group")){
                        $(element).parent().parent().removeClass("has-warning");
                    }
                }


            }
        },
        /**
         * 保存form内的元素
         */
        _elementMap : {},
        getModuleName : function(){
            return StepsFormElement.MODULE_NAME;
        }
    });

    module.exports = StepsFormElement;
});