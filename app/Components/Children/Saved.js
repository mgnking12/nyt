// Include React 
var React = require('react');

var panelStyle = {
	backgroundColor: '#FFE693'
}

// This is the saved component. It will be used to show a log of saved articles.
var Saved = React.createClass({

	getInitialState: function(){
		return {
			savedArticles: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteArticle(result);

	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		console.log(nextProps);
		var myResults = nextProps.savedArticles.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item row" key={i}>
			<div className="col-md-9">
			<a href={search.url} target="_blank">{search.title}</a>
			<br />{search.date}
			</div><div className="col-md-3">
			<button type="button" className="btn" style={{}} onClick={boundClick}>Delete</button>
			</div>
			</div>
		});

		this.setState({savedArticles: myResults});
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel">
				<div className="panel-heading" style={panelStyle}>
					<h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
				</div>
				<div className="panel-body">

					{/* Here we use a map function to loop through an array in JSX*/}
					{this.state.savedArticles}
				</div>
			</div>

		)
	}
});



// Export the component back for use in other files
module.exports = Saved;