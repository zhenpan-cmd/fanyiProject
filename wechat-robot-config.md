# 企业微信机器人配置指南

## 如何获取Webhook地址

1. 在企业微信群聊中，点击右上角头像
2. 选择"群机器人"
3. 点击"添加机器人"
4. 选择"自定义"
5. 输入机器人名称并点击"添加"
6. 复制生成的Webhook地址

**注意：Webhook地址包含敏感信息，请妥善保管**

## 使用方法

### 1. 基本配置

```javascript
const WeChatRobot = require('./wechat-robot.js');
const robot = new WeChatRobot('YOUR_WEBHOOK_URL_HERE');
```

### 2. 发送文本消息

```javascript
// 发送普通文本
await robot.sendText('Hello, 企业微信机器人!');

// 发送并@指定用户
await robot.sendText('请处理此任务', ['UserID1', 'UserID2']);
```

### 3. 发送Markdown消息

```javascript
const markdownContent = `
# 单词学习进度报告
## 今日学习统计
- **学习单词数**: 20个
- **掌握单词数**: 15个
- **待复习**: 5个
`;

await robot.sendMarkdown(markdownContent);
```

### 4. 发送图文消息

```javascript
const articles = [{
  title: "新功能上线",
  description: "单词记忆卡片应用新增企业微信集成",
  url: "https://your-app-url.com",
  picurl: "https://your-app-url.com/icon.png"
}];

await robot.sendNews(articles);
```

## 集成到单词记忆卡片应用

您可以将企业微信机器人集成到现有的单词记忆卡片应用中，实现：

1. **学习进度推送** - 定期推送学习进度
2. **打卡提醒** - 每日学习提醒
3. **成就通知** - 达成学习目标时通知
4. **团队竞赛** - 团队学习排名通知

## 安全注意事项

- Webhook地址有效期为永久，但出于安全考虑，建议定期更换
- 不要在公开代码库中暴露Webhook地址
- 限制机器人的使用范围，避免滥用
- 遵循企业微信API频率限制（每个机器人每分钟最多发送20条消息）