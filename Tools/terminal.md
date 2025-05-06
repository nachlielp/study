### Unpack rar files

```bash
unar file.rar
```

### mp4 to mp3

```bash
ffmpeg -i "File_name.mp4" -vn -acodec libmp3lame -ab 192k new_file_name.mp3
```

### Convert video to gif

```bash
ffmpeg -i input.mp4 output.gif
```

### Merge video and audio

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest output.mp4
```
