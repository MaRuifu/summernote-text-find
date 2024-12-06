# summernote-text-find

Summernote-text-find plugin
[Summernote](https://github.com/summernote/summernote/) Super Simple WYSIWYG Editor Plugin。



[![License](https://img.shields.io/badge/license-MIT-4EB1BA.svg?style=flat-square)](https://github.com/maruifu/summernote-text-find/blob/main/LICENSE)
[![@xiaomageit on zhihu](https://img.shields.io/badge/zhihu-@xiaomageit-red.svg?style=flat-square)](https://www.zhihu.com/people/xiaomageit)

[中文](README_ZH.md)

## Role

Add a button to the toolbar to find search keywords. This plug-in is especially important when the editor is embedded in the client and does not have the browser's own search function.


## Installation


### 1. Include JS

Include the following code after including Summernote, to change the language from the default (en-US) you must add the lang file after the plugin.
```html
<script src="summernote-text-find.js"></script>
```
```html
<script src="lang/[language-COUNTRY].js"></script>
```

### 2. Supported languages
Currently available in US English (Default),  Chinese (Traditional)!

### 3. Summernote options
Finally, customize the Summernote image popover.

````javascript
$(document).ready(function() {
  $('#summernote').summernote({
        lang: 'en-US', // Change to your chosen language
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']],
          ['findtxt', ['findtxt']] // The Button 
    ]
  });
});
````

## Feature

1. Support quick input of selected text and search
2. Support search text highlighting
3. Support previous and next jumps
4. Support progress bar display
5. Support statistics show 
6. Support shortcut keys to search, previous, next



## Interface Preview

![image-20241023111103332](https://nas.mrf.ink:10001/images/2024/10/23/image-20241023111103332.png)
