# Twitch Clip Organizer

This Google Apps Script automates various tasks related to managing Twitch clips in a Google Sheets spreadsheet. It provides functionalities such as populating game categories, finding potential duplicate clips, filtering clips based on channels, identifying non-Twitch clips, and automated spreadsheet formatting.

Demo Video:

https://github.com/AnthonyRodriguez726/Twitch-Clip-Organizer/assets/11856062/7f753e7e-4b3f-40ca-a91a-618a71498ba9



## Features

- Populate Twitch Categories: Automatically retrieves and populates the categories for Twitch clips in the sheet.
- Find Potential Duplicates: Identifies potential duplicate Twitch clips based on video ID and VOD offset.
- Filter Channels: Identifies and flags clips from specific Twitch channels.
- Identify Non-Twitch Clips: Detects and flags clips that are not from Twitch.
- Fix Formatting: Applies consistent formatting to the sheet, including cell alignment, number formatting, and font styles.
- Run All Functions: Executes all the above functions in a single operation.

## Prerequisites

Before using this script, make sure you have the following:

- A Google Account with access to Google Sheets.
- [Twitch API](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/) credentials (Client ID and Bearer Token) for making API requests.

## Setup

1. Open your Google Sheets spreadsheet.
2. Go to "Extensions" > "Apps Script" to open the Google Apps Script editor.
3. Copy and paste the provided code into the script editor. (Feel free to organize your Apps Script project however you want. All server-side files are loaded into a shared global namespace.)
4. Create a new [script property](https://developers.google.com/apps-script/guides/properties#saving_data) named `BEARER_TOKEN` and set its value to your Twitch API Bearer Token.
5. Create another script property named `CLIENT_ID` and set its value to your Twitch API Client ID.
6. Save the script and close the script editor.

## Usage

1. Open your Google Sheets spreadsheet.
2. You will see a new menu named "Twitch Clips" in the menu bar.
3. Click on the desired function from the "Twitch Clips" menu to execute it.
4. The script will process the data in the sheet and update the relevant cells accordingly.

## Customization

- You can modify the script to adapt it to your specific requirements.
- Make sure to update the `correctChannelId` variable in the `isCorrectChannel` function with the desired broadcaster's ID.
- Adjust the formatting styles in the `fixFormatting` and `onFormSubmit` functions to match your preferred layout.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
