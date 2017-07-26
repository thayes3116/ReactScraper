// Include React
var React = require("react");

var Search = React.createClass({

    getInitialState: function() {
        return { 
            term: "",
            startYear: "",
            endYear: ""
            };
    },   

    handleChange: function(event) {
        
        var name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    },

    handleSubmit: function(event) {
        
        event.preventDefault();

        this.props.setTerm(this.state.term);
        this.props.setStartYear(this.state.startYear);
        this.props.setEndYear(this.state.endYear);

        this.setState({term: "", startYear: "", endYear: ""});
        console.log("End Year" , this.props.endYear);
    },
   
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Search</h3>
                </div>
                <div className="panel-body text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/*Title*/}
                            <h4 className="">
                                <strong>Title</strong>
                            </h4>
                            <input
                                name="term"
                                value={this.state.term}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <h4 className="">
                                <strong>Start Year</strong>
                            </h4>
                            <input
                                name="startYear"
                                value={this.state.startYear}
                                type="text"
                                className="form-control text-center"
                                id="startYear"
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <h4 className="">
                                <strong>End Year</strong>
                            </h4>
                            <input
                                name="endYear"
                                value={this.state.endYear}
                                type="text"
                                className="form-control text-center"
                                id="endYear"
                                onChange={this.handleChange}
                                required
                            />
                            <br />

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});  

module.exports = Search;
