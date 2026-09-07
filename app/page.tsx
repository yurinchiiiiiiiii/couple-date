"use client";

import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const [step, setStep] = useState(1);

  const [selectedDate, setSelectedDate] = useState("");
  const [customDate, setCustomDate] = useState("");

  const [activity, setActivity] = useState("");
  const [detail, setDetail] = useState("");
  const [message, setMessage] = useState("");

  const [randomMessage, setRandomMessage] = useState("");
  const [showRandomMessage, setShowRandomMessage] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const correctPassword = "0810";

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff0f6, #f3e8ff, #e0f2fe)",
    padding: "30px 20px",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    textAlign: "center" as const,
  };

  const buttonStyle = {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "22px",
    background: "white",
    color: "#444",
    fontSize: "18px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("ちがうよ〜🥺");
    }
  };

  const resetAll = () => {
    setStep(1);
    setSelectedDate("");
    setCustomDate("");
    setActivity("");
    setDetail("");
    setMessage("");
    setRandomMessage("");
    setShowRandomMessage(false);
    setIsSending(false);
  };

  const showOmakase = () => {
    const messages = [
      "おこるよ 😠",
      "あちゃんが決める！💕",
    ];

    const random =
      messages[Math.floor(Math.random() * messages.length)];

    setRandomMessage(random);
    setShowRandomMessage(true);

    setTimeout(() => {
      setShowRandomMessage(false);
    }, 1500);
  };

  const handleDateNext = () => {
    if (!selectedDate) return;

    if (
      selectedDate === "日にちを選ぶ" &&
      customDate === ""
    ) {
      alert("日にちを選んでね🥺");
      return;
    }

    setStep(2);
  };

  const handleActivity = (option: string) => {
    if (option === "おまかせ 💕") {
      showOmakase();
      return;
    }

    setActivity(option);
    setDetail("");

    if (option === "ごはん 🍚") setStep(3);
    if (option === "ドライブ 🚗") setStep(4);
    if (option === "買い物 🛍️") setStep(5);
    if (option === "カフェ ☕") setStep(6);
    if (option === "映画 🎬") setStep(7);
    if (option === "家でまったり 🏠") setStep(8);
    if (option === "ちょっと遠出 🌷") setStep(9);
    if (option === "でんわする 📞") setStep(10);
  };

  const handleDetail = (option: string) => {
    if (
      option === "おまかせ" ||
      option === "なんでもいい"
    ) {
      showOmakase();
      return;
    }

    setDetail(option);
  };

  const sendEmail = async () => {
    try {
      setIsSending(true);

      const date =
        selectedDate === "日にちを選ぶ"
          ? customDate
          : selectedDate;

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          activity,
          detail,
          message,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        console.error(result);
        throw new Error("送信失敗");
      }

      setStep(13);
    } catch (error) {
      console.error(error);
      alert("送信できなかった🥺");
    } finally {
      setIsSending(false);
    }
  };

  const renderOptions = (options: string[]) => (
    <div
      style={{
        display: "grid",
        gap: "12px",
        marginTop: "30px",
      }}
    >
      {options.map((option) => {
        const isSmall =
          option.includes("ぎゅー") ||
          option.includes("いくいく");

        const isSelected = detail === option;

        return (
          <button
            key={option}
            onClick={() => handleDetail(option)}
            style={{
              ...buttonStyle,
              width: isSmall ? "58%" : "100%",
              margin: isSmall ? "0 auto" : undefined,
              padding: isSmall ? "9px 14px" : "18px",
              fontSize: isSmall ? "13px" : "18px",
              background: isSelected
                ? "#f472b6"
                : "white",
              color: isSelected ? "white" : "#444",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );

  if (!isUnlocked) {
    return (
      <main
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "30px",
            padding: "35px 25px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "55px" }}>💕</div>

          <h1>ふたりのページ</h1>

          <p style={{ color: "#777" }}>
            パスワードを入れてね ✨
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            placeholder="パスワード"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              border: "2px solid #f9a8d4",
              fontSize: "16px",
              textAlign: "center",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              ...buttonStyle,
              background: "#f472b6",
              color: "white",
            }}
          >
            入る 💗
          </button>

          {error && (
            <p
              style={{
                color: "#ef4444",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </main>
    );
  }

  if (showRandomMessage) {
    return (
      <main
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            background: "white",
            borderRadius: "30px",
            padding: "45px 30px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "55px" }}>
            💗✨
          </div>

          <h1 style={{ color: "#f472b6" }}>
            {randomMessage}
          </h1>

          <p style={{ color: "#999" }}>
            ちゃんと選んでね🥺
          </p>

          <button
            onClick={resetAll}
            style={{
              ...buttonStyle,
              marginTop: "20px",
              background: "#fdf2f8",
              color: "#f472b6",
            }}
          >
            ↻ 最初から選びなおす
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        {step > 1 && step !== 13 && (
          <button
            onClick={resetAll}
            style={{
              width: "100%",
              marginBottom: "20px",
              padding: "11px",
              border: "none",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.75)",
              color: "#f472b6",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.06)",
            }}
          >
            ↻ 最初から選びなおす
          </button>
        )}

        <div style={{ fontSize: "40px" }}>
          🌸💕✨
        </div>

        {step === 1 && (
          <>
            <p
              style={{
                color: "#f472b6",
                fontWeight: "bold",
              }}
            >
              QUESTION 1
            </p>

            <h1>いつ会う？🥺</h1>

            <div
              style={{
                display: "grid",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              {[
                "今日 💕",
                "明日 🌷",
                "今週末 ✨",
                "来週 ☁️",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedDate(option);
                    setCustomDate("");
                  }}
                  style={{
                    ...buttonStyle,
                    background:
                      selectedDate === option
                        ? "#f472b6"
                        : "white",
                    color:
                      selectedDate === option
                        ? "white"
                        : "#444",
                  }}
                >
                  {option}
                </button>
              ))}

              <button
                onClick={() =>
                  setSelectedDate("日にちを選ぶ")
                }
                style={{
                  ...buttonStyle,
                  background:
                    selectedDate === "日にちを選ぶ"
                      ? "#f472b6"
                      : "white",
                  color:
                    selectedDate === "日にちを選ぶ"
                      ? "white"
                      : "#444",
                }}
              >
                日にちを選ぶ 📅
              </button>

              {selectedDate === "日にちを選ぶ" && (
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) =>
                    setCustomDate(e.target.value)
                  }
                  style={{
                    padding: "15px",
                    borderRadius: "16px",
                    border: "2px solid #f9a8d4",
                    fontSize: "16px",
                  }}
                />
              )}
            </div>

            {selectedDate && (
              <button
                onClick={handleDateNext}
                style={{
                  ...buttonStyle,
                  marginTop: "30px",
                  background: "#a78bfa",
                  color: "white",
                }}
              >
                次へ 💕
              </button>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <p
              style={{
                color: "#f472b6",
                fontWeight: "bold",
              }}
            >
              QUESTION 2
            </p>

            <h1>何する？💕</h1>

            <div
              style={{
                display: "grid",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              {[
                "ごはん 🍚",
                "ドライブ 🚗",
                "買い物 🛍️",
                "カフェ ☕",
                "映画 🎬",
                "家でまったり 🏠",
                "ちょっと遠出 🌷",
                "でんわする 📞",
                "おまかせ 💕",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleActivity(option)
                  }
                  style={buttonStyle}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              style={{
                marginTop: "25px",
                border: "none",
                background: "transparent",
                color: "#a78bfa",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ← 戻る
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1>何食べたい？🍚</h1>

            {renderOptions([
              "ゆめかた",
              "焼肉",
              "寿司",
              "ラーメン",
              "パスタ",
              "カフェ",
              "なんでもいい",
            ])}
          </>
        )}

        {step === 4 && (
          <>
            <h1>どこ行きたい？🚗</h1>

            {renderOptions([
              "北ドン",
              "夜景 🌃",
              "海 🌊",
              "山・自然 🌿",
              "近場ぶらぶら 🚗",
              "遠出 🌷",
              "おまかせ",
            ])}
          </>
        )}

        {step === 5 && (
          <>
            <h1>何見たい？🛍️</h1>

            {renderOptions([
              "服",
              "コスメ",
              "雑貨",
              "家具・インテリア",
              "プレゼント",
              "ぶらぶら見るだけ",
              "おまかせ",
            ])}
          </>
        )}

        {step === 6 && (
          <>
            <h1>どんなカフェ？☕</h1>

            {renderOptions([
              "おしゃれ",
              "甘いもの",
              "コーヒー",
              "ゆっくり話したい",
              "写真映え",
              "おまかせ",
            ])}
          </>
        )}

        {step === 7 && (
          <>
            <h1>何系見る？🎬</h1>

            {renderOptions([
              "恋愛",
              "ホラー",
              "アクション",
              "コメディ",
              "アニメ",
              "そのとき上映中ので決める",
              "おまかせ",
            ])}
          </>
        )}

        {step === 8 && (
          <>
            <h1>何する？🏠</h1>

            {renderOptions([
              "映画・ドラマ 🎬",
              "ゲーム 🎮",
              "ご飯作る 🍳",
              "ゴロゴロ 😴",
              "お昼寝 💤",
              "ぎゅー 🤍",
              "いくいく 💕",
              "なんでもいい",
            ])}
          </>
        )}

        {step === 9 && (
          <>
            <h1>どんなとこ？🌷</h1>

            {renderOptions([
              "温泉",
              "水族館",
              "動物園",
              "食べ歩き",
              "景色いいところ",
              "ショッピング",
              "おまかせ",
            ])}
          </>
        )}

        {step === 10 && (
          <>
            <h1>でんわで何する？📞</h1>

            {renderOptions([
              "ゲームする 🎮",
              "お話 💬",
              "もちもち 💕",
            ])}
          </>
        )}

        {step >= 3 && step <= 10 && (
          <>
            {detail && (
              <button
                onClick={() => setStep(11)}
                style={{
                  ...buttonStyle,
                  marginTop: "30px",
                  background: "#a78bfa",
                  color: "white",
                }}
              >
                次へ 💕
              </button>
            )}

            <button
              onClick={() => {
                setDetail("");
                setStep(2);
              }}
              style={{
                marginTop: "25px",
                border: "none",
                background: "transparent",
                color: "#a78bfa",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ← 戻る
            </button>
          </>
        )}

        {step === 11 && (
          <>
            <p
              style={{
                color: "#f472b6",
                fontWeight: "bold",
              }}
            >
              LAST QUESTION
            </p>

            <h1>ひとことある？💌</h1>

            <p style={{ color: "#777" }}>
              なんでも書いてね 💕
            </p>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="例：いっぱい会いたい🥺💕"
              style={{
                width: "100%",
                minHeight: "130px",
                padding: "16px",
                marginTop: "20px",
                borderRadius: "20px",
                border: "2px solid #f9a8d4",
                fontSize: "16px",
                resize: "none",
                boxSizing: "border-box",
                outline: "none",
              }}
            />

            <button
              onClick={() => setStep(12)}
              style={{
                ...buttonStyle,
                marginTop: "25px",
                background: "#a78bfa",
                color: "white",
              }}
            >
              回答を確認する 💕
            </button>

            <button
              onClick={() => {
                setDetail("");
                setStep(2);
              }}
              style={{
                marginTop: "20px",
                border: "none",
                background: "transparent",
                color: "#a78bfa",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ← 選び直す
            </button>
          </>
        )}

        {step === 12 && (
          <>
            <div style={{ fontSize: "55px" }}>
              💌💕
            </div>

            <h1>これでいい？</h1>

            <div
              style={{
                marginTop: "25px",
                background: "white",
                borderRadius: "25px",
                padding: "25px",
                textAlign: "left",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <p>
                📅 <strong>日にち</strong>
                <br />
                {selectedDate === "日にちを選ぶ"
                  ? customDate
                  : selectedDate}
              </p>

              <hr />

              <p>
                💕 <strong>何する？</strong>
                <br />
                {activity}
              </p>

              <hr />

              <p>
                ✨ <strong>内容</strong>
                <br />
                {detail}
              </p>

              <hr />

              <p>
                💌 <strong>ひとこと</strong>
                <br />
                {message || "なし"}
              </p>
            </div>

            <button
              onClick={sendEmail}
              disabled={isSending}
              style={{
                ...buttonStyle,
                marginTop: "25px",
                background: "#f472b6",
                color: "white",
                opacity: isSending ? 0.6 : 1,
                cursor: isSending
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {isSending
                ? "送ってるよ...💌"
                : "この内容を送る 💌"}
            </button>

            <button
              onClick={() => setStep(11)}
              disabled={isSending}
              style={{
                marginTop: "20px",
                border: "none",
                background: "transparent",
                color: "#a78bfa",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ← ひとことを直す
            </button>
          </>
        )}

        {step === 13 && (
          <>
            <div
              style={{
                fontSize: "75px",
                marginTop: "40px",
              }}
            >
              💌💕✨
            </div>

            <h1
              style={{
                color: "#f472b6",
                marginTop: "20px",
              }}
            >
              送ったよ〜！
            </h1>

            <div
              style={{
                marginTop: "25px",
                background: "white",
                borderRadius: "25px",
                padding: "30px 20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                }}
              >
                回答ちゃんと送信できたよ 💕
              </p>

              <p style={{ fontSize: "30px" }}>
                🌸🥺🌸
              </p>
            </div>

            <button
              onClick={resetAll}
              style={{
                ...buttonStyle,
                marginTop: "30px",
                background: "#f472b6",
                color: "white",
              }}
            >
              もう一回答える 💕
            </button>
          </>
        )}
      </div>
    </main>
  );
}