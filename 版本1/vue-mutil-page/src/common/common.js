import html2canvas from 'html2canvas'	
import jsPDF from 'jspdf'
import $ from 'webpack-zepto'
// 日期格式化  new Date().Format('yyyy-MM-dd')
Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
var C = {
    cssText: '',
    getTody: function () {
      let time = new Date().Format('yyyy-MM-dd');
      let timeArr = time.split('-');
      return timeArr[0] + ' 年 ' + timeArr[1] + ' 月 ' + timeArr[2] + ' 日 '
    },
    uzStorage: function () {
      return window.localStorage
    },
    setLS: function (key, value) {
      if (arguments.length === 2) {
        var v = value
        if (typeof v === 'object') {
          v = JSON.stringify(v)
          v = 'obj-' + v
        } else {
          v = 'str-' + v
        }
        var ls = this.uzStorage()
        if (ls) {
          ls.setItem(key, v)
        }
      }
    },
    getLS: function (key) {
      var ls = this.uzStorage()
      if (ls) {
        var v = ls.getItem(key)
        if (!v) {
          return
        }
        if (v.indexOf('obj-') === 0) {
          v = v.slice(4)
          return JSON.parse(v)
        } else if (v.indexOf('str-') === 0) {
          return v.slice(4)
        }
      }
    },
    rmLS: function (key) {
      var ls = this.uzStorage()
      if (ls && key) ls.removeItem(key)
    },
    clearLS: function (callback) {
      var ls = this.uzStorage()
      if (ls) ls.clear()
      if (!this.getLS('UserInfo')) {
        callback && callback()
      }
    },
    getUrlParamUTF8: function (param, url) {
      var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i')
      var r

      if (typeof (url) === 'string') {
        if (url.indexOf('?') > 0) {
          url = url.split('?')[1]
          url = url.match(reg)
        }
      }
      r = url || window.location.search.substr(1).match(reg)

      if (r !== null) {
        return decodeURI(r[2])
      }
      return null
    },
    addCSS: function (url) { // 动态加载CSS
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.type='text/css';
      link.rel = 'stylesheet';
      link.href = url;
      head.appendChild(link);
    },
    loadStyleString: function (cssText) {
      var style = document.createElement("style");
      style.type = "text/css";
      try{
          // firefox、safari、chrome和Opera
          style.appendChild(document.createTextNode(cssText));
      }catch(ex) {
          // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
          style.styleSheet.cssText = cssText;
      }
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    createPdf: function (obj) {
      this.cssText = `
        #print-area{
          padding: 20px;
        }
        .edui-default .edui-editor-toolbarbox{
          display: none;
        }`;
      this.loadStyleString(this.cssText);
      html2canvas(obj).then(function(canvas) {
        console.log(canvas);
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;
        //返回图片dataURL，参数：图片格式和清晰度(0-1)
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        // 三个参数，第一个方向，第二个单位，第三个尺寸格式,方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        console.log(leftHeight + '-----' + pageHeight);
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
        } else {
          while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if(leftHeight > 0) {
              pdf.addPage();
              }
          }
        }

        pdf.save('content.pdf');
      });
    }
  }
  export default C