# CyberForge Android Build and Install Script
$ErrorActionPreference = "Stop"

$projectRoot = "c:\Users\USER\Downloads\my project"
$androidBuild = "$projectRoot\android-build"
$sdk = "C:\Users\USER\AppData\Local\Android\Sdk"
$buildTools = "$sdk\build-tools\34.0.0"
$platformJar = "$sdk\platforms\android-34\android.jar"
$adb = "$sdk\platform-tools\adb.exe"

$aapt2 = "$buildTools\aapt2.exe"
$d8 = "$buildTools\d8.bat"
$zipalign = "$buildTools\zipalign.exe"
$apksigner = "$buildTools\apksigner.bat"

Write-Host ">>> [1/7] Preparing directories & icons..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "$androidBuild\build\compiled_res" | Out-Null
New-Item -ItemType Directory -Force -Path "$androidBuild\build\gen" | Out-Null
New-Item -ItemType Directory -Force -Path "$androidBuild\build\classes" | Out-Null
New-Item -ItemType Directory -Force -Path "$androidBuild\build\dex" | Out-Null
New-Item -ItemType Directory -Force -Path "$androidBuild\res\mipmap-xxxhdpi" | Out-Null

Copy-Item "$projectRoot\public\icon-192.png" "$androidBuild\res\mipmap-xxxhdpi\ic_launcher.png" -Force

Write-Host ">>> [2/7] Generating debug keystore if needed..." -ForegroundColor Cyan
$keystore = "$androidBuild\debug.keystore"
if (-not (Test-Path $keystore)) {
    & "keytool.exe" -genkey -v -keystore $keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=CyberForge, OU=App, O=Tesla, L=Austin, ST=Texas, C=US"
}

Set-Location $androidBuild

Write-Host ">>> [3/7] Compiling resources with aapt2..." -ForegroundColor Cyan
& $aapt2 compile --dir res -o build\compiled_res.zip
& $aapt2 link -I $platformJar --manifest AndroidManifest.xml -o build\unaligned.apk build\compiled_res.zip --java build\gen --auto-add-overlay

Write-Host ">>> [4/7] Compiling Java code..." -ForegroundColor Cyan
& "javac.exe" -d build\classes -cp "$platformJar" build\gen\com\cyberforge\app\R.java src\com\cyberforge\app\MainActivity.java

Write-Host ">>> [5/7] Converting bytecode to classes.dex with d8..." -ForegroundColor Cyan
Get-ChildItem -Path "build\dex\*" -Recurse | Remove-Item -Force -ErrorAction SilentlyContinue
& cmd.exe /c "`"$d8`" --output build\dex build\classes\com\cyberforge\app\*.class"

Write-Host ">>> [6/7] Packaging and signing APK..." -ForegroundColor Cyan
& "jar.exe" -uf build\unaligned.apk -C build\dex classes.dex

Remove-Item "$androidBuild\CyberForge.apk" -Force -ErrorAction SilentlyContinue
& $zipalign -p -f -v 4 build\unaligned.apk CyberForge-aligned.apk

& cmd.exe /c "`"$apksigner`" sign --ks debug.keystore --ks-pass pass:android --key-pass pass:android --out CyberForge.apk CyberForge-aligned.apk"

Write-Host ">>> BUILD SUCCESS! CyberForge.apk generated: $(Get-Item '$androidBuild\CyberForge.apk' | Select-Object -ExpandProperty Length) bytes" -ForegroundColor Green

Write-Host ">>> [7/7] Installing to connected phone via ADB..." -ForegroundColor Cyan
& $adb install -r -d "$androidBuild\CyberForge.apk"

Write-Host ">>> Launching CyberForge on phone..." -ForegroundColor Green
& $adb shell am start -n com.cyberforge.app/.MainActivity

Write-Host ">>> ALL DONE! CyberForge is running on phone!" -ForegroundColor Green
