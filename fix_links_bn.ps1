# fix_links_bn.ps1 - Fix redirect alias URLs in blogPostsBn.js
# BN posts use /bn/services/* which is correct - but check for any non-bn aliases

param(
    [string]$File
)

$content = Get-Content $File -Raw -Encoding UTF8

# Fix any EN-path aliases that might exist in BN data file inline hrefs
$replacements = [ordered]@{
    # These would be wrong in BN file (should use /bn/services/*)
    'href="/bail-lawyer-dhaka"'               = 'href="/bn/services/bail-lawyer"'
    'href="/criminal-lawyer-dhaka"'           = 'href="/bn/services/criminal-lawyer"'
    'href="/criminal-lawyer-uttara"'          = 'href="/bn/services/criminal-lawyer"'
    'href="/divorce-lawyer-uttara"'           = 'href="/bn/services/divorce-lawyer"'
    'href="/land-property-lawyer-uttara"'     = 'href="/bn/services/land-lawyer"'
    'href="/supreme-court-lawyer-bangladesh"' = 'href="/bn/services/supreme-court-lawyer"'
    'href="/supreme-court-lawyer-dhaka"'      = 'href="/bn/services/supreme-court-lawyer"'
    # relatedServiceLinks - BN posts already correct (/bn/services/*), but check for any EN aliases
    "to: '/bail-lawyer-dhaka'"               = "to: '/bn/services/bail-lawyer'"
    "to: '/criminal-lawyer-dhaka-uttara'"    = "to: '/bn/services/criminal-lawyer'"
    "to: '/supreme-court-lawyer-bangladesh'" = "to: '/bn/services/supreme-court-lawyer'"
    "to: '/supreme-court-lawyer-dhaka'"      = "to: '/bn/services/supreme-court-lawyer'"
}

$total = 0
foreach ($old in $replacements.Keys) {
    $new = $replacements[$old]
    if ($content.Contains($old)) {
        $occurrences = ([regex]::Matches($content, [regex]::Escape($old))).Count
        $content = $content.Replace($old, $new)
        Write-Host "[$occurrences x] $old  ->  $new"
        $total += $occurrences
    }
}

[System.IO.File]::WriteAllText($File, $content, [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "Total replacements: $total in $File"
