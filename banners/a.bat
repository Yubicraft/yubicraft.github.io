setlocal enabledelayedexpansion
set "count=1"
for /f "delims=*" %%f in ('dir /b /o:-d /tc *.png') do (
    ren %%f b!count!.png
    set /a count+=1
)