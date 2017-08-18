/**
 * Created by xreztento@vip.sina.com on 2017/1/13.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var DatetimeUtil = require("datetimeUtil");
    var ImageButtonElement = require("imageButtonElement");
    var Table = Class("Table", {
        STATIC: {
            MODULE_NAME : "Table"
        },
        initialize : function(rowNum, columnNum, haveBordered, isResponsive) {
            this.rowNum = rowNum;
            this.columnNum = columnNum;
            this.haveBordered = haveBordered;
            this.isResponsive = isResponsive;
        },
        /**
         *
         * @param where
         * @param haveBordered 是否有边框
         * @param isResponsive 是否是响应式布局
         * @returns {Table}
         */
        init : function(where){
            var rowNum = this.rowNum;
            var columnNum = this.columnNum;
            var haveBordered = this.haveBordered;
            var isResponsive = this.isResponsive;
            var tableClass = "table table-striped";
            if(haveBordered){
                tableClass += " table-bordered";
            }
            if(isResponsive){
                tableClass += " table-responsive";
            }
            this.table = $("<table class='" + tableClass + "'></table>");
            this.tHead = $("<thead></thead>");
            this.tBody = $("<tbody></tbody>");

            //保存所有thead中的th元素，可用数组下标检索
            this.tHeadArray = new Array();
            //保存所有thead中的数据的属性
            this.tHeadAttrArray = new Array();
            //保存所有tbody中的td元素，可用数组下标检索
            this.tBodyArray = new Array();
            this.tBodyData = new Array();
            //保存所有tbody中的tr元素，可用数组下标检索
            this.tRowArray = new Array();

            var tr = $("<tr></tr>");

            for(var i = 0, l = columnNum; i < l; i++){
                var th = $("<th></th>");
                tr.append(th);
                this.tHeadArray[i] = th;
            }
            this.tHead.append(tr);


            for(var i = 0; i < rowNum; i++){
                var tr = $("<tr></tr>");
                this.tRowArray[i] = tr;
                this.tBodyArray[i] = new Array();
                for(var j = 0; j < columnNum; j++){
                    var td = $("<td></td>");
                    tr.append(td);
                    this.tBodyArray[i][j] = td;
                }
                this.tBody.append(tr);

            }
            this.table.append(this.tHead);
            this.table.append(this.tBody);

            where.append(this.table);

            return this;
        },

        /**
         *
         * @param headData 表头数据{data:value,type:{sortable:value,type:value}}
         * @returns {Table}
         */
        bindTHeadData : function(headData){
            var columnNum = this.columnNum;
            var that = this;
            for(var i = 0; i < columnNum; i++){
                this.tHeadArray[i].text(headData[i].data);
                this.tHeadAttrArray[i] = headData[i].attr;
                this._addSortButton(i);
            }
            return this;
        },

        /**
         *
         * @param bodyData 表格数据
         */
        bindTBodyData : function(bodyData){
            var rowNum = this.rowNum;
            var columnNum = this.columnNum;
            this.tBodyData = bodyData;
            for(var i = 0; i < rowNum; i++){
                for(var j = 0; j < columnNum; j++){
                    this.tBodyArray[i][j].text(bodyData[i][j]);
                }
            }

        },
        /**
         * 设置指定表格的数据
         * @param rowId
         * @param columnId
         * @param data
         */
        setCellData : function(rowId, columnId, data){
            this.tBodyArray[rowId][columnId].text(data);
            this.tBodyData[rowId][columnId] = data;
        },
        /**
         * 获取指定表格的数据
         * @param rowId
         * @param columnId
         * @returns {*}
         */
        getCellData : function(rowId, columnId){
            return this.tBodyData[rowId][columnId];
        },
        /**
         * 增加一列
         * @param rowData
         */
        addRow : function(rowData){
            var rowId = this.rowNum++;

            var columnNum = this.columnNum;
            var tr = $("<tr></tr>");
            this.tRowArray[rowId] = tr;
            this.tBodyArray[rowId] = new Array();
            this.tBodyData[rowId] = new Array();
            for(var i = 0; i < columnNum; i++){
                var td = $("<td></td>");
                tr.append(td);
                this.tBodyArray[rowId][i] = td;
                this.tBodyArray[rowId][i].text(rowData[i]);
                this.tBodyData[rowId][i] = rowData[i];
            }

            this.tBody.append(tr);
        },
        /**
         * 插入一列
         * @param rowId
         * @param rowData
         */
        insertRow : function(rowId, rowData){

            if(rowId < this.rowNum + 1){
                var columnNum = this.columnNum;
                var rowNum = this.rowNum++;
                var tr = $("<tr></tr>");
                this._insertArray(this.tRowArray, rowId, tr);
                this._insertArray(this.tBodyArray, rowId, new Array());
                this._insertArray(this.tBodyData, rowId, new Array());
                for(var i = 0; i < columnNum; i++){
                    var td = $("<td></td>");
                    tr.append(td);
                    this.tBodyArray[rowId][i] = td;
                    this.tBodyArray[rowId][i].text(rowData[i]);
                    this.tBodyData[rowId][i] = rowData[i];
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
         * 设置指定列的数据
         * @param rowId
         * @param rowData
         */
        bindRowData : function(rowId, rowData){
            var rowId = rowId;
            var columnNum = this.columnNum;
            for(var i = 0; i < columnNum; i++){
                this.tBodyArray[rowId][i].text(rowData[i]);
                this.tBodyData[rowId][i] = rowData[i];
            }
            return this;
        },
        /**
         * 删除指定行
         * @param rowId
         */
        delRow : function(rowId){
            if(rowId < this.tRowArray.length){
                this.rowNum--;
                this.tRowArray[rowId].remove();
                this._delArray(this.tBodyArray, rowId);
                this._delArray(this.tBodyData, rowId);
                this._delArray(this.tRowArray, rowId);
            }
            return this;
        },
        /**
         * 隐藏指定行
         * @param rowId
         */
        hideRow : function(rowId){
            if(rowId < this.rowNum){
                this.tRowArray[rowId].hide();
            }
        },
        /**
         * 显示指定行
         * @param rowId
         */
        showRow : function(rowId){
            if(rowId < this.rowNum) {
                this.tRowArray[rowId].show();
            }
        },
        _addSortButton : function(columnId){
            var columnNum = this.columnNum;
            var that = this;
            if(this.tHeadAttrArray[columnId].sortable){
                var sortButton = new ImageButtonElement(null, null, "fa fa-sort");
                (function(sortButton, i){
                    sortButton.init(that.tHeadArray[i]).click(function(){
                        for(var index = 0; index < columnNum; index++){
                            if(index !== i){
                                $(that.tHeadArray[index].find("i"))
                                    .removeAttr("class").addClass("fa fa-sort");
                            }
                        }
                        if(sortButton.getFontCss() === "fa fa-sort"){
                            sortButton.setFontCss("fa fa-sort-desc");
                            that._sortColumnById(i, "asc");
                        } else {
                            if(sortButton.getFontCss() === "fa fa-sort-asc"){
                                sortButton.setFontCss("fa fa-sort-desc");
                                that._sortColumnById(i, "asc");
                            } else {
                                sortButton.setFontCss("fa fa-sort-asc");
                                that._sortColumnById(i, "desc");

                            }
                        }
                        //console.log(i);

                    });
                })(sortButton, columnId);
            }
        },
        /**
         * 增加一列
         * @param columnHeadData
         * @param columnData
         */
        addColumn : function(columnHeadData, columnData){
            var columnId = this.columnNum++;
            var rowNum = this.rowNum;
            var th = $("<th></th>");
            this.tHeadArray[columnId] = th;

            this.tHeadArray[columnId].text(columnHeadData.data);
            this.tHeadAttrArray[columnId] = columnHeadData.attr;

            $(this.tHead.find("tr")).append(this.tHeadArray[columnId]);
            this._addSortButton(columnId);
            for(var i = 0; i < rowNum; i++){
                var td = $("<td></td>");
                this.tRowArray[i].append(td);
                this.tBodyArray[i][columnId] = td;
                this.tBodyArray[i][columnId].text(columnData[i]);
                this.tBodyData[i][columnId] = columnData[i];
            }

        },
        /**
         * 插入一列
         * @param columnId
         * @param columnData
         */
        insertColumn : function(columnId, columnHeadData, columnData){
            if(columnId < this.columnNum + 1){
                var rowNum = this.rowNum;
                var columnNum = this.columnNum++;
                var th = $("<th></th>");
                this._insertArray(this.tHeadArray, columnId, th);

                this.tHeadArray[columnId].text(columnHeadData.data);
                this.tHeadAttrArray[columnId] = columnHeadData.attr;

                if(columnId == 0){
                    $(this.tHead.find("tr")).prepend(this.tHeadArray[columnId]);
                } else if(columnId == columnNum){
                    $(this.tHead.find("tr")).append(this.tHeadArray[columnId]);
                } else{
                    $(this.tHead.find("th:eq("+ columnId +")")).before(this.tHeadArray[columnId]);
                }

                this._addSortButton(columnId);

                for(var i = 0; i < rowNum; i++){
                    var td = $("<td></td>");
                    this._insertArray(this.tBodyArray[i], columnId, td);
                    this._insertArray(this.tBodyData[i], columnId, null);

                    this.tBodyArray[i][columnId].text(columnData[i]);
                    this.tBodyData[i][columnId] = columnData[i];

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
        /**
         * 对一列进行赋值
         * @param columnId
         * @param columnData
         */
        bindColumnData : function(columnId, headData, columnData){
            var rowNum = this.rowNum;
            this.tHeadArray[columnId].text(headData.data);
            this.tHeadAttrArray[columnId] = headData.attr;
            this._addSortButton(columnId);

            for(var i = 0; i < rowNum; i++){
                var columnId = columnId + (i * columnId);
                this.tBodyArray[i][columnId].text(columnData[i]);
                this.tBodyData[i][columnId] = columnData[i];
            }
        },
        /**
         * 删除一列
         * @param columnId
         */
        delColumn : function(columnId){
            if(columnId < this.columnNum){
                this.columnNum--;
                this.tHeadArray[columnId].remove();
                this._delArray(this.tHeadArray, columnId);
                this._delArray(this.tHeadAttrArray, columnId);

                for(var i = 0; i < this.rowNum; i++){
                    this.tBodyArray[i][columnId].remove();
                    this._delArray(this.tBodyArray[i], columnId);
                    this._delArray(this.tBodyData[i], columnId);
                }
            }
        },
        /**
         * 隐藏一列
         * @param columnId
         */
        hideColumn : function(columnId){
            if(columnId < this.columnNum){
                this.tHeadArray[columnId].hide();
                for(var i = 0; i < this.rowNum; i++){
                    this.tBodyArray[i][columnId].hide();
                }
            }
        },
        /**
         * 显示一列
         * @param columnId
         */
        showColumn : function(columnId){
            if(columnId < this.columnNum){
                this.tHeadArray[columnId].show();
                for(var i = 0; i < this.rowNum; i++){
                    this.tBodyArray[i][columnId].show();
                }
            }
        },
        getColumnData : function(columnId){
            var columnData = [];
            if(columnId < this.columnNum){

                for(var i = 0; i < this.rowNum; i++){
                    columnData[i] = this.tBodyData[i][columnId];
                }
            }
            return columnData;
        },
        /**
         * 重排TBody
         * @param order 顺序
         * @private
         */
        _rearrangeTBody : function(order){
            var buffer = [];
            for(var i = 0; i < this.rowNum; i++){
                buffer[order[i]] = this.tBodyData[i];
            }
            this.bindTBodyData(buffer);
        },
        /**
         * 按columnId及属性进行排序
         * @param columnId
         * @param orderBy
         * @private
         */
        _sortColumnById : function(columnId, orderBy){
            var columnData = this.getColumnData(columnId);
            var orderBy = orderBy || "asc";
            if(this.tHeadAttrArray[columnId].sortable){
                var buffer = [];

                if(this.tHeadAttrArray[columnId].type === "number"){
                    for(var i = 0; i < this.rowNum; i++){
                        buffer[i] = parseInt(columnData[i]);
                    }
                    if(orderBy === "asc"){
                        var order = this._sort(buffer, function(a, b){
                            if(a > b){
                                return 1;
                            }
                        });
                    } else {
                        var order = this._sort(buffer, function(a, b){
                            if(a < b){
                                return 1;
                            }
                        });
                    }

                    this._rearrangeTBody(order);
                } else if(this.tHeadAttrArray[columnId].type === "datetime"){
                    var util = new DatetimeUtil();

                    for(var i = 0; i < this.rowNum; i++){
                        buffer[i] = util.getTimestamp(columnData[i]);
                    }
                    if(orderBy === "asc"){
                        var order = this._sort(buffer, function(a, b){
                            if(a > b){
                                return 1;
                            }

                        });
                    } else {
                        var order = this._sort(buffer, function(a, b){
                            if(a < b){
                                return 1;
                            }
                        });
                    }
                    this._rearrangeTBody(order);
                } else {
                    for(var i = 0; i < this.rowNum; i++){
                        buffer[i] = columnData[i];
                    }
                    var order = this._sort(buffer);
                    this._rearrangeTBody(order);
                }
            }
        },
        /**
         * 对array进行排序，并返回与原先array的排序对照order
         * @param array
         * @param sortby
         * @returns {Array}
         * @private
         */
        _sort : function(array, sortby){
            var buffer = array.slice(0);
            array.sort(sortby);
            var order = [];
            var times = {};
            for(var i = 0; i < buffer.length; i++){
                if(!times[buffer[i]]){
                    times[buffer[i]] = 1;
                } else {
                    times[buffer[i]] += 1;
                }

                order[i] = this._indexOfArray(array, buffer[i], times[buffer[i]]);
            }
            return order;
        },
        _indexOfArray : function(array, element, times){
            var times = times || 1;
            for(var i = 0; i < array.length; i++){
                if(element === array[i]){
                    if(times === 1){
                        return i;
                    }
                    times--;
                }
            }
            return -1;
        },
        /**
         * 获取table元素
         * @returns {*|jQuery|HTMLElement}
         */
        getTableElement : function(){
            return this.table;
        },
        /**
         * 获取tbody元素
         * @returns {*|jQuery|HTMLElement}
         */
        getTBodyElement : function(){
            return this.tBody;
        },
        /**
         * 获取thead元素
         * @returns {*|jQuery|HTMLElement}
         */
        getTHeadElement : function(){
            return this.tHead;
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
        },
        /**
         * 插入一个数组元素
         * @param array
         * @param id
         * @param arrayData
         * @private
         */
        _insertArray : function(array, id, arrayData){
            if(id == 0){
                array.unshift(arrayData);
            } else if(id == array.length){
                array.push(arrayData);
            } else if(id < array.length){
                for(var i = array.length; i > id; i--){
                    array[i] = array[i - 1];
                }
                array[id] = arrayData;
            }
            return array;
        },
        _sortArray : function(){

        }
    });

    module.exports = Table;
});