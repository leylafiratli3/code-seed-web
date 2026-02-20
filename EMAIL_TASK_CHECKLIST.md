# Email Send Checklist (Simple)

## 1. Build for mobile first
- Add in `<head>`: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Use a centered wrapper table: `width="600"` + `style="max-width:600px; width:100%; margin:0 auto;"`
- Keep body text mostly `14px-16px` (prefer `16px` for readability)

## 2. Use email-safe layout
- Use table-based layout (`<table role="presentation">`)
- Avoid flex/grid/absolute positioning for critical structure
- Keep side padding modest on mobile (about `12px-20px`)

## 3. Make media responsive
- For images: `style="max-width:100% !important; height:auto !important; display:block;"`
- Avoid large fixed-width media wider than the container

## 4. Pre-send QA
- Check links (`https`, `mailto`, tracking links)
- Verify subject/preheader and sender name
- Confirm alt text on important images
- Send test to Gmail mobile + Gmail desktop + Outlook

## 5. Final send steps
- Send a final internal test
- Confirm no encoding glitches (special characters, apostrophes, arrows)
- Schedule/send
- Archive final HTML used for the send

## 6. Run + send (Premailer first)
- Install once (requires Ruby): `gem install premailer nokogiri`
- Inline CSS before sending (use this exact command):

```powershell
premailer email/newsletters/newsletter-2.html --remove-classes > email/newsletters/output-newsletter-2.html
```

- Send a single test email:

```powershell
$cred = New-Object System.Management.Automation.PSCredential(
  "codeseedtech@gmail.com",
  (ConvertTo-SecureString "YOUR_APP_PASSWORD" -AsPlainText -Force)
)

$html = Get-Content -Raw -Encoding UTF8 "email/newsletters/output-newsletter-2.html"

Send-MailMessage `
  -From "codeseedtech@gmail.com" `
  -To "leylafiratli3@gmail.com" `
  -Subject "Newsletter test" `
  -Body $html `
  -BodyAsHtml `
  -Encoding UTF8 `
  -SmtpServer "smtp.gmail.com" `
  -Port 587 `
  -UseSsl `
  -Credential $cred
```

## 7. Send to a CSV list
- CSV format (example file: `recipients.csv`):

```csv
email
person1@example.com
person2@example.com
```

- Send to every row in the CSV:

```powershell
$cred = New-Object System.Management.Automation.PSCredential(
  "codeseedtech@gmail.com",
  (ConvertTo-SecureString "YOUR_APP_PASSWORD" -AsPlainText -Force)
)

$html = Get-Content -Raw -Encoding UTF8 "email/newsletters/output-newsletter-2.html"
$recipients = Import-Csv -Path "recipients.csv"

foreach ($r in $recipients) {
  if ([string]::IsNullOrWhiteSpace($r.email)) { continue }
  Send-MailMessage `
    -From "codeseedtech@gmail.com" `
    -To $r.email `
    -Subject "Newsletter" `
    -Body $html `
    -BodyAsHtml `
    -Encoding UTF8 `
    -SmtpServer "smtp.gmail.com" `
    -Port 587 `
    -UseSsl `
    -Credential $cred
}
```

- Before production send:
- Run one test first
- Confirm subject line
- Keep using an app password (not your normal Gmail password)
