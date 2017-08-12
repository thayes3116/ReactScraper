var React = require("react");

// Here we include all of the sub-components
import Form from "./children/Search";
import Results from "./children/Results";
import Saved from "./children/Saved";

// Helper for making AJAX requests to our API
import helpers from "./helpers";

// Creating the Main component
class Main extends React.Component {
    // This is the equivalent of our "getInitialState"
    constructor(props) {
        // This super(props) line lets us access our parents properties as props.
        super(props);

        this.state = {
            searchTerm: "",
            startYear: "",
            endYear: "",
            results:[],
            Saved: []
        };

        this.setTerm = this.setTerm.bind(this);
        this.setStartYear = this.setStartYear.bind(this);
        this.setEndYear = this.setEndYear.bind(this);
        this.getClick = this.getClick.bind(this);
        this.getDelete = this.getDelete.bind(this);
    }

    // The moment the page renders get the Saved
    componentDidMount() {
        // Get the latest Saved.
        helpers.getSaved().then(function (response) {
            if (response !== this.state.Saved) {
                this.setState({Saved: response.data});
            }
        }.bind(this));
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate(prevProps, prevState) {
        // Run the query for the Search
        if (prevState.searchTerm !== this.state.searchTerm) {
            //Clears the Results array if there is a new Search
            console.log(this.state, "this.state in components");
            this.setState({results: []});
            helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function (data) {
                
                if (data !== this.state.results) {
                    for (var i = 0; i < 8; i++) {
                        var newResults = {head: data[i].headline.main, url:data[i].web_url, snippet:data[i].snippet, pub_date:data[i].pub_date};
                        // Pushes to results array
                        this.setState({results: this.state.results.concat(newResults)});
                    }
                }
            }.bind(this));
        }
    }

    // This function allows childrens to update the parent.
    setTerm(term) {
        this.setState({searchTerm: term});
    }

    setStartYear(startYear) {
        this.setState({starYear: startYear});
    }

    setEndYear(endYear) {
        this.setState({endYears: endYear});
    }

    getClick(article) {
        // console.log("article in get clicked", article);
        helpers.postSaved(article.head, article.url).then(function () {
            // After we've done the post... then get the updated Saved
            helpers.getSaved().then(function (response) {
                this.setState({Saved: response.data});
                // console.log('Saved', this.state.Saved);
            }.bind(this));
        }.bind(this));
    }

    getDelete(article){
        // console.log(article._id, "article in get delete");
        helpers.deleteSaved(article._id).then(function(){
            // After we've done the delete... then get the updated Saved
            helpers.getSaved().then(function (response) {
                this.setState({Saved: response.data});
                }.bind(this));
        }.bind(this));
    }

    // Here we render the function
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">NY Times Article Search</h2>
                        <p className="text-center">
                            <em>Search for articles that interest you</em><br></br>
                            <em>Save them</em><br></br>
                            <em>Delete them</em>
                        </p>
                    </div>

                    <div className="col-md-6">

                        <Form setTerm={this.setTerm} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>

                    </div>

                    <div className="col-md-6">

                        <Results results={this.state.results} getClicked={this.getClick}/>

                    </div>

                </div>

                <div className="row">

                    <Saved Saved={this.state.Saved} getDelete={this.getDelete}/>

                </div>

            </div>
        );
    }
}
;

// Export the component back for use in other files
export default Main;