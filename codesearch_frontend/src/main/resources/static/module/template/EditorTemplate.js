/**
 * Created by xreztento@vip.sina.com on 2016/12/28.
 */
var standardTemplate = {

}

var simplyTemplate = {
    menus : [
        'source',
        '|',     // '|' 是菜单组的分割线
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'img',
        'video',
        'location',
        'insertcode'
    ],

    colors : {
        '#880000': '暗红色',
        '#800080': '紫色',
        '#ff0000': '红色'
    },

    familys : [
        '宋体', '黑体', '楷体', '微软雅黑',
        'Arial', 'Verdana', 'Georgia'
    ],

    menuFixed : false,

    zindex : 20000,

    printLog : false,

    jsFilter : true,

    pasteFilter : true,

    pasteText : true,

    codeDefaultLang : 'javascript',

    hideLinkImg : false,

    uploadImgUrl : "uploader.action",

    uploadImgFileName : "imgFile",
    //http://lbsyun.baidu.com/index.php?title=jspopular申请key
    mapAk : "c09MWXdMu403r8V5gWxOsddPz5hfmPj4"
}