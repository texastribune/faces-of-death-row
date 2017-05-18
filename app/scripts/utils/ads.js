var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();

googletag.cmd.push(function() {
  googletag.pubads().setTargeting('tribpedia','death-row');

  var mapping = googletag.sizeMapping().addSize([780, 140], [728, 90]).build();

  googletag.defineSlot('/5805113/TexasTribune_Data_DataPage_ATF_Header_Leaderboard_728x90', [300, 100], 'div-gpt-ad-1406570316312-0')
    .defineSizeMapping(mapping)
    .addService(googletag.pubads());

  googletag.defineSlot('/5805113/TexasTribune_Data_DataPage_BTF_Header_Leaderboard_728x90', [300, 100], 'div-gpt-ad-1406570316312-1')
    .defineSizeMapping(mapping)
    .addService(googletag.pubads());

  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});

googletag.cmd.push(function() {
  googletag.display('div-gpt-ad-1406570316312-0');
  googletag.display('div-gpt-ad-1406570316312-1');
});
