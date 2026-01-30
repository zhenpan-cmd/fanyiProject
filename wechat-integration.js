/**
 * 企业微信集成模块
 * 将单词学习进度与企业微信机器人集成
 */

const WeChatRobot = require('./wechat-robot.js');

class WordLearningWeChatIntegration {
  constructor(webhookUrl) {
    this.robot = new WeChatRobot(webhookUrl);
    this.learningStats = {
      dailyGoal: 20, // 每日目标单词数
      learnedToday: 0, // 今日已学单词数
      masteredWords: [], // 已掌握单词
      streakDays: 0, // 连续学习天数
      totalWords: 0 // 总学习单词数
    };
  }

  /**
   * 发送每日学习报告
   */
  async sendDailyReport() {
    const reportContent = `
# 📚 今日单词学习报告
## 学习统计
- **今日目标**: ${this.learningStats.dailyGoal} 个单词
- **已完成**: ${this.learningStats.learnedToday} 个单词
- **掌握率**: ${this.learningStats.learnedToday > 0 ? Math.round((this.masteredWords.length / this.learningStats.learnedToday) * 100) : 0}%
- **连续学习**: ${this.learningStats.streakDays} 天
- **累计学习**: ${this.learningStats.totalWords} 个单词

## 学习建议
继续保持良好的学习习惯，每天进步一点点！
    `;

    try {
      const result = await this.robot.sendMarkdown(reportContent);
      console.log('每日报告发送成功:', result);
      return result;
    } catch (error) {
      console.error('发送每日报告失败:', error);
      throw error;
    }
  }

  /**
   * 发送单词掌握提醒
   * @param {Object} wordData - 单词数据
   */
  async sendWordMasteredNotification(wordData) {
    const content = `
🎉 恭喜掌握新单词！
【${wordData.english}】 /${wordData.phonetic}/
含义：${wordData.chinese}
例句：${wordData.example || '暂无例句'}
    `.trim();

    try {
      const result = await this.robot.sendText(content);
      console.log('单词掌握通知发送成功:', result);
      return result;
    } catch (error) {
      console.error('发送单词掌握通知失败:', error);
      throw error;
    }
  }

  /**
   * 发送学习提醒
   */
  async sendLearningReminder() {
    const reminderContent = `
⏰ 学习提醒
该学习今天的单词啦！
坚持每日学习，积累词汇量，提升英语水平。
    `.trim();

    try {
      const result = await this.robot.sendText(reminderContent);
      console.log('学习提醒发送成功:', result);
      return result;
    } catch (error) {
      console.error('发送学习提醒失败:', error);
      throw error;
    }
  }

  /**
   * 更新学习统计数据
   * @param {Object} stats - 学习统计数据
   */
  updateStats(stats) {
    Object.assign(this.learningStats, stats);
  }

  /**
   * 获取当前学习统计数据
   */
  getStats() {
    return this.learningStats;
  }
}

module.exports = WordLearningWeChatIntegration;

// 示例使用
/*
const wechatIntegration = new WordLearningWeChatIntegration('YOUR_WEBHOOK_URL');

// 更新学习统计
wechatIntegration.updateStats({
  learnedToday: 15,
  masteredWords: ['hello', 'world'],
  streakDays: 7,
  totalWords: 150
});

// 发送每日报告
wechatIntegration.sendDailyReport()
  .then(result => console.log('报告发送成功'))
  .catch(err => console.error('发送失败', err));
*/