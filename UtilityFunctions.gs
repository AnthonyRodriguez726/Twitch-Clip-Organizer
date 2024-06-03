/**
 * Retrieves the game name from the Twitch API using the game ID.
 * @param {string} gameId - The ID of the game.
 * @returns {string} - The name of the game.
 */
function getGameName(gameId) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var bearerToken = scriptProperties.getProperty('BEARER_TOKEN');
  var clientId = scriptProperties.getProperty('CLIENT_ID');
  var url = "https://api.twitch.tv/helix/games?id=" + gameId;
  
  var options = {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + bearerToken,
      "Client-Id": clientId
    }
  };
  console.log("getGameName url " + url);
  try {
    var response = UrlFetchApp.fetch(url, options);
    var result = response.getContentText();
    var dataObject = JSON.parse(result);
    
    if (dataObject.data && dataObject.data.length > 0) {
      return dataObject.data[0].name;
    } else {
      return "Game not found";
    }
  } catch (error) {
    return "Error retrieving game name";
  }
}


/**
 * Retrieves clip data from the Twitch API using the clip ID.
 * @param {string} clipId - The ID of the clip.
 * @returns {Object} - The clip data object containing game_id, video_id, and vod_offset.
 */
function getClipData(clipId) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var bearerToken = scriptProperties.getProperty('BEARER_TOKEN');
  var clientId = scriptProperties.getProperty('CLIENT_ID');
  var url = "https://api.twitch.tv/helix/clips?id=" + clipId;

  var options = {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + bearerToken,
      "Client-Id": clientId
    }
  };
  console.log("getClipData url: " + url);
  try {
    var response = UrlFetchApp.fetch(url, options);
    var result = response.getContentText();

    var dataObject = JSON.parse(result);

    if (dataObject.data && dataObject.data.length > 0) {
      var clipData = dataObject.data[0];
      return {
        game_id: clipData.game_id,
        video_id: clipData.video_id,
        vod_offset: clipData.vod_offset,
        broadcaster_id: clipData.broadcaster_id
      };
    } else {
      return "No clip data found for clip ID: " + clipId;
    }
  } catch (error) {
    console.log(error);
    return "Error retrieving clip data";
  }
}


/**
 * Checks if a given URL is a valid Twitch clip URL.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is a valid Twitch clip URL, false otherwise.
 */
function isTwitchUrl(url) {
  var twitchPattern = /^https?:\/\/(www\.)?(clips\.twitch\.tv|twitch\.tv\/\w+\/clip)\//;
  return twitchPattern.test(url);
}


/**
 * Extracts the clip ID from a Twitch clip URL.
 * @param {string} clipUrl - The URL of the Twitch clip.
 * @returns {string|null} - The clip ID if found, null otherwise.
 */
function extractClipId(clipUrl) {
  var regex = /(?:clips\.twitch\.tv\/|twitch\.tv\/\w+\/clip\/)([^\s?&#]+)/;
  var match = clipUrl.match(regex);
  console.log("extractClipId:" + match);
  return match ? match[1] : null;
}

/**
 * Checks if the clip is from the correct channel.
 * @param {Object} clipData - The clip data object.
 * @returns {boolean} - True if the clip is from the correct channel, false otherwise.
 */
function isCorrectChannel(clipData) {
  var correctChannelId = '29400754'; // Replace with Broadcaster's ID
  return clipData.broadcaster_id === correctChannelId;
}