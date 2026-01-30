/**
 * 企业微信集成演示
 * 使用您提供的Webhook地址
 */

const WordLearningWeChatIntegration = require('./wechat-integration.js');
const config = require('./config/wechat-config.json');

// 使用您提供的Webhook地址初始化集成
const wechatIntegration = new WordLearningWeChatIntegration(
  config.wechatRobot.webhookUrl
);

// 模拟一些学习数据
const mockLearningData = {
  dailyGoal: 20,
  learnedToday: 15,
  masteredWords: ['hello', 'world', 'computer', 'book', 'study'],
  streakDays: 7,
  totalWords: 150
};

// 更新统计数据
wechatIntegration.updateStats(mockLearningData);

console.log('正在发送每日学习报告到企业微信群...');

// 发送每日学习报告
async function sendDemoReport() {
  try {
    await wechatIntegration.sendDailyReport();
    console.log('✅ 每日学习报告已发送到企业微信群');
    
    // 发送单词掌握通知示例
    const sampleWord = {
      english: 'artificial',
      phonetic: '/ˌɑːrtɪˈfɪʃl/',
      chinese: '人工的；艺术品的',
      example: 'Artificial intelligence is transforming industries.'
    };
    
    console.log('正在发送单词掌握通知...');
    await wechatIntegration.sendWordMasteredNotification(sampleWord);
    console.log('✅ 单词掌握通知已发送到企业微信群');
  } catch (error) {
    console.error('❌ 发送消息失败:', error);
  }
}

// 执行演示
sendDemoReport();

// 如果需要设置定时任务，可以使用以下代码：
/*
const cron = require('node-cron');

// 每天早上9点发送学习提醒
cron.schedule('0 9 * * *', async () => {
  await wechatIntegration.sendLearningReminder();
});

// 每天晚上6点发送日报
cron.schedule('0 18 * * *', async () => {
  await wechatIntegration.sendDailyReport();
});
*/