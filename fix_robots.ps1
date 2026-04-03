param()
$content = "# Advocate Md. Shah Alam Law Firm - advmdshahalam.me`r`n# Last updated: 2026-04-03`r`n`r`nUser-agent: *`r`nAllow: /`r`nDisallow: /admin/`r`nDisallow: /api/`r`n`r`nSitemap: https://www.advmdshahalam.me/sitemap.xml`r`n"
[System.IO.File]::WriteAllText("dist\robots.txt", $content, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("public\robots.txt", $content, [System.Text.Encoding]::UTF8)
Write-Host "robots.txt fixed in dist/ and public/"
Get-Content "dist\robots.txt"
