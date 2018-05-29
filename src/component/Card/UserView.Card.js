import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {
  getUserOnce, addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing, getUser
} from "../../actions/action.user";

class UserViewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  unFollow() {
    console.log('click success');
    const {auth, publisher} = this.props;
    this.props.removeUserFollower(auth.uid, publisher.id);
    this.props.removeUserFollowing(auth.uid, publisher.id);
    this.props.getUserOnce(auth.uid);
  };

  Follow() {
    console.log('click success');
    const {user, publisher, auth} = this.props;
    this.props.addUserFollower(user.profile, publisher.id);
    this.props.addUserFollowing(user.profile.id, publisher);
    this.props.getUserOnce(auth.uid);
  };

  getProfile() {


  }

  render() {
    const {publisher, auth, user} = this.props;
    return (
      <Card>
        <Card.Content>
          <Image
            style={{borderRadius: '2rem'}}
            floated='right' size='mini' src={publisher.avatar.url} />
          <Card.Header>
            {publisher.username}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {
              user.following[publisher.id] ? (
                <Button
                  onClick={this.unFollow.bind(this)}
                  basic color='green'>Unfollow</Button>
              ):(
                <Button
                  onClick={this.Follow.bind(this)}
                  basic color='green'>Follow</Button>
              )
            }
            <Button
              onClick={this.getProfile()}
              basic color='blue'>Profile</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view.data,
  user: state.user.data,
  auth: state.auth.currentUser
});

export default connect(mapStateToProps,
  {deleteUpload, getUserOnce, addUserFollowing, addUserFollower,
  removeUserFollowing, removeUserFollower})(UserViewCard);