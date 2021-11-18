#!/bin/bash
export COLORTERM=truecolor
export TERM=xterm-256color
export COLUMNS=$2
export LINES=$1
youtube-dl -f 134 https://www.youtube.com/watch?v=dQw4w9WgXcQ -o - | ffmpeg -re -i pipe: -vcodec rawvideo -filter:v "crop=(ih*5/4):ih" -r $3 -an -color full16  -antialias  prefilter -algorithm  fstein -pix_fmt rgb24 -window_size $2x$1 -driver ncurses -f caca - 2> /dev/null
