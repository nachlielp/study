# click locations for LG 4k full screen 50% zoom
# find locations with: command shift 4 
COUNT=0
LIMIT=145
INTERVAL=4      # seconds between iterations
INTERVAL_LONG=10     # seconds between iterations

sleep "$INTERVAL"

while [ $COUNT -lt $LIMIT ]; do
  COUNT=$((COUNT + 1))
  sleep "$INTERVAL"
  echo "Iteration $COUNT"
  cliclick c:907,737           # MP3
  sleep "$INTERVAL"
  cliclick c:1044,902           # Download
  sleep "$INTERVAL_LONG"
  cliclick c:661,692           # Next
  sleep "$INTERVAL"
done 