//
//  strikethrough extension
//  ~~strike-through~~   ->  <del>strike-through</del>
//

module.exports = function(converter) {
  return [{
    type    : 'lang',
    regex   : '(~T){2}([^~]+)(~T){2}',
    replace : function(match, prefix, content, suffix) {
      return '<del>' + content + '</del>';
    }
  }];
};
