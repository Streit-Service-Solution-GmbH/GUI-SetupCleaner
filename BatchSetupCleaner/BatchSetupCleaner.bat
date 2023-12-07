@echo off
setlocal enabledelayedexpansion

REM Benutzer nach dem zu durchsuchenden Verzeichnis fragen
set /p "targetDirectory=Bitte geben Sie das zu durchsuchende Verzeichnis ein: "

REM Benutzer nach dem Verzeichnis für das Log fragen
set /p "logDirectory=Bitte geben Sie das Verzeichnis für das Log ein: "
set "logFile=%logDirectory%\Log.txt"

:LOOP
REM Überprüfen, ob das Verzeichnis existiert
if not exist "%targetDirectory%" (
    echo Das Verzeichnis existiert nicht. Die Batch wird beendet.
    exit /b
)

REM Log-Dateipfad erstellen
echo ----------------- Start ----------------- >> "!logFile!"

REM Durchsuchen Sie das Verzeichnis nach Ordnern und überprüfen Sie, ob eine entsprechende .sf_export_finished Datei vorhanden ist
for %%i in ("%targetDirectory%\*.sf_export_finished.txt") do (
    set "fileName=%%~nxi"
    set "folderName=!fileName:.sf_export_finished.txt=!"

    echo Überprüfe Datei: !fileName! und Ordner: !folderName! >> "!logFile!"

    REM Überprüfen, ob die Dateien älter als 30 Tage sind
    set "currentDate="
    for /f %%a in ('wmic os get LocalDateTime ^| find "."') do set "currentDate=%%a"
    
    set "fileDate="
    for /f %%a in ('wmic datafile where "name='!targetDirectory!\!fileName!'" get LastModified ^| find "."') do set "fileDate=%%a"

    if defined currentDate (
        set /a "difference=(((currentDate/1000000)-fileDate)/10000000/60/60/24)"
    )

    echo Vergleiche Datum: !fileDate! mit aktuellem Datum: !currentDate! >> "!logFile!"

    REM Vergleichen Sie die Daten und löschen Sie die Dateien, wenn sie älter als 30 Tage sind
    if !difference! geq 30 (
        echo Die Dateien sind älter als 30 Tage. Lösche die Dateien. >> "!logFile!"

        REM Fügen Sie eine zusätzliche Überprüfung vor dem Löschen hinzu
        if exist "!targetDirectory!\!fileName!" (
            echo Lösche Datei: !targetDirectory!\!fileName! >> "!logFile!"
            del /q "!targetDirectory!\!fileName!" >nul 2>&1
        )

        if exist "!targetDirectory!\!folderName!" (
            echo Lösche Verzeichnis: !targetDirectory!\!folderName! >> "!logFile!"
            rd /s /q "!targetDirectory!\!folderName!" >nul 2>&1
        )
    ) else (
        echo Die Dateien sind nicht älter als 30 Tage. >> "!logFile!"
    )
)

echo ----------------- Ende ----------------- >> "!logFile!"

REM Warten Sie 24 Stunden und starten Sie die Batch-Datei neu
timeout /t 86400 /nobreak
goto LOOP



