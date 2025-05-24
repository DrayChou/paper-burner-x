// chatbot-preset.js


/**
 * @const {Array<string>} PRESET_QUESTIONS
 * 预设问题列表，用于在聊天机器人界面快速提问。
 * 这些问题通常是针对当前文档内容的常见查询。
 */

const PRESET_QUESTIONS = [
  '总结本文', '有哪些关键公式？', '研究背景与意义？', '研究方法及发现？',
  '应用与前景？', '用通俗语言解释全文', '生成思维导图🧠', '生成流程图🔄'
];

/**
 * 处理预设问题的点击事件。
 * 当用户点击一个预设问题时，此函数会将问题文本填充到聊天输入框，
 * 并尝试调用全局的 `window.handleChatbotSend` 函数来发送消息。
 *
 * @param {string} q被点击的预设问题文本。
 */
function handlePresetQuestion(q) {
  const input = document.getElementById('chatbot-input');
  if (!input) return;
  let sendText = q;
  if (q.includes('流程图')) {
    sendText += `
请用Mermaid语法输出流程图，节点用[]包裹，箭头用-->连接。
- 每一条流程图语句必须单独一行，不能多条语句写在一行。
- 节点内容必须全部在一行内，不能有任何换行、不能有 <br>、不能有 \\n。
- 不允许在节点内容中出现任何 HTML 标签或特殊符号，只能用纯文本和英文括号。
- **每个节点都必须有连线，不能有孤立节点。**
- 如果文档内容有分支、并行、循环等，请在流程图中体现出来，不要只画一条直线。
- 如需使用subgraph，必须严格遵守Mermaid语法，subgraph必须单独一行，内容缩进，最后用end结束。
- 只输出代码块，不要解释，不要输出除代码块以外的任何内容。
- 例如：
\`\`\`mermaid
graph TD
A[开始] --> B{条件判断}
B -- 是 --> C[处理1]
B -- 否 --> D[处理2]
subgraph 参与者流程
  C --> E[结束]
  D --> E
end
\`\`\`
`;
  }
  input.value = sendText;
  if (typeof window.handleChatbotSend === 'function') {
    window.handleChatbotSend();
  }
}

window.ChatbotPreset = {
  PRESET_QUESTIONS,
  handlePresetQuestion
};