import speech_recognition as sr
from pydub import AudioSegment
import os
import sys

def format_time(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = int(seconds % 60)

    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"


def audio_to_text(audio_path):
    audio = AudioSegment.from_file(audio_path)
    audio = audio.set_channels(1)
    audio = audio.set_frame_rate(16000)

    recognizer = sr.Recognizer()

    # 5 seconds
    chunk_length = 5000

    results = []
    for start in range(0, len(audio), chunk_length):

        end = min(start + chunk_length, len(audio))

        chunk = audio[start:end]

        # Temporary WAV file
        chunk_file = "temp_chunk.wav"
        chunk.export(chunk_file, format="wav")

        with sr.AudioFile(chunk_file) as source:
            audio_data = recognizer.record(source)

        try:
            text = recognizer.recognize_google(audio_data)

            if text.strip():
                results.append({
                    "start": start / 1000,
                    "end": end / 1000,
                    "text": text
                })

                print(
                    f"[{format_time(start / 1000)} - "
                    f"{format_time(end / 1000)}] {text}"
                )

        except sr.UnknownValueError:
            print(
                f"[{format_time(start / 1000)} - "
                f"{format_time(end / 1000)}] [No speech]"
            )

        except sr.RequestError as e:
            print("Speech Recognition API error:", e)

    # Delete temporary file
    if os.path.exists(chunk_file):
        os.remove(chunk_file)

    return results


if __name__ == "__main__":

    audio_path = r"../audio.wav"

    results = audio_to_text(audio_path)

    # Save transcript
    with open("transcript.txt", "w", encoding="utf-8") as file:

        for item in results:
            file.write(
                f"[{format_time(item['start'])} - "
                f"{format_time(item['end'])}] "
                f"{item['text']}\n"
            )

    print("\nTranscript saved to transcript.txt")