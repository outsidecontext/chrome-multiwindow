START chrome --new-window --window-position=500,500 --window-size=1000,1000 --disable-gesture-requirement-for-media-fullscreen http://localhost/1.html
TIMEOUT 2
c:\env\nircmd.exe sendkeypress f11

TIMEOUT 2
START chrome --new-window --window-position=500,500 --window-size=1000,1000 --disable-gesture-requirement-for-media-fullscreen http://localhost/2.html
TIMEOUT 2
c:\env\nircmd.exe win move title "2 - Google Chrome" 4000 5 500 500
TIMEOUT 2
c:\env\nircmd.exe sendkeypress f11
TIMEOUT 2