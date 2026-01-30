// 当前单词索引和级别
let currentIndex = 0;
let currentLevel = 'cet4'; // 默认为四级词汇
let currentWords = [];

// DOM元素
const flashcard = document.getElementById('flashcard');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');
const wordDisplay = document.getElementById('wordDisplay');
const translationDisplay = document.getElementById('translationDisplay');
const flipBtn = document.getElementById('flipBtn');
const nextBtn = document.getElementById('nextBtn');
const addBtn = document.getElementById('addBtn');
const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapBtn');
const translationResult = document.getElementById('translationResult');
const modal = document.getElementById('addWordModal');
const closeBtn = document.querySelector('.close');
const chineseInput = document.getElementById('chineseInput');
const englishInput = document.getElementById('englishInput');
const saveWordBtn = document.getElementById('saveWordBtn');
const levelSelector = document.getElementById('levelSelector');

// 根据当前级别获取单词
function loadWordsForLevel(level) {
    currentWords = getWordsByLevel(level) || [];
    if (currentWords.length > 0) {
        currentIndex = 0;
        showCurrentWord();
    } else {
        wordDisplay.textContent = "该级别暂无单词";
        translationDisplay.textContent = "请选择其他级别";
    }
}

// 显示当前单词（带详细信息）
function showCurrentWord() {
    if (currentWords.length === 0) {
        wordDisplay.textContent = "该级别暂无单词";
        translationDisplay.textContent = "请选择其他级别";
        cardBack.style.display = 'none';
        flashcard.classList.remove('flipped');
        return;
    }
    
    const currentWord = currentWords[currentIndex];
    
    // 显示英文单词
    wordDisplay.textContent = currentWord.english;
    
    // 构建详细翻译信息，包含音标和多条例句
    let examplesHtml = '';
    if (currentWord.example) {
        examplesHtml += `<div class="example"><strong>例句1:</strong> ${currentWord.example}</div>`;
        if (currentWord.exampleChinese) {
            examplesHtml += `<div class="example-chinese">${currentWord.exampleChinese}</div>`;
        }
    }
    if (currentWord.example2) {
        examplesHtml += `<div class="example"><strong>例句2:</strong> ${currentWord.example2}</div>`;
        if (currentWord.exampleChinese2) {
            examplesHtml += `<div class="example-chinese">${currentWord.exampleChinese2}</div>`;
        }
    }
    if (currentWord.example3) {
        examplesHtml += `<div class="example"><strong>例句3:</strong> ${currentWord.example3}</div>`;
        if (currentWord.exampleChinese3) {
            examplesHtml += `<div class="example-chinese">${currentWord.exampleChinese3}</div>`;
        }
    }
    
    const detailedInfo = `
        <div class="translation-details">
            <div class="word-header">
                <span class="word">${currentWord.english}</span>
                <span class="phonetic">/${currentWord.phonetic}/</span>
            </div>
            <div class="chinese">${currentWord.chinese}</div>
            <div class="explanation"><strong>释义:</strong> ${currentWord.explanation}</div>
            <div class="examples">
                ${examplesHtml || '<div class="example">暂无例句</div>'}
            </div>
        </div>
    `;
    
    translationDisplay.innerHTML = detailedInfo;
    cardBack.style.display = 'none';
    flashcard.classList.remove('flipped');
    flipBtn.textContent = '📖 查看详情';
}

// 翻转卡片
function flipCard() {
    flashcard.classList.toggle('flipped');
    if (flashcard.classList.contains('flipped')) {
        cardBack.style.display = 'flex';
        flipBtn.textContent = '◀ 返回单词';
    } else {
        cardBack.style.display = 'none';
        flipBtn.textContent = '📖 查看详情';
    }
}

// 下一个单词
function nextWord() {
    if (currentWords.length === 0) return;
    
    currentIndex = (currentIndex + 1) % currentWords.length;
    showCurrentWord();
    flashcard.classList.remove('flipped');
    cardBack.style.display = 'none';
    flipBtn.textContent = '📖 查看详情';
}

// 翻译函数
function translateText(text) {
    // 尝试查找词汇库中的单词
    const englishWord = lookupEnglishWord(text.trim());
    if (englishWord) {
        return `
            <div class="translation-details">
                <div class="word-header">
                    <span class="word">${englishWord.english}</span>
                    <span class="phonetic">${englishWord.phonetic}</span>
                </div>
                <div class="chinese">${englishWord.chinese}</div>
                <div class="explanation"><strong>释义:</strong> ${englishWord.explanation}</div>
                <div class="example"><strong>例句:</strong> ${englishWord.example}</div>
                <div class="example-chinese">${englishWord.exampleChinese}</div>
                <div class="level">词汇级别: ${getLevelName(englishWord.level)}</div>
            </div>
        `;
    }
    
    const chineseWord = lookupChineseWord(text.trim());
    if (chineseWord) {
        return `
            <div class="translation-details">
                <div class="word-header">
                    <span class="word">${chineseWord.english}</span>
                    <span class="phonetic">${chineseWord.phonetic}</span>
                </div>
                <div class="chinese">${chineseWord.chinese}</div>
                <div class="explanation"><strong>释义:</strong> ${chineseWord.explanation}</div>
                <div class="example"><strong>例句:</strong> ${chineseWord.example}</div>
                <div class="example-chinese">${chineseWord.exampleChinese}</div>
                <div class="level">词汇级别: ${getLevelName(chineseWord.level)}</div>
            </div>
        `;
    }
    
    // 如果没找到，返回提示信息
    return `未能找到"${text}"的相关信息。请尝试其他词汇。`;
}

// 翻译功能
function performTranslation() {
    const text = inputText.value.trim();
    if (!text) {
        translationResult.textContent = "请输入要翻译的文本";
        return;
    }
    
    const translation = translateText(text);
    // 修复编码问题，使用标准ASCII字符
    translationResult.innerHTML = '<strong>查询:</strong> ' + text + '<hr>' + translation;
}

// 交换输入框内容
function swapLanguages() {
    const currentInput = inputText.value;
    if (currentInput) {
        // 简单判断语言并尝试转换
        if (currentInput.match(/[\u4e00-\u9fa5]/)) {
            // 如果输入是中文，尝试查找英文
            const wordInfo = lookupChineseWord(currentInput);
            if (wordInfo) {
                inputText.value = wordInfo.english;
            } else {
                inputText.value = `未找到"${currentInput}"的英文对应词`;
            }
        } else {
            // 如果输入是英文，尝试查找中文
            const wordInfo = lookupEnglishWord(currentInput);
            if (wordInfo) {
                inputText.value = wordInfo.chinese;
            } else {
                inputText.value = `未找到"${currentInput}"的中文翻译`;
            }
        }
    }
}

// 显示添加单词模态框
function showAddWordModal() {
    modal.style.display = 'block';
    chineseInput.value = '';
    englishInput.value = '';
}

// 关闭模态框
function closeModal() {
    modal.style.display = 'none';
}

// 保存新单词
function saveNewWord() {
    const chinese = chineseInput.value.trim();
    const english = englishInput.value.trim();
    
    if (!chinese || !english) {
        alert('请填写中文和英文单词');
        return;
    }
    
    // 在实际应用中，这里会将单词添加到当前级别
    // 为简化，暂时只显示提示
    alert(`新单词已添加:\n英文: ${english}\n中文: ${chinese}\n\n(实际应用中会保存到${getLevelName(currentLevel)}词汇库)`);
    closeModal();
}

// 切换词汇级别
function changeLevel(newLevel) {
    // 移除旧的主题类
    document.body.classList.remove('cet4-theme', 'cet6-theme', 'ielts-theme');
    
    // 根据新级别添加对应的主题类
    document.body.classList.add(newLevel + '-theme');
    
    // 更新当前级别
    currentLevel = newLevel;
    loadWordsForLevel(newLevel);
    
    // 添加视觉反馈效果
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.3s ease';
    container.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 300);
}

// 获取级别名称
function getLevelName(level) {
    switch(level) {
        case 'cet4': return '四级';
        case 'cet6': return '六级';
        case 'ielts': return '雅思';
        default: return '未知';
    }
}

// 事件监听器
flipBtn.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextWord);
addBtn.addEventListener('click', showAddWordModal);
closeBtn.addEventListener('click', closeModal);
saveWordBtn.addEventListener('click', saveNewWord);
translateBtn.addEventListener('click', performTranslation);
swapBtn.addEventListener('click', swapLanguages);

// 级别选择器事件
levelSelector.addEventListener('change', (e) => {
    changeLevel(e.target.value);
});

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// 微信分享功能支持
function setupWeChatShare() {
    // 这里可以集成微信JS-SDK进行分享配置
    // 仅在微信环境中有效
    if (typeof WeixinJSBridge !== 'undefined') {
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            // 分享给朋友
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": "",
                "img_width": "120",
                "img_height": "120",
                "link": window.location.href,
                "desc": "单词记忆卡片 - 提升你的词汇量",
                "title": "单词记忆卡片"
            }, function(res) {
                // 分享回调
            });
        });
        
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            // 分享到朋友圈
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": "",
                "img_width": "120",
                "img_height": "120",
                "link": window.location.href,
                "desc": "单词记忆卡片 - 提升你的词汇量",
                "title": "单词记忆卡片"
            }, function(res) {
                // 分享回调
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化默认级别词汇
    loadWordsForLevel('cet4');
    
    // 添加初始主题类
    document.body.classList.add('cet4-theme');
    
    // 设置微信分享
    setupWeChatShare();
    
    // 添加移动端触摸支持
    addTouchSupport();
});

// 添加触摸支持
function addTouchSupport() {
    const flipButton = document.getElementById('flipBtn');
    const nextButton = document.getElementById('nextBtn');
    
    // 为移动端添加触摸反馈
    if ('ontouchstart' in window) {
        [flipButton, nextButton].forEach(button => {
            if (button) {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                    // 延迟恢复，提供更好的触感反馈
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            }
        });
    }
}