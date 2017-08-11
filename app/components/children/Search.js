// Include React
// Include React
var React = require("react");
// Creating the Form component
class Search extends React.Component
{
    // Here we set a generic state associated with the text being searched for
    constructor(props){
        super(props);
        this.state = {term: "", startYear: "", endYear: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // This function will respond to the user input
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    // When a user submits...
    handleSubmit(event) {
        event.preventDefault();
    // Gets passed to main
        this.props.setTerm(this.state.term);
        this.props.setStartYear(this.state.startYear);
        this.props.setEndYear(this.state.endYear);

        this.setState({term: "", startYear: "", endYear: ""});
        console.log("term", this.state.term);
        console.log("start year", this.state.startYear);
        console.log("End Year" , this.state.endYear);
    }
    // Here we describe this component's render method
    render() {
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
                            {/*Start Year*/}
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
};

// Export the component back for use in other files
export default Search;
