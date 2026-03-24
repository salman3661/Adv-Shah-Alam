# fix_service_metas_v2.ps1
# Reads actual line content and replaces metaTitle/metaDesc in service JSX files

$files = @(
    @{
        Path = "src\pages\services\CriminalLawyer.jsx"
        NewTitle = 'metaTitle="Criminal Lawyer in Uttara, Dhaka – FIR, Bail & Trial Defence | Adv. Shah Alam"'
        NewDesc  = 'metaDesc="Charged with a crime in Dhaka or Uttara? Adv. Shah Alam handles FIR, urgent bail & trial defence in Bangladesh courts. 20+ yrs experience. Call now."'
    },
    @{
        Path = "src\pages\services\DivorceLawyer.jsx"
        NewTitle = 'metaTitle="Divorce Lawyer Uttara, Dhaka – Talaq, Khula & Child Custody | Adv. Shah Alam"'
        # desc already updated
    },
    @{
        Path = "src\pages\services\LandLawyer.jsx"
        NewTitle = 'metaTitle="Land & Property Lawyer Uttara Dhaka – Disputes, Registration & Mutation | Adv. Shah Alam"'
        NewDesc  = 'metaDesc="Resolve land disputes, property registration & mutation in Dhaka. Expert land lawyer in Uttara. 20+ yrs experience. Free consultation – call Adv. Shah Alam now."'
    },
    @{
        Path = "src\pages\services\BailLawyer.jsx"
        NewTitle = 'metaTitle="Bail Lawyer Dhaka – Same-Day Bail, Anticipatory & High Court Applications | Adv. Shah Alam"'
        # desc already updated
    },
    @{
        Path = "src\pages\services\SupremeCourtLawyer.jsx"
        NewTitle = 'metaTitle="Supreme Court Lawyer Bangladesh – Writ Petition, Appeal & High Court | Adv. Shah Alam"'
        # desc already updated
    }
)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.Path, [System.Text.Encoding]::UTF8)

    # Replace title line
    if ($f.NewTitle) {
        $content = $content -replace 'metaTitle="[^"]*"', $f.NewTitle
        Write-Host "[title] Updated: $($f.Path)"
    }

    # Replace desc line (only if provided)
    if ($f.NewDesc) {
        $content = $content -replace 'metaDesc="[^"]*"', $f.NewDesc
        Write-Host "[desc] Updated: $($f.Path)"
    }

    [System.IO.File]::WriteAllText($f.Path, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Done."
