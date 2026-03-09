$file = "src\data\blogPosts.js"
$content = Get-Content $file -Encoding UTF8 -Raw

# ── Remove Tax Law posts by string replacement (cleanest approach for large files)
# Work on full string to avoid line number shifting issues

# Each tax post starts at "    /* ── N ── */" and ends at closing "},\r\n\r\n" + next post marker
# Strategy: remove each tax post block exactly

# Helper function to remove a block from "    /* ── N ── */\r\n" to "    },\r\n\r\n" before next marker
function Remove-PostBlock($text, $startMarker, $endPattern) {
    $start = $text.IndexOf($startMarker)
    if ($start -lt 0) { Write-Host "WARNING: Could not find marker: $startMarker"; return $text }
    $end = $text.IndexOf($endPattern, $start)
    if ($end -lt 0) { Write-Host "WARNING: Could not find end after marker: $startMarker"; return $text }
    $end += $endPattern.Length
    $removed = $text.Substring($start, $end - $start)
    Write-Host "Removing block starting at $start (length $($end - $start))"
    return $text.Remove($start, $end - $start)
}

# Remove Tax Post #4: income-tax-case-procedure-bangladesh
$content = Remove-PostBlock $content "    /* ── 4 ── */" "    }," + [char]13 + [char]10 + [char]13 + [char]10 + "    /* ── 5 ── */"
# The end pattern approach won't work cleanly. Use a different strategy:
# Just remove from the open marker to just before the next post marker.

# Reset and use a simpler regex-based approach
$content = Get-Content $file -Encoding UTF8 -Raw

# Tax Post #4 (lines 360-465 in file) - income-tax-case-procedure-bangladesh
# Tax Post #19 (lines 2154-2289) - income-tax-notice-response-bangladesh  
# Tax Post #36 (lines 5820-5912) - nbr-tax-raid-seizure-response-bangladesh
# Tax Post #37 (lines 5913-6022) - company-tax-registration-tin-bangladesh
# Tax Post #38 (lines 6023-6112) - withholding-tax-tds-dispute-bangladesh

# Use line-based removal (most reliable)
$lines = $content -split "`r?`n"

Write-Host "Total lines before: $($lines.Count)"

# Mark lines to remove (1-indexed, convert to 0-indexed)
$removeRanges = @(
    @(359, 464),    # Tax #4: lines 360-465 (0-indexed 359-464)
    @(2153, 2288),  # Tax #19: lines 2154-2289 (0-indexed 2153-2288)
    @(5819, 5911),  # Tax #36: lines 5820-5912 (0-indexed 5819-5911)
    @(5912, 6021),  # Tax #37: lines 5913-6022 (0-indexed 5912-6021)  
    @(6022, 6111)   # Tax #38: lines 6023-6112 (0-indexed 6022-6111)
)

# Build removal set
$removeSet = New-Object System.Collections.Generic.HashSet[int]
foreach ($range in $removeRanges) {
    for ($i = $range[0]; $i -le $range[1]; $i++) { $null = $removeSet.Add($i) }
}

Write-Host "Lines to remove: $($removeSet.Count)"

# Build new array without removed lines  
$newLines = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    if (-not $removeSet.Contains($i)) {
        $newLines += $lines[$i]
    }
}

Write-Host "Total lines after tax removal: $($newLines.Count)"

# Rejoin
$result = $newLines -join "`r`n"

# ── FIX 1: Add missing category to post #7 (anticipatory-bail-bangladesh)
$result = $result -replace "(        slug: 'anticipatory-bail-bangladesh',\r\n)", "`${1}        category: 'Criminal Law',`r`n"
Write-Host "Fix #7: Added missing category 'Criminal Law' to anticipatory-bail-bangladesh"

# ── FIX 2: Rename duplicate slug - second occurrence of child-custody-law-bangladesh
$firstIdx = $result.IndexOf("        slug: 'child-custody-law-bangladesh',")
$secondIdx = $result.IndexOf("        slug: 'child-custody-law-bangladesh',", $firstIdx + 1)
if ($secondIdx -ge 0) {
    $target = "        slug: 'child-custody-law-bangladesh',"
    $replacement = "        slug: 'child-custody-2026-bangladesh',"
    $result = $result.Substring(0, $secondIdx) + $replacement + $result.Substring($secondIdx + $target.Length)
    Write-Host "Fix #18: Renamed duplicate slug to 'child-custody-2026-bangladesh'"
} else {
    Write-Host "WARNING: Second child-custody-law-bangladesh slug not found"
}

# ── FIX 3: Consumer Law -> Civil Law
$result = $result -replace "        category: 'Consumer Law',", "        category: 'Civil Law',"
Write-Host "Fix Consumer Law -> Civil Law"

# ── FIX 4: Labour Law -> Civil Law
$result = $result -replace "        category: 'Labour Law',", "        category: 'Civil Law',"
Write-Host "Fix Labour Law -> Civil Law"

# ── FIX 5: digital-security-act-bangladesh-legal-rights — fix category Criminal Law -> Cyber Law
# Use specific context to only change THIS post's category
$dsa_marker = "        slug: 'digital-security-act-bangladesh-legal-rights',"
$dsa_idx = $result.IndexOf($dsa_marker)
if ($dsa_idx -ge 0) {
    # Look ahead 300 chars for the category field and replace
    $lookahead = 350
    $segment = $result.Substring($dsa_idx, $lookahead)
    $fixed_segment = $segment -replace "(category: 'Criminal Law',)", "category: 'Cyber Law',"
    $result = $result.Substring(0, $dsa_idx) + $fixed_segment + $result.Substring($dsa_idx + $lookahead)
    Write-Host "Fix digital-security-act-bangladesh-legal-rights: Criminal Law -> Cyber Law"
} else {
    Write-Host "WARNING: digital-security-act-bangladesh-legal-rights not found"
}

# ── FIX 6: Replace /tax-vat-lawyer-dhaka and /tax-lawyer-dhaka links with corporate
$result = $result -replace "{ text: 'Tax & VAT Lawyer Dhaka', to: '/tax-vat-lawyer-dhaka' }", "{ text: 'Corporate Lawyer Dhaka', to: '/services/corporate-lawyer' }"
$result = $result -replace "{ text: 'Tax Lawyer Dhaka', to: '/tax-lawyer-dhaka' }", "{ text: 'Corporate Lawyer Dhaka', to: '/services/corporate-lawyer' }"
$result = $result -replace "{ text: 'Tax \& VAT Lawyer Dhaka', to: '/tax-vat-lawyer-dhaka' }", "{ text: 'Corporate Lawyer Dhaka', to: '/services/corporate-lawyer' }"
Write-Host "Fix: Tax service links -> corporate-lawyer"

# ── WRITE FILE
[System.IO.File]::WriteAllText(
    (Resolve-Path $file).Path,
    $result,
    (New-Object System.Text.UTF8Encoding($false))
)
Write-Host "SUCCESS: blogPosts.js saved"
