const API_KEY = "AIzaSyDDjnAdOSr8nZa0-jkkRGb4erV3lxuWRD4";
const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=Music&regionCode=KR&key=${API_KEY}`;

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

const channelBtn = document.querySelector(".channel");

channelBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error("fail to Fetch!");
    }

    const data = await response.json();

    console.log(data);
  } catch {
    throw new Error("fail to Fetch!");
  }
});
