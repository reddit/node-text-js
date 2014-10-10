//
//  sup extension
//  ^sup   ->  <sup>sup</sup>
//

module.exports = function(converter) {
  return [{
    type    : 'lang',
    regex   : '(\\\^+)(\\\S+)',
    replace : function(match, carets, content) {
      var i = 0;
      var str = [];
      for (i = 0; i < carets.length; i++) {
        str.push('<sup>');
      }

      str.push(content);

      for (i = 0; i < carets.length; i++) {
        str.push('</sup>');
      }

      return str.join('');
    }
  }];
};
