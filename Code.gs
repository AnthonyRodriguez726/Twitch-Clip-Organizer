/**
 * Adds a custom menu to the Google Sheets UI.
 */
function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Twitch Clips')
    .addItem('Populate Twitch Categories', 'populateCategories')
    .addItem('Find Potential Duplicates', 'findDuplicates')
    .addItem('Check for Incorrect Channels', 'checkClipChannel')
    .addItem('Identify Non-Twitch Clips', 'identifyNonTwitchClips')
    .addItem('Fix Formatting', 'fixFormatting')
    .addItem('Run All Functions', 'runAllFunctions')
    .addToUi();
}


/**
 * Runs all the functions in the script.
 * Add or remove functions from this list to customize the behavior of the "Run All Functions" option.
 */
function runAllFunctions() {
  populateCategories();
  identifyNonTwitchClips();
  findDuplicates();
  checkClipChannel();
  fixFormatting();
}