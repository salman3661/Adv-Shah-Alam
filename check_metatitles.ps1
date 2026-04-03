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
  $lines = $c -split "`n"
  $metaLine = $lines | Where-Object { $_ -match 'metaTitle=' } | Select-Object -First 1
  Write-Host "[$f]"
  Write-Host "  $($metaLine.Trim())"
  Write-Host ""
}
