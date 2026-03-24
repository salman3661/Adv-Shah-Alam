# fix_links.ps1 - Fix redirect alias URLs in relatedServiceLinks across blogPosts.js and blogPostsBn.js

param(
    [string]$File
)

$content = Get-Content $File -Raw -Encoding UTF8

# Old redirect slug -> Canonical service page path
$replacements = [ordered]@{
    "'/bail-lawyer-dhaka'"                    = "'/services/bail-lawyer'"
    "'/criminal-lawyer-dhaka'"                = "'/services/criminal-lawyer'"
    "'/criminal-lawyer-uttara'"               = "'/services/criminal-lawyer'"
    "'/criminal-lawyer-dhaka-uttara'"         = "'/services/criminal-lawyer'"
    "'/divorce-lawyer-uttara'"                = "'/services/divorce-lawyer'"
    "'/divorce-family-lawyer-uttara'"         = "'/services/divorce-lawyer'"
    "'/land-property-lawyer-uttara'"          = "'/services/land-lawyer'"
    "'/land-property-lawyer-dhaka'"           = "'/services/land-lawyer'"
    "'/supreme-court-lawyer-bangladesh'"      = "'/services/supreme-court-lawyer'"
    "'/supreme-court-lawyer-dhaka'"           = "'/services/supreme-court-lawyer'"
    "'/civil-lawyer-dhaka'"                   = "'/services/criminal-lawyer'"
    "'/tax-lawyer-dhaka'"                     = "'/services/tax-lawyer'"
    "'/company-lawyer-dhaka'"                 = "'/services/company-corporate-lawyer'"
    # Also fix inline href strings inside section content HTML
    'href="/bail-lawyer-dhaka"'               = 'href="/services/bail-lawyer"'
    'href="/criminal-lawyer-dhaka"'           = 'href="/services/criminal-lawyer"'
    'href="/criminal-lawyer-uttara"'          = 'href="/services/criminal-lawyer"'
    'href="/criminal-lawyer-dhaka-uttara"'    = 'href="/services/criminal-lawyer"'
    'href="/divorce-lawyer-uttara"'           = 'href="/services/divorce-lawyer"'
    'href="/divorce-family-lawyer-uttara"'    = 'href="/services/divorce-lawyer"'
    'href="/land-property-lawyer-uttara"'     = 'href="/services/land-lawyer"'
    'href="/land-property-lawyer-dhaka"'      = 'href="/services/land-lawyer"'
    'href="/supreme-court-lawyer-bangladesh"' = 'href="/services/supreme-court-lawyer"'
    'href="/supreme-court-lawyer-dhaka"'      = 'href="/services/supreme-court-lawyer"'
    'href="/civil-lawyer-dhaka"'              = 'href="/services/criminal-lawyer"'
    'href="/tax-lawyer-dhaka"'               = 'href="/services/tax-lawyer"'
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
