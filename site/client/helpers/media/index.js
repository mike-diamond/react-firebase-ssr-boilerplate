const mobileEnd               = 568
const tabletPortraitStart     = mobileEnd + 1
const tabletPortraitEnd       = 768
const tabletLandscapeStart    = tabletPortraitEnd + 1
const tabletLandscapeEnd      = 1024
const desktopStart            = tabletLandscapeEnd + 1


function Media() {
  this.mobileEnd              = mobileEnd
  this.tabletPortraitStart    = tabletPortraitStart
  this.tabletPortraitEnd      = tabletPortraitEnd
  this.tabletLandscapeStart   = tabletLandscapeStart
  this.tabletLandscapeEnd     = tabletLandscapeEnd
  this.desktopStart           = desktopStart
}

Media.prototype.isMobile = function isMobile() {
  return document.body.clientWidth <= this.mobileEnd
}

Media.prototype.isDesktop = function isDesktop() {
  return document.body.clientWidth >= this.desktopStart
}

const media = new Media()


export default media
