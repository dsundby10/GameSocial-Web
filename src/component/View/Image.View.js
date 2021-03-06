import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Grid, Button, Segment} from 'semantic-ui-react';

import UserCard from '../Card/Card.User';
import Comments from '../Card/Card.Comment';
import ViewsCount from '../Count/Count.Views';
import FavoriteToggle from '../Toggle/Toggle.Favorite';
import LikesToggle from '../Toggle/Toggle.Like';

import {deleteUpload} from "../../actions/action.upload";

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {view} = this.props;
    return (
      <div>
        <Grid stackable>
          <Grid.Row className="row">
            <Grid.Column width={12}>
              <Image
                alt="selected"
                src={view.data.url}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Segment>
                  <LikesToggle
                    upload={view.data}/>
                </Segment>
                <Segment>
                  <ViewsCount
                    uploadId={view.data.id}
                    type={view.data.config.type}/>
                </Segment>
                <FavoriteToggle
                  upload={view.data}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment>
                <h1>{view.data.content.title}</h1>
                <p>{view.data.content.caption}</p>
                <span>Tags</span><span style={{float: 'right'}}>{view.data.content.createdAt}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <UserCard
                page={this.props.page}
                publisher={view.data.publisher}/>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <Comments/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view
});

export default connect(mapStateToProps, {deleteUpload})(ImageView);