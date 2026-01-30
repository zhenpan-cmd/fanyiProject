/**
 * 企业微信机器人客户端
 * 用于向企业微信群发送消息
 */

class WeChatRobot {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * 发送文本消息
   * @param {string} content 消息内容
   * @param {Array} mentionedList @用户列表
   * @returns {Promise<Object>} 发送结果
   */
  async sendText(content, mentionedList = []) {
    const data = {
      msgtype: "text",
      text: {
        content: content,
        mentioned_list: mentionedList
      }
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (error) {
      console.error("发送消息失败:", error);
      throw error;
    }
  }

  /**
   * 发送Markdown消息
   * @param {string} content Markdown格式内容
   * @returns {Promise<Object>} 发送结果
   */
  async sendMarkdown(content) {
    const data = {
      msgtype: "markdown",
      markdown: {
        content: content
      }
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (error) {
      console.error("发送Markdown消息失败:", error);
      throw error;
    }
  }

  /**
   * 发送图文消息
   * @param {Array} articles 图文消息数组
   * @returns {Promise<Object>} 发送结果
   */
  async sendNews(articles) {
    const data = {
      msgtype: "news",
      news: {
        articles: articles
      }
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (error) {
      console.error("发送图文消息失败:", error);
      throw error;
    }
  }
}

// 导出类
module.exports = WeChatRobot;

// 示例使用
/*
const robot = new WeChatRobot("YOUR_WEBHOOK_URL");

// 发送文本消息
robot.sendText("Hello, 企业微信机器人!")
  .then(result => console.log(result))
  .catch(err => console.error(err));

// 发送Markdown消息
robot.sendMarkdown("# 标题\n**粗体** 和 *斜体*")
  .then(result => console.log(result))
  .catch(err => console.error(err));
*/