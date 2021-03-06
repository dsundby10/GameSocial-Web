class UserObject {
  constructor(user) {
    this.id = user.id;
    this.isAdmin = user.isAdmin;
    this.profile = user.profile;
    this.followers = user.followers;
    this.following = user.following;
    this.points = user.points;
  }
}

class NewUserObject {
  constructor(user, dob = '', username) {
    this.id = user.uid;
    this.profile = {
      id: user.uid,
      username: username,
      email: user.email,
      name: "",
      avatar: {
        createdAt: new Date().getTime().toString(),
        etag: '5e61216492e523567e13b5aa188ea1aa',
        url: "https://res.cloudinary.com/diygdnbei/image/upload/v1519444005/zumnvvbqi0fo1zthkal7.png",
        height: 1080,
        width: 1080
      },
      bio: "",
      guild: "",
      dob: dob
    };
    this.timestamp = new Date().getTime().toString();
    this.lastLogin = [];
    this.points = 0;
    this.likes = {
      videos: [],
      comments: []
    };
    this.comments = [];
    this.isAdmin = false; //SR Added 12/13 - default admin status false
    this.notifications = [];
    this.videos = [];
    this.images = [];
    this.following = [{id: 'default'}];
    this.followers = [{id: 'default'}];
    this.guild = "";
  }
}

class VideoObject{
  constructor(video){
    this.id = video.id;
    this.url = video.url;
    this.audio = (video.audio)?video.audio: null;
    this.content = video.content;
    this.publisher = video.publisher;
    this.name = video.name;
    this.config = video.config;
    this.points = video.points;
    this.status = video.status;
    this.options = video.options;
    this.featured = (video.status.featured)?video.status.featured:[]; // Might not need an array for this one. The "Featured Video" section in the DB should contain an array of IDs and possibly the date/time stamp when they were set.
    this.comments = (video.comments)?video.comments:[]
  }
}

class UpdateUserProfileObject{
  constructor(user, profile, avatar){
    this.avatar = {
      url: avatar.secure_url
    };
    this.bio = profile.bio;
    this.id = user.id;
    this.name = profile.name;
    this.username = user.username;
  }
}

class ImageObject{
  constructor(image){
    this.id = image.id;
    this.url = image.url;
    this.content = image.content;
    this.publisher = image.publisher;
    this.name = image.name;
    this.config = image.config;
    this.points = image.points;
    this.status = image.status;
    this.options = image.options;
    this.featured = (image.status.featured)?image.status.featured:[]; // Might not need an array for this one. The "Featured Video" section in the DB should contain an array of IDs and possibly the date/time stamp when they were set.
    this.comments = (image.comments)?image.comments:[]
  }
}

class UploadObject{
  constructor(values, file){
    this.avatar = {
      createdAt: file.created_at,
      format: file.format,
      url: file.secure_url
    };
    this.bio = values.editBio;
    this.name = values.editName;
  }
}

class FavoriteObject{
  constructor(upload){
    this.id = upload.id;
    this.publisher = upload.publisher;
    this.content = upload.content;
    this.url = upload.url;
    this.config = upload.config;
  }
}

class TrackedFavoriteObject{
  constructor(authId, publisherId){
    this.userId = authId;
    this.uploadId = publisherId;
  }
}

class PlaylistObject{
  constructor(upload, playlistName) {
    if(upload === null) {
      this.id = '';
      this.url = '';
      this.name = '';
      this.playlist = '';
    }else {
      this.id = upload.id;
      this.url = upload.url;
      this.name = upload.content.title;
      this.playlist = playlistName;
    }
  }
}

module.exports = {NewUserObject, VideoObject, ImageObject, UserObject,
  UploadObject, FavoriteObject, TrackedFavoriteObject, PlaylistObject};