/**
 * Created by CSIP on 2017/3/29.
 */
/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("jquery-ui");
    require("fullcalendar");
    require("fullCalendarEventLevel");
    require("fullCalendarEventAction");
    require("messengerStyle");
    require("messengerPosition");
    require("style");


    var Class = require("class");
    var Element = require("./Element");
    var ModalPanel = require("modalPanel");
    var SelectElement = require("selectElement");
    var FormElement = require("formElement");
    var TextElement = require("textElement");
    var SimplePanel = require("simplePanel");
    var ImageButtonElement = require("imageButtonElement");

    var MathUtil = require("mathUtil");
    var MessengerElement = require("messengerElement");

    var messenger = new MessengerElement("body", MessengerStyle.air, true, MessengerPosition.center, "500px");
    var FullCalendarElement = Class("FullCalendarElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "FullCalendarElement"
        },
        initialize : function(width, height, editable, eventLimit,
                              navLinks, selectable, selectHelper,
                              externalEventPanel, listView) {
            FullCalendarElement.Super.call(this, width, height);
            this.editable = editable;
            this.eventLimit = eventLimit;
            this.navLinks = navLinks;
            this.selectable = selectable;
            this.selectHelper = selectHelper;
            this.externalEventPanel = externalEventPanel;
            this.listView = listView;
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = FullCalendarElement.Super.prototype.init.call(this, where, statement);

            this.element.css({
                float: "right",
                width: "80%"
            });
            var that = this;

            var selectModal = new ModalPanel("selectModal", "addEvent", "AddEvent");
            selectModal.init(this.element.parent());
            var selectForm = new FormElement();
            selectModal.addModalBodyElement(selectForm)
                .onHidden(function(){
                    selectModal.removeSubmitBtnEvent();
                });

            var eventTitle = new TextElement(null, null, "Event Title");
            selectForm.addFormGroup("eventTitle", "eventTitle", "Event Title", eventTitle, "");
            eventTitle.toFormElement();

            var eventTitleValidate = [
                {
                    rule : "required",
                    value : true,
                    message : "Enter the event title"
                }
            ];
            eventTitle.setValidate(eventTitleValidate);

            var eventLevel = [
                {
                    id : "critical",
                    text : "紧急"
                },
                {
                    id : "urgency",
                    text : "急"
                },
                {
                    id : "normal",
                    text : "一般"
                }
            ];
            var eventLevelSelect = new SelectElement("100%", "34px", eventLevel, "选择事件级别");
            selectForm.addFormGroup("eventLevel", "eventLevel", "Event Level", eventLevelSelect, "");
            eventLevelSelect.toFormElement();

            this._droppableModal = selectModal;
            this._droopableForm = selectForm;

            var actionModal = new ModalPanel("actionModal", "actionEvent", "SetEvent");
            actionModal.init(this.element.parent());
            var actionForm = new FormElement();
            actionModal.addModalBodyElement(actionForm)
                .onHidden(function(){
                    actionModal.removeSubmitBtnEvent();
                });

            var actionEventTitle = new TextElement(null, null, "Event Title");
            actionForm.addFormGroup("actionEventTitle", "actionEventTitle", "Event Title", actionEventTitle, "");
            actionEventTitle.toFormElement();
            actionEventTitle.setValidate(eventTitleValidate);

            var actionEventLevelSelect = new SelectElement("100%", "34px", eventLevel, "选择事件级别");
            actionForm.addFormGroup("actionEventLevel", "actionEventLevel", "Event Level", actionEventLevelSelect, "");
            actionEventLevelSelect.toFormElement();

            var eventActionStatus = [
                {
                    id : "process",
                    text : "进行中"
                },
                {
                    id : "finished",
                    text : "完成"
                },
                {
                    id : "expire",
                    text : "过期未完成"
                }
            ];

            var actionEventStatusSelect = new SelectElement("100%", "34px", eventActionStatus, "选择事件状态");
            actionForm.addFormGroup("actionEventStatus", "actionEventStatus", "Event Status", actionEventStatusSelect, "");
            actionEventStatusSelect.toFormElement();

            var clickEvent = 0;
            var dblClickEvent = 0;
            var timeout;
            var mathUtil = new MathUtil();
            this.element.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                eventLimit: true,
                navLinks: true,
                selectable: true,
                selectHelper: true,
                select: function(start, end) {
                    selectModal.show();
                    var mathUtil = new MathUtil();
                    selectModal.setSubmitBtnEvent(function(){
                        selectForm.validateEvent(function(){
                            var level = eventLevelSelect.getSelected()["id"];
                            var color = FullCalendarEventLevel[level];

                            var event = {
                                id : mathUtil.getUUID(),
                                title : eventTitle.getValue(),
                                start : start,
                                end : end,
                                color : color,
                                level : level,
                                action : "process"
                            }
                            that.addEvent(event);
                            selectModal.hide();
                        });
                    });
                    that.element.fullCalendar('unselect');
                },
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function(date, jsEvent, ui, resourceId) {
                    //if ($('#drop-remove').is(':checked')) {
                    //    // if so, remove the element from the "Draggable Events" list
                    //    console.log($(this));
                    //    $(this).remove();
                    //}


                    //console.log(date.format());
                    var event = $(this).data("event");
                    var droppableEvent = {};
                    for(var eventAttr in event){
                        if(event.hasOwnProperty(eventAttr)){
                            droppableEvent[eventAttr] = event[eventAttr];
                        }
                    }
                    droppableEvent.start = date.format();
                    droppableEvent.id = mathUtil.getUUID();
                    that.localEventSource.push(droppableEvent);
                    that.localEventSourceMap[droppableEvent.id] = that.localEventSource[that.localEventSource.length - 1];
                    that.element.fullCalendar("refetchEvents");
                },
                eventClick : function(event){

                    timeout = setTimeout(function(){
                        if(dblClickEvent !== 1){
                            var title = event.title;
                            var level = event.level;
                            var action = event.action;
                            actionEventTitle.setValue(title);
                            actionEventLevelSelect.setSelected(level);
                            actionEventStatusSelect.setSelected(action);
                            actionModal.show();
                            actionModal.setSubmitBtnEvent(function(){
                                actionForm.validateEvent(function(){
                                    event.title = actionEventTitle.getValue();
                                    event.level = actionEventLevelSelect.getSelected()["id"];
                                    event.color = FullCalendarEventLevel[actionEventLevelSelect.getSelected()["id"]];
                                    event.action = actionEventStatusSelect.getSelected()["id"];
                                    if(event.action !== "process"){
                                        event.borderColor = FullCalendarEventAction[actionEventStatusSelect.getSelected()["id"]];
                                    } else {
                                        event.borderColor = null;
                                    }
                                    that._syncLocalEventSource(event);
                                    that.element.fullCalendar("refetchEvents");
                                    actionModal.hide();
                                });
                            });
                        }
                    }, 500);

                },
                eventDblClick : function(event){
                    clearTimeout(timeout);
                    dblClickEvent = 1;
                    messenger.showRetryMessenger("确认删除该选中事件？", StyleType.error, "确认删除", null, function(){
                        that.delEvent(event.id);
                    });
                    //console.log("dblClick");
                    setTimeout(function(){
                        dblClickEvent = 0;
                    }, 500);
                },
                eventDrop: function(event, delta, revertFunc) {
                    //同步数据到localEventSource
                    that._syncLocalEventSource(event);
                },
                eventResize : function(event, delta, revertFunc){
                    //同步数据到localEventSource
                    that._syncLocalEventSource(event);
                }

            });
            //本地事件源
            this.localEventSource = [];
            this.localEventSourceMap = {};
            this.element.fullCalendar('addEventSource', this.localEventSource);

            return this;
        },
        addDroppableEventPanel : function(width, height){
            var where = this.element.parent();
            var width = width || "15%";
            var height = height || "500px";
            var droppableEventPanel = new SimplePanel(width, height, "常用事件面板");
            droppableEventPanel.init(where);
            droppableEventPanel.getPanel().css({
                float: "left"
            });
            var addButton = new ImageButtonElement(null, null, "fa fa-plus");
            droppableEventPanel.addToolBarButton(addButton);
            var droppableModal = this._droppableModal;
            var droopableForm = this._droopableForm;
            var eventLevelSelect = droopableForm.getInputElementByIdOrName("eventLevel");
            var eventTitle = droopableForm.getInputElementByIdOrName("eventTitle");
            addButton.click(function(){
                droppableModal.show();
                droppableModal.setSubmitBtnEvent(function(){
                    droopableForm.validateEvent(function(){
                        var level = eventLevelSelect.getSelected()["id"];

                        var color = FullCalendarEventLevel[level];
                        var event = $("<div></div>");
                        var close = new ImageButtonElement("9px", "12px", "fa fa-close");
                        event.html("<div style='width:90%;display: inline-block;'><p style='margin:0px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>"
                        + eventTitle.getValue() + "</p></div>").css({
                            margin: "10px 0",
                            cursor: "pointer",
                            "background-color" : color,
                            color : "#fff",
                            "border-radius" : "3px",
                            "font-weight": "400",
                            "margin-bottom": "2px",
                            padding: "0 1px"

                        }).data("event", {
                            title : eventTitle.getValue(),
                            color : color,
                            level : level,
                            action : "process"
                        }).draggable({
                            zIndex: 999,
                            revert: true,      // will cause the event to go back to its
                            revertDuration: 0,  //  original position after the drag
                            start: startedDrag,
                            stop:stoppedDrag
                        });
                        function startedDrag(){
                            droppableEventPanel.getBody().css({
                                "overflow" : 'visible'
                            });
                        }
                        function stoppedDrag(){
                            droppableEventPanel.getBody().css({
                                "overflow-y" : 'auto',
                                "overflow-x" : 'hidden'
                            });
                        }
                        droppableEventPanel.addBodyElement(event);
                        close.init(event);
                        close.css("float", "right")
                            .css("margin", "0px")
                            .css("font-size", "10px")
                            .click(function(){
                            event.remove();
                        });
                        droppableModal.hide();
                    });
                });
            });

        },
        _syncLocalEventSource : function(event){
            var id = event.id;
            if(event.start){
                this.localEventSourceMap[id].start = event.start.format();
            }
            if(event.end){
                this.localEventSourceMap[id].end = event.end.format();
            }
        },
        addEvent : function(event){
            if(event.id && this._existsEventById(event.id) === -1){
                this.localEventSource.push(event);
                this.localEventSourceMap[event.id] = this.localEventSource[this.localEventSource.length - 1];
                this.element.fullCalendar("refetchEvents");
            }
            return this;

        },
        delEvent : function(id){
            var index = this._existsEventById(id);
            if(index !== -1){
                this.localEventSource.splice(index, 1);
                delete this.localEventSourceMap[id];
                this.element.fullCalendar("refetchEvents");
            }
        },
        getEvents : function(idOrFilter){
            return this.element.fullCalendar('clientEvents', idOrFilter);
        },
        refreshEvents : function(){
            this.element.fullCalendar("refetchEvents");
        },
        getLocalEventSource : function(){
            return this.localEventSource;
        },
        _existsEventById : function(id){
            for(var i = 0, l = this.localEventSource.length; i < l; i++){
                if(this.localEventSource[i].id === id){
                    return i;
                }
            }
            return -1;
        },
        getModuleName : function(){
            return FullCalendarElement.MODULE_NAME;
        }
    });

    module.exports = FullCalendarElement;
});
