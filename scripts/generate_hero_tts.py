import asyncio
import os
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'audio', 'voxly')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Using Microsoft's studio-grade AnaNeural (cheerful, friendly, high-clarity voice for Voxly robot)
VOICE = "en-US-AnaNeural"

CLIPS = [
    ("hero_step1.mp3", "Hello! Hiii! I am Voxly! Nice to meet you!"),
    ("hero_step2.mp3", "Hiii! Excited to scale your voice workflows! Ready for 500 plus calls."),
    ("hero_step3.mp3", "Whoaaa! Watch this barrel roll! Double hi to you!"),
    ("hero_step4.mp3", "Don't tickle me! Haha! Double hi to you!"),
    ("hero_step5.mp3", "Double barrel roll and high five! Let's conquer customer calls!"),
    ("hero_pouty.mp3", "Hey! Don't poke me, I have calls to make! Click live mic chat instead!"),
    ("hero_wave.mp3", "Hiii! Waving back at you!"),
    ("hero_roll.mp3", "Whoaaa! Full 360 spin and wave!")
]

async def generate_all():
    print(f"Generating {len(CLIPS)} neural TTS clips into {OUTPUT_DIR}...")
    for filename, text in CLIPS:
        target_path = os.path.join(OUTPUT_DIR, filename)
        # Slight +3Hz pitch and natural rate for extra clarity and robotic enthusiasm
        communicate = edge_tts.Communicate(text, VOICE, pitch="+4Hz", rate="+3%")
        await communicate.save(target_path)
        size = os.path.getsize(target_path)
        print(f"[OK] Generated {filename} ({size} bytes): \"{text}\"")

if __name__ == "__main__":
    asyncio.run(generate_all())
