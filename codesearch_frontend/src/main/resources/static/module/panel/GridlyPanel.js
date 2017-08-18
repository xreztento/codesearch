/**
 * Created by xreztento@vip.sina.com on 2017/3/3.
 */
define(function (require, exports, module) {

    require("jquery");
    require("jquery.color");
    require("gridly");
    require("gridlyPanelTemplate");

    var Class = require("class");
    var Panel = require("./Panel");

    var GridlyPanel = Class("GridlyPanel", {
        Extends : Panel,
        STATIC: {
            MODULE_NAME : "GridlyPanel"
        },
        initialize : function(width, gridlyMeasurement, base, gutter, columns) {
            GridlyPanel.Super.call(this);
            this.width = width;
            this.gridlyMeasurement = gridlyMeasurement;
            this.base = base || 60;
            this.gutter = gutter || 50;
            this.columns = columns || 12;
        },
        init : function(where){
            var width = this.width;
            var gridlyMeasurement = this.gridlyMeasurement || gridlyDefaultMeasurement;
            this.panel = GridlyPanel.Super.prototype.init.call(this, where);
            this.panel.addClass("gridly");
            $("head").append("<style>" +
                ".gridly {" +
                    "position: relative;" +
                "}" +
                    ".brick.s {" +
                    "width: " + gridlyMeasurement.s.width + ";" +
                    "height: " + gridlyMeasurement.s.height +";" +
                "}" +
                    ".brick.m {" +
            "width: " + gridlyMeasurement.m.width + ";" +
            "height: " + gridlyMeasurement.m.height +";" +
                "}" +
                ".brick.l {" +
            "width: " + gridlyMeasurement.l.width + ";" +
            "height: " + gridlyMeasurement.l.height +";" +
                "}" +
                ".brick.xl {" +
            "width: " + gridlyMeasurement.xl.width + ";" +
            "height: " + gridlyMeasurement.xl.height +";" +
                "}" +
            "</style>");
            if(width){
                this.panel.css("width", width);
            }

            return this;
        },
        addBrick : function(panel, measurement){
            var base = this.base;
            var gutter = this.gutter;
            var columns = this.columns;
            var reordering = function($elements) {

            };

            var reordered = function($elements) {
                // Called after the drag and drop ends with the elements in their ending position.
            };
            if(panel instanceof Panel){
                var brick = $("<div></div>");
                brick.addClass("brick brick-draggable").addClass(measurement);
                this.panel.append(brick).gridly({
                    base: base,
                    gutter: gutter,
                    columns: columns,
                    callbacks : {
                        reordering: reordering ,
                        reordered: reordered
                    }
                });
                panel.init(brick);
            }
        },
        enableDraggable : function(){
            this.panel.gridly('draggable', 'on');
        },
        disableDraggable : function(){
            this.panel.gridly('draggable', 'off');
        },
        getPanel : function(){
            return this.panel;
        },
        getModuleName : function(){
            return GridlyPanel.MODULE_NAME;
        }
    });

    module.exports = GridlyPanel;
});

