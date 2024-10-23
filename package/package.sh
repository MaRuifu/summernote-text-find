#!/bin/bash  
  
# 定义JAR版本  
JAR_FILE_VERSION="v20240317"   
# 定义JAR文件名和版本  
JAR_FILE="closure-compiler-${JAR_FILE_VERSION}.jar"
# 定义Maven仓库的基础路径（不包括JAR文件名）  
MAVEN_REPO_BASE="https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/${JAR_FILE_VERSION}/"  
# 通过拼接基础路径和JAR文件名来构建完整的下载URL  
DOWNLOAD_URL="${MAVEN_REPO_BASE}${JAR_FILE}"  
# 定义输入和输出文件  
INPUT_JS="../summernote-text-find.js"  
OUTPUT_JS="../summernote-text-find-min.js"  
SOURCE_MAP="../summernote-text-find-min.map"  
  
# 检查JAR文件是否存在  
if [ ! -f "$JAR_FILE" ]; then  
  echo "JAR文件不存在，开始下载..."  
  wget "$DOWNLOAD_URL" -O "$JAR_FILE"  
  if [ $? -ne 0 ]; then  
    echo "下载JAR文件失败，请检查网络连接或URL是否正确。"  
    exit 1  
  fi  
  echo "下载完成。"  
else  
  echo "JAR文件已存在，无需下载。"  
fi  
  
# 执行Closure Compiler  
echo "开始压缩JavaScript文件..."  

java -jar "$JAR_FILE" \
  --js "$INPUT_JS" \
  --create_source_map "$SOURCE_MAP" \
  --source_map_format=V3 \
  --js_output_file "$OUTPUT_JS"

  
# 检查命令是否成功执行  
if [ $? -ne 0 ]; then  
  echo "压缩JavaScript文件失败，请检查输入文件和JAR文件是否正确。"  
  exit 1  
fi  
  
echo "压缩完成，输出文件：$OUTPUT_JS 和 源代码映射文件：$SOURCE_MAP"