// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(title, startYear, endYear) {
    var apiKey = "b1d19e116cfd40d789fc1f8a9404d128";
    var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${title}&?being_date=${startYear}&?end_date=${endYear}`

    return axios.get(url).then(function(response) {
      console.log(response.data);
        var articleTitle = response.data.response.docs;
        // If get get a result, return that result's formatted address property
      if (articleTitle) {
        return articleTitle;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("http://localhost:8080/api/saved/");
  },

  // This function posts new searches to our database.
  postSaved: function(Title, Url) {
    console.log("title in postSaved", Title);
      return axios.post("http://localhost:8080/api/saved/", 
        {
         title: Title,
          url: Url 
        }
      ).then(function(response){
        console.log(response, "response");

      }).catch(function (error) {
        console.log(error, "error");
      });;
  },

  deleteSaved: function(_id) {
    console.log(_id, "_id saved title");
    return axios.post("http://localhost:8080/api/saved/delete/",
      {
        id:_id
      }
    ).then(function(response){
      console.log(response, "response");
    }).catch(function (error){
      console.log(error, "error");
    })
  }

};

// We export the API helper
module.exports = helper;