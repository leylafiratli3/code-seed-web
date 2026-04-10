# Sending an HTML Email Newsletter

End-to-end instructions for sending a CodeSeed HTML newsletter from this repo using PowerShell + Gmail SMTP. Read the **Gotchas** section at the bottom before your first send — several non-obvious bugs will silently corrupt your email if you don't handle them.

---

## Prerequisites (one-time setup)

1. **Ruby + Premailer** (inlines CSS so Gmail/Outlook don't strip it):
   ```powershell
   gem install premailer nokogiri
   ```
2. **Gmail app password** for `codeseedtech@gmail.com`. Generate at https://myaccount.google.com/apppasswords. Requires 2FA enabled on the account. Never use the regular Gmail password.
3. **Recipient CSV files** at the repo root:
   - `testrecipients.csv` — 1–2 addresses you control (for QA sends)
   - `recipients.csv` — the real send list
   - Both files use this format:
     ```csv
     email
     person@example.com
     ```

---

## Authoring checklist (before you send)

When building the newsletter HTML:

- **Mobile-first:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in `<head>`, centered wrapper table `width="600"` + `max-width:600px`, body text 14–16px.
- **Table-based layout** (`<table role="presentation">`). No flex/grid/absolute positioning for structure.
- **Images must use absolute `https://` URLs.** Relative paths like `src="assets/foo.png"` will NEVER load in email clients — they have no base URL. Use `https://code-seed.io/assets/foo.png` (or wherever the asset is publicly hosted). Verify the URL actually resolves in a browser before sending.
- **No webp images.** Outlook desktop on Windows does not render webp. Use PNG or JPEG. ~600–800 KB is fine for a hero image; don't over-optimize.
- **Responsive images:** `style="max-width:100% !important; height:auto !important; display:block;"`
- **Alt text** on every meaningful image.

---

## The send workflow

### Step 1 — Inline CSS with Premailer (UTF-8 safe)

**Do not use `premailer ... > output.html`.** Windows PowerShell 5.1's `>` operator writes UTF-16 LE with a BOM, which corrupts the file for downstream steps. Use this block instead:

```powershell
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false
$OutputEncoding           = New-Object System.Text.UTF8Encoding $false

$html = premailer email/newsletters/newsletter-NAME.html --remove-classes | Out-String

[System.IO.File]::WriteAllText(
  "$PWD\email\newsletters\output-newsletter-NAME.html",
  $html,
  (New-Object System.Text.UTF8Encoding $false)
)

Write-Host "Wrote output-newsletter-NAME.html"
```

Replace `newsletter-NAME.html` with the actual source filename.

**Verify the output is actually UTF-8 (not UTF-16):**

```powershell
$bytes = [System.IO.File]::ReadAllBytes("email/newsletters/output-newsletter-NAME.html")
"First 4 bytes: " + (($bytes[0..3] | ForEach-Object { $_.ToString('x2') }) -join ' ')
```

You should see something starting with `3c` (the `<` of `<!DOCTYPE`). If you see `ff fe`, the file is UTF-16 LE and recipients will get garbled text. Fix the encoding before sending.

### Step 2 — Send to TEST recipients

Edit the `$appPassword` and `$subject` lines, then paste the whole block into PowerShell from the repo root:

```powershell
# --- config ---
$fromAddress = "codeseedtech@gmail.com"
$appPassword = "YOUR_APP_PASSWORD_HERE"
$subject     = "Your Newsletter Subject Here"
$htmlPath    = "email/newsletters/output-newsletter-NAME.html"
$csvPath     = "testrecipients.csv"

# --- load html as UTF-8 ---
$html = [System.IO.File]::ReadAllText(
  (Resolve-Path $htmlPath),
  [System.Text.Encoding]::UTF8
)

# --- smtp client ---
$smtp = New-Object System.Net.Mail.SmtpClient("smtp.gmail.com", 587)
$smtp.EnableSsl = $true
$smtp.Credentials = New-Object System.Net.NetworkCredential($fromAddress, $appPassword)

# --- send loop ---
$recipients = Import-Csv -Path $csvPath
foreach ($r in $recipients) {
  if ([string]::IsNullOrWhiteSpace($r.email)) { continue }

  $msg = New-Object System.Net.Mail.MailMessage
  $msg.From = $fromAddress
  $msg.To.Add($r.email)
  $msg.Subject         = $subject
  $msg.SubjectEncoding = [System.Text.Encoding]::UTF8
  $msg.Body            = $html
  $msg.BodyEncoding    = [System.Text.Encoding]::UTF8
  $msg.IsBodyHtml      = $true

  $smtp.Send($msg)
  $msg.Dispose()
  Write-Host "Sent to $($r.email)"
}

$smtp.Dispose()
Write-Host "Done."
```

### Step 3 — QA the test emails

Open every test inbox and confirm:

- **Character rendering:** em dashes (`—`), middle dots (`·`), apostrophes, and non-breaking hyphens display correctly. If you see glyphs like `ΓÇö`, `┬╖`, or `ΓÇæ`, the encoding is broken — stop and fix before going to production.
- **Images load** (including the hero).
- **Links work** (`https`, `mailto`, any tracking links).
- **Layout holds** on Gmail mobile, Gmail desktop, and Outlook if you have access.
- **Sender name** and **subject line** look right.
- **Preheader** (first visible text snippet) reads well.

### Step 4 — Production send

Only after the test looks clean, change ONE line in the send block:

```powershell
$csvPath     = "recipients.csv"
```

Re-run the same block. You'll see one `Sent to ...` line per recipient.

### Step 5 — Archive

The `output-newsletter-NAME.html` file is the exact HTML that went out. Commit it to git so you have a record of the send.

---

## Gotchas (hard-won lessons)

### 1. PowerShell 5.1's `>` writes UTF-16 LE, not UTF-8

If you run `premailer ... > output.html`, the file will be UTF-16 LE with a BOM. When the send script reads it back as UTF-8, every non-ASCII character becomes mojibake. **Always use the `File.WriteAllText` block in Step 1.** Verify with the first-4-bytes check.

### 2. `Send-MailMessage` doesn't reliably set the MIME charset

Even with `-Encoding UTF8`, `Send-MailMessage` has been observed sending the body without a proper `charset=utf-8` in the `Content-Type` header. Recipients' clients then guess (usually wrong → CP1252) and show garbled characters. **Use `System.Net.Mail.MailMessage` + `SmtpClient` directly** with `BodyEncoding = [System.Text.Encoding]::UTF8` and `SubjectEncoding = [System.Text.Encoding]::UTF8`. That's what the Step 2 script does.

### 3. Symptom → cause cheat sheet for character garbling

| Visible symptom | Means |
|---|---|
| `ΓÇö` where `—` should be | UTF-8 bytes rendered as CP437/CP850 (charset header wrong or file was UTF-16) |
| `┬╖` where `·` should be | Same — UTF-8 bytes interpreted as a single-byte code page |
| `â€"`, `â€™` | UTF-8 bytes interpreted as CP1252 |
| Completely blank message / square boxes | File is UTF-16 LE but declared as UTF-8 |

### 4. Relative image paths never work in email

An email client has no base URL. `<img src="assets/foo.png">` always fails. Every image must be an absolute `https://` URL pointing at a publicly hosted asset. Verify by pasting the URL into a browser before sending.

### 5. Don't use webp

Outlook desktop on Windows can't render webp. Use PNG or JPEG.

### 6. Get-Content -Raw vs File.ReadAllText

On Windows PowerShell 5.1, `Get-Content -Raw -Encoding UTF8` has edge cases with BOM-less UTF-8 files. `[System.IO.File]::ReadAllText(path, [System.Text.Encoding]::UTF8)` is more reliable — use it in the send script.

### 7. App passwords, not regular Gmail passwords

Gmail SMTP with your normal account password has been disabled for years. You need a 16-character app password, which requires 2FA on the account.

---

## Error reference

| Error | Likely cause |
|---|---|
| `Cannot find path ... output-newsletter-NAME.html` | You skipped Step 1 (premailer), or `$htmlPath` is wrong |
| `5.7.0 Authentication Required` / `The SMTP server requires a secure connection` | Wrong app password, 2FA not enabled, or you used the regular Gmail password |
| `The operation has timed out` | Network / firewall blocking outbound port 587 |
| Recipients see `ΓÇö` etc. | See Gotchas 1, 2, 3 — rerun Step 1 verification |
| Recipients see broken image icons | Image `src` is a relative path, or the absolute URL isn't publicly reachable, or it's a webp |
