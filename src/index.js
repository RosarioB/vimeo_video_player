import _ from 'lodash'
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Vimeo } from 'vimeo';
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list"
import SearchBar from "./components/search_bar";

let client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.ACCESS_TOKEN);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null 
    };
    this.videoSearch('Italy');
  }

  videoSearch(term) {
    if(term) {
      console.log('Search term ' + term);
      client.request({
        method:'get',
        path: `/videos?query=${term}&page=1&per_page=5`
      }, (error, body) => {
        if (error) {
          console.log('error');
          console.log(error);
        } else {
          const videos = body.data;
          this.setState({ 
            videos: videos,
            selectedVideo: videos[0]
          });
        }
      });
    }
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
        <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
              videos={this.state.videos} />
        </div>
    ); 
  }
}
ReactDOM.render(<App />, document.querySelector(".container")); 
