# 单词记忆卡片应用

一个简洁的背单词应用，具有中英文互译功能。

## 功能特性

- 单词卡片翻转功能（显示/隐藏翻译）
- 浏览多个单词
- 添加新单词到数据库
- 即时翻译功能（中英文互译）

## 如何启动项目

### 方法一：使用Python内置服务器（推荐）

```bash
# 克隆项目
git clone https://github.com/guanzhenpan/fanyiProject.git
cd fanyiProject

# 启动服务器
python3 -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`

### 方法二：直接打开HTML文件

直接双击 `index.html` 文件即可在浏览器中打开应用（部分功能可能受限）。

### 方法三：使用Node.js服务器

```bash
# 克隆项目
git clone https://github.com/guanzhenpan/fanyiProject.git
cd fanyiProject

# 安装依赖（如果有的话）
npm install

# 启动服务器
node server.js
```

然后在浏览器中访问 `http://localhost:3000`

## 项目结构

- `index.html` - 主页面
- `styles.css` - 样式文件
- `app.js` - 应用逻辑
- `server.js` - Node.js服务器文件

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js (可选)