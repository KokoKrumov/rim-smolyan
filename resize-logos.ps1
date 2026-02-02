Add-Type -AssemblyName System.Drawing

# Resize logo192.png to 192x192 with transparent padding
$img192 = [System.Drawing.Image]::FromFile("$PSScriptRoot/public/logo192.png")
$newImg192 = New-Object System.Drawing.Bitmap(192, 192)
$g192 = [System.Drawing.Graphics]::FromImage($newImg192)
$g192.Clear([System.Drawing.Color]::Transparent)
$x192 = [int]((192 - $img192.Width) / 2)
$y192 = [int]((192 - $img192.Height) / 2)
$g192.DrawImage($img192, $x192, $y192, $img192.Width, $img192.Height)
$img192.Dispose()
$g192.Dispose()
$newImg192.Save("$PSScriptRoot/public/logo192_new.png", [System.Drawing.Imaging.ImageFormat]::Png)
$newImg192.Dispose()
Write-Host "Created logo192_new.png (192x192)"

# Resize logo512.png to 512x512 with transparent padding
$img512 = [System.Drawing.Image]::FromFile("$PSScriptRoot/public/logo512.png")
$newImg512 = New-Object System.Drawing.Bitmap(512, 512)
$g512 = [System.Drawing.Graphics]::FromImage($newImg512)
$g512.Clear([System.Drawing.Color]::Transparent)
$x512 = [int]((512 - $img512.Width) / 2)
$y512 = [int]((512 - $img512.Height) / 2)
$g512.DrawImage($img512, $x512, $y512, $img512.Width, $img512.Height)
$img512.Dispose()
$g512.Dispose()
$newImg512.Save("$PSScriptRoot/public/logo512_new.png", [System.Drawing.Imaging.ImageFormat]::Png)
$newImg512.Dispose()
Write-Host "Created logo512_new.png (512x512)"

Write-Host "Done! Please review the new images and rename them to replace the originals."
