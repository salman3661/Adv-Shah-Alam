# insert_new_posts.ps1
# Inserts new EN blog posts before the closing ]; in blogPosts.js

$mainFile = "src\data\blogPosts.js"
$batch1   = "new_posts_en_1.js"
$batch2   = "new_posts_en_2.js"

$main = [System.IO.File]::ReadAllText($mainFile, [System.Text.Encoding]::UTF8)
$b1   = [System.IO.File]::ReadAllText($batch1,   [System.Text.Encoding]::UTF8)
$b2   = [System.IO.File]::ReadAllText($batch2,   [System.Text.Encoding]::UTF8)

# Find the last ]; and insert before it
$insertPoint = $main.LastIndexOf('];')
if ($insertPoint -lt 0) {
    Write-Error "Could not find closing ]; in blogPosts.js"
    exit 1
}

$newContent = $main.Substring(0, $insertPoint) + $b1 + $b2 + $main.Substring($insertPoint)
[System.IO.File]::WriteAllText($mainFile, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully inserted new EN blog posts into $mainFile"
