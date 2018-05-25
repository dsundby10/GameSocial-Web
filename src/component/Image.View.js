import React, { Component } from 'react';
import {connect} from 'react-redux';
//import _ from 'lodash';

import {Image, Grid, Button} from 'semantic-ui-react';

import {deleteUpload} from "../actions/action.upload";

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {image} = this.props;
    return (
      <div>
        <Grid>
          <Grid.Row className="row">
            <Grid.Column width={12}>
              <Image
                alt="selected"
                src={image.url}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>Likes</p>
              <p>Views</p>
              <button>Favorite</button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1>Title</h1>
              <p>Caption</p>
              <span>Tags</span><span style={{float: 'right'}}>Time Stamp</span>
            </Grid.Column>
            <Grid.Column width={6}>
              <h1>Publisher</h1>
              <button>Follow</button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h1>Comments</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(ImageView);