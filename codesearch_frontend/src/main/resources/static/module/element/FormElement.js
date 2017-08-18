/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {
    require("jquery");
    require("validate");
    require("json2");
    var Class = require("class");
    var Element = require("./Element");
    var ButtonElement = require("./ButtonElement");
    var DateRangeInputGroup = require("dateRangeInputGroup");
    var CheckBoxElement = require("checkBoxElement");
    var RadioButtonElement = require("radioButtonElement");
    var InputGroup = require("inputGroup");
    /**
     * 表单组件
     */
    var FormElement = Class("FormElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "FormElement"
        },
        initialize : function(isInline) {
            FormElement.Super.call(this);
            this.isInline = isInline;
        },
        init : function(where){
            var isInline = this.isInline;
            var statement = "<form role='form'></form>";
            this.element = FormElement.Super.prototype.init.call(this, where, statement);
            if(isInline){
                this.element
                    .addClass("form-inline");
            }
            return this;
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
        /**
         * 向表单内增加一个FormGroup
         * @param label
         * @returns {*|jQuery|HTMLElement}，返回一个formGroup，用于将一个元素初始化在该对象下面
         */
        addFormGroup : function(id, name, label, element, help){
            var label = label || "";
            var formGroup = $("<div class='form-group'><label class='control-label'>"+ label +"</label></div>");
            this.element.append(formGroup);
            element.init(formGroup);
            if(help){
                formGroup.append($("<span class='help-block'>" + help +"</span>"));
            }
            if(element instanceof DateRangeInputGroup){
                this._addInputElement(element.getBeginElement(), id + "-begin", name + "-begin");
                this._addInputElement(element.getEndElement(), id + "-end", name + "-end");
            } else if(element instanceof InputGroup){
                this._addInputElement(element.getInputElement(), id, name);
            } else {
                this._addInputElement(element, id, name);
            }
            return formGroup;
        },
        /**
         * 向表单内增加一个元素对象的引用
         * @param element
         * @param id
         * @param name
         * @returns {FormElement}
         */
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
        /**
         * 添加默认的工具栏
         * @param url 处理表单的url
         */
        addDefaultToolBar : function(url, contentType, submitHandler, resolveHandler, rejectHandler){
            var submitBtn = new ButtonElement();
            var that = this;
            var contentType = contentType || "application/x-www-form-urlencoded";
            submitBtn.init(this.element)
                .setText("提交")
                .setSubmitType();
            var validate = this.getValidate();
            if(submitHandler){
                validate.submitHandler = submitHandler;
            } else {
                validate.submitHandler = function(form){
                    var elementMap = that._elementMap;
                    var form = {};
                    for(var i in elementMap) {
                        if(elementMap.hasOwnProperty(i)) {
                            var element = elementMap[i];
                            var item = element.getElement().attr("id") || element.getElement().attr("name");
                            if(element instanceof RadioButtonElement || element instanceof CheckBoxElement){
                                form[item] = element.getChecked();
                            } else {
                                form[item] = element.getValue();
                            }
                        }
                    }
                    if(!Promise){
                        console.log("polyfill promise");
                        require("bluebird");
                    }
                    postFrom(form).then(
                        function(data){
                            //console.log("resolve:" + data);
                        	
                            submitBtn.setEnabled().setText("提交");
                            if(resolveHandler){
                            	resolveHandler(data);
                            }
                        },
                        function(data){
                            //console.log("reject:" + data);
                            submitBtn.setEnabled().setText("提交");
                            if(rejectHandler){
                            	rejectHandler(data);
                            }
                        });
                };
                function postFrom(form){
                    submitBtn.setDisabled().setText("提交中");
                    return new Promise(function(resolve, reject){
                        $.ajax({
                            url : url,
                            data : form,
                            type : "POST",
                            contentType : contentType,
                            success :resolve,
                            error : reject
                        });
                    });
                }
            }
            this.validator = this.element.validate(
                validate
            );
            return this;
        },
        validateEvent : function(callback){
            var validate = this.getValidate();
            this.validator = this.element.validate(
                validate
            );
            if(this.validator.form()){
                if(callback){
                    callback();
                }
            }
            return this;
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
            return FormElement.MODULE_NAME;
        }
    });
    module.exports = FormElement;
});