/*!Name: imcenter.js
 * Date: 2017-2-14 17:14:17 */
define("MOD_ROOT/js/imcenter",function(require,exports,module){function e(e){function i(t){o=!0,o&&c&&r(e)}function n(t){c=!0,o&&c&&r(e)}function r(e){if(!e.shopCserviceJson||!e.shopCserviceJson.length)return!1;new s({$el:$("#imcenter"),shopCserviceJson:e.shopCserviceJson,skuid:e.skuid,commentNum:e.commentMeta.CommentCount,jprice:e.jp,venderId:e.venderId,src:e.src,name:e.name})}t.addListener("onCommentMeta",n),t.addListener("onPriceReady",i);var o=!1,c=!1}var t=require("MOD_ROOT/js/event").Event,i='    {for item in body}        <li><a class="link-trigger" href="#none" data-id="${item.id}" data-url="${item.url}" title="${item.name}"><i class="jd-dd ${item.statusClass}"></i><em>${item.name}</em></a></li>    {/for}',s=function(e){this.shopCserviceJson=e.shopCserviceJson||[],this.groupIdArr=[],this.$el=e.$el||$("<div></div>"),this.trigger=e.trigger||".link-trigger",this.$customerServiceList=this.$el.find(".customer-service-list"),this.skuid=e.skuid,this.commentNum=e.commentNum,this.jprice=e.jprice,this.venderId=e.venderId,this.src=e.src,this.name=e.name,this.init()};s.prototype={init:function(){this.bindEvent(),this.get()},bindEvent:function(){var e=this;this.$el.delegate(this.trigger,"click",function(){var t=$(this).attr("data-url");e.open(t)})},get:function(){for(var e=this,t=0;t<e.shopCserviceJson.length;t++)e.shopCserviceJson[t].groupId&&e.groupIdArr.push(e.shopCserviceJson[t].groupId);var i=e.groupIdArr.join(",");$.ajax({url:"//chat.jd.com/venderApi/queryGroupByIdList.action",data:{groupIdList:i,responseCharset:"gbk"},scriptCharset:"gbk",dataType:"jsonp",success:function(t){t&&t.code&&(1==t.code||2==t.code||3==t.code||9==t.code)&&e.set(t)}})},set:function(e){var t="";if(e.body&&e.body.length>0)try{this.setStatusClass(e);var t=i.process(e);this.$customerServiceList.html(t)}catch(s){var n=t.match(/\[ERROR.+\]/);n&&n.length&&console.error("Template Render Error @ [imCenter.js]. >>>>> \n   %s",n[0])}},setStatusClass:function(e){for(var t in e.body)e.body[t].hasOnlineWaiter?e.body[t].statusClass="":e.body[t].statusClass="jd-dd-offline"},open:function(e){var t={pid:this.skuid,advertiseWord:encodeURIComponent($("#p-ad").text()),commentNum:this.commentNum,evaluationRate:"x",imgUrl:this.src,wname:encodeURIComponent(this.name),jprice:this.jprice,stock:encodeURIComponent($("#store-selector .text").text()+"("+$("#store-prompt strong").text())+")"};this.venderId&&(t.venderId=this.venderId);var i=-1!=e.indexOf("?")?"&":"?";open(e+i+$.param(t),this.skuid,"status=no,toolbar=no,menubar=no,location=no,titlebar=no,resizable=yes,width=1018px,height=590")}},module.exports.__id="imcenter",module.exports.init=e});