import sys
import os
import signal
import subprocess
def signal_handler(sig, frame):
    os.kill(id.pid, signal.SIGINT)
    os.system("cls")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
id = subprocess.Popen(["powershell","-Command","&{$PlayWav=New-Object System.Media.SoundPlayer('https://keroserene.net/lol/roll.s16'); $PlayWav.LoadAsync(); $PlayWav.playsync()}"])
os.system("")
while(True):
	print(sys.stdin.read(1),end="")


