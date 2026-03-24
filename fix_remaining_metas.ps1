# fix_remaining_metas.ps1
# Update CompanyCorporateLawyer.jsx and TaxLawyer.jsx meta fields

$files = @(
    @{
        Path = "src\pages\services\CompanyCorporateLawyer.jsx"
        NewTitle = 'metaTitle="Company & Corporate Lawyer Dhaka – Registration, Disputes & Compliance | Adv. Shah Alam"'
        NewDesc  = 'metaDesc="Register a company or resolve corporate disputes in Bangladesh. Adv. Shah Alam handles RJSC filings, shareholder disputes & corporate litigation in Dhaka. Call now."'
    },
    @{
        Path = "src\pages\services\TaxLawyer.jsx"
        NewTitle = 'metaTitle="Tax & VAT Lawyer Dhaka – Income Tax Appeals & NBR Disputes | Adv. Shah Alam"'
        NewDesc  = 'metaDesc="Fighting a tax notice in Bangladesh? Adv. Shah Alam handles income tax appeals, VAT disputes & NBR cases in Dhaka. Experienced tax lawyer. Free consultation."'
    }
)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.Path, [System.Text.Encoding]::UTF8)
    $content = $content -replace 'metaTitle="[^"]*"', $f.NewTitle
    $content = $content -replace 'metaDesc="[^"]*"', $f.NewDesc
    [System.IO.File]::WriteAllText($f.Path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $($f.Path)"
}

Write-Host "Done."
