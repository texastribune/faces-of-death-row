/* global googletag */

(function () {
  var gads = document.createElement('script')
  gads.async = true
  gads.type = 'text/javascript'
  var useSSL = document.location.protocol === 'https:'
  gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js'
  var node = document.getElementsByTagName('script')[0]
  node.parentNode.insertBefore(gads, node)
})()

googletag.cmd.push(function () {
  googletag.pubads().setTargeting('tribpedia','death-row');
  var bannerMapping = googletag.sizeMapping().addSize([768, 1], [728, 90]).addSize([0, 0], [300, 250]).build()

  googletag.defineSlot('/5805113/basic', [728, 90], 'ad-banner-leader').defineSizeMapping(bannerMapping).addService(googletag.pubads())

  googletag.defineSlot('/5805113/basic', [300, 100], 'ad-banner-footer').defineSizeMapping(bannerMapping).addService(googletag.pubads())

  googletag.pubads().enableSingleRequest()
  googletag.enableServices()
})

googletag.cmd.push(function () {
  googletag.display('ad-banner-leader')
  googletag.display('ad-banner-footer')
})
