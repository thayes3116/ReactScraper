var axios = require("axios");

var helper = {

  runQuery: function(title, starYear) {
    console.log("hot runQuery");
    var apiKey = "b1d19e116cfd40d789fc1f8a9404d128";
    var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${title}&?being_date=${startYear}`

    return axios.get(url).then(function(response) {
        var articleTitle = response.data.response.docs;
        console.log(articleTitle);
      if (articleTitle) {
        return articleTitle;
      }
      return "";
    });
  },

  getSaved: function() {
    return axios.get("/api/saved");
  },

  postSaved: function(Title, Url) {
      return axios.post("/api/saved", { title: Title, url: Url });
  }
};

module.exports = helper;