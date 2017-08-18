/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    //require("bootstrap");
    require("treeview");

    var Class = require("class");
    var Element = require("./Element");
    var Util = require("util");

    var TreeViewElement = Class("TreeViewElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "TreeViewElement"
        },
        initialize : function(width, height, tree, isMultiSelect,
                              enableLinks, showTags) {
            TreeViewElement.Super.call(this, width, height);
            this.tree = tree;
            this.isMultiSelect = isMultiSelect;
            this.enableLinks = enableLinks;
            this.showTags = showTags;

        },
        init : function(where){

            var statement = "<div></div>";
            this.element = TreeViewElement.Super.prototype.init.call(this, where, statement);
            this._render();
            return this;
        },
        _render : function(){

            var tree = this.tree || {};
            var isMultiSelect = this.isMultiSelect;
            var enableLinks = this.enableLinks;
            var showTags = this.showTags;

            this.element.treeview({
                data: tree,
                levels: 5,
                multiSelect : isMultiSelect,
                enableLinks : enableLinks,
                showTags : showTags
            });
        },
        getNodeByAttrId : function(){

        },
        /**
         * 增加孩子节点
         * @param nodeObj 构建前的Node对象
         * @param parentText 父节点的text属性值
         */
        addChildNode : function(nodeObj, parentText){
            var parentText = parentText || "root";
            if(parentText == "root"){
                this.tree.push(nodeObj);
            } else {
                this._addChildNode(this.tree, nodeObj, parentText);
            }
            this.element.empty();
            this._render();
        },
        _addChildNode : function(node, nodeObj, parentText){
            for(var i = 0,l = node.length; i < l; i++){

                if(node[i].nodes){
                    this._goThroughNode(node[i].nodes);
                }
                if(node[i].text == parentText){
                    if(!node[i].nodes){
                        node[i].nodes = [];
                    }
                    node[i].nodes.push(nodeObj);

                }
            }
        },
        /**
         * 自动添加数量标签
         */
        autoWrapTags : function(){
            this._autoWrapTags(this.tree);
            this.showTags = true;
            this._render();
        },
        _autoWrapTags : function(node){
            for(var i = 0,l = node.length; i < l; i++){

                if(node[i].nodes){
                    this._autoWrapTags(node[i].nodes);
                }
                node[i].tags = [this.getPosterityNum( node[i].text)];
            }


        },
        goThroughTree : function(){
            this._goThroughNode(this.tree);
        },
        _goThroughNode : function(node){
            for(var i = 0,l = node.length; i < l; i++){

                if(node[i].nodes){
                    this._goThroughNode(node[i].nodes);
                }
                console.log(node[i].text);
            }

        },
        getSelected : function(){
            return this.element.treeview('getSelected');
        },
        /**
         * 通过text属性值获取Node对象
         * @param text
         * @returns {*}
         */
        getNodeByText : function(text){
            return this.element.treeview("getNodeByText", text);
        },
        /**
         * 通过text属性值获取构建前的Node对象
         * @param text
         * @returns {null|*}
         */
        getNodeObjByText : function(text){
            this.nodeObjByText = null;
            this._getNodeObjByText(this.tree, text);
            return this.nodeObjByText;
        },
        _getNodeObjByText : function(node, text){

            for(var i = 0,l = node.length; i < l; i++){
                if(node[i].text == text){
                    this.nodeObjByText = node[i];
                    return;
                }
                if(node[i].nodes){
                    this._getNodeObjByText(node[i].nodes, text);
                }
            }
        },
        /**
         * 通过text属性值获取指定Node的后代数
         * @param text
         * @returns {number}
         */
        getPosterityNum : function(text){
            var text = text || "root";
            this.posterityNum = 0;
            this.getNodeObjByText(text);
            if(this.nodeObjByText.nodes){
                this._getPosterityNum(this.nodeObjByText.nodes);
            }
            return this.posterityNum;
        },
        _getPosterityNum : function(node){

            for(var i = 0,l = node.length; i < l; i++){
                if(node[i].nodes){
                    this._getPosterityNum(node[i].nodes);
                }
                this.posterityNum++;
            }
        },
        checkAll : function(){
            this.element.treeview('checkAll', { silent: true });
        },
        checkNode : function(nodeId){
            this.element.treeview('checkNode', [ nodeId, { silent: true } ]);
        },
        clearSearch : function(){
            this.element.treeview('clearSearch');
        },
        collapseAll : function(){
            this.element.treeview('collapseAll', { silent: true });
        },
        collapseNode : function(nodeId){
            this.element.treeview('collapseNode', [ nodeId, { silent: true, ignoreChildren: false } ]);
        },

        disableAll : function(){
            this.element.treeview('disableAll', { silent: true });
        },
        disableNode : function(nodeId){
            this.element.treeview('disableNode', [ nodeId, { silent: true } ]);
        },
        enableAll : function(){
            this.element.treeview('enableAll', { silent: true });
        },
        enableNode : function(nodeId){
            this.element.treeview('enableNode', [ nodeId, { silent: true } ]);
        },
        expandAll : function(levels){
            var levels = levels || 2;
            this.element.treeview('expandAll', { levels: levels, silent: true });
        },
        expandNode : function(nodeId, levels){
            var levels = levels || 2;
            this.element.treeview('expandNode', [ nodeId, { levels: levels, silent: true } ]);
        },
        getCollapsed : function(nodeId){
            this.element.treeview('getCollapsed', nodeId);
        },
        getDisabled : function(nodeId){
            this.element.treeview('getDisabled', nodeId);
        },
        getEnabled : function(nodeId){
            this.element.treeview('getEnabled', nodeId);
        },
        getExpanded : function(nodeId){
            this.element.treeview('getExpanded', nodeId);
        },
        getNode : function(nodeId){
            this.element.treeview('getNode', nodeId);
        },
        getParent : function(nodeId){
            this.element.treeview('getParent', nodeId);
        },
        getSelected : function(nodeId){
            this.element.treeview('getSelected', nodeId);
        },
        getSiblings : function(nodeId){
            this.element.treeview('getSiblings', nodeId);
        },
        getUnselected : function(nodeId){
            this.element.treeview('getUnselected', nodeId);
        },
        remove : function(){
            this.element.treeview('remove');
        },
        revealNode : function(nodeId){
            this.element.treeview('revealNode', [ nodeId, { silent: true } ]);
        },
        search : function(ignoreCase, exactMatch, revealResults){
            this.element.treeview('search', [ 'Parent', {
                ignoreCase: ignoreCase,     // case insensitive
                exactMatch: exactMatch,    // like or equals
                revealResults: revealResults  // reveal matching nodes
            }]);
        },
        selectNode : function(nodeId){
            this.element.treeview('selectNode', [ nodeId, { silent: true } ]);
        },
        toggleNodeChecked : function(nodeId){
            this.element.treeview('toggleNodeChecked', [ nodeId, { silent: true } ]);
        },
        toggleNodeDisabled : function(nodeId){
            this.element.treeview('toggleNodeDisabled', [ nodeId, { silent: true } ]);
        },
        toggleNodeExpanded : function(nodeId){
            this.element.treeview('toggleNodeExpanded', [ nodeId, { silent: true } ]);
        },
        toggleNodeSelected : function(nodeId){
            this.element.treeview('toggleNodeSelected', [ nodeId, { silent: true } ]);
        },
        uncheckAll : function(){
            this.element.treeview('uncheckAll', { silent: true });
        },
        uncheckNode : function(nodeId){
            this.element.treeview('uncheckNode', [ nodeId, { silent: true } ]);
        },
        unselectNode : function(nodeId){
            this.element.treeview('unselectNode', [ nodeId, { silent: true } ]);
        },
        onNodeSelected : function(callback){
            this.element.on('nodeSelected', callback);
        },
        onNodeChecked : function(callback){
            this.element.on('nodeChecked', callback);
        },
        onNodeCollapsed : function(callback){
            this.element.on('nodeCollapsed', callback);
        },
        onNodeDisabled : function(callback){
            this.element.on('nodeDisabled', callback);
        },
        onNodeEnabled : function(callback){
            this.element.on('nodeEnabled', callback);
        },
        onNodeExpanded : function(callback){
            this.element.on('nodeExpanded', callback);
        },
        onNodeSelected : function(callback){
            this.element.on('nodeSelected', callback);
        },
        onNodeUnchecked : function(callback){
            this.element.on('nodeUnchecked', callback);
        },
        onNodeUnselected : function(callback){
            this.element.on('nodeUnselected', callback);
        },
        onSearchComplete : function(callback){
            this.element.on('searchComplete', callback);
        },
        onSearchCleared : function(callback){
            this.element.on('searchCleared', callback);
        },

        getModuleName : function(){
            return TreeViewElement.MODULE_NAME;
        }
    });

    module.exports = TreeViewElement;
});

