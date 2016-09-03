var axios = require('axios');
var containerStyle = {
  backgroundColor: '#ccc',
};
// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');


// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: "",
			results: [],
			savedArticles: []
		}
	},	

	// We use this function to allow children to update the parent with searchTerms.
	setTerm: function(tpc, stYr, endYr){
		this.setState({
			topic: tpc,
			startYear: stYr,
			endYear: endYr
		})
	},

	saveArticle: function(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	deleteArticle: function(article){
		console.log(article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	},

	getArticle: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	// If the component updates we'll run this code
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("UPDATED");

			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},

	componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	// Here we render the function
	render: function(){
		return(

			<div className="container" style={containerStyle}>

				<div className="row">

					<div>
						<h2 className="text-center" style={{'color': 'white', 'textShadow': '1px 1px 5px #ccc', 'fontSize': '40px'}}>Looking for a New York Times article?</h2>
						<p className="text-center" style={{'color': 'white', 'textShadow': '1px 1px 5px #ccc', 'fontSize': '20px'}}>Search for one and save it for later!</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3">
					<Form setTerm={this.setTerm}/>
					</div>
					<div className="col-md-5">
					<Results results={this.state.results} saveArticle={this.saveArticle}/>
					</div>
					<div className="col-md-4">
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Main;