/**
 * Created by xreztento@vip.sina.com on 2017/3/1.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    var Class = require("class");
    var Element = require("element");
    var MathUtil = require("mathUtil");

    var Carousel = Class("Carousel", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "Carousel"
        },
        initialize : function(width, height, id, interval, pause, wrap) {
            var mathUtil = new MathUtil();
            Carousel.Super.call(this, width, height);
            this.id = id || mathUtil.getUUID();
            this.width = width;
            this.height = height;
            this.interval = interval;
            this.pause = pause;
            this.wrap = wrap;
        },
        init : function(where){

            var id = this.id;
            var interval = this.interval || 5000;
            var pause = this.pause || "hover";
            var wrap = this.wrap || true;
            var statement = "<div></div>";

            this.element = Carousel.Super.prototype.init.call(this, where, statement);

            this.element.addClass("carousel slide")
                .attr({
                    "id" : id
                });

            this.indicators = $("<ol class='carousel-indicators'></ol>");

            this.inner = $("<div class='carousel-inner' role='listbox'></div>");

            var prevButton = $("<a class='left carousel-control' href='#" + id + "' role='button' data-slide='prev'>"
                + "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>"
                + "<span class='sr-only'>Previous</span>"
                + "</a>");

            var nextButton = $("<a class='right carousel-control' href='#" + id + "' role='button' data-slide='next'>"
                + "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>"
                + "<span class='sr-only'>Next</span>"
                + "</a>");

            this.element.append(this.indicators)
                        .append(this.inner)
                        .append(prevButton)
                        .append(nextButton);


            this.carouselItems = new Array();


            this.element.carousel({
                interval: interval,
                pause : pause,
                wrap : wrap
            });
            this.cyclePlay();

            return this;
        },
        addItem : function(src, alt, title, content){
            var id = this.id;
            var to = this.carouselItems.length;
            var width = this.width;
            var height = this.height;
            var src = src || "";
            var alt = alt || "";
            var title = title || "";
            var content = content || "";
            this.indicators.children().removeClass("active");
            this.inner.children().removeClass("active");
            var li = $("<li style='margin-left:2px;margin-right:2px;' data-target='#" + id + "' data-slide-to='" + to + "' class='active'></li>");
            this.indicators.append(li);

            var item = $("<div class='item active'></div>");
            item.html("<img style='width:" + width + ";height:"+ height +";' src='" + src + "' alt='" + alt + "'><div class='carousel-caption'>"
            + "<h3>" + title + "</h3>"
            + "<p>" + content + "</p>"
            + "</div>");

            this.inner.append(item);
            this.carouselItems.push({
                indicator : li,
                item : item
            });

            return this;

        },
        removeItem : function(index){
            this.carouselItems[index].indicator.remove();
            this.carouselItems[index].item.remove();
            this._delArray(this.carouselItems, index);

            return this;
        },
        removeAll : function(){
            this.inner.empty();
            this.indicators.empty();
            this.carouselItems = new Array();
        },
        getInner : function(){
            return this.inner;
        },
        getIndicators : function(){
            return this.indicators;
        },
        cyclePlay : function(){
            this.element.carousel("cycle");
        },
        pausePlay : function(){
            this.element.carousel("pause");
        },
        goto : function(index){

            if(index < this.carouselItems.length){
                this.element.carousel(index);
            }
        },
        prev : function(){
            this.element.carousel("prev");
        },
        next : function(){
            this.element.carousel("next");
        },
        slide : function(callback){
            this.element.on('slide.bs.carousel', function () {
                callback();
            })
        },
        slid : function(callback){
            this.element.on('slid.bs.carousel', function () {
                callback();
            })
        },
        getModuleName : function(){
            return Carousel.MODULE_NAME;
        },
        /**
         * 删除一个数组元素
         * @param array
         * @param id
         * @private
         */
        _delArray : function(array, id){
            //for(var i = id; i < array.length - 1; i++){
            //    array[i] = array[i + 1];
            //}
            //array.pop();
            array.splice(id, 1);
            return array;
        }
    });

    module.exports = Carousel;
});

