// Include React
var React = require("react");


class Saved extends React.Component {
    render() {
        console.log(this.props, 'this.props');
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body text-center">

                    {/* Here we use a map function to loop through an array in JSX */}
                    {this.props.Saved.map((search, i) => {
                        return (
                            <div key={i}>
                                <a href={search.url} target="_blank" >{search.title} - {search.date}</a>
                                <button onClick={this.props.getDelete.bind(this, search)} className="o btn btn-danger">Delete</button>
                                <br/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Saved ;
