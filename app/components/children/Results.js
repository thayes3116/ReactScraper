  // Include React
var React = require("react");

var Results = React.createClass({
    
    // if(this.props.results !== []){
    //     var headPARA = this.props.results[0].head
    // }
    console.log(this.props.results, "results in results");
    var results = this.props.results;
    for(var i = 0; i < this.props.results.length; i++){
        var article = ("<div>");
        var head = ("<p>").text(this.props.results[i].head);
        var url = ("<p>").text(this.props.results[i].url)
        var button =("<button className='save>Save</button>")
        article.append(head).append(url).append(button);
        document.getElementByClassName("spot").append(article);
    }
    render: function() {
         
        
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results</h3>
                </div>
                <div className="panel-body text-center spot">
                 
                  
                    
                       
                    
                </div>
            </div>
        );
    }
});

module.exports = Results;