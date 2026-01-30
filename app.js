// 单词数据库
let wordDatabase = [
    { chinese: "你好", english: "hello" },
    { chinese: "谢谢", english: "thank you" },
    { chinese: "是", english: "yes" },
    { chinese: "否", english: "no" },
    { chinese: "水", english: "water" },
    { chinese: "食物", english: "food" },
    { chinese: "猫", english: "cat" },
    { chinese: "狗", english: "dog" },
    { chinese: "书", english: "book" },
    { chinese: "学校", english: "school" },
    { chinese: "老师", english: "teacher" },
    { chinese: "学生", english: "student" },
    { chinese: "朋友", english: "friend" },
    { chinese: "家庭", english: "family" },
    { chinese: "爱", english: "love" },
    { chinese: "时间", english: "time" },
    { chinese: "房子", english: "house" },
    { chinese: "汽车", english: "car" },
    { chinese: "电话", english: "phone" },
    { chinese: "电脑", english: "computer" },
    { chinese: "互联网", english: "internet" },
    { chinese: "学习", english: "study" },
    { chinese: "工作", english: "work" },
    { chinese: "快乐", english: "happy" },
    { chinese: "悲伤", english: "sad" }
];

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

// 当前单词索引
let currentIndex = 0;

// 显示当前单词
function showCurrentWord() {
    if (wordDatabase.length === 0) {
        wordDisplay.textContent = "还没有单词，请添加一些";
        translationDisplay.textContent = "";
        cardBack.style.display = 'none';
        flashcard.classList.remove('flipped');
        return;
    }
    
    const currentWord = wordDatabase[currentIndex];
    wordDisplay.textContent = currentWord.english;
    translationDisplay.textContent = currentWord.chinese;
    cardBack.style.display = 'none';
    flashcard.classList.remove('flipped');
}

// 翻转卡片
function flipCard() {
    flashcard.classList.toggle('flipped');
    if (flashcard.classList.contains('flipped')) {
        cardBack.style.display = 'flex';
        flipBtn.textContent = '隐藏翻译';
    } else {
        flipBtn.textContent = '显示翻译';
    }
}

// 下一个单词
function nextWord() {
    if (wordDatabase.length === 0) return;
    
    currentIndex = (currentIndex + 1) % wordDatabase.length;
    showCurrentWord();
}

// 简单翻译函数（基于数据库和一些规则）
function translateText(text) {
    // 首先检查是否在数据库中有对应翻译
    const foundWord = wordDatabase.find(item => 
        item.english.toLowerCase().includes(text.trim().toLowerCase()) || 
        item.chinese.includes(text.trim())
    );
    
    if (foundWord) {
        if (text.trim().match(/[\u4e00-\u9fa5]/)) {
            // 输入的是中文，返回英文
            return foundWord.english;
        } else {
            // 输入的是英文，返回中文
            return foundWord.chinese;
        }
    }
    
    // 如果数据库中没有，则提供一些基本翻译规则
    // 这里只是一个模拟，实际应用中可以集成API
    if (text.trim().match(/[\u4e00-\u9fa5]/)) {
        // 中文输入，返回英文翻译提示
        return `[暂无翻译] "${text}" 的英文可能是... (这是一个示例应用，实际翻译需集成API)`;
    } else {
        // 英文输入，返回中文翻译提示
        return `[暂无翻译] "${text}" 的中文意思是... (这是一个示例应用，实际翻译需集成API)`;
    }
}

// 翻译功能
function performTranslation() {
    const text = inputText.value.trim();
    if (!text) {
        translationResult.textContent = "请输入要翻译的文本";
        return;
    }
    
    const translation = translateText(text);
    translationResult.innerHTML = `<strong>原文:</strong> ${text}<br><strong>翻译:</strong> ${translation}`;
}

// 交换输入框内容（模拟功能）
function swapLanguages() {
    const currentInput = inputText.value;
    // 这里只是一个模拟，实际应用中可以根据上下文智能切换
    if (currentInput) {
        // 简单的模拟：如果输入包含中文字符，则假设是中译英；否则是英译中
        if (currentInput.match(/[\u4e00-\u9fa5]/)) {
            // 如果输入是中文，尝试查找对应的英文
            const translated = translateText(currentInput);
            inputText.value = translated.replace(/\[.+\]/g, '').trim();
        } else {
            // 如果输入是英文，尝试查找对应的中文
            const translated = translateText(currentInput);
            inputText.value = translated.replace(/\[.+\]/g, '').trim();
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
    
    // 检查是否已存在
    const exists = wordDatabase.some(word => 
        word.chinese === chinese || word.english.toLowerCase() === english.toLowerCase()
    );
    
    if (exists) {
        alert('单词已存在！');
        return;
    }
    
    wordDatabase.push({ chinese, english });
    alert('单词添加成功！');
    closeModal();
    
    // 更新显示
    currentIndex = wordDatabase.length - 1;
    showCurrentWord();
}

// 事件监听器
flipBtn.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextWord);
addBtn.addEventListener('click', showAddWordModal);
closeBtn.addEventListener('click', closeModal);
saveWordBtn.addEventListener('click', saveNewWord);
translateBtn.addEventListener('click', performTranslation);
swapBtn.addEventListener('click', swapLanguages);

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    showCurrentWord();
});