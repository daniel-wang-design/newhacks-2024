import os
import sys
import openai
import sounddevice as sd
import wavio
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def record_audio(duration=5, fs=44100):
    """
    Records audio from the microphone for a given duration.
    :param duration: Recording duration in seconds.
    :param fs: Sampling frequency.
    :return: Filename of the recorded audio.
    """
    print(f"Recording audio for {duration} seconds...")
    try:
        recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
        sd.wait()  # Wait until recording is finished
        filename = 'recorded_audio.wav'
        wavio.write(filename, recording, fs, sampwidth=2)
        print("Recording complete.")
        return filename
    except Exception as e:
        print(f"Error during audio recording: {e}")
        return None

def transcribe_audio(file_path):
    """Transcribe audio using OpenAI's Whisper API."""
    try:
        with open(file_path, 'rb') as audio_file:
            transcript = openai.Audio.transcribe(
                model="whisper-1",
                file=audio_file
            )
        return transcript['text']
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

def classify_transcript(transcribed_text):
    """Classify the transcript using GPT-3.5 Turbo."""
    prompt = f"""
You are an assistant that classifies phone call transcripts as 'spam' or 'legitimate'.

Transcript:
\"\"\"
{transcribed_text}
\"\"\"

Please answer with 'scam' or'spam' or 'legitimate' and provide a brief explanation.
"""
    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'user', 'content': prompt}
            ],
            temperature=0,
            max_tokens=100,
            n=1,
            stop=None,
        )
        classification = response['choices'][0]['message']['content']
        return classification.strip()
    except Exception as e:
        print(f"Error during classification: {e}")
        return None

def detect_spam_call(file_path):
    """Full pipeline: Transcribe and classify the audio file."""
    print("Transcribing audio...")
    transcribed_text = transcribe_audio(file_path)
    if transcribed_text is None:
        print("Failed to transcribe audio.")
        return

    print("Transcription complete.")
    print(f"Transcribed Text:\n{transcribed_text}\n")

    print("Classifying transcript...")
    classification = classify_transcript(transcribed_text)
    if classification is None:
        print("Failed to classify transcript.")
        return

    print("Classification complete.")
    print(f"\nClassification Result:\n{classification}")

if __name__ == '__main__':
    # Ask the user whether to record audio or use an existing file
    print("Choose an option:")
    print("1. Record audio from microphone")
    print("2. Use existing audio file")
    choice = input("Enter 1 or 2: ")

    if choice == '1':
        # Record audio from the microphone
        duration = input("Enter recording duration in seconds (default is 5): ")
        if duration.strip() == '':
            duration = 5
        else:
            duration = float(duration)
        audio_file_name = record_audio(duration=duration)
    elif choice == '2':
        # Use an existing audio file
        audio_file_name = input("Enter the name of the audio file (with extension): ")
        # Check if the file exists
        if not os.path.exists(audio_file_name):
            print(f"Audio file not found at path: {audio_file_name}")
            sys.exit(1)
    else:
        print("Invalid choice. Exiting.")
        sys.exit(1)

    # Proceed if the audio file is available
    if audio_file_name:
        # Run the spam call detection
        detect_spam_call(audio_file_name)
    else:
        print("No audio file to process. Exiting.")
