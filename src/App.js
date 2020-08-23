import React, {Component} from 'react';
import './App.css';
import { random } from 'lodash';

class App extends Component { 
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
    }
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectedQuoteIndex = this.selectedQuoteIndex.bind(this);
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
    .then(data => data.json())
    .then(quotes => this.setState({quotes: quotes}, this.assignNewQuoteIndex));
  }

  get selectedQuote(){
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)){
      return;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
    
  }

  selectedQuoteIndex(){
    if(!this.state.quotes.length){
      return undefined;
    }
    return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteIndex(){
    this.setState({selectedQuoteIndex: this.selectedQuoteIndex()})
  }

  render(){
    console.log(this.state.selectedQuoteIndex);
    return (
      <div className="App" id="quote-box">
        {this.selectedQuote ? 
        <div id="text">
          <div id="author"> "{this.selectedQuote.quote}"</div>
          <div> - {this.selectedQuote.author}</div>
        </div> : ''}
        <button id="new-quote" onClick={this.assignNewQuoteIndex}>Next Quote</button>

        <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet quote</a>

      </div>
    );
  }
}

export default App;
