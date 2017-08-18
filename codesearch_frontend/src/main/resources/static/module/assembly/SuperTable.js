/**
 * Created by xreztento on 2017/1/19.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Table = require("./Table");
    var Element = require("element");


    var SuperTable = Class("SuperTable", {
        Extends : Table,
        STATIC: {
            MODULE_NAME : "SuperTable"
        },
        initialize : function(rowNum, columnNum, haveBordered, isResponsive) {
            SuperTable.Super.call(this, rowNum, columnNum, haveBordered, isResponsive);
        },
        init : function(where){
            SuperTable.Super.prototype.init.call(this, where);
            this.elementArray = new Array();
            return this;
        },
        setCellElement : function(rowId, columnId, element){

        },
        /**
         * 获取指定表格内的元素对象
         * @param rowId
         * @param columnId
         * @returns {*}
         */
        getCellElement : function(rowId, columnId){
            return (this.elementArray[rowId][columnId]).element;
        },
        /**
         * 为tbody绑定元素对象数据
         * @param bodyElement
         */
        bindTBodyElement : function(bodyElement){
            var rowNum = this.rowNum;
            var columnNum = this.columnNum;
            for(var i = 0; i < rowNum; i++){
                this.elementArray[i] = new Array();
                for(var j = 0; j < columnNum; j++){
                    if(bodyElement[i][j] instanceof Element){
                        bodyElement[i][j].init(this.tBodyArray[i][j]);
                        this.elementArray[i][j] = {
                            name : bodyElement[i][j].getModuleName(),
                            element : bodyElement[i][j]
                        };
                    }
                }
            }

        },
        /**
         * 为指定行绑定元素对象数据
         * @param rowId
         * @param rowElement
         */
        bindRowElement : function(rowId, rowElement){
            var rowId = rowId;
            var columnNum = this.columnNum;
            for(var i = 0; i < columnNum; i++){
                if(rowElement[i] instanceof Element){
                    this.tBodyArray[rowId][i].empty();
                    rowElement[i].init(this.tBodyArray[rowId][i]);
                    this.elementArray[rowId][i] = {
                        name : rowElement[i].getModuleName(),
                        element : rowElement[i]
                    };

                }
            }
        },
        /**
         * 为指定列绑定元素对象数据
         * @param columnId
         * @param columnHeadData
         * @param columnElement
         */
        bindColumnElement : function(columnId, columnHeadData, columnElement){
            var columnId = columnId;
            var rowNum = this.rowNum;
            this.tHeadArray[columnId].text(columnHeadData);

            for(var i = 0; i < rowNum; i++){
                var columnId = columnId + (i * columnId);
                if(columnElement[i] instanceof Element){
                    this.tBodyArray[i][columnId].empty();
                    columnElement[i].init(this.tBodyArray[i][columnId]);
                    this.elementArray[i][columnId] = {
                        name : columnElement[i].getModuleName(),
                        element : columnElement[i]
                    };
                }
            }

        },
        /**
         * 删除指定行
         * @param rowId
         */
        delRow : function(rowId){
            if(rowId < this.tRowArray.length){
                this.rowNum--;
                this.tRowArray[rowId].remove();
                this._delArray(this.elementArray, rowId);
                this._delArray(this.tBodyArray, rowId);
                this._delArray(this.tRowArray, rowId);
            }
        },
        /**
         * 删除指定列
         * @param columnId
         */
        delColumn : function(columnId){
            if(columnId < this.columnNum){
                this.columnNum--;
                this.tHeadArray[columnId].remove();
                this._delArray(this.tHeadArray, columnId);

                for(var i = 0; i < this.rowNum; i++){
                    this.tBodyArray[i][columnId].remove();
                    this._delArray(this.elementArray[i], columnId);
                    this._delArray(this.tBodyArray[i], columnId);

                }
            }
        },
        /**
         * 插入一行
         * @param rowId
         * @param rowElement
         */
        insertRowElement : function(rowId, rowElement){

            if(rowId < this.rowNum + 1){
                var columnNum = this.columnNum;
                var rowNum = this.rowNum++;
                var tr = $("<tr></tr>");
                this._insertArray(this.tRowArray, rowId, tr);
                this._insertArray(this.tBodyArray, rowId, new Array());
                this._insertArray(this.elementArray, rowId, new Array());

                for(var i = 0; i < columnNum; i++){
                    var td = $("<td></td>");
                    tr.append(td);
                    this.tBodyArray[rowId][i] = td;

                    if(rowElement[i] instanceof Element){
                        this.tBodyArray[rowId][i].empty();
                        rowElement[i].init(this.tBodyArray[rowId][i]);
                        this.elementArray[rowId][i] = {
                            name : rowElement[i].getModuleName(),
                            element : rowElement[i]
                        };

                    }

                }
                if(rowId == 0){
                    this.tBody.prepend(tr);
                } else if(rowId == rowNum){
                    this.tBody.append(tr);
                } else{
                    this.tRowArray[rowId + 1].before(tr);
                }
            }
        },
        /**
         * 插入一列
         * @param columnId
         * @param columnHeadData
         * @param columnElement
         */
        insertColumnElement : function(columnId, columnHeadData, columnElement){
            if(columnId < this.columnNum + 1){
                var rowNum = this.rowNum;
                var columnNum = this.columnNum++;
                var th = $("<th></th>");
                this._insertArray(this.tHeadArray, columnId, th);
                this.tHeadArray[columnId].text(columnHeadData);
                console.log(this.tHeadArray);

                if(columnId == 0){
                    $(this.tHead.find("tr")).prepend(this.tHeadArray[columnId]);
                } else if(columnId == columnNum){
                    $(this.tHead.find("tr")).append(this.tHeadArray[columnId]);
                } else{
                    $(this.tHead.find("th:eq("+ columnId +")")).before(this.tHeadArray[columnId]);
                }

                for(var i = 0; i < rowNum; i++){
                    var td = $("<td></td>");
                    this._insertArray(this.tBodyArray[i], columnId, td);
                    console.log(this.tBodyArray[i]);

                    if(columnElement[i] instanceof Element){

                        this.tBodyArray[i][columnId].empty();
                        columnElement[i].init(this.tBodyArray[i][columnId]);
                        this._insertArray(this.elementArray[i], columnId, {
                            name : columnElement[i].getModuleName(),
                            element : columnElement[i]
                        });
                    }

                    if(columnId == 0){
                        this.tRowArray[i].prepend(td);
                    } else if(columnId == columnNum){
                        this.tRowArray[i].append(td);
                    } else{
                        this.tBodyArray[i][columnId + 1].before(td);
                    }
                }
            }
        },
        getModuleName : function(){
            return SuperTable.MODULE_NAME;
        }
    });

    module.exports = SuperTable;
});
