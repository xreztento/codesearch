define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var PdfViewerElement = Class("PdfViewerElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "PdfViewerElement",
            DEFAULT_URL : "module/web/pdf-viewer.html?pdf="
        },
        initialize : function(width, height, pdf, ratio) {
            PdfViewerElement.Super.call(this, width, height);
            this.pdf = pdf;
            this.radio = ratio;
        },
        init : function(where){
            var pdf = this.pdf;
            var radio = this.radio || "16by9";
            var src = PdfViewerElement.DEFAULT_URL + pdf;
            var statement = "<div class='embed-responsive embed-responsive-" + radio + "'>" +
                "<iframe class='embed-responsive-item' src='" + src + "'></iframe>" +
                "</div>";
            this.element = PdfViewerElement.Super.prototype.init.call(this, where, statement);
            return this;
        },
        setSrc : function(pdf){
            var src = PdfViewerElement.DEFAULT_URL + pdf;
            $(this.element.children("iframe")).attr("src", src);
        },
        getModuleName : function(){
            return PdfViewerElement.MODULE_NAME;
        }
    });

    module.exports = PdfViewerElement;
});
