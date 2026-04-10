# Google Sheet Integration Setup (Apply Form)

This project is already wired to send application data to a Google Apps Script webhook.

## 1. Create the Google Sheet

1. Open Google Sheets and create a new spreadsheet.
2. Rename the first tab to `Applications`.
3. Add this header row in row 1:

`Timestamp | Full Name | Email Address | Phone / WhatsApp | Track | Why This Track | Program | Cohort | Focus Area | Source Page`

## 2. Create Apps Script

1. In the sheet, click `Extensions` -> `Apps Script`.
2. Replace the default code with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications');
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.fullName || '',
    data.emailAddress || '',
    data.phoneWhatsapp || '',
    data.track || '',
    data.whyThisTrack || '',
    data.program || '',
    data.cohort || '',
    data.focusArea || '',
    data.sourcePage || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click `Save` and name the project (for example: `PATC Applications Webhook`).

## 3. Deploy as Web App

1. Click `Deploy` -> `New deployment`.
2. Select type `Web app`.
3. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
4. Click `Deploy`.
5. Authorize permissions when prompted.
6. Copy the `Web app URL`.

Important: If you edit script code later, deploy a new version and use the latest Web app URL.

## 4. Connect URL to the Website

Open [pages/apply.html](/home/clark/Desktop/ Preneur AgroTech College/pages/apply.html:20) and set:

```html
<body data-root=".." data-page="apply" data-sheet-webhook="PASTE_WEB_APP_URL_HERE">
```

## 5. Test End-to-End

1. Start/refresh your local preview.
2. Open `/pages/apply.html`.
3. Fill all fields, accept terms, and submit.
4. Confirm a new row appears in the `Applications` sheet.

## Troubleshooting

- If submit shows success but no row appears:
  - Verify sheet tab is exactly `Applications`.
  - Confirm the webhook URL in `data-sheet-webhook` is the latest deployed URL.
  - Ensure deployment access is `Anyone`.
- If you changed script code and it stopped working:
  - Redeploy (`Deploy` -> `Manage deployments` -> edit/deploy new version).
