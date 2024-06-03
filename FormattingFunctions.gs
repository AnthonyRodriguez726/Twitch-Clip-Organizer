/**
 * Formats existing data in the sheet.
 */
function fixFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Format Column A (Timestamp)
  sheet.getRange(2, 1, lastRow - 1)
    .setHorizontalAlignment("left")
    .setNumberFormat("M/d/yyyy")
    .setFontFamily("Arial")
    .setFontSize(11);

  // Format Column B (Twitch Username), Column D (Payment Info), and Column E (Twitch Category)
  sheet.getRange(2, 2, lastRow - 1, 4)
    .setHorizontalAlignment("left")
    .setFontFamily("Arial")
    .setFontSize(11);

  // Format Column C (Clip URL)
  sheet.getRange(2, 3, lastRow - 1)
    .setWrap(false);

  // Format Column F (Automated Checks)
  sheet.getRange(2, 6, lastRow - 1)
    .setHorizontalAlignment("left")
    .setFontFamily("Arial")
    .setFontSize(10);
}

/**
 * Formats the newly submitted form data.
 * @param {Object} e - The form submit event object.
 */
function onFormSubmit(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();

  // Format Column A (Timestamp)
  sheet.getRange(row, 1)
    .setHorizontalAlignment("left")
    .setNumberFormat("M/d/yyyy")
    .setFontFamily("Arial")
    .setFontSize(11);

  // Format Column B (Twitch Username), Column D (Payment Info), and Column E (Twitch Category)
  sheet.getRange(row, 2, 1, 4)
    .setHorizontalAlignment("left")
    .setFontFamily("Arial")
    .setFontSize(11);

  // Format Column C (Clip URL)
  sheet.getRange(row, 3)
    .setWrap(false);

  // Format Column F (Automated Checks)
  sheet.getRange(row, 6)
    .setHorizontalAlignment("left")
    .setFontFamily("Arial")
    .setFontSize(10);
}