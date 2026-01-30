// 单词数据库，按难度级别分类
const wordDatabase = {
  cet4: [  // 四级词汇
    {
      english: "hello",
      phonetic: "/həˈloʊ/",
      chinese: "你好",
      explanation: "used as a greeting or to begin a telephone conversation",
      example: "Hello, how are you today?",
      exampleChinese: "你好，今天怎么样？"
    },
    {
      english: "water",
      phonetic: "/ˈwɔːtər/",
      chinese: "水",
      explanation: "a colourless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain",
      example: "We need to drink enough water every day.",
      exampleChinese: "我们需要每天喝足够的水。"
    },
    {
      english: "book",
      phonetic: "/bʊk/",
      chinese: "书",
      explanation: "a written or printed work consisting of pages glued or sewn together",
      example: "She borrowed a book from the library.",
      exampleChinese: "她从图书馆借了一本书。"
    },
    {
      english: "time",
      phonetic: "/taɪm/",
      chinese: "时间",
      explanation: "the indefinite continued progress of existence and events",
      example: "Time flies when you're having fun.",
      exampleChinese: "时光飞逝，快乐时总是过得很快。"
    },
    {
      english: "people",
      phonetic: "/ˈpipəl/",
      chinese: "人们，人民",
      explanation: "human beings in general or considered collectively",
      example: "Many people enjoy traveling.",
      exampleChinese: "许多人喜欢旅行。"
    },
    {
      english: "way",
      phonetic: "/weɪ/",
      chinese: "路，方式",
      explanation: "a method, style, or manner of doing something",
      example: "Is there another way to solve this problem?",
      exampleChinese: "还有其他方法解决这个问题吗？"
    },
    {
      english: "day",
      phonetic: "/deɪ/",
      chinese: "天，白天",
      explanation: "the twenty-four-hour period, reckoned from one midnight to the next",
      example: "It was a beautiful sunny day.",
      exampleChinese: "那是个美丽的晴天。"
    },
    {
      english: "man",
      phonetic: "/mæn/",
      chinese: "男人，人类",
      explanation: "an adult male human being",
      example: "Every man has his own story.",
      exampleChinese: "每个人都有自己的故事。"
    },
    {
      english: "work",
      phonetic: "/wɜːrk/",
      chinese: "工作，劳动",
      explanation: "activity involving mental or physical effort done in order to achieve a purpose or result",
      example: "She goes to work by bus every morning.",
      exampleChinese: "她每天早上坐公交车去上班。"
    },
    {
      english: "life",
      phonetic: "/laɪf/",
      chinese: "生命，生活",
      explanation: "the existence of an individual human being or animal",
      example: "Life is what happens when you're busy making other plans.",
      exampleChinese: "生活就是当你忙于制定其他计划时发生的事情。"
    }
  ],
  cet6: [  // 六级词汇
    {
      english: "analyze",
      phonetic: "/ˈænəlaɪz/",
      chinese: "分析，研究",
      explanation: "to examine methodically",
      example: "Scientists analyzed the data carefully.",
      exampleChinese: "科学家仔细分析了数据。"
    },
    {
      english: "beneficial",
      phonetic: "/ˌbenɪˈfɪʃl/",
      chinese: "有益的，有利的",
      explanation: "resulting in good; advantageous or favorable",
      example: "Regular exercise is beneficial to health.",
      exampleChinese: "定期锻炼对健康有益。"
    },
    {
      english: "consequence",
      phonetic: "/ˈkɒnsɪkwəns/",
      chinese: "结果，后果",
      explanation: "a result or effect, typically one that is unwelcome or unpleasant",
      example: "He didn't consider the consequences of his actions.",
      exampleChinese: "他没有考虑自己行为的后果。"
    },
    {
      english: "demonstrate",
      phonetic: "/ˈdemənstreɪt/",
      chinese: "证明，展示",
      explanation: "to clearly show the truth or existence of something",
      example: "The experiment demonstrates the theory.",
      exampleChinese: "实验证明了这一理论。"
    },
    {
      english: "establish",
      phonetic: "/ɪˈstæblɪʃ/",
      chinese: "建立，确立",
      explanation: "to set up on a firm or permanent basis",
      example: "They established a new company last year.",
      exampleChinese: "他们去年建立了一家新公司。"
    },
    {
      english: "significant",
      phonetic: "/sɪɡˈnɪfɪkənt/",
      chinese: "重要的，显著的",
      explanation: "sufficiently great or important to be worthy of attention",
      example: "There was a significant increase in sales.",
      exampleChinese: "销售额有显著增长。"
    },
    {
      english: "obtain",
      phonetic: "/əbˈteɪn/",
      chinese: "获得，得到",
      explanation: "to get, acquire, or secure",
      example: "Students can obtain books from the library.",
      exampleChinese: "学生可以从图书馆获得书籍。"
    },
    {
      english: "potential",
      phonetic: "/pəˈtenʃl/",
      chinese: "潜力，潜能",
      explanation: "having or showing the capacity to develop into something in the future",
      example: "She has potential to become a great leader.",
      exampleChinese: "她有成为伟大领导者的潜力。"
    },
    {
      english: "achieve",
      phonetic: "/əˈtʃiːv/",
      chinese: "实现，达到",
      explanation: "successfully bring about or reach (a desired objective)",
      example: "Through hard work, he achieved his goals.",
      exampleChinese: "通过努力工作，他实现了目标。"
    },
    {
      english: "maintain",
      phonetic: "/meɪnˈteɪn/",
      chinese: "维持，维护",
      explanation: "to cause or enable a condition or state to continue",
      example: "It's important to maintain good relationships.",
      exampleChinese: "维持良好的关系很重要。"
    }
  ],
  ielts: [  // 雅思词汇
    {
      english: "comprehensive",
      phonetic: "/ˌkɒmprɪˈhensɪv/",
      chinese: "全面的，综合的",
      explanation: "of large scope; covering much; extensive",
      example: "The report provides a comprehensive analysis of the issue.",
      exampleChinese: "这份报告对这个问题提供了全面的分析。"
    },
    {
      english: "signify",
      phonetic: "/ˈsɪɡnɪfaɪ/",
      chinese: "表示，意味着",
      explanation: "to be a sign or indication of; represent",
      example: "The red light signifies danger.",
      exampleChinese: "红灯表示危险。"
    },
    {
      english: "deteriorate",
      phonetic: "/dɪˈtɪəriəreɪt/",
      chinese: "恶化，变坏",
      explanation: "to become worse",
      example: "The patient's condition began to deteriorate.",
      exampleChinese: "病人的状况开始恶化。"
    },
    {
      english: "elaborate",
      phonetic: "/ɪˈlæbəreɪt/",
      chinese: "详述，阐述",
      explanation: "to give more detail; to expand upon",
      example: "Can you elaborate on your proposal?",
      exampleChinese: "你能详细说明一下你的提议吗？"
    },
    {
      english: "implement",
      phonetic: "/ˈɪmplɪment/",
      chinese: "实施，执行",
      explanation: "to put into effect; to carry out",
      example: "They plan to implement the new policy next month.",
      exampleChinese: "他们计划下个月实施新政策。"
    },
    {
      english: "paradox",
      phonetic: "/ˈpærədɒks/",
      chinese: "悖论，矛盾",
      explanation: "a seemingly absurd or self-contradictory statement",
      example: "It's a paradox that less is sometimes more.",
      exampleChinese: "少即是多，这是一个悖论。"
    },
    {
      english: "suppress",
      phonetic: "/səˈpres/",
      chinese: "抑制，镇压",
      explanation: "to end or stop forcibly; to subdue",
      example: "The government tried to suppress the news.",
      exampleChinese: "政府试图压制这条新闻。"
    },
    {
      english: "utilize",
      phonetic: "/ˈjuːtəlaɪz/",
      chinese: "利用，使用",
      explanation: "to make practical or effective use of",
      example: "We should utilize our resources wisely.",
      exampleChinese: "我们应该明智地利用我们的资源。"
    },
    {
      english: "volatile",
      phonetic: "/ˈvɒlətaɪl/",
      chinese: "易变的，挥发性的",
      explanation: "liable to change rapidly and unpredictably, especially for the worse",
      example: "The stock market has been very volatile lately.",
      exampleChinese: "股市最近波动很大。"
    },
    {
      english: "ambiguous",
      phonetic: "/æmˈbɪɡjuəs/",
      chinese: "模糊的，含糊的",
      explanation: "open to more than one interpretation; not clear",
      example: "His answer was ambiguous and didn't clarify the issue.",
      exampleChinese: "他的回答很含糊，没有阐明这个问题。"
    }
  ]
};

// 获取指定级别的单词
function getWordsByLevel(level) {
  return wordDatabase[level] || [];
}

// 随机获取一个单词
function getRandomWord(level) {
  const words = getWordsByLevel(level);
  if (words.length === 0) return null;
  return words[Math.floor(Math.random() * words.length)];
}

// 获取所有单词级别
function getAllLevels() {
  return Object.keys(wordDatabase);
}

// 根据英语单词查找详细信息
function lookupEnglishWord(word) {
  for (const level in wordDatabase) {
    const foundWord = wordDatabase[level].find(w => 
      w.english.toLowerCase() === word.toLowerCase());
    if (foundWord) {
      return {...foundWord, level};
    }
  }
  return null;
}

// 根据中文查找详细信息
function lookupChineseWord(chinese) {
  for (const level in wordDatabase) {
    const foundWord = wordDatabase[level].find(w => 
      w.chinese.includes(chinese));
    if (foundWord) {
      return {...foundWord, level};
    }
  }
  return null;
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    wordDatabase,
    getWordsByLevel,
    getRandomWord,
    getAllLevels,
    lookupEnglishWord,
    lookupChineseWord
  };
}