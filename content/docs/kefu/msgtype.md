---
title: 环信扩展消息类型
secondnavkefu: true
sidebar: kefusidebar
---

# 环信扩展消息类型

当用户发送一个文本消息，并在消息的扩展字段 ext 中放置 msgtype 字段时，表示此消息为扩展消息。

## 用户轨迹消息 {#trackmsg}
当用户进入商城某个商品详情页面，并在该页点击了联系客服，就可考虑将此类消息发送给客服。

<pre class="hll"><code class="language-javascript highlight">
{ ext:{
    msgtype:{
      // 用户轨迹消息
      track:{
        // 消息标题
        title:       "我正在看：",
        // 商品价格
        price:       "¥: 235.00",
        // 商品描述
        desc:        "女装小香风气质蕾丝假两件短袖",
        // 商品图片链接
        img_url:     "http://yourdomain.com/img/a.jpg",
        // 商品页面链接
        item_url:    "http://yourdomain.com/item/a.html"
      }
    }
  }
}
</code></pre>

<img src="/img/kefu/msgtype/trackmsg.png" width="350" style="display:block; margin:0 auto;"/>
<center>用户轨迹消息</center>

## 订单消息 {#ordermsg}

<pre class="hll"><code class="language-javascript highlight">
{ ext:{
    msgtype:{
      // 订单消息
      order:{
        // 消息标题
        title:       "我的订单",
        // 订单标题
        order_title: "订单号：a110083",
        // 商品价格
        price:       "¥: 235.00",
        // 商品描述
        desc:        "女装小香风气质蕾丝假两件短袖",
        // 商品图片链接
        img_url:     "http://yourdomain.com/img/a.jpg",
        // 商品页面链接
        item_url:    "http://yourdomain.com/item/a.html"
      }
    }
  }
}
</code></pre>

<img src="/img/kefu/msgtype/ordermsg.png" width="350" style="display:block; margin:0 auto;"/>
<center>订单消息</center>


