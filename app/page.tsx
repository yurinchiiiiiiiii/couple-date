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

  // 好きなパスワードに変更してOK
  const correctPassword = "1229";

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff0f6 0%, #f5e9ff 50%, #e8f5ff 100%)",
    padding: "30px 20px",
    color: "#262626",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    textAlign: "center" as const,
    color: "#262626",
  };

  const buttonStyle = {
    width: "100%",
    padding: "18px",
    border: "2px solid rgba(244,114,182,0.15)",
    borderRadius: "22px",
    background: "#ffffff",
    color: "#222222",
    fontSize: "18px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const secondaryTextStyle = {
    color: "#4b5563",
    fontWeight: "500" as const,
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
        throw new Error("送信失敗");
      }

      setStep(13);
    } catch {
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
                : "#ffffff",
              color: isSelected
                ? "#ffffff"
                : "#222222",
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
            background: "#ffffff",
            borderRadius: "30px",
            padding: "35px 25px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
            color: "#222222",
          }}
        >
          <div style={{ fontSize: "55px" }}>💕</div>

          <h1
            style={{
              color: "#202020",
              marginBottom: "8px",
            }}
          >
            ふたりのページ
          </h1>

          <p style={secondaryTextStyle}>
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
              background: "#ffffff",
              color: "#222222",
              fontSize: "16px",
              textAlign: "center",
              marginBottom: "15px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              ...buttonStyle,
              background: "#f472b6",
              color: "#ffffff",
            }}
          >
            入る 💗
          </button>

          {error && (
            <p
              style={{
                color: "#dc2626",
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
            background: "#ffffff",
            borderRadius: "30px",
            padding: "45px 30px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ fontSize: "55px" }}>
            💗✨
          </div>

          <h1
            style={{
              color: "#db2777",
            }}
          >
            {randomMessage}
          </h1>

          <p
            style={{
              color: "#444444",
              fontWeight: "600",
            }}
          >
            ちゃんと選んでね🥺
          </p>

          <button
            onClick={resetAll}
            style={{
              ...buttonStyle,
              marginTop: "20px",
              background: "#fdf2f8",
              color: "#be185d",
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
              border: "1px solid rgba(244,114,182,0.25)",
              borderRadius: "18px",
              background: "#ffffff",
              color: "#be185d",
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
                color: "#be185d",
                fontWeight: "bold",
              }}
            >
              QUESTION 1
            </p>

            <h1 style={{ color: "#202020" }}>
              いつ会う？🥺
            </h1>

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
                        : "#ffffff",
                    color:
                      selectedDate === option
                        ? "#ffffff"
                        : "#222222",
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
                      : "#ffffff",
                  color:
                    selectedDate === "日にちを選ぶ"
                      ? "#ffffff"
                      : "#222222",
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
                    background: "#ffffff",
                    color: "#222222",
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
                  background: "#8b5cf6",
                  color: "#ffffff",
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
                color: "#be185d",
                fontWeight: "bold",
              }}
            >
              QUESTION 2
            </p>

            <h1 style={{ color: "#202020" }}>
              何する？💕
            </h1>

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
          </>
        )}

        {step === 3 && (
          <>
            <h1 style={{ color: "#202020" }}>
              何食べたい？🍚
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              どこ行きたい？🚗
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              何見たい？🛍️
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              どんなカフェ？☕
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              何系見る？🎬
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              何する？🏠
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              どんなとこ？🌷
            </h1>

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
            <h1 style={{ color: "#202020" }}>
              でんわで何する？📞
            </h1>

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
                  background: "#8b5cf6",
                  color: "#ffffff",
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
                color: "#6d28d9",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px",
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
                color: "#be185d",
                fontWeight: "bold",
              }}
            >
              LAST QUESTION
            </p>

            <h1 style={{ color: "#202020" }}>
              ひとことある？💌
            </h1>

            <p style={secondaryTextStyle}>
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
                background: "#ffffff",
                color: "#222222",
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
                background: "#8b5cf6",
                color: "#ffffff",
              }}
            >
              回答を確認する 💕
            </button>
          </>
        )}

        {step === 12 && (
          <>
            <div style={{ fontSize: "55px" }}>
              💌💕
            </div>

            <h1 style={{ color: "#202020" }}>
              これでいい？
            </h1>

            <div
              style={{
                marginTop: "25px",
                background: "#ffffff",
                borderRadius: "25px",
                padding: "25px",
                textAlign: "left",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
                color: "#222222",
              }}
            >
              <p>
                📅 <strong>日にち</strong>
                <br />
                {selectedDate === "日にちを選ぶ"
                  ? customDate
                  : selectedDate}
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d1d5db",
                }}
              />

              <p>
                💕 <strong>何する？</strong>
                <br />
                {activity}
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d1d5db",
                }}
              />

              <p>
                ✨ <strong>内容</strong>
                <br />
                {detail}
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d1d5db",
                }}
              />

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
                background: "#db2777",
                color: "#ffffff",
                opacity: isSending ? 0.65 : 1,
              }}
            >
              {isSending
                ? "送ってるよ...💌"
                : "この内容を送る 💌"}
            </button>

            <button
              onClick={() => setStep(11)}
              style={{
                marginTop: "20px",
                border: "none",
                background: "transparent",
                color: "#6d28d9",
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
                color: "#be185d",
                marginTop: "20px",
              }}
            >
              送ったよ〜！
            </h1>

            <div
              style={{
                marginTop: "25px",
                background: "#ffffff",
                borderRadius: "25px",
                padding: "30px 20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
                color: "#222222",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "600",
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
                background: "#db2777",
                color: "#ffffff",
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