import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import cors from 'cors';

const categories = [
  "Entertainment",
  "Education",
  "Music",
  "Gaming",
  "Vlogs",
  "Science and Technology",
  "Beauty and Fashion",
  "Food and Cooking",
  "Travel",
  "Fitness",
  "Kids` Content",
];

dotenv.config();
const app = express();
let nextPageToken = '';
const apiKey = process.env.API_KEY;

app.use(express.static('public')); // Serve static files from the 'public' folder
app.use(express.json()); // For parsing application/json
app.use(cors());

// Endpoint to fetch channel info
app.get('/fetch-channel', async (req, res) => {
  console.log(req);
  console.log(nextPageToken);
  let url = '';
  if (nextPageToken) {
    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=channel&pageToken=${nextPageToken}&key=${apiKey}`;
  } else {
    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=channel&q=${categories[1]}&regionCode=KR&key=${apiKey}`;
  }

  try {
      const response = await fetch(url);
      const data = await response.json();

      nextPageToken = data?.nextPageToken;

      if (data.items && data.items.length > 0) {
        for (const item of data?.items) {
          await saveChannelIdToFile(item?.id?.channelId, categories[1]);
        }
        res.status(200).json({ message: 'Success' });
      } else {
          res.status(404).json({ message: "Channel not found." });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Save channel ID to a JSON file
const saveChannelIdToFile = async (channelId, category) => {
    const filePath = './idData.json';

    try {
        let jsonData = {};
        if (fs.existsSync(filePath)) {
            jsonData = await fs.readJson(filePath);
        }

        if (!jsonData[category]) {
            jsonData[category] = [];
        }

        jsonData[category].push(channelId);
        await fs.writeJson(filePath, jsonData, { spaces: 2 });
        console.log(`Channel ID ${channelId} saved to ${category} category.`);
    } catch (error) {
        console.error("Error saving channel ID:", error.message);
    }
};

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
