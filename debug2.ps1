param()
$fullPath = "src\pages\services\CriminalLawyer.jsx"
$bytes = [System.IO.File]::ReadAllBytes($fullPath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)
$idx = $content.IndexOf("Criminal Lawyer in Uttara, Dhaka ")
if ($idx -ge 0) {
    $start = $idx + 33
    $dashBytes = $bytes[$start..($start+7)]
    $hexDump = ($dashBytes | ForEach-Object { $_.ToString("X2") }) -join " "
    Write-Host "Bytes after 'Dhaka ': $hexDump"
    Write-Host "As chars: $($content[$start..($start+4)] -join ' ')"
}
