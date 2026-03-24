# update_service_metas.ps1
# Updates metaTitle and metaDesc on all 7 service pages for Phase B CTR optimization

$updates = @(
    @{
        File = "src\pages\services\CriminalLawyer.jsx"
        OldTitle = 'metaTitle="Criminal Lawyer in Uttara & Dhaka | FIR, Bail & Trial – Advocate Md. Shah Alam"'
        NewTitle = 'metaTitle="Criminal Lawyer in Uttara, Dhaka – FIR, Bail & Trial Defence | Adv. Shah Alam"'
        OldDesc = 'metaDesc="Facing criminal charges? Get expert criminal defence from Advocate Md. Shah Alam – FIR cases, bail, trial & appeals in Dhaka courts. 20+ years experience. Call today."'
        NewDesc = 'metaDesc="Charged with a crime in Dhaka or Uttara? Adv. Shah Alam handles FIR cases, urgent bail & trial representation in Bangladesh courts. 20+ yrs experience. Call now."'
    },
    @{
        File = "src\pages\services\DivorceLawyer.jsx"
        OldTitle = 'metaTitle="Divorce Lawyer in Uttara, Dhaka | Muslim Divorce, Khula & Custody – Adv. Shah Alam"'
        NewTitle = 'metaTitle="Divorce Lawyer Uttara, Dhaka – Talaq, Khula & Child Custody | Adv. Shah Alam"'
        OldDesc = 'metaDesc="Expert divorce lawyer in Uttara for Muslim talaq, khula, child custody & maintenance in Bangladesh family courts. Compassionate, fast, experienced. WhatsApp now."'
        NewDesc = 'metaDesc="Need a divorce lawyer in Uttara? Adv. Shah Alam handles Muslim talaq, khula, child custody & maintenance in Dhaka family courts. Compassionate. Fast. WhatsApp today."'
    },
    @{
        File = "src\pages\services\LandLawyer.jsx"
        OldTitle = 'metaTitle="Land & Property Lawyer in Uttara, Dhaka | Disputes & Registration – Adv. Shah Alam"'
        NewTitle = 'metaTitle="Land & Property Lawyer Uttara Dhaka – Disputes, Registration & Mutation | Adv. Shah Alam"'
        OldDesc = 'metaDesc="Land dispute, property registration, mutation & deed cases handled by expert land lawyer in Uttara, Dhaka. Advocate Md. Shah Alam – 20+ years experience. Consult today."'
        NewDesc = 'metaDesc="Resolve land disputes, property registration & mutation in Dhaka. Expert land lawyer in Uttara with 20+ yrs experience. Free consultation – call Adv. Shah Alam now."'
    },
    @{
        File = "src\pages\services\BailLawyer.jsx"
        OldTitle = 'metaTitle="Bail Lawyer in Dhaka | Anticipatory Bail & High Court Bail – Advocate Md. Shah Alam"'
        NewTitle = 'metaTitle="Bail Lawyer Dhaka – Same-Day Bail, Anticipatory & High Court Applications | Adv. Shah Alam"'
        OldDesc = 'metaDesc="Need urgent bail in Dhaka? Advocate Md. Shah Alam handles bailable & non-bailable bail, anticipatory bail & High Court applications. Fast. Experienced. Call now."'
        NewDesc = 'metaDesc="Urgent bail needed in Dhaka? Adv. Shah Alam files bailable, non-bailable & anticipatory bail applications. Same-day filing possible. Fast & experienced. Call now."'
    },
    @{
        File = "src\pages\services\SupremeCourtLawyer.jsx"
        OldTitle = 'metaTitle="Supreme Court Lawyer in Bangladesh | Appellate Division & Writ – Advocate Md. Shah Alam"'
        NewTitle = 'metaTitle="Supreme Court Lawyer Bangladesh – Writ Petition, Appeal & High Court Cases | Adv. Shah Alam"'
        OldDesc = 'metaDesc="Experienced Supreme Court lawyer Bangladesh for appeals, writ petitions & constitutional matters. Advocate Md. Shah Alam practises at the Appellate & High Court Divisions."'
        NewDesc = 'metaDesc="High Court Division or Appellate Division? Adv. Shah Alam is your experienced Supreme Court lawyer in Bangladesh. Writ petitions, appeals & High Court bail. Consult now."'
    }
)

foreach ($upd in $updates) {
    $path = $upd.File
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $changed = $false

    if ($content.Contains($upd.OldTitle)) {
        $content = $content.Replace($upd.OldTitle, $upd.NewTitle)
        Write-Host "  [title OK] $path"
        $changed = $true
    } else {
        Write-Host "  [title NOT FOUND] $path -- checking actual content..."
        $titleLine = ($content -split "`n") | Where-Object { $_ -match 'metaTitle=' } | Select-Object -First 1
        Write-Host "  Actual: $( $titleLine.Trim() )"
    }

    if ($content.Contains($upd.OldDesc)) {
        $content = $content.Replace($upd.OldDesc, $upd.NewDesc)
        Write-Host "  [desc OK] $path"
        $changed = $true
    } else {
        Write-Host "  [desc NOT FOUND] $path -- checking actual content..."
        $descLine = ($content -split "`n") | Where-Object { $_ -match 'metaDesc=' } | Select-Object -First 1
        Write-Host "  Actual: $( $descLine.Trim() )"
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    }
}

Write-Host ""
Write-Host "Service page meta update complete."
