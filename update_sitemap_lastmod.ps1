# update_sitemap_lastmod.ps1
# Updates all <lastmod> dates in sitemap.xml to today's date

$file = "public\sitemap.xml"
$today = "2026-03-24"

$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Replace all existing lastmod dates
$content = $content -replace '<lastmod>\d{4}-\d{2}-\d{2}</lastmod>', "<lastmod>$today</lastmod>"

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated all lastmod dates to $today in $file"
