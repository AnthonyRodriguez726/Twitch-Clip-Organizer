/**
 * Populates the game names for Twitch clips in the sheet.
 */
function populateCategories() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var clipUrlColumn = 3;
  var gameNameColumn = 4;
  
  var lastRow = sheet.getLastRow();
  var clipUrls = sheet.getRange(2, clipUrlColumn, lastRow - 1).getValues();
  var gameNames = sheet.getRange(2, gameNameColumn, lastRow - 1).getValues();
  
  for (var i = 0; i < clipUrls.length; i++) {
    var clipUrl = clipUrls[i][0];
    var gameName = gameNames[i][0];
    
    if (clipUrl !== "" && gameName === "") {
      var clipId = extractClipId(clipUrl);
      var clipData = getClipData(clipId);
      
      if (clipData) {
        var gameName = getGameName(clipData.game_id);
        sheet.getRange(i + 2, gameNameColumn).setValue(gameName);
        SpreadsheetApp.flush(); // Force the sheet to update immediately
      } else {
        sheet.getRange(i + 2, gameNameColumn).setValue("Clip data not available");
        SpreadsheetApp.flush(); // Force the sheet to update immediately
      }
    }

  }
}


/**
 * Finds potential duplicate Twitch clips based on video ID and VOD offset.
 */
function findDuplicates() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var clipUrlIndex = headers.indexOf("Clip URL");
  var duplicateColumnIndex = 4; // Index of Column E (5th column)

  var vodGroups = {};

  // Retrieve video ID and VOD offset for each clip
  for (var i = 1; i < data.length; i++) {
    var clipUrl = data[i][clipUrlIndex];
    var clipId = extractClipId(clipUrl);

    if (clipId) {
      var clipData = getClipData(clipId);

      if (clipData) {
        var videoId = clipData.video_id;
        var vodOffset = clipData.vod_offset;

        if (!vodGroups[videoId]) {
          vodGroups[videoId] = [];
        }

        vodGroups[videoId].push({ row: i, offset: vodOffset, url: clipUrl });
      } else {
        Logger.log("Failed to retrieve data for clip: " + clipUrl);
      }
    }
  }

  // Find duplicates within each video group
  for (var videoId in vodGroups) {
    var clips = vodGroups[videoId];

    var offsetGroups = {};

    // Group clips within each video group based on offset
    for (var i = 0; i < clips.length; i++) {
      var clip = clips[i];
      var offsetGroup = Math.floor(clip.offset / 59);

      if (!offsetGroups[offsetGroup]) {
        offsetGroups[offsetGroup] = [];
      }

      offsetGroups[offsetGroup].push(clip);
    }

    // Find duplicates within each offset group
    for (var offsetGroup in offsetGroups) {
      var groupClips = offsetGroups[offsetGroup];

      if (groupClips.length > 1) {
        var earliestClip = groupClips[0];

        for (var i = 1; i < groupClips.length; i++) {
          var clip = groupClips[i];
          var cell = sheet.getRange(clip.row + 1, duplicateColumnIndex + 1);
          var existingValue = cell.getValue();
          var newValue = existingValue ? existingValue : "Potential Duplicate of Row " + (earliestClip.row + 1);
          cell.setValue(newValue);

          // Check the background color of the "Automated Checks" cell
          var backgroundColor = cell.getBackground();
          if (backgroundColor === "#ffffff" || backgroundColor === "white") {
            sheet.getRange(clip.row + 1, 1, 1, 6).setBackground("#fff2cc");
          }
        }
      }
    }
  }
}


/**
 * Identifies non-Twitch clips in the sheet.
 */
function identifyNonTwitchClips() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var clipUrlColumn = 3;
  var duplicateColumn = 5;
  
  var lastRow = sheet.getLastRow();
  var clipUrls = sheet.getRange(2, clipUrlColumn, lastRow - 1).getValues();
  
  for (var i = 0; i < clipUrls.length; i++) {
    var clipUrl = clipUrls[i][0];
    
    if (clipUrl !== "" && !isTwitchUrl(clipUrl)) {
      sheet.getRange(i + 2, duplicateColumn).setValue("Not a Twitch Clip");

      // Check the background color of the "Automated Checks" cell
      var backgroundColor = cell.getBackground();
      if (backgroundColor === "#ffffff" || backgroundColor === "white") {
        sheet.getRange(i + 2, 1, 1, 6).setBackground("#fff2cc");
      }
    }
  }
}

/**
 * Checks if the clips are from the correct channel.
 */
function checkClipChannel() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var clipUrlIndex = headers.indexOf("Clip URL");
  var channelColumnIndex = 4; // Index of Column E (5th column)

  for (var i = 1; i < data.length; i++) {
    var clipUrl = data[i][clipUrlIndex];
    var clipId = extractClipId(clipUrl);

    if (clipId) {
      var clipData = getClipData(clipId);

      if (clipData && !isCorrectChannel(clipData)) {
        var cell = sheet.getRange(i + 1, channelColumnIndex + 1);
        var existingValue = cell.getValue();
        if (existingValue.indexOf("Different Channel") === -1) {
          var newValue = existingValue ? existingValue + " / Different Channel" : "Different Channel";
          cell.setValue(newValue);

          // Check the background color of the "Automated Checks" cell
          var backgroundColor = cell.getBackground();
          if (backgroundColor === "#ffffff" || backgroundColor === "white") {
            sheet.getRange(i + 1, 1, 1, 6).setBackground("#fff2cc");
          }
        }
      }
    }
  }
}