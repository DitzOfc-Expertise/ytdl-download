let axios = require('axios')

class Youtube {
  constructor() {}

  async search(query) {
    const data = "query=" + encodeURIComponent(query) + "&vt=" + encodeURIComponent("downloader");
    const headers = {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
      'Accept': "*/*",
      'X-Requested-With': "XMLHttpRequest"
    };

    try {
      const response = await axios.post("https://tomp3.cc/api/ajax/search?hl=en", data, {
        headers: headers
      });

      const items = response.data.items.map(item => ({
        'id': item.v,
        'title': item.t,
        'url': "https://www.youtube.com/watch?v=" + item.v
      }));

      return {
        'status': response.data.status,
        'mess': response.data.mess,
        'p': response.data.p,
        'items': items
      };

    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async ytdlnew(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append("query", query);
        searchParams.append('vt', "mp3");

        const searchResponse = await axios.post("https://tomp3.cc/api/ajax/search", searchParams.toString(), {
          headers: {
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
            'Accept': "*/*",
            'X-Requested-With': "XMLHttpRequest"
          }
        });

        if (searchResponse.data.status !== 'ok') {
          throw new Error("Failed to search for the video.");
        }

        const videoId = searchResponse.data.vid;
        const videoTitle = searchResponse.data.title;
        const mp4Link = searchResponse.data.links.mp4;
        const mp3Link = searchResponse.data.links.mp3;
        const mp4Key = mp4Link[136];
        const mp3Key = mp3Link.mp3128;

        const mp4Params = new URLSearchParams();
        mp4Params.append("vid", videoId);
        mp4Params.append('k', mp4Key.k);

        const mp4Response = await axios.post("https://tomp3.cc/api/ajax/convert", mp4Params.toString(), {
          headers: {
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
            'Accept': "*/*",
            'X-Requested-With': "XMLHttpRequest"
          }
        });

        if (mp4Response.data.status !== 'ok') {
          throw new Error("Failed to convert the video to MP4.");
        }

        const mp4DownloadLink = mp4Response.data.dlink;

        const mp3Params = new URLSearchParams();
        mp3Params.append("vid", videoId);
        mp3Params.append('k', mp3Key.k);

        const mp3Response = await axios.post("https://tomp3.cc/api/ajax/convert", mp3Params.toString(), {
          headers: {
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
            'Accept': "*/*",
            'X-Requested-With': "XMLHttpRequest"
          }
        });

        if (mp3Response.data.status !== 'ok') {
          throw new Error("Failed to convert the video to MP3.");
        }

        const mp3DownloadLink = mp3Response.data.dlink;

        resolve({
          'title': videoTitle,
          'mp4DownloadLink': mp4DownloadLink,
          'mp3DownloadLink': mp3DownloadLink
        });

      } catch (error) {
        reject("Error: " + error.message);
      }
    });
  }
}

module.exports = Youtube

module.exports.default = Youtube