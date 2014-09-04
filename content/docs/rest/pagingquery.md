---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---


<h3 id="limitcursor">使用limit和cursor</h3>

<p>假设当前数据库中, cats的集合中有100个entity</p>

<p>然后执行查询</p>

<pre><code>GET /cats?limit=9
</code></pre>

<p>这时候会返回一个json</p>

<pre><code>{
....
count : 9,
cursor : asdfsdfdsfdsfsd
entities : [
	{
	ENTITY PROPERTIES
	}
]
....
}	
</code></pre>

<p>上面的response中的json里面有三个属性需要注意:</p>

<ul>
  <li>count : 告诉你的是这个response中包含了多少个entities</li>
  <li>cursor : 告诉你的是当前的游标是多少</li>
  <li>entities : 包含了返回的count个entities</li>
</ul>

<p>把 limit 和 cursor结合起来使用可以达到分页的效果</p>

<p>例如上面的例子中, 那个查询只使用了 limit, 而没有使用cursor, 则表达的是:</p>

<p>从cats集合中的开头获取9个cat, 返回给我</p>

<p>然后返回的response的cursor表达的是, 这里有个指针, 指向第十个cat</p>

<p>所以, 想要再获取9个cats的话 就可以执行查询</p>

<pre><code>GET /cats?limit=9&amp;cursor=asdfsdfdsfdsfsd
</code></pre>

<p>这样, 会返回从第十条到第17条数据 (这次又会返回一个新的cursor的值, 指向第18个元素), 依次类推</p>

<p>这样, 当我们执行了这个查询11次( 取了99个entities了), 因为一共有100个, 那么还剩下一个, 我们还可以继续使用第11次返回的cursor, 假设是111111</p>

<pre><code>GET /cats?limit=9&amp;cursor=111111
</code></pre>

<p>注意, 这时候, 111111这个指针指向的是第100行, 并且表中没有更多的数据了</p>

<p>所以, 这次只会返回一个 (也就是第一百个), 并且, 返回值中没有 "cursor"这个属性!!!</p>

<p>所以, 我们只需要检查返回值中是否有"cursor", 就可以判断是否已经把数据都取完了</p>

<hr />

<p>上面是一次同步的过程</p>

<p>也就是, 通过使用limit和cursor, 把当前表中的数据都遍历完, 那么, 假设过了一段时间, 我们的app又需要同步, 这时候, 我们想要的是, 从我们之前完成的地方(第101条) 开始, 到当前数据库中的新内容 (假设这段时间, 数据库又被更新了100条), 所以, 现在数据库中一共有200条数据, 而我们这次想要遍历的是 101 – 200</p>

<p>而上面我们说过了, 我们上次同步结束的时候, 返回值是没有cursor的, 而再上一次, 是有一个指向第99条数据的cursor的</p>

<p>并且, 我们也知道, 上次同步的时候, 最后一次获取到的entities个数是1个 (通过count属性可知)</p>

<p>所以, 我们只需要使用 指向第99行的cursor, 来继续执行</p>

<pre><code>GET /cats?limit=9&amp;&amp;cursor=111111
</code></pre>

<p>这一个查询, 实际上是获取的 100 - 109行</p>

<p>而第100行实际上我们已经处理过了, 所以这次我们需要从返回值中跳过第100行, 这个判断可以从上次同步的时候, 最后一次请求获取到的count来得知 (上面说了, 最后一次返回值, 没有cursor, 但是有count)</p>

