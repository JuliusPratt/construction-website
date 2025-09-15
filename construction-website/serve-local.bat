@echo off
echo Starting local server for gallery testing...
echo.
echo This will serve your website at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python serve-local.py
if %errorlevel% neq 0 (
    echo Python 3 not found, trying Python...
    python3 serve-local.py
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Python not found. Please install Python 3 to use this server.
        echo.
        echo Alternative: Use VS Code Live Server extension or any other local server.
        echo The gallery system needs to run on a server (not file://) to work properly.
        pause
    )
)
