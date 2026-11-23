/* 分享列：Facebook、LINE 用各自的分享網址；Instagram 沒有網頁分享網址，
   手機改叫出系統分享選單（可選 IG），不支援時改為複製連結。 */
(function () {
  'use strict';
  var bars = document.querySelectorAll('.share');
  if (!bars.length) return;
  var url = location.href.split('#')[0];
  var title = (document.querySelector('meta[property="og:title"]') || {}).content || document.title;
  var enc = encodeURIComponent;
  var EN = (document.documentElement.lang || '').indexOf('en') === 0;
  var TXT = EN
    ? { copied: 'Link copied', ig: 'Link copied. Paste it into an Instagram post or story', manual: 'Please copy the link from the address bar' }
    : { copied: '已複製連結', ig: '已複製連結，可貼到 IG 貼文或限時動態', manual: '請手動複製網址列的連結' };
  var targets = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + enc(url),
    line: 'https://social-plugins.line.me/lineit/share?url=' + enc(url) + '&text=' + enc(title)
  };

  function say(bar, msg) {
    var s = bar.querySelector('.share-status');
    if (!s) return;
    s.textContent = msg;
    clearTimeout(s._t);
    s._t = setTimeout(function () { s.textContent = ''; }, 4000);
  }
  function copy(bar, msg) {
    var done = function () { say(bar, msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var t = document.createElement('textarea');
      t.value = url; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) { say(bar, TXT.manual); }
      document.body.removeChild(t);
    }
  }

  [].forEach.call(bars, function (bar) {
    [].forEach.call(bar.querySelectorAll('a[data-share]'), function (a) {
      var t = targets[a.getAttribute('data-share')];
      if (t) a.href = t;
    });
    [].forEach.call(bar.querySelectorAll('button[data-share]'), function (b) {
      b.addEventListener('click', function () {
        var kind = b.getAttribute('data-share');
        if (kind === 'instagram' && navigator.share) {
          navigator.share({ title: title, url: url }).catch(function () {});
        } else if (kind === 'instagram') {
          copy(bar, TXT.ig);
        } else {
          copy(bar, TXT.copied);
        }
      });
    });
  });
})();
