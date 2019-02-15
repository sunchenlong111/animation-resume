function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code")
  domCode.innerHTML = prefix || ""
  let n = 1
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    )
    styleTag.innerHTML = prefix + code.substring(0, n)
    if (n > code.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 10)
}

var result = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var result2 = `
  #paper{
    width:100px;height:100px;
    background:red;
  }
`
writeCode("", result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      console.log("1")
    })
  })
})

function createPaper(fn) {
  var paper = document.createElement("div")
  paper.id = "paper"
  document.body.appendChild(paper)
  fn && fn.call()
}
