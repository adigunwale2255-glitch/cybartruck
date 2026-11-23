$adb = "C:\Users\USER\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$apk = "c:\Users\USER\Downloads\my project\android-build\CyberForge.apk"

Write-Host ">>> Triggering USB install prompt on phone..." -ForegroundColor Cyan

for ($i = 1; $i -le 8; $i++) {
    Write-Host "Attempt $i of 8: Sending install prompt to phone screen..."
    $res = & $adb install -r -d $apk 2>&1
    Write-Host "Result: $res"
    if ($res -match "Success") {
        Write-Host ">>> INSTALL SUCCESSFUL! Launching CyberForge app on phone..." -ForegroundColor Green
        & $adb shell am start -n com.cyberforge.app/.MainActivity
        exit 0
    }
    Start-Sleep -Seconds 2
}
