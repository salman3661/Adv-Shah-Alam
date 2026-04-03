# fix_seo_titles.ps1
# SEO Title Optimization - Advocate Md. Shah Alam Website
# Fixes: broken dash character in metaTitles + over-length titles + missing authority signals
# Run from: C:\Users\User\Desktop\Antigravity

param()
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$totalFixed = 0

function Patch-MetaTitle {
    param(
        [string]$RelativePath,
        [string]$OldTitle,
        [string]$NewTitle,
        [string]$Reason
    )
    $fullPath = Join-Path $root $RelativePath
    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)

    if ($content.Contains($OldTitle)) {
        $newContent = $content.Replace($OldTitle, $NewTitle)
        $newBytes = [System.Text.Encoding]::UTF8.GetBytes($newContent)
        [System.IO.File]::WriteAllBytes($fullPath, $newBytes)
        Write-Host "  [FIXED] $RelativePath" -ForegroundColor Green
        Write-Host "    OLD: $($OldTitle.Substring(0, [Math]::Min(80, $OldTitle.Length)))" -ForegroundColor DarkGray
        Write-Host "    NEW: $NewTitle" -ForegroundColor White
        $script:totalFixed++
    } else {
        Write-Host "  [SKIP]  Pattern not found in $RelativePath" -ForegroundColor Yellow
        Write-Host "    Looking for: $($OldTitle.Substring(0, [Math]::Min(60, $OldTitle.Length)))" -ForegroundColor DarkYellow
    }
    Write-Host ""
}

# The broken character sequence in the files (3 bytes: C3 A2 E2 80 9C or similar mojibake for en-dash)
# We'll match the surrounding known-good ASCII to find each title precisely.

$enDash = [char]0x2013  # proper en-dash –

Write-Host "`n=== BATCH 1: Service Pages (fix encoding + shorten) ===" -ForegroundColor Cyan

# ── 1. Criminal Lawyer ──────────────────────────────────────────────
$criminalOld = "Criminal Lawyer in Uttara, Dhaka " + [char]0xC3 + [char]0xA2 + [char]0xE2 + [char]0x80 + [char]0x9C + " FIR, Bail " + [char]0x26 + " Trial Defence | Adv. Shah Alam"
$criminalNew = "Criminal Lawyer Uttara $enDash FIR, Bail & Trial Defence | Adv. Shah Alam"

# Try variant byte sequences for the broken dash
$candidates = @(
    "Criminal Lawyer in Uttara, Dhaka " + [char]0xC3 + [char]0xA2 + [char]0xE2 + [char]0x80 + [char]0x9C,
    "Criminal Lawyer in Uttara, Dhaka " + [char]0xE2 + [char]0x80 + [char]0x93,
    "Criminal Lawyer in Uttara, Dhaka –",
    "Criminal Lawyer in Uttara, Dhaka " + [char]0x96
)

$fullPath = Join-Path $root "src\pages\services\CriminalLawyer.jsx"
$bytes = [System.IO.File]::ReadAllBytes($fullPath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Find metaTitle line
$lines = $content -split "`n"
$metaLine = $lines | Where-Object { $_ -match 'metaTitle=' } | Select-Object -First 1
Write-Host "DEBUG CriminalLawyer metaTitle line bytes:" -ForegroundColor Magenta

# Get exact byte sequence around the dash
$idx = $content.IndexOf("Criminal Lawyer in Uttara, Dhaka ")
if ($idx -ge 0) {
    $dashBytes = $bytes[($idx + 33)..($idx + 40)]
    $hexDump = ($dashBytes | ForEach-Object { $_.ToString("X2") }) -join " "
    Write-Host "  Bytes after 'Dhaka ': $hexDump" -ForegroundColor Magenta
}
