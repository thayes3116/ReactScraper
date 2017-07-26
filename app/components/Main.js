var React = require("react");

var Search = require("./children/Search");
var Saved = require("./children/Saved");
var Results = require("./children/Results");

var helpers = require("./helpers");

var Main = React.createClass({
    
    getInitialState: function() {
    return {
        searchTerm: "",
        starYear: "",
        endYear: "",
        results:[],
        saved: []
        };
    },
    
    componentDidMount: function() {
        helpers.getSaved().then(function (response) {
            if (response !== this.state.saved) {
                this.setState({Saved: response.data});
            }
        }.bind(this));
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            
            this.setState({results: []});
            console.log(this.state.searchTerm, "search term didupdate");
            helpers.runQuery(this.state.searchTerm, this.state.startYear).then(function (data) {
               
                if (data !== this.state.results) {
                    
                    for (var i = 0; i < 6; i++) {
                        var newResults = {head: data[i].lead_paragraph, url:data[i].web_url};
                        console.log(newResults, "newResults")
                        this.setState({results: this.state.results.push(newResults)});
                    }
                }
            }.bind(this));
        }
    },

    setTerm: function(term) {
        this.setState({searchTerm: term});
    },

    setStartYear: function(startYear) {
        this.setState({starYear: startYear});
    },

    setEndYear: function(endYear) {
        this.setState({endYears: endYear});
    },

    // getClick: function(todo) {

    //     helpers.postSaved(todo.head, todo.url).then(function () {
    //         helpers.getSaved().then(function (response) {
    //             this.setState({Saved: response.data});
    //             console.log('Saved', this.state.saved);
    //         }.bind(this));
    //     }.bind(this));
    // },
      render: function() {

        return (

          <div className="container">
            <div className="jumbotron text-center">
              <h2><strong>NY Times Article Scrubber</strong></h2>
              <p><em>Search for and annotate articles of interest</em></p>
              <hr />
              
            </div>

            <div className="row text-center">
                <Search 
            setTerm={this.setTerm}
            setEndYear={this.setEndYear}
            setStartYear={this.setStartYear}/>
            </div>

            <div className="row text-center">
               
                <Results results={this.state.results}/>
            </div> 

            <div className="row text-center">
                <Saved />
             </div>
          </div>
        );
      }
});

module.exports = Main;
