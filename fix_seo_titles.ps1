param()
# fix_seo_titles_final.ps1
# Fixes broken â€" (bytes: C3 A2 E2 82 AC E2 80 9C) -> proper en-dash (E2 80 93)
# Then rewrites all service page and core page metaTitles for CTR optimization

$ErrorActionPreference = "Stop"

# Broken dash bytes: C3 A2 E2 82 AC E2 80 9C (= â€" encoded as UTF-8 mojibake of Windows-1252 of en-dash)
$brokenBytes = [byte[]]@(0xC3, 0xA2, 0xE2, 0x82, 0xAC, 0xE2, 0x80, 0x9C)
$brokenStr   = [System.Text.Encoding]::UTF8.GetString($brokenBytes)  # = "â€" as 4 chars

# Proper en-dash byte: E2 80 93
$enDash = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xE2, 0x80, 0x93))  # = "–"

Write-Host "Broken string repr: [$brokenStr] (len=$($brokenStr.Length))"
Write-Host "En-dash char: [$enDash]"
Write-Host ""

$totalFixed = 0

function Patch-File {
    param([string]$RelPath, [string]$OldStr, [string]$NewStr, [string]$Reason)
    $bytes   = [System.IO.File]::ReadAllBytes($RelPath)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    if ($content.Contains($OldStr)) {
        $newContent = $content.Replace($OldStr, $NewStr)
        [System.IO.File]::WriteAllBytes($RelPath, [System.Text.Encoding]::UTF8.GetBytes($newContent))
        Write-Host "  [OK] $RelPath" -ForegroundColor Green
        Write-Host "       $Reason" -ForegroundColor DarkGray
        $script:totalFixed++
        return $true
    }
    Write-Host "  [SKIP] Not found in $RelPath" -ForegroundColor Yellow
    return $false
}

Write-Host "=== BATCH 1: Service Pages ===" -ForegroundColor Cyan

# 1. CriminalLawyer.jsx
$oldTitle = "Criminal Lawyer in Uttara, Dhaka $brokenStr FIR, Bail & Trial Defence | Adv. Shah Alam"
$newTitle = "Criminal Lawyer Uttara $enDash FIR, Bail & Trial Defence | Adv. Shah Alam"
Patch-File "src\pages\services\CriminalLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + removed ', Dhaka'"

# 2. DivorceLawyer.jsx
$oldTitle = "Divorce Lawyer Uttara, Dhaka $brokenStr Talaq, Khula & Child Custody | Adv. Shah Alam"
$newTitle = "Divorce Lawyer Uttara $enDash Talaq, Khula & Child Custody | Adv. Shah Alam"
Patch-File "src\pages\services\DivorceLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + removed ', Dhaka'"

# 3. LandLawyer.jsx
$oldTitle = "Land & Property Lawyer Uttara Dhaka $brokenStr Disputes, Registration & Mutation | Adv. Shah Alam"
$newTitle = "Land Dispute Lawyer Uttara $enDash Property, Mutation & Title | Adv. Shah Alam"
Patch-File "src\pages\services\LandLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + surfaced 'Land Dispute Lawyer' KW"

# 4. BailLawyer.jsx
$oldTitle = "Bail Lawyer Dhaka $brokenStr Same-Day Bail, Anticipatory & High Court Applications | Adv. Shah Alam"
$newTitle = "Bail Lawyer Dhaka $enDash Same-Day & Anticipatory Bail | Adv. Shah Alam"
Patch-File "src\pages\services\BailLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + urgency hook preserved"

# 5. SupremeCourtLawyer.jsx
$oldTitle = "Supreme Court Lawyer Bangladesh $brokenStr Writ Petition, Appeal & High Court | Adv. Shah Alam"
$newTitle = "Supreme Court Lawyer Bangladesh $enDash Writ, Appeal & High Court | Adv. Shah Alam"
Patch-File "src\pages\services\SupremeCourtLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + streamlined hook"

# 6. TaxLawyer.jsx
$oldTitle = "Tax & VAT Lawyer Dhaka $brokenStr Income Tax Appeals & NBR Disputes | Adv. Shah Alam"
$newTitle = "Income Tax & VAT Lawyer Dhaka $enDash NBR Disputes & Appeals | Adv. Shah Alam"
Patch-File "src\pages\services\TaxLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + 'Income Tax' moved to front"

# 7. CompanyCorporateLawyer.jsx
$oldTitle = "Company & Corporate Lawyer Dhaka $brokenStr Registration, Disputes & Compliance | Adv. Shah Alam"
$newTitle = "Company & Corporate Lawyer Dhaka $enDash Registration & Disputes | Adv. Shah Alam"
Patch-File "src\pages\services\CompanyCorporateLawyer.jsx" `
    "metaTitle=`"$oldTitle`"" `
    "metaTitle=`"$newTitle`"" `
    "OldLen=$(($oldTitle).Length) -> NewLen=$(($newTitle).Length) | Fixed encoding + removed 'Compliance'"

Write-Host ""
Write-Host "=== BATCH 2: Core Pages ===" -ForegroundColor Cyan

# 8. Home.jsx - shorten from 82 to ~70 chars
Patch-File "src\pages\Home.jsx" `
    "<title>Lawyer in Uttara &amp; Dhaka | Advocate Md. Shah Alam $enDash Criminal, Divorce &amp; Land Law</title>" `
    "<title>Lawyer in Uttara &amp; Dhaka $enDash Criminal, Divorce &amp; Bail | Adv. Shah Alam</title>" `
    "Shortened from 82 to 70 chars | replaced 'Land Law' with 'Bail' (urgency hook)"

# 9. Advocate page - add Supreme Court authority signal
Patch-File "src\pages\AdvocatePage.jsx" `
    "<title>Advocate Md. Shah Alam $enDash Lawyer in Uttara, Dhaka</title>" `
    "<title>Advocate Md. Shah Alam $enDash Supreme Court Lawyer | Uttara, Dhaka</title>" `
    "Added 'Supreme Court' authority; improved CTR from 49 to 62 chars"

# 10. Blog.jsx - shorten from 75 to 65 chars
Patch-File "src\pages\Blog.jsx" `
    "<title>Bangladesh Law Blog $enDash Legal Guides by Advocate Md. Shah Alam, Uttara Dhaka</title>" `
    "<title>Bangladesh Legal Guide $enDash Free Legal Articles | Adv. Shah Alam, Uttara</title>" `
    "Shortened from 75 to 65 chars | 'Free Legal Articles' is a CTR hook"

Write-Host ""
Write-Host "=== BATCH 3: Blog Post metaTitles (blogPosts.js) ===" -ForegroundColor Cyan

# 11-16: Blog posts - add authority signal and fix missing metaTitle
$blogFile = "src\data\blogPosts.js"

Patch-File $blogFile `
    "metaTitle: 'Bail Process in Bangladesh $enDash Complete Legal Guide'," `
    "metaTitle: 'Bail Process in Bangladesh $enDash Complete Guide | Adv. Shah Alam'," `
    "Added authority signal | bail-process-bangladesh"

Patch-File $blogFile `
    "metaTitle: 'Divorce Procedure in Bangladesh $enDash Step-by-Step Guide'," `
    "metaTitle: 'Divorce Procedure Bangladesh $enDash Step-by-Step | Adv. Shah Alam'," `
    "Added authority; removed 'in' | divorce-procedure-bangladesh"

Patch-File $blogFile `
    "metaTitle: 'Land Dispute Cases in Bangladesh $enDash Legal Guide'," `
    "metaTitle: 'Land Dispute Cases Bangladesh $enDash Legal Guide | Adv. Shah Alam'," `
    "Added authority; removed 'in' | land-dispute-case-bangladesh"

Patch-File $blogFile `
    "metaTitle: 'Cheque Dishonour Case in Bangladesh $enDash Legal Rights & Process'," `
    "metaTitle: 'Cheque Dishonour Bangladesh $enDash Legal Rights & Process | Shah Alam'," `
    "Added authority; shortened | cheque-dishonour-case-law-bangladesh"

Patch-File $blogFile `
    "metaTitle: 'Child Custody Law in Bangladesh $enDash Legal Rights & Court Guide'," `
    "metaTitle: 'Child Custody Law Bangladesh $enDash Rights & Court Guide | Shah Alam'," `
    "Added authority; tightened | child-custody-law-bangladesh"

Patch-File $blogFile `
    "metaTitle: 'Court Marriage Procedure in Bangladesh $enDash Complete Legal Guide'," `
    "metaTitle: 'Court Marriage Procedure Bangladesh $enDash Complete Guide | Shah Alam'," `
    "Added authority; removed 'Legal' | court-marriage-procedure-bangladesh"

# 17: ADD missing metaTitle for anticipatory-bail-bangladesh
$anticipatoryOld = "        slug: 'anticipatory-bail-bangladesh',"
$anticipatoryNew = "        slug: 'anticipatory-bail-bangladesh',`n        metaTitle: 'Anticipatory Bail Bangladesh $enDash Apply Before Arrest | Adv. Shah Alam',"
Patch-File $blogFile $anticipatoryOld $anticipatoryNew "ADDED missing metaTitle | anticipatory-bail-bangladesh"

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Cyan
Write-Host "Total patches applied: $totalFixed / 17" -ForegroundColor White

# Validation: check all service page titles for remaining broken chars
Write-Host ""
Write-Host "=== VALIDATION ===" -ForegroundColor Cyan
$serviceFiles = @(
    "src\pages\services\CriminalLawyer.jsx",
    "src\pages\services\DivorceLawyer.jsx",
    "src\pages\services\LandLawyer.jsx",
    "src\pages\services\BailLawyer.jsx",
    "src\pages\services\SupremeCourtLawyer.jsx",
    "src\pages\services\TaxLawyer.jsx",
    "src\pages\services\CompanyCorporateLawyer.jsx"
)
foreach ($f in $serviceFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $metaLine = ($content -split "`n") | Where-Object { $_ -match 'metaTitle=' } | Select-Object -First 1
    $cleaned = $metaLine.Trim() -replace '[^\x20-\x7E\u2013\u2014\u2026\u2018\u2019\u201C\u201D]', '?'
    Write-Host "  $f"
    Write-Host "    metaTitle: $($cleaned.Trim())" -ForegroundColor Cyan
}
