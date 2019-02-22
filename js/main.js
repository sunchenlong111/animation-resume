function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code")
  domCode.innerHTML = prefix || ""
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    )
    domCode.scrollTop = domCode.scrollHeight
    styleTag.innerHTML = prefix + code.substring(0, n)
    if (n >= code.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 10)
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector("#paper>.content")
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 10)
}

let result = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
/*换个背景颜色把*/
html{
  background: #eee;
}

/*来个代码框*/

#code{
  border: 1px solid #aaa;
  position:fixed;
  left:0;
  width:47%;
  height:95vh;
  margin:20px;
  overflow-y:scroll;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.comment{color:#498;}
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */

#paper{
  position:fixed;
  background:#fff;
  right:0;
  margin:20px;
  padding:20px;
  width:47%;
  height:95vh;
}

#paper{
  overflow-y:scroll;
}

/* 也一起呼吸吧*/
#paper{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 于是我就可以在白纸上写字了，请看右边 */

`

let result2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
let result3 = `
/*加下来增肌一点酷炫的3D效果吧*/

html {
    perspective: 1000px;
}
#code{
    transform: rotateY(10deg) translateZ(-100px) ;
}
#paper{
    transform-origin: 1450px 1450px;
    transform: rotateY(-10deg) translateZ(100px) ;
}

/*那么来添加一个标题吧*/

body::after{
  display:block;
  position:fixed;
  left:580px;
  top:600px;
  content:'阿龙哟的简历';
  font-size:32px;
  font-weight:bold;
  z-index: 999;
}

/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

let md = `
### 自我介绍

我叫 阿龙哟

-1995 年 1 月出生
-南京林业大学 硕士毕业
-转行自学前端一年
-希望应聘前端开发岗位

### 技能介绍

熟悉 JavaScript CSS HTML Vue React 小程序

### 项目介绍

1. 原生轮播
2. 个人简历
3. Canvas画板
4. Vue多人在线博客
5. 孩子王保险小程序

### 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

### 实习经历

- 2018.11 - 2019.3 孩子王股份有限公司 全渠道技术中心 H5助理工程师
  主要从事孩子王商城和小程序的开发

`
writeCode("", result, () => {
  createPaper(() => {
    writeMarkdown(md,()=>{
      writeCode(result, result2, () => {
        converMarkdownToHtml(()=>{
          writeCode(result+result2, result3, () =>{
            console.log('完成')
          } )
        })
      })
    })
  })
})

function createPaper(fn) {
  let paper = document.createElement("div")
  paper.id = "paper"
  let content = document.createElement("pre")
  content.className = "content"
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}


function converMarkdownToHtml(fn){
  let div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn&&fn.call()
}