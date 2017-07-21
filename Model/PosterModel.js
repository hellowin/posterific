export default class PosterModel {

  id = '';
  isPortrait = false;
  caption = '';
  backgroundImageUri = '';
  backgroundColor = '';
  thumbnailUri = '';

  constructor(id, isPortrait, caption, backgroundImageUri, backgroundColor, thumbnailUri) {
    this.id = id;
    this.isPortrait = isPortrait;
    this.caption = caption;
    this.backgroundImageUri = backgroundImageUri;
    this.backgroundColor = backgroundColor;
    this.thumbnailUri = thumbnailUri;
  }

}
