// パッケージの追加
import { APIKEY } from "./env.js";

/**
 * メッセージの操作と UI 更新を管理するクラス
 */
class MessageManager {
    constructor() {
        this.initializeElements();
        this.isComposing = false;
        this.initializeEvents();
        document.querySelector(".message__time#now_time").innerHTML =
            this.getFormattedTime();
    }

    /**
     * クラスで使用する DOM 要素を初期化する
     */
    initializeElements() {
        this.sendBox = document.querySelector("#input");
        this.messageContainer = document.querySelector("#main_container");
        this.addBtn = document.querySelector("#add_btn");
        this.cameraBtn = document.querySelector("#camera_btn");
        this.imageBtn = document.querySelector("#image_btn");
        this.arrowBtn = document.querySelector("#arrow_btn");
        this.micBtn = document.querySelector("#mic_btn");
        this.sendBtn = document.querySelector("#send_btn");
    }

    /**
     * 各 UI 要素にイベントリスナーを設定する
     */
    initializeEvents() {
        this.sendBox.addEventListener("input", () =>
            this.toggleMicSendButton()
        );
        this.sendBox.addEventListener(
            "compositionstart",
            () => (this.isComposing = true)
        );
        this.sendBox.addEventListener(
            "compositionend",
            () => (this.isComposing = false)
        );
        this.sendBox.addEventListener("keydown", (e) => this.handleEnterKey(e));
        this.sendBox.addEventListener("focus", () =>
            this.toggleInputLeftBtn(true)
        );
        this.sendBox.addEventListener("blur", () =>
            this.toggleInputLeftBtn(false)
        );
    }

    /**
     * メッセージコンテナをボトムまでスクロールする
     * @param {HTMLElement} target - スクロール対象の要素
     */
    scrollToBottom(target) {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        const targetPosition = target.offsetTop;
        const offset = window.innerHeight * 0.3;
        this.messageContainer.scrollTop = targetPosition - offset;
    }

    /**
     * 入力ボックスの値に応じてマイクボタンと送信ボタンの表示を切り替える
     */
    toggleMicSendButton() {
        const sendBoxValue = this.sendBox.value;
        if (sendBoxValue.trim() === "") {
            this.micBtn.classList.remove("hidden");
            this.sendBtn.classList.add("hidden");
        } else {
            this.micBtn.classList.add("hidden");
            this.sendBtn.classList.remove("hidden");
        }
    }

    /**
     * 入力ボックスのフォーカス状態に応じてボタンの表示を切り替える
     * @param {boolean} isFocused - 入力ボックスがフォーカスされているかどうか
     */
    toggleInputLeftBtn(isFocused) {
        const notFocusBtns = [this.addBtn, this.cameraBtn, this.imageBtn];
        if (isFocused) {
            notFocusBtns.forEach((btn) => {
                btn.classList.add("hidden");
            });
            this.arrowBtn.classList.remove("hidden");
        } else {
            notFocusBtns.forEach((btn) => {
                btn.classList.remove("hidden");
            });
            this.arrowBtn.classList.add("hidden");
        }
    }

    /**
     * Enter キーが押された際にメッセージを送信する
     * @param {KeyboardEvent} e - キーボードイベント
     */
    handleEnterKey(e) {
        if (e.key === "Enter" && !this.isComposing) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    /**
     * メッセージ内容を Gemini AI モデルに送信し、レスポンスメッセージを作成する
     * @param {string} message - 送信するメッセージ内容
     */
    async sendToGemini(message) {}

    /**
     * 入力ボックスに入力されたメッセージを送信する
     */
    async sendMessage() {
        const content = this.sendBox.value.trim();
        if (content !== "") {
            const time = this.getFormattedTime();
            this.createMessage(content, time);
            this.sendBox.value = "";
            this.toggleMicSendButton();
            await this.sendToGemini(content);
        }
    }

    /**
     * 現在の時刻を HH:MM 形式で返す
     * @returns {string} フォーマットされた時刻文字列
     */
    getFormattedTime() {}

    /**
     * 新しいメッセージを作成し、メッセージコンテナに追加する
     * @param {string} content - メッセージ内容
     * @param {string} time - メッセージの送信時刻
     * @param {boolean} [isFromMe=true] - メッセージがユーザーからのものであるかどうか
     */
    createMessage(content, time, isFromMe = true) {}
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
    const messageManager = new MessageManager();
    // Gemini にリクエストを送信する関数を作成する
});

// Gemini にリクエストを送信する関数を作成する
