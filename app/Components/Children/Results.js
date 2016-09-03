// Include React 
var React = require('react');
var panelStyle = {
	backgroundColor: '#BCA8A5'
}

// Component creation
var Results = React.createClass({

	getInitialState: function(){
		return {
			title: "",
			date: "",
			url: "",
			results: []
		}
	},

	// When a user clicks save article
	clickToSave: function(result){

		this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);

	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		var myResults = nextProps.results.map(function(search, i){
			var boundClick = that.clickToSave.bind(that, search);
			return <div className="list-group-item row" key={i}>
			<div className="col-md-9">
			<a href={search.web_url} target="_blank">{search.headline.main}</a>
			<br />{search.pub_date}
			</div>
			<div className="col-md-3">
			<button type="button" className="btn" style={{}} onClick={boundClick}>Save</button>
			</div>
			</div>
		});

		this.setState({results: myResults});
	},
	
	// Here we render the function
	render: function(){
		return(

			<div className="panel">
				<div className="panel-heading" style={panelStyle}>
					<h3 className="panel-title text-center"><strong>Results</strong></h3>
				</div>
				<div className="panel-body">
						{this.state.results}
				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Results;