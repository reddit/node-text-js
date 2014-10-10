//
//  sup extension
//  ^sup   ->  <sup>sup</sup>
//

module.exports = function(converter) {
  return [{
    type    : 'lang',
    regex   : '\\\B\\\^(\\\S+)',
    replace : function(match, content) {
      return '<sup>' + content + '</sup>';
    }
  }];
};
