"use client";
import { useState, use } from "react";
import AudioCircle from "@/components/audioUI/audioUI";

const Recorder = (props: { params: Promise<{ id: number }> }) => {
  const params = use(props.params);
  const userName = params.id;

  // recordingの状態を管理
  const [recording, setRecording] = useState<boolean>(false);

  // MediaRecorderの状態を管理
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  // Chatを停止する
  const [stopChat, setStopChat] = useState<boolean>(false);

  // 録音開始処理
  const startRecording = async () => {
    // マイクの使用許可を取得
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // MediaRecorderの設定
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    // 録音データの取得
    mediaRecorder.addEventListener("dataavailable", (e: BlobEvent) => {
      chunks.push(e.data);
    });

    // 録音停止時の処理
    mediaRecorder.addEventListener("stop", async () => {
      // 録音データをBlob形式に変換
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });

      // 録音データをFormData形式に変換
      const formData = new FormData();
      formData.append("audio", audioBlob);

      // 録音データをサーバーに送信
      const response = await fetch("/api/openai/stt", {
        method: "POST",
        body: formData,
      });

      const sttData = await response.json();

      // テキストをchatAIに送信
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputMessage: sttData.output, userName }),
      });

      const data = await res.json();

      // chatAIの返答を音声に変換

      const ttsRes = await fetch("/api/openai/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textMessage: data.message }),
      });

      const ttsData = await ttsRes.json();
      console.log(ttsData);
      const audio = new Audio(ttsData.audioURL);
      audio.play();
    });

    // 録音開始
    mediaRecorder.start();
    setMediaRecorder(mediaRecorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };


  return (
    <div>
      <AudioCircle isPlaying={recording} />
      {!recording && <button onClick={startRecording}>start recording</button>}
      {recording && <button onClick={stopRecording}>stop recording</button>}
    </div>
  );
};

export default Recorder;
