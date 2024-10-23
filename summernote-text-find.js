/**
 * Summernote Plugins summernote-text-find v1.0.1
 * https://github.com/MaRuifu/summernote-text-find
 * 
 * Copyright [2024] Ma Ruifu
 * email: email@maruifu.cn
 * Released under the MIT license
 * https://github.com/MaRuifu/summernote-text-find/blob/main/LICENSE
 *
 */
(function (factory) {
  /* Global define */
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node/CommonJS
      module.exports = factory(require('jquery'));
  } else {
      // Browser globals
      factory(window.jQuery);
  }
}(function ($) {
  // 嵌入CSS
  var css = `
  #findtxtToolbar {
    padding: 5px; 
    background-color: var(--note-toolbar-background-color) !important; /* 设置背景颜色 */
  }
  #findtxtToolbar .note-form-row {
    position: relative; /* 相对定位 */
    display: flex; /* 使用 flexbox 布局 */
    flex: 1 0 100%; /* flex 属性用于响应式布局 */
    flex-wrap: nowrap;  /* 不换行 */
    vertical-align: middle; /* 垂直居中对齐 */
    padding: 0;  /* 移除内边距 */
  }
  .note-display-none { display: none !important; } /* 隐藏元素 */
  .note-display-block { display: block !important; }  /* 显示元素 */
  .selectHighlight{background: red; } /* 选中高亮背景 */
  .highlight { background-color: yellow ; }  /* 高亮文本背景 */
  #findtxtToolbar .searchText,
  #findtxtToolbar .note-input {
       width: 250px;  /* 设置输入框宽度 */
  }

  .centered-content {
    padding-left: 10px; /* 添加左侧内边距 */
    text-align: center; /* 水平居中文本 */
    display: flex; /* 使用Flexbox */
    align-items: center; /* 垂直居中对齐 */
    justify-content: center; /* 水平居中对齐 */
   }
`;
  // 将CSS添加到head
  $('<style>').html(css).appendTo('head');
  $.extend(true, $.summernote.lang, {
      'en-US': { /* Chinese Simplified (Default Language) */
          findtxt: {
              tooltip: `Find`, // 工具提示文本
              findBtn: 'Find',  // 按钮文本
              findPlaceholder: 'Enter the text you want to find...', // 输入框占位符
              previous: 'Previous',  // 上一个按钮文本
              next: 'Next',  // 下一个按钮文本
          }
      }
  });
  $.extend($.summernote.options, {
      findtxt: {
          // 隐藏类名
          classHidden: 'note-display-none',
          // 图标代码
          icon: '<i class="note-icon" data-toggle="findtxt"><svg t="1728893612827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17499" width="14" height="14"><path d="M474.453333 884.053333c-225.28 0-409.6-184.32-409.6-409.6s184.32-409.6 409.6-409.6 409.6 184.32 409.6 409.6-184.32 409.6-409.6 409.6z m0-68.266666c187.733333 0 341.333333-153.6 341.333334-341.333334s-153.6-341.333333-341.333334-341.333333-341.333333 153.6-341.333333 341.333333 153.6 341.333333 341.333333 341.333334z m252.586667 54.613333c-13.653333-13.653333-10.24-37.546667 3.413333-47.786667s37.546667-10.24 47.786667 3.413334l64.853333 78.506666c13.653333 13.653333 10.24 37.546667-3.413333 47.786667s-37.546667 10.24-47.786667-3.413333l-64.853333-78.506667z" fill="#2c2c2c" p-id="17500" transform="translate(0, 200)scale(0.9)" ></path></svg></i>'
      }
  });
  $.extend($.summernote.plugins, {
      'findtxt': function (context) {
          var ui = $.summernote.ui,  // 引用 UI 组件
              $note = context.layoutInfo.note, // 引用编辑区域
              $editor = context.layoutInfo.editor, // 引用编辑器区域
              options = context.options, // 获取选项配置
              lang = options.langInfo; // 获取语言信息
          // 定义查找按钮
          context.memo('button.findtxt', function () {
              var button = ui.button({
                  contents: options.findtxt.icon,  // 设置按钮的图标内容
                  container: options.container, // 设置按钮容器
                  tooltip: lang.findtxt.tooltip, // 按钮提示
                  placement: options.placement, // 设置按钮的显示位置
                  click: function (e) {
                      e.preventDefault();  // 阻止默认行为
                      $editor.find('.highlight').contents().unwrap('mark'); // 清除所有高亮
                      $('#findtxtToolbar').toggleClass(options.findtxt.classHidden);  // 切换工具栏显示
                      $('.note-status-output').text(''); // 清空状态输出
                      if ($note.summernote('createRange').toString()) {
                          var selected = $note.summernote('createRange').toString();  // 获取选中文本
                          $('#searchText').val(selected);  // 将选中文本填入搜索框
                      }
                  }
              });
              return button.render();
          });
          // 初始化
          this.initialize = function () {
              var fnrBody =
                  '<div id="findtxtToolbar" class="note-display-none">' +
                  '<div class="note-form-row">' +
                  // 定义搜索输入框
                  '<input id="searchText" type="text" class="searchText note-input" value="" placeholder="' + lang.findtxt.findPlaceholder + '">' +
                  // 定义查找按钮
                  '<button class="searchText-btn  btn btn-default note-btn ">' + lang.findtxt.findBtn + '</button>' +
                  // 定义 "上一个" 按钮
                  '<button class="noScrollToNextMatch btn btn-default note-btn" id="noNextButton" " style="display:none;">' + lang.findtxt.previous + '</button>' +
                  // 定义 "下一个" 按钮
                  '<button class="scrollToNextMatch btn btn-default note-btn" id="nextButton"  style="display:none;">' + lang.findtxt.next + '</button>' +
                  // 进度条和匹配数量显示
                  '<div class="centered-content"><progress  style="height: 30px;" id="progressBar" value="0"></progress><span id="selectMatches"></span><span id="totalMatches"></span></div>' +
                  '</div>' +
                  '</div>';
              $('.note-toolbar').append(fnrBody);// 添加查找工具栏
              this.show();
          };
          // 查找功能
          this.findtxt = function () {
              var $selectMatches = $('#selectMatches');  // 定位查找按钮
              var $totalMatches = $('#totalMatches');  // 定位查找按钮
              var $progressBar = $('#progressBar');
              var $nextButton = $('#nextButton');
              var $noNextButton = $('#noNextButton');
              var $noScrollToNextMatch = $('.noScrollToNextMatch'); // 定位 "上一个" 按钮
              var $scrollToNextMatch = $('.scrollToNextMatch'); // 定位 "下一个" 按钮
              var $fnrFindBtn = $('.searchText-btn');  // 定位查找按钮
              let currentIndex = 0;  // 当前高亮索引
              let indent = 0; // 匹配计数
              var fnrFind = ''; // 查找文本
              // 查找按钮点击事件
              $fnrFindBtn.click(function (e) {
                  e.preventDefault(); // 阻止默认行为
                  //清除高亮样式
                  $editor.find('.highlight').contents().unwrap('mark');  // 清除高亮
                  $editor.find('.selectHighlight').contents().unwrap('mark'); // 清除选中高亮
                  //重置统计数量
                  indent = 0;
                  fnrFind = $('.searchText').val(); // 获取搜索文本
                  var fnrCode = context.invoke('code'); // 获取编辑器内容
                  if (fnrFind) {
                      // 解析 HTML
                      var parser = new DOMParser(); // 创建 DOM 解析器
                      var docNode = parser.parseFromString(fnrCode, 'text/html'); // 解析 HTML 内容
                      highlightElement(docNode);   // 高亮匹配项
                      // 获取修改后的 HTML
                      var fnrReplaced = docNode.body.innerHTML;
                      $note.summernote('code', fnrReplaced);  // 设置新内容
                      $totalMatches.text(indent);  // 显示总匹配数
                      if (indent >= 1) {
                          if (indent > 1) {
                            $nextButton.show();
                            $noNextButton.show();
                          }
                          $selectMatches.text("1/");
                          //  设置默认搜索的第一个为选中高亮
                          $('mark').eq(0).removeAttr('class')
                          $('mark').eq(0).addClass('selectHighlight');
                          $('mark')[0].scrollIntoView({behavior: 'smooth', block: 'center'}) // 滚动到第一个匹配
                      } else {
                        $nextButton.hide();
                        $noNextButton.hide();
                          // 移除高亮的的样式
                          let marksList = $('mark');
                          marksList.each(function () {
                              $(this).removeAttr('class')
                          });
                          $selectMatches.text("");
                      }
                      currentIndex = 0;
                      $progressBar.value = 0;
                      $progressBar.max = indent - 1;
                      disabledBtn();
                  }
              });
              // 递归打印和高亮匹配的元素
              function highlightElement(element) {
                  // 打印当前元素的标签名
                  // 如果元素有文本节点作为直接子节点，打印文本内容（跳过空白文本）
                  Array.from(element.childNodes).forEach(node => {
                      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {

                          const regex = new RegExp(fnrFind, 'gi');
                          const matches = node.textContent.match(regex);
                          var fnrReplaced = node.textContent.replace(regex, '<mark class="highlight">$&</mark>');
                          if (matches !== null && matches.length > 0) {
                              indent = indent + matches.length;
                              var span = document.createElement('span');
                              span.innerHTML = fnrReplaced;
                              // 获取文本节点的父节点
                              var parent = node.parentNode;
                              // 用新的 span 元素替换原始的文本节点
                              parent.replaceChild(span, node);
                          }
                      } else if (node.nodeType === Node.ELEMENT_NODE) {
                          // 递归处理子元素，增加缩进以表示层级
                          highlightElement(node, indent);
                      }
                  });
                  return indent;
              }
              // 处理下一个匹配
              $scrollToNextMatch.click(function (e) {
                  e.preventDefault();
                   const selectMatches = document.getElementById('selectMatches');
                  if (currentIndex < indent - 1) {
                      currentIndex++;
                      if (currentIndex <= indent - 1) {
                        $progressBar.value = currentIndex;
                          const highlightedElements = document.querySelectorAll('.highlight');
                          highlightedElements[currentIndex - 1].scrollIntoView({behavior: 'smooth', block: 'center'});
                      }
                      selectMatches.innerHTML = currentIndex + 1 + "/";
                      let marks = $('mark');
                      // 获取第 position 个 mark 元素
                      let sourceMark = marks.eq(currentIndex - 1);
                      // 修改其 class 为 'name'
                      sourceMark.removeAttr('class')
                      sourceMark.addClass('highlight');
                      // 获取第 position 个 mark 元素
                      let targetMark = marks.eq(currentIndex);
                      targetMark.removeAttr('class')
                      targetMark.addClass('selectHighlight');
                  }
                  disabledBtn();
              });
              // 处理上一个匹配
              $noScrollToNextMatch.click(function (e) {
                  e.preventDefault();
                   const selectMatches = document.getElementById('selectMatches');
                  if (currentIndex > 0) {
                      currentIndex--;
                      $progressBar.value = currentIndex;
                      const highlightedElements = document.querySelectorAll('.highlight');
                      highlightedElements[currentIndex].scrollIntoView({behavior: 'smooth', block: 'center'});
                      selectMatches.innerHTML = currentIndex + 1 + "/";
                      let marks = $('mark');
                      // 获取第 position 个 mark 元素
                      let sourceMark = marks.eq(currentIndex + 1);
                      // 修改其 class 为 'name'
                      sourceMark.removeAttr('class');
                      sourceMark.addClass('highlight');
                      // 获取第 position 个 mark 元素
                      let targetMark = marks.eq(currentIndex);
                      targetMark.removeAttr('class');
                      targetMark.addClass('selectHighlight');
                  }
                  disabledBtn();
              });
              // 按钮禁用逻辑
              function disabledBtn() {
                  if ($selectMatches.text().substr(0, $selectMatches.text().length - 1) === $totalMatches.text()) {
                      $('#nextButton').attr('disabled', 'disabled');
                      $('#noNextButton').removeAttr("disabled")
                  } else if ($selectMatches.text().substr(0, $selectMatches.text().length - 1) === 1) {
                      $('#noNextButton').attr('disabled', 'disabled');
                      $('#nextButton').removeAttr("disabled")
                  } else if ($totalMatches.text() == 1) {
                      $('#nextButton').attr('disabled', 'disabled');
                      $('#noNextButton').attr('disabled', 'disabled');
                  } else {
                      $('#nextButton').removeAttr("disabled")
                      $('#noNextButton').removeAttr("disabled")
                  }
              }
          };
          this.show = function () {
              this.findtxt();
          };
      }
  });
}));