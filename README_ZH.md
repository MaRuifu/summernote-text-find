# summernote-text-find 1.0.1

Summernote-text-find插件
[Summernote](https://github.com/summernote/summernote/) 所见即所得编辑器的插件。



[![License](https://img.shields.io/badge/license-MIT-4EB1BA.svg?style=flat-square)](https://github.com/maruifu/summernote-text-find/blob/main/LICENSE)
[![@xiaomageit on zhihu](https://img.shields.io/badge/zhihu-@xiaomageit-red.svg?style=flat-square)](https://www.zhihu.com/people/xiaomageit)

[English](README.md)

## 作用

将一个按钮添加到工具栏，以便查找搜索关键字。尤其是在编辑器内嵌在客户端上是没有浏览器自带的查找功能时,这个插件尤为重要。


## 安装

### 1. 引入 JS

在包含Summernote后包含以下代码。

```html
<script src="summernote-text-find.js"></script>
```
要从默认语言（en-US）更改语言，您必须在插件后面添加lang文件。

```html
<script src="lang/[language-COUNTRY].js"></script>
```

### 2. 支持语言
目前有英文（默认）、中文（繁体）版本！

### 3. Summernote 选项
Finally, customize the Summernote image popover.

````javascript
$(document).ready(function() {
  $('#summernote').summernote({
        lang: 'en-US', // 更改为您选择的语言 
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']],
          ['findtxt', ['findtxt']] // 添加这个按钮
    ]
  });
});
````

## 特性

1. 支持选中文字快捷输入搜索
2. 支持搜索文字高亮
3. 支持上一个，下一个跳转
4. 支持进度条显示
5. 支持统计显示



## 界面预览

![image-20241023111103332](https://nas.mrf.ink:10001/images/2024/10/23/image-20241023111103332.png)
