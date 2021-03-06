import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser, getUserPromise} from "../../actions/action.user";
import {getAuth} from '../../actions/action.auth';

import ImageCard from "../Card/Card.Image";
import VideoCard from "../Card/Card.Video";
import ProfileCard from "../Card/Card.Prorfile";
import MenuProfile from "../Menu/Menu.Profile";
import UserCard from '../Card/Card.User';
import PlaylistDetail from '../Detail/Detail.Playlist';

export class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'images',
    }
  }

  renderUserImages(images) {
    return _.map(images, (image) => {
      return (
        <Grid.Column mobile={16} computer={8} largeScreen={5} key={image.id}>
          <ImageCard
            activeMenu={this.state.activeMenu}
            image={image}
            page={this.props.page}
          />
        </Grid.Column>
      )
    });
  }

  renderUserVideos(videos) {
    return _.map(videos, (video) => {
      return (
        <Grid.Column mobile={16} computer={8} largeScreen={5} key={video.id}>
          <VideoCard
            activeMenu={this.state.activeMenu}
            video={video}
            page={this.props.page}
          />
        </Grid.Column>
      )
    });
  }

  renderUserFollowers(followers) {
    return _.map(followers, (follower) => {
      if(follower.id === 'default') {
        return <span key={follower.id}/>;
      } else {
        return (
          <Grid.Column key={follower.id}>
            <UserCard
              page={this.props.page}
              publisher={follower}
            />
          </Grid.Column>
        )
      }
    });
  }

  renderUserFollowing(following) {
    return _.map(following, (followee) => {
      if(followee.id === 'default') {
        return <span key={followee.id}/>;
      } else {
        return (
          <Grid.Column key={followee.id}>
            <UserCard
              page={this.props.page}
              publisher={followee}
            />
          </Grid.Column>
        )
      }
    });
  }

  renderUserFavorites(favorites) {
    return _.map(favorites, (favorite) => {
      return (
        <Grid.Column mobile={16} computer={8} largeScreen={5} key={favorite.id}>
          {
            favorite.config.type === 'video' ? (
              <VideoCard
                activeMenu={this.state.activeMenu}
                video={favorite}
                page={this.props.page}/>
            ):(
              <ImageCard
                activeMenu={this.state.activeMenu}
                image={favorite}
                page={this.props.page}/>
            )
          }
        </Grid.Column>
      )
    });
  }

  getActiveMenu(state){
    this.setState({
      activeMenu: state
    })
  }

  render() {
    const {user} = this.props;

    return (
      <div>
        <div>
          <ProfileCard/>
        </div>
        <Container fluid>
        <MenuProfile
          getActiveMenu={(state) => this.getActiveMenu(state)}/>
        {
          this.state.activeMenu === 'images' &&
        (
          <Container>
            <Grid stackable>
              <Grid.Row>
                {this.renderUserImages(user.data.images)}
              </Grid.Row>
            </Grid>
          </Container>
          )
        }
        {
          this.state.activeMenu === 'videos' &&
          (
            <Container>
              <Grid stackable>
                <Grid.Row>
                  {this.renderUserVideos(user.data.videos)}
                </Grid.Row>
              </Grid>
            </Container>
          )
        }
        {
          this.state.activeMenu === 'followers' &&
          (
            <Container>
              <Grid stackable columns={3}>
                <Grid.Row>
                  {this.renderUserFollowers(user.data.followers)}
                </Grid.Row>
              </Grid>
            </Container>
          )
        }
        {
          this.state.activeMenu === 'following' &&
          (
            <Container>
              <Grid stackable columns={3}>
                <Grid.Row>
                  {this.renderUserFollowing(user.data.following)}
                  </Grid.Row>
              </Grid>
            </Container>

          )
        }
        {
          this.state.activeMenu === 'favorites' &&
          (
            <Container>
              <Grid stackable>
                <Grid.Row>
                  {this.renderUserFavorites(user.data.favorites)}
                </Grid.Row>
              </Grid>
            </Container>

          )
        }
        {
          this.state.activeMenu === 'playlist' &&
          (
            <Container fluid>
              <PlaylistDetail/>
            </Container>
          )
        }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps,
  {getAuth, getUser})(ProfileDetail);