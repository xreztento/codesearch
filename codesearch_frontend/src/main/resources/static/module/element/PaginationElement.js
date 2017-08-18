/**
 * Created by xreztento@vip.sina.com on 2016/12/28.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    require("paginator");
    /**
     * 分页组件
     */
    var PaginationElement = Class("PaginationElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "PaginationElement"
        },
        initialize : function(width, height, currentPage, totalPages, callback) {
            PaginationElement.Super.call(this, width, height);
            this.currentPage = currentPage;
            this.totalPages = totalPages;
            this.callback = callback;
        },
        init : function(where){
            var statement = "<ul></ul>";
            var currentPage = this.currentPage;
            var totalPages = this.totalPages;
            var callback = this.callback;
            this.element = PaginationElement.Super.prototype.init.call(this, where, statement);
            this.element.css({
                "cursor" : "pointer"
            });
            var options = {
                bootstrapMajorVersion : 3,
                currentPage: currentPage,
                totalPages: totalPages,
                size:"normal",
                alignment:"center",
                itemTexts: function (type, page, current) {
                    switch (type) {
                        case "first":
                            return "Frist Page";
                        case "prev":
                            return "<";
                        case "next":
                            return ">";
                        case "last":
                            return "Last Page";
                        case "page":
                            return  page;
                    }
                },
                onPageClicked: function (e, originalEvent, type, page) {
                    console.log("type:" + type + ",Page:" + page);
                    callback(type, page);
                }
            }
            this.element.bootstrapPaginator(options);
            return this;

        },
        getModuleName : function(){
            return PaginationElement.MODULE_NAME;
        }
    });

    module.exports = PaginationElement;
});
