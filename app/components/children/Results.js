  // Include React
var React = require("react");

class Results extends React.Component{

    // Here we render the function
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results</h3>
                </div>
                <div className="panel-body text-center">
                    {this.url}
                  {/*Maps through the results array in the constructor*/}
                    {this.props.results.map((search, i) => {
                        return (
                            <div key={i}> 
                                <p>
                                    <a href={search.url} target="_blank">{search.head}</a>
                                </p>
                                <br></br>
                                <p>{search.snippet}</p>
                                <br></br>
                                <p>Date Published: {search.pub_date}</p>
                                <button className="o" onClick={this.props.getClicked.bind(this, search)} type="button btn-success">Save</button>
                                <br></br>
                                <hr></hr>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

// Export the component back for use in other files
export default Results;