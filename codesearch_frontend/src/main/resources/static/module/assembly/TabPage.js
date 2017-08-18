/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */

define(function(require, exports, module){
    require("jquery");
    require("bootstrap");
    require("style");


    var Class = require("class");
    var Element = require("element");
    var DivElement = require("divElement");
    var MathUtil = require("mathUtil");
    var ButtonElement = require("buttonElement");
    var ImageButtonElement = require("imageButtonElement");
    var LinkElement = require("linkElement");
    var DropdownMenuElement = require("dropdownMenuElement");

    var TabPage = Class("TabPage", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "TabPage"
        },

        initialize : function(width, height) {

            TabPage.Super.call(this, width, height);

        },
        init : function(where) {
            var statement = "<div></div>";
            this.tabPage = TabPage.Super.prototype.init.call(this, where, statement);
            var that = this;

            this.tabListDiv = new DivElement("90%", null);
            this.tabListDiv.init(this.tabPage);

            this.tabContentDiv = new DivElement();
            this.tabContentDiv.init(this.tabPage);

            this.tabContentDiv.addClass("tab-content");

            this.paginationIndex = -1;

            var prevButton = new ButtonElement("40px", "40px", StyleType.default);
            prevButton.init(this.tabListDiv);
            prevButton.setText("<<").inline().css("margin-top", "-40px").click(function(){
                that._prevPage();
            });

            this.tabPageDiv = new DivElement("80%", null);
            this.tabPageDiv.init(this.tabListDiv);
            this.tabPageDiv.inline();
            this.tabPageDiv.getElement().append($("<div style='overflow-x: hidden;'>" +
            "<ul class='nav nav-tabs' style='width:500%;'>" +
            "</div>"));


            var nextButton = new ButtonElement("40px", "40px", StyleType.default);
            nextButton.init(this.tabListDiv);
            nextButton.setText(">>").inline().css("margin-top", "-40px").click(function(){
                that._nextPage();

            });

            var locationLink = new LinkElement("定位当前选项卡");
            var closeAllLink = new LinkElement("关闭全部选项卡");
            var closeOthersLink = new LinkElement("关闭其他全部选项卡");

            var dropdownMenu = new DropdownMenuElement("60px", "40px", "操作", StyleType.default);
            dropdownMenu.init(this.tabListDiv);

            dropdownMenu.addMenuItem(locationLink).addMenuSeparator().
                addMenuItem(closeAllLink).addMenuItem(closeOthersLink)
                .css("margin-top", "-40px");

            locationLink.click(function(){
                that._toPage(that.tabList[$($("li[class='active']")
                    .find("[data-toggle='tab']")).attr("href").substr(1)].pageIndex);
            });

            closeAllLink.click(function(){
                that.removeAllTab();
            });

            closeOthersLink.click(function(){
                //console.log(that.tabList);
                that.removeOtherTab($($("li[class='active']")
                    .find("[data-toggle='tab']")).attr("href").substr(1));
                that._toPage(-1);
            });

            this.tabPageWidth = this.tabPageDiv.getElement().width();
            $(window).resize(function() {
                that.tabPageWidth = that.tabPageDiv.getElement().width();
            });

            this.tabList = {};
            this.tabContent = {};
            return this;
        },
        _nextPage : function(){
            var pagination = this._pagination();
            //console.log("next:" + this.paginationIndex);
            if(pagination.length > 0 && this.paginationIndex < pagination.length){

                if(this.paginationIndex < (pagination.length - 1)){
                    this.paginationIndex++;
                }

                this.getTabList().animate({
                    "margin-left" : -pagination[this.paginationIndex]
                });



            }
        },
        _prevPage : function(){
            var pagination = this._pagination();
            //console.log("prev:" + this.paginationIndex);
            if(pagination.length > 0 && this.paginationIndex > 0){

                if(this.paginationIndex > 0){
                    this.paginationIndex--;
                }
                this.getTabList().animate({
                    "margin-left" : -pagination[this.paginationIndex]
                });

            } else {
                this.paginationIndex = -1;
                this.getTabList().animate({
                    "margin-left" : 0
                });
            }
        },
        _toPage : function(index){
            var pagination = this._pagination();
            //console.log(index);
            if(index < pagination.length && index > -1){
                this.paginationIndex = index;
                this.getTabList().animate({
                    "margin-left" : -pagination[this.paginationIndex]
                });
            } else if(index == -1){
                this.getTabList().animate({
                    "margin-left" : 0
                });
                this.paginationIndex = index;

            }
        },
        /**
         * 计算分页
         * @returns {number}
         * @private
         */
        _pagination : function(){
            var total = 0;
            var additionWidth = 0;
            var index = -1;
            var pagination = new Array();
            var last = 0;
            for(var tab in this.tabList) {
                if (this.tabList.hasOwnProperty(tab)) {

                    if(!(index > -1)){
                        if((total + this.tabList[tab].width) > this.tabPageWidth){
                            pagination.push(total - last);
                            index++;
                        }
                    } else {
                        var overWidth = 0;
                        for(var i = 0,l = pagination.length; i < l; i++){
                            overWidth += pagination[i];
                        }
                        if((total + this.tabList[tab].width - overWidth) > this.tabPageWidth){
                            pagination.push(total - last);
                            index++;
                        }
                    }
                    this.tabList[tab].pageIndex = index;
                    total += this.tabList[tab].width;
                    last = this.tabList[tab].width;

                }
            }
            return pagination;
        },
        /**
         * 增加标签页
         * @param text
         * @param content
         * @param id
         * @param callback
         */
        addTab : function(text, content, id, callback){
            var mathUtil = new MathUtil();
            var id = id || mathUtil.getUUID();
            var content = content || $("<div></div>");
            var text = text || "标签" + id;
            if(content instanceof DivElement || content.is("div")){
                var li = $("<li></li>");
                li.addClass("active");
                this.getTabList().append(li);
                var tag = new DivElement();
                tag.init(li);

                if(content instanceof DivElement){
                    content.init(this.tabContentDiv).addClass("tab-pane fade in active").attr("id", id);
                    this.tabContent[id] = content.getElement();
                } else {
                    content.addClass("tab-pane fade in active").attr("id", id);
                    this.tabContentDiv.getElement().append(content);
                    this.tabContent[id] = content;
                }


                for(var tab in this.tabList) {
                    if (this.tabList.hasOwnProperty(tab)) {
                        this.tabList[tab].element.removeAttr("class");
                        this.tabContent[tab].removeClass("active");
                    }
                }

                tag.addClass("page-tabs-content").getElement().css({
                    "margin-left" : "0px",
                    "padding-left" : "5px",
                    "height" : "42px",
                    "padding-top" : "8px",
                    "border-left" : "solid 1px #efefef",
                    "border-right" : "solid 1px #efefef"
                }).append($("<a href='#" + id + "' data-toggle='tab'>" + text + "</a>"));

                var closeButton = new ImageButtonElement(null, null, "fa fa-times-circle");
                var that = this;
                closeButton.init(tag).click(function(){
                    delete that.tabList[id];
                    delete that.tabContent[id];
                    li.remove();
                    var pagination = that._pagination();

                    if(pagination.length <= that.paginationIndex){
                        that._prevPage();
                    }
                });
                this.tabPageDiv.css("margin-top", "0px");

                this.tabList[id] = {
                    element : li,
                    width : li.width()
                };


                var pagination = this._pagination();
                if(pagination.length > this.paginationIndex){
                    this._nextPage();
                }




                if(callback){
                    callback();
                }
            }

            return id;
        },
        removeAllTab : function(){
            this.tabList = {};
            this.tabContent = {};
            this.getTabList().find("li").remove();
            return this;
        },
        removeTab : function(id){
            this.tabList[id].element.remove();
            delete this.tabList[id];
            delete this.tabContent[id];
            return this;
        },
        getTab : function(id){
            return this.tabList[id];
        },
        removeOtherTab : function(id){
            for(var tab in this.tabList) {
                if (this.tabList.hasOwnProperty(tab)) {
                    if(tab !== id){
                        this.tabList[tab].element.remove();
                        delete this.tabList[tab];
                        delete this.tabList[tab];
                    }
                }
            }
            return this;
        },
        getTabList : function(){
            return $(this.tabPageDiv.getElement().find("ul"));
        },
        getTabContent : function(id){
            return this.tabContent[id];
        },
        getTabPageDiv : function(){
            return this.tabPageDiv;
        },
        getTabContentDiv : function(){
            return this.tabContentDiv;
        },
        getTabPage : function(){
            return this.tabPage;
        }
    });

    module.exports = TabPage;
});
