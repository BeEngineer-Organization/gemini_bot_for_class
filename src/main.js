// パッケージの追加
import { APIKEY } from "./env.js";

// DOM 要素や状態を管理するオブジェクト
const elements = {
  sendBox: null,
  messageContainer: null,
  addBtn: null,
  cameraBtn: null,
  imageBtn: null,
  arrowBtn: null,
  micBtn: null,
  sendBtn: null,
  nowTime: null,
  isComposing: false
};

/**
 * 各種 DOM 要素を取得し、 elements オブジェクトに格納する
 */
function initializeElements() {
  elements.sendBox = document.querySelector("#input");
  elements.messageContainer = document.querySelector("#main_container");
  elements.addBtn = document.querySelector("#add_btn");
  elements.cameraBtn = document.querySelector("#camera_btn");
  elements.imageBtn = document.querySelector("#image_btn");
  elements.arrowBtn = document.querySelector("#arrow_btn");
  elements.micBtn = document.querySelector("#mic_btn");
  elements.sendBtn = document.querySelector("#send_btn");
  elements.nowTime = document.querySelector(".message__time#now_time");
}

/**
 * イベントリスナーの登録
 */
function initializeEvents() {
  elements.sendBox.addEventListener("input", toggleMicSendButton);
  elements.sendBox.addEventListener("compositionstart", () => {
    elements.isComposing = true;
  });
  elements.sendBox.addEventListener("compositionend", () => {
    elements.isComposing = false;
  });
  elements.sendBox.addEventListener("keydown", handleEnterKey);
  elements.sendBox.addEventListener("focus", () => toggleInputLeftBtn(true));
  elements.sendBox.addEventListener("blur", () => toggleInputLeftBtn(false));
}

// Gemini にデモでリクエストを送信する
async function exampleSendToGemini(message) {}

/**
 * Gemini にメッセージを送信し、レスポンスを取得する
 * @param {string} message
 */
async function sendToGemini(message) {}

/**
 * 新しいメッセージを作成し、メッセージコンテナに追加する
 * @param {string} content - メッセージ内容
 * @param {string} time - メッセージの送信時刻
 * @param {boolean} [isFromMe=true] - メッセージがユーザーからのものであるかどうか
 */
function createMessage(content, time, isFromMe = true) {}

/**
 * メッセージコンテナをボトムまでスクロールする
 * @param {HTMLElement} target - スクロール対象の要素
 */
function scrollToBottom(target) {
  elements.messageContainer.scrollTop = elements.messageContainer.scrollHeight;
  const targetPosition = target.offsetTop;
  const offset = window.innerHeight * 0.3;
  elements.messageContainer.scrollTop = targetPosition - offset;
}

/**
 * 入力ボックスの値に応じてマイクボタンと送信ボタンの表示を切り替える
 */
function toggleMicSendButton() {
  const sendBoxValue = elements.sendBox.value;
  if (sendBoxValue.trim() === "") {
    elements.micBtn.classList.remove("hidden");
    elements.sendBtn.classList.add("hidden");
  } else {
    elements.micBtn.classList.add("hidden");
    elements.sendBtn.classList.remove("hidden");
  }
}

/**
 * 入力ボックスのフォーカス状態に応じてボタンの表示を切り替える
 */
function toggleInputLeftBtn(isFocused) {
  const notFocusBtns = [elements.addBtn, elements.cameraBtn, elements.imageBtn];
  if (isFocused) {
    notFocusBtns.forEach((btn) => {
      btn.classList.add("hidden");
    });
    elements.arrowBtn.classList.remove("hidden");
  } else {
    notFocusBtns.forEach((btn) => {
      btn.classList.remove("hidden");
    });
    elements.arrowBtn.classList.add("hidden");
  }
}

/**
 * 入力欄の内容をもとにメッセージを送信する
 */
async function sendMessage() {
  const content = elements.sendBox.value.trim();
  if (content !== "") {
    elements.sendBox.value = "";
    toggleMicSendButton();
  }
}

/**
 * 現在の時刻を HH:MM 形式で返す
 * @returns {string} フォーマットされた時刻文字列
 */
function getFormattedTime() {}

/**
 * Enter キーが押されたらメッセージを送信
 * @param {KeyboardEvent} e
 */
function handleEnterKey(e) {
  if (e.key === "Enter" && !elements.isComposing) {
    e.preventDefault();
    sendMessage();
  }
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  initializeElements();
  initializeEvents();
  // 現在時刻を表示
  if (elements.nowTime) {
    elements.nowTime.innerHTML = getFormattedTime();
  }
  // Gemini にデモでリクエストを送信する関数を実行する
});