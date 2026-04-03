param()
$files = @(
  'src\pages\services\CriminalLawyer.jsx',
  'src\pages\services\DivorceLawyer.jsx',
  'src\pages\services\LandLawyer.jsx',
  'src\pages\services\BailLawyer.jsx',
  'src\pages\services\SupremeCourtLawyer.jsx',
  'src\pages\services\TaxLawyer.jsx',
  'src\pages\services\CompanyCorporateLawyer.jsx'
)
foreach ($f in $files) {
  $c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
  $hasBug = $c -match ([char]0xE2 + [char]0x80 + [char]0x9C)  # check for mojibake
  $hasBugSimple = $c.Contains("â€")
  Write-Host "[$f] hasBug=$hasBugSimple"
  if ($hasBugSimple) {
    $line = ($c -split "`n") | Where-Object { $_ -match "metaTitle" }
    Write-Host "  metaTitle line: $($line[0].Trim().Substring(0, [Math]::Min(80, $line[0].Trim().Length)))"
  }
}
