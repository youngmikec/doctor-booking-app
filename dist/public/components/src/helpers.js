//"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function (a) {
  'use strict';

  return typeof a === 'string' || a instanceof String;
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';

  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';

  return Array.isArray(a);
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';

  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';

  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }
  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }
  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }
  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (_typeof(obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';

  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};
function escapeCharactersCallback(wholeMatch, m1) {
  'use strict';

  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
  'use strict';

  // First we have to escape the escape characters so that
  // we can build a character class out of them
  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';
  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }
  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);
  return text;
};

/**
 * Unescape HTML entities
 * @param txt
 * @returns {string}
 */
showdown.helper.unescapeHTMLEntities = function (txt) {
  'use strict';

  return txt.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
};
var rgxFindMatchPos = function rgxFindMatchPos(str, left, right, flags) {
  'use strict';

  var f = flags || '',
    g = f.indexOf('g') > -1,
    x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
    l = new RegExp(left, f.replace(/g/g, '')),
    pos = [],
    t,
    s,
    m,
    start,
    end;
  do {
    t = 0;
    while (m = x.exec(str)) {
      if (l.test(m[0])) {
        if (!t++) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (! --t) {
          end = m.index + m[0].length;
          var obj = {
            left: {
              start: start,
              end: s
            },
            match: {
              start: s,
              end: m.index
            },
            right: {
              start: m.index,
              end: end
            },
            wholeMatch: {
              start: start,
              end: end
            }
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));
  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos(str, left, right, flags),
    results = [];
  for (var i = 0; i < matchPos.length; ++i) {
    results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function replacement() {
      return repStr;
    };
  }
  var matchPos = rgxFindMatchPos(str, left, right, flags),
    finalStr = str,
    lng = matchPos.length;
  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';

  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';

  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
  'use strict';

  var encode = [function (ch) {
    return '&#' + ch.charCodeAt(0) + ';';
  }, function (ch) {
    return '&#x' + ch.charCodeAt(0).toString(16) + ';';
  }, function (ch) {
    return ch;
  }];
  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
    }
    return ch;
  });
  return mail;
};

/**
 *
 * @param str
 * @param targetLength
 * @param padString
 * @returns {string}
 */
showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
  'use strict';

  /*jshint bitwise: false*/
  // eslint-disable-next-line space-infix-ops
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  /*jshint bitwise: true*/
  padString = String(padString || ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }

    return String(str) + padString.slice(0, targetLength);
  }
};

/**
 * POLYFILLS
 */
// use this instead of builtin is undefined for IE8 compatibility
if (typeof console === 'undefined') {
  console = {
    warn: function warn(msg) {
      'use strict';

      alert(msg);
    },
    log: function log(msg) {
      'use strict';

      alert(msg);
    },
    error: function error(msg) {
      'use strict';

      throw msg;
    }
  };
}

/**
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskDashAndColon: /([*_:~])/g
};

/**
 * EMOJIS LIST
 */
showdown.helper.emojis = {
  '+1': "\uD83D\uDC4D",
  '-1': "\uD83D\uDC4E",
  '100': "\uD83D\uDCAF",
  '1234': "\uD83D\uDD22",
  '1st_place_medal': "\uD83E\uDD47",
  '2nd_place_medal': "\uD83E\uDD48",
  '3rd_place_medal': "\uD83E\uDD49",
  '8ball': "\uD83C\uDFB1",
  'a': "\uD83C\uDD70\uFE0F",
  'ab': "\uD83C\uDD8E",
  'abc': "\uD83D\uDD24",
  'abcd': "\uD83D\uDD21",
  'accept': "\uD83C\uDE51",
  'aerial_tramway': "\uD83D\uDEA1",
  'airplane': "\u2708\uFE0F",
  'alarm_clock': "\u23F0",
  'alembic': "\u2697\uFE0F",
  'alien': "\uD83D\uDC7D",
  'ambulance': "\uD83D\uDE91",
  'amphora': "\uD83C\uDFFA",
  'anchor': "\u2693\uFE0F",
  'angel': "\uD83D\uDC7C",
  'anger': "\uD83D\uDCA2",
  'angry': "\uD83D\uDE20",
  'anguished': "\uD83D\uDE27",
  'ant': "\uD83D\uDC1C",
  'apple': "\uD83C\uDF4E",
  'aquarius': "\u2652\uFE0F",
  'aries': "\u2648\uFE0F",
  'arrow_backward': "\u25C0\uFE0F",
  'arrow_double_down': "\u23EC",
  'arrow_double_up': "\u23EB",
  'arrow_down': "\u2B07\uFE0F",
  'arrow_down_small': "\uD83D\uDD3D",
  'arrow_forward': "\u25B6\uFE0F",
  'arrow_heading_down': "\u2935\uFE0F",
  'arrow_heading_up': "\u2934\uFE0F",
  'arrow_left': "\u2B05\uFE0F",
  'arrow_lower_left': "\u2199\uFE0F",
  'arrow_lower_right': "\u2198\uFE0F",
  'arrow_right': "\u27A1\uFE0F",
  'arrow_right_hook': "\u21AA\uFE0F",
  'arrow_up': "\u2B06\uFE0F",
  'arrow_up_down': "\u2195\uFE0F",
  'arrow_up_small': "\uD83D\uDD3C",
  'arrow_upper_left': "\u2196\uFE0F",
  'arrow_upper_right': "\u2197\uFE0F",
  'arrows_clockwise': "\uD83D\uDD03",
  'arrows_counterclockwise': "\uD83D\uDD04",
  'art': "\uD83C\uDFA8",
  'articulated_lorry': "\uD83D\uDE9B",
  'artificial_satellite': "\uD83D\uDEF0",
  'astonished': "\uD83D\uDE32",
  'athletic_shoe': "\uD83D\uDC5F",
  'atm': "\uD83C\uDFE7",
  'atom_symbol': "\u269B\uFE0F",
  'avocado': "\uD83E\uDD51",
  'b': "\uD83C\uDD71\uFE0F",
  'baby': "\uD83D\uDC76",
  'baby_bottle': "\uD83C\uDF7C",
  'baby_chick': "\uD83D\uDC24",
  'baby_symbol': "\uD83D\uDEBC",
  'back': "\uD83D\uDD19",
  'bacon': "\uD83E\uDD53",
  'badminton': "\uD83C\uDFF8",
  'baggage_claim': "\uD83D\uDEC4",
  'baguette_bread': "\uD83E\uDD56",
  'balance_scale': "\u2696\uFE0F",
  'balloon': "\uD83C\uDF88",
  'ballot_box': "\uD83D\uDDF3",
  'ballot_box_with_check': "\u2611\uFE0F",
  'bamboo': "\uD83C\uDF8D",
  'banana': "\uD83C\uDF4C",
  'bangbang': "\u203C\uFE0F",
  'bank': "\uD83C\uDFE6",
  'bar_chart': "\uD83D\uDCCA",
  'barber': "\uD83D\uDC88",
  'baseball': "\u26BE\uFE0F",
  'basketball': "\uD83C\uDFC0",
  'basketball_man': "\u26F9\uFE0F",
  'basketball_woman': "\u26F9\uFE0F&zwj;\u2640\uFE0F",
  'bat': "\uD83E\uDD87",
  'bath': "\uD83D\uDEC0",
  'bathtub': "\uD83D\uDEC1",
  'battery': "\uD83D\uDD0B",
  'beach_umbrella': "\uD83C\uDFD6",
  'bear': "\uD83D\uDC3B",
  'bed': "\uD83D\uDECF",
  'bee': "\uD83D\uDC1D",
  'beer': "\uD83C\uDF7A",
  'beers': "\uD83C\uDF7B",
  'beetle': "\uD83D\uDC1E",
  'beginner': "\uD83D\uDD30",
  'bell': "\uD83D\uDD14",
  'bellhop_bell': "\uD83D\uDECE",
  'bento': "\uD83C\uDF71",
  'biking_man': "\uD83D\uDEB4",
  'bike': "\uD83D\uDEB2",
  'biking_woman': "\uD83D\uDEB4&zwj;\u2640\uFE0F",
  'bikini': "\uD83D\uDC59",
  'biohazard': "\u2623\uFE0F",
  'bird': "\uD83D\uDC26",
  'birthday': "\uD83C\uDF82",
  'black_circle': "\u26AB\uFE0F",
  'black_flag': "\uD83C\uDFF4",
  'black_heart': "\uD83D\uDDA4",
  'black_joker': "\uD83C\uDCCF",
  'black_large_square': "\u2B1B\uFE0F",
  'black_medium_small_square': "\u25FE\uFE0F",
  'black_medium_square': "\u25FC\uFE0F",
  'black_nib': "\u2712\uFE0F",
  'black_small_square': "\u25AA\uFE0F",
  'black_square_button': "\uD83D\uDD32",
  'blonde_man': "\uD83D\uDC71",
  'blonde_woman': "\uD83D\uDC71&zwj;\u2640\uFE0F",
  'blossom': "\uD83C\uDF3C",
  'blowfish': "\uD83D\uDC21",
  'blue_book': "\uD83D\uDCD8",
  'blue_car': "\uD83D\uDE99",
  'blue_heart': "\uD83D\uDC99",
  'blush': "\uD83D\uDE0A",
  'boar': "\uD83D\uDC17",
  'boat': "\u26F5\uFE0F",
  'bomb': "\uD83D\uDCA3",
  'book': "\uD83D\uDCD6",
  'bookmark': "\uD83D\uDD16",
  'bookmark_tabs': "\uD83D\uDCD1",
  'books': "\uD83D\uDCDA",
  'boom': "\uD83D\uDCA5",
  'boot': "\uD83D\uDC62",
  'bouquet': "\uD83D\uDC90",
  'bowing_man': "\uD83D\uDE47",
  'bow_and_arrow': "\uD83C\uDFF9",
  'bowing_woman': "\uD83D\uDE47&zwj;\u2640\uFE0F",
  'bowling': "\uD83C\uDFB3",
  'boxing_glove': "\uD83E\uDD4A",
  'boy': "\uD83D\uDC66",
  'bread': "\uD83C\uDF5E",
  'bride_with_veil': "\uD83D\uDC70",
  'bridge_at_night': "\uD83C\uDF09",
  'briefcase': "\uD83D\uDCBC",
  'broken_heart': "\uD83D\uDC94",
  'bug': "\uD83D\uDC1B",
  'building_construction': "\uD83C\uDFD7",
  'bulb': "\uD83D\uDCA1",
  'bullettrain_front': "\uD83D\uDE85",
  'bullettrain_side': "\uD83D\uDE84",
  'burrito': "\uD83C\uDF2F",
  'bus': "\uD83D\uDE8C",
  'business_suit_levitating': "\uD83D\uDD74",
  'busstop': "\uD83D\uDE8F",
  'bust_in_silhouette': "\uD83D\uDC64",
  'busts_in_silhouette': "\uD83D\uDC65",
  'butterfly': "\uD83E\uDD8B",
  'cactus': "\uD83C\uDF35",
  'cake': "\uD83C\uDF70",
  'calendar': "\uD83D\uDCC6",
  'call_me_hand': "\uD83E\uDD19",
  'calling': "\uD83D\uDCF2",
  'camel': "\uD83D\uDC2B",
  'camera': "\uD83D\uDCF7",
  'camera_flash': "\uD83D\uDCF8",
  'camping': "\uD83C\uDFD5",
  'cancer': "\u264B\uFE0F",
  'candle': "\uD83D\uDD6F",
  'candy': "\uD83C\uDF6C",
  'canoe': "\uD83D\uDEF6",
  'capital_abcd': "\uD83D\uDD20",
  'capricorn': "\u2651\uFE0F",
  'car': "\uD83D\uDE97",
  'card_file_box': "\uD83D\uDDC3",
  'card_index': "\uD83D\uDCC7",
  'card_index_dividers': "\uD83D\uDDC2",
  'carousel_horse': "\uD83C\uDFA0",
  'carrot': "\uD83E\uDD55",
  'cat': "\uD83D\uDC31",
  'cat2': "\uD83D\uDC08",
  'cd': "\uD83D\uDCBF",
  'chains': "\u26D3",
  'champagne': "\uD83C\uDF7E",
  'chart': "\uD83D\uDCB9",
  'chart_with_downwards_trend': "\uD83D\uDCC9",
  'chart_with_upwards_trend': "\uD83D\uDCC8",
  'checkered_flag': "\uD83C\uDFC1",
  'cheese': "\uD83E\uDDC0",
  'cherries': "\uD83C\uDF52",
  'cherry_blossom': "\uD83C\uDF38",
  'chestnut': "\uD83C\uDF30",
  'chicken': "\uD83D\uDC14",
  'children_crossing': "\uD83D\uDEB8",
  'chipmunk': "\uD83D\uDC3F",
  'chocolate_bar': "\uD83C\uDF6B",
  'christmas_tree': "\uD83C\uDF84",
  'church': "\u26EA\uFE0F",
  'cinema': "\uD83C\uDFA6",
  'circus_tent': "\uD83C\uDFAA",
  'city_sunrise': "\uD83C\uDF07",
  'city_sunset': "\uD83C\uDF06",
  'cityscape': "\uD83C\uDFD9",
  'cl': "\uD83C\uDD91",
  'clamp': "\uD83D\uDDDC",
  'clap': "\uD83D\uDC4F",
  'clapper': "\uD83C\uDFAC",
  'classical_building': "\uD83C\uDFDB",
  'clinking_glasses': "\uD83E\uDD42",
  'clipboard': "\uD83D\uDCCB",
  'clock1': "\uD83D\uDD50",
  'clock10': "\uD83D\uDD59",
  'clock1030': "\uD83D\uDD65",
  'clock11': "\uD83D\uDD5A",
  'clock1130': "\uD83D\uDD66",
  'clock12': "\uD83D\uDD5B",
  'clock1230': "\uD83D\uDD67",
  'clock130': "\uD83D\uDD5C",
  'clock2': "\uD83D\uDD51",
  'clock230': "\uD83D\uDD5D",
  'clock3': "\uD83D\uDD52",
  'clock330': "\uD83D\uDD5E",
  'clock4': "\uD83D\uDD53",
  'clock430': "\uD83D\uDD5F",
  'clock5': "\uD83D\uDD54",
  'clock530': "\uD83D\uDD60",
  'clock6': "\uD83D\uDD55",
  'clock630': "\uD83D\uDD61",
  'clock7': "\uD83D\uDD56",
  'clock730': "\uD83D\uDD62",
  'clock8': "\uD83D\uDD57",
  'clock830': "\uD83D\uDD63",
  'clock9': "\uD83D\uDD58",
  'clock930': "\uD83D\uDD64",
  'closed_book': "\uD83D\uDCD5",
  'closed_lock_with_key': "\uD83D\uDD10",
  'closed_umbrella': "\uD83C\uDF02",
  'cloud': "\u2601\uFE0F",
  'cloud_with_lightning': "\uD83C\uDF29",
  'cloud_with_lightning_and_rain': "\u26C8",
  'cloud_with_rain': "\uD83C\uDF27",
  'cloud_with_snow': "\uD83C\uDF28",
  'clown_face': "\uD83E\uDD21",
  'clubs': "\u2663\uFE0F",
  'cocktail': "\uD83C\uDF78",
  'coffee': "\u2615\uFE0F",
  'coffin': "\u26B0\uFE0F",
  'cold_sweat': "\uD83D\uDE30",
  'comet': "\u2604\uFE0F",
  'computer': "\uD83D\uDCBB",
  'computer_mouse': "\uD83D\uDDB1",
  'confetti_ball': "\uD83C\uDF8A",
  'confounded': "\uD83D\uDE16",
  'confused': "\uD83D\uDE15",
  'congratulations': "\u3297\uFE0F",
  'construction': "\uD83D\uDEA7",
  'construction_worker_man': "\uD83D\uDC77",
  'construction_worker_woman': "\uD83D\uDC77&zwj;\u2640\uFE0F",
  'control_knobs': "\uD83C\uDF9B",
  'convenience_store': "\uD83C\uDFEA",
  'cookie': "\uD83C\uDF6A",
  'cool': "\uD83C\uDD92",
  'policeman': "\uD83D\uDC6E",
  'copyright': "\xA9\uFE0F",
  'corn': "\uD83C\uDF3D",
  'couch_and_lamp': "\uD83D\uDECB",
  'couple': "\uD83D\uDC6B",
  'couple_with_heart_woman_man': "\uD83D\uDC91",
  'couple_with_heart_man_man': "\uD83D\uDC68&zwj;\u2764\uFE0F&zwj;\uD83D\uDC68",
  'couple_with_heart_woman_woman': "\uD83D\uDC69&zwj;\u2764\uFE0F&zwj;\uD83D\uDC69",
  'couplekiss_man_man': "\uD83D\uDC68&zwj;\u2764\uFE0F&zwj;\uD83D\uDC8B&zwj;\uD83D\uDC68",
  'couplekiss_man_woman': "\uD83D\uDC8F",
  'couplekiss_woman_woman': "\uD83D\uDC69&zwj;\u2764\uFE0F&zwj;\uD83D\uDC8B&zwj;\uD83D\uDC69",
  'cow': "\uD83D\uDC2E",
  'cow2': "\uD83D\uDC04",
  'cowboy_hat_face': "\uD83E\uDD20",
  'crab': "\uD83E\uDD80",
  'crayon': "\uD83D\uDD8D",
  'credit_card': "\uD83D\uDCB3",
  'crescent_moon': "\uD83C\uDF19",
  'cricket': "\uD83C\uDFCF",
  'crocodile': "\uD83D\uDC0A",
  'croissant': "\uD83E\uDD50",
  'crossed_fingers': "\uD83E\uDD1E",
  'crossed_flags': "\uD83C\uDF8C",
  'crossed_swords': "\u2694\uFE0F",
  'crown': "\uD83D\uDC51",
  'cry': "\uD83D\uDE22",
  'crying_cat_face': "\uD83D\uDE3F",
  'crystal_ball': "\uD83D\uDD2E",
  'cucumber': "\uD83E\uDD52",
  'cupid': "\uD83D\uDC98",
  'curly_loop': "\u27B0",
  'currency_exchange': "\uD83D\uDCB1",
  'curry': "\uD83C\uDF5B",
  'custard': "\uD83C\uDF6E",
  'customs': "\uD83D\uDEC3",
  'cyclone': "\uD83C\uDF00",
  'dagger': "\uD83D\uDDE1",
  'dancer': "\uD83D\uDC83",
  'dancing_women': "\uD83D\uDC6F",
  'dancing_men': "\uD83D\uDC6F&zwj;\u2642\uFE0F",
  'dango': "\uD83C\uDF61",
  'dark_sunglasses': "\uD83D\uDD76",
  'dart': "\uD83C\uDFAF",
  'dash': "\uD83D\uDCA8",
  'date': "\uD83D\uDCC5",
  'deciduous_tree': "\uD83C\uDF33",
  'deer': "\uD83E\uDD8C",
  'department_store': "\uD83C\uDFEC",
  'derelict_house': "\uD83C\uDFDA",
  'desert': "\uD83C\uDFDC",
  'desert_island': "\uD83C\uDFDD",
  'desktop_computer': "\uD83D\uDDA5",
  'male_detective': "\uD83D\uDD75\uFE0F",
  'diamond_shape_with_a_dot_inside': "\uD83D\uDCA0",
  'diamonds': "\u2666\uFE0F",
  'disappointed': "\uD83D\uDE1E",
  'disappointed_relieved': "\uD83D\uDE25",
  'dizzy': "\uD83D\uDCAB",
  'dizzy_face': "\uD83D\uDE35",
  'do_not_litter': "\uD83D\uDEAF",
  'dog': "\uD83D\uDC36",
  'dog2': "\uD83D\uDC15",
  'dollar': "\uD83D\uDCB5",
  'dolls': "\uD83C\uDF8E",
  'dolphin': "\uD83D\uDC2C",
  'door': "\uD83D\uDEAA",
  'doughnut': "\uD83C\uDF69",
  'dove': "\uD83D\uDD4A",
  'dragon': "\uD83D\uDC09",
  'dragon_face': "\uD83D\uDC32",
  'dress': "\uD83D\uDC57",
  'dromedary_camel': "\uD83D\uDC2A",
  'drooling_face': "\uD83E\uDD24",
  'droplet': "\uD83D\uDCA7",
  'drum': "\uD83E\uDD41",
  'duck': "\uD83E\uDD86",
  'dvd': "\uD83D\uDCC0",
  'e-mail': "\uD83D\uDCE7",
  'eagle': "\uD83E\uDD85",
  'ear': "\uD83D\uDC42",
  'ear_of_rice': "\uD83C\uDF3E",
  'earth_africa': "\uD83C\uDF0D",
  'earth_americas': "\uD83C\uDF0E",
  'earth_asia': "\uD83C\uDF0F",
  'egg': "\uD83E\uDD5A",
  'eggplant': "\uD83C\uDF46",
  'eight_pointed_black_star': "\u2734\uFE0F",
  'eight_spoked_asterisk': "\u2733\uFE0F",
  'electric_plug': "\uD83D\uDD0C",
  'elephant': "\uD83D\uDC18",
  'email': "\u2709\uFE0F",
  'end': "\uD83D\uDD1A",
  'envelope_with_arrow': "\uD83D\uDCE9",
  'euro': "\uD83D\uDCB6",
  'european_castle': "\uD83C\uDFF0",
  'european_post_office': "\uD83C\uDFE4",
  'evergreen_tree': "\uD83C\uDF32",
  'exclamation': "\u2757\uFE0F",
  'expressionless': "\uD83D\uDE11",
  'eye': "\uD83D\uDC41",
  'eye_speech_bubble': "\uD83D\uDC41&zwj;\uD83D\uDDE8",
  'eyeglasses': "\uD83D\uDC53",
  'eyes': "\uD83D\uDC40",
  'face_with_head_bandage': "\uD83E\uDD15",
  'face_with_thermometer': "\uD83E\uDD12",
  'fist_oncoming': "\uD83D\uDC4A",
  'factory': "\uD83C\uDFED",
  'fallen_leaf': "\uD83C\uDF42",
  'family_man_woman_boy': "\uD83D\uDC6A",
  'family_man_boy': "\uD83D\uDC68&zwj;\uD83D\uDC66",
  'family_man_boy_boy': "\uD83D\uDC68&zwj;\uD83D\uDC66&zwj;\uD83D\uDC66",
  'family_man_girl': "\uD83D\uDC68&zwj;\uD83D\uDC67",
  'family_man_girl_boy': "\uD83D\uDC68&zwj;\uD83D\uDC67&zwj;\uD83D\uDC66",
  'family_man_girl_girl': "\uD83D\uDC68&zwj;\uD83D\uDC67&zwj;\uD83D\uDC67",
  'family_man_man_boy': "\uD83D\uDC68&zwj;\uD83D\uDC68&zwj;\uD83D\uDC66",
  'family_man_man_boy_boy': "\uD83D\uDC68&zwj;\uD83D\uDC68&zwj;\uD83D\uDC66&zwj;\uD83D\uDC66",
  'family_man_man_girl': "\uD83D\uDC68&zwj;\uD83D\uDC68&zwj;\uD83D\uDC67",
  'family_man_man_girl_boy': "\uD83D\uDC68&zwj;\uD83D\uDC68&zwj;\uD83D\uDC67&zwj;\uD83D\uDC66",
  'family_man_man_girl_girl': "\uD83D\uDC68&zwj;\uD83D\uDC68&zwj;\uD83D\uDC67&zwj;\uD83D\uDC67",
  'family_man_woman_boy_boy': "\uD83D\uDC68&zwj;\uD83D\uDC69&zwj;\uD83D\uDC66&zwj;\uD83D\uDC66",
  'family_man_woman_girl': "\uD83D\uDC68&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67",
  'family_man_woman_girl_boy': "\uD83D\uDC68&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC66",
  'family_man_woman_girl_girl': "\uD83D\uDC68&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC67",
  'family_woman_boy': "\uD83D\uDC69&zwj;\uD83D\uDC66",
  'family_woman_boy_boy': "\uD83D\uDC69&zwj;\uD83D\uDC66&zwj;\uD83D\uDC66",
  'family_woman_girl': "\uD83D\uDC69&zwj;\uD83D\uDC67",
  'family_woman_girl_boy': "\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC66",
  'family_woman_girl_girl': "\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC67",
  'family_woman_woman_boy': "\uD83D\uDC69&zwj;\uD83D\uDC69&zwj;\uD83D\uDC66",
  'family_woman_woman_boy_boy': "\uD83D\uDC69&zwj;\uD83D\uDC69&zwj;\uD83D\uDC66&zwj;\uD83D\uDC66",
  'family_woman_woman_girl': "\uD83D\uDC69&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67",
  'family_woman_woman_girl_boy': "\uD83D\uDC69&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC66",
  'family_woman_woman_girl_girl': "\uD83D\uDC69&zwj;\uD83D\uDC69&zwj;\uD83D\uDC67&zwj;\uD83D\uDC67",
  'fast_forward': "\u23E9",
  'fax': "\uD83D\uDCE0",
  'fearful': "\uD83D\uDE28",
  'feet': "\uD83D\uDC3E",
  'female_detective': "\uD83D\uDD75\uFE0F&zwj;\u2640\uFE0F",
  'ferris_wheel': "\uD83C\uDFA1",
  'ferry': "\u26F4",
  'field_hockey': "\uD83C\uDFD1",
  'file_cabinet': "\uD83D\uDDC4",
  'file_folder': "\uD83D\uDCC1",
  'film_projector': "\uD83D\uDCFD",
  'film_strip': "\uD83C\uDF9E",
  'fire': "\uD83D\uDD25",
  'fire_engine': "\uD83D\uDE92",
  'fireworks': "\uD83C\uDF86",
  'first_quarter_moon': "\uD83C\uDF13",
  'first_quarter_moon_with_face': "\uD83C\uDF1B",
  'fish': "\uD83D\uDC1F",
  'fish_cake': "\uD83C\uDF65",
  'fishing_pole_and_fish': "\uD83C\uDFA3",
  'fist_raised': "\u270A",
  'fist_left': "\uD83E\uDD1B",
  'fist_right': "\uD83E\uDD1C",
  'flags': "\uD83C\uDF8F",
  'flashlight': "\uD83D\uDD26",
  'fleur_de_lis': "\u269C\uFE0F",
  'flight_arrival': "\uD83D\uDEEC",
  'flight_departure': "\uD83D\uDEEB",
  'floppy_disk': "\uD83D\uDCBE",
  'flower_playing_cards': "\uD83C\uDFB4",
  'flushed': "\uD83D\uDE33",
  'fog': "\uD83C\uDF2B",
  'foggy': "\uD83C\uDF01",
  'football': "\uD83C\uDFC8",
  'footprints': "\uD83D\uDC63",
  'fork_and_knife': "\uD83C\uDF74",
  'fountain': "\u26F2\uFE0F",
  'fountain_pen': "\uD83D\uDD8B",
  'four_leaf_clover': "\uD83C\uDF40",
  'fox_face': "\uD83E\uDD8A",
  'framed_picture': "\uD83D\uDDBC",
  'free': "\uD83C\uDD93",
  'fried_egg': "\uD83C\uDF73",
  'fried_shrimp': "\uD83C\uDF64",
  'fries': "\uD83C\uDF5F",
  'frog': "\uD83D\uDC38",
  'frowning': "\uD83D\uDE26",
  'frowning_face': "\u2639\uFE0F",
  'frowning_man': "\uD83D\uDE4D&zwj;\u2642\uFE0F",
  'frowning_woman': "\uD83D\uDE4D",
  'middle_finger': "\uD83D\uDD95",
  'fuelpump': "\u26FD\uFE0F",
  'full_moon': "\uD83C\uDF15",
  'full_moon_with_face': "\uD83C\uDF1D",
  'funeral_urn': "\u26B1\uFE0F",
  'game_die': "\uD83C\uDFB2",
  'gear': "\u2699\uFE0F",
  'gem': "\uD83D\uDC8E",
  'gemini': "\u264A\uFE0F",
  'ghost': "\uD83D\uDC7B",
  'gift': "\uD83C\uDF81",
  'gift_heart': "\uD83D\uDC9D",
  'girl': "\uD83D\uDC67",
  'globe_with_meridians': "\uD83C\uDF10",
  'goal_net': "\uD83E\uDD45",
  'goat': "\uD83D\uDC10",
  'golf': "\u26F3\uFE0F",
  'golfing_man': "\uD83C\uDFCC\uFE0F",
  'golfing_woman': "\uD83C\uDFCC\uFE0F&zwj;\u2640\uFE0F",
  'gorilla': "\uD83E\uDD8D",
  'grapes': "\uD83C\uDF47",
  'green_apple': "\uD83C\uDF4F",
  'green_book': "\uD83D\uDCD7",
  'green_heart': "\uD83D\uDC9A",
  'green_salad': "\uD83E\uDD57",
  'grey_exclamation': "\u2755",
  'grey_question': "\u2754",
  'grimacing': "\uD83D\uDE2C",
  'grin': "\uD83D\uDE01",
  'grinning': "\uD83D\uDE00",
  'guardsman': "\uD83D\uDC82",
  'guardswoman': "\uD83D\uDC82&zwj;\u2640\uFE0F",
  'guitar': "\uD83C\uDFB8",
  'gun': "\uD83D\uDD2B",
  'haircut_woman': "\uD83D\uDC87",
  'haircut_man': "\uD83D\uDC87&zwj;\u2642\uFE0F",
  'hamburger': "\uD83C\uDF54",
  'hammer': "\uD83D\uDD28",
  'hammer_and_pick': "\u2692",
  'hammer_and_wrench': "\uD83D\uDEE0",
  'hamster': "\uD83D\uDC39",
  'hand': "\u270B",
  'handbag': "\uD83D\uDC5C",
  'handshake': "\uD83E\uDD1D",
  'hankey': "\uD83D\uDCA9",
  'hatched_chick': "\uD83D\uDC25",
  'hatching_chick': "\uD83D\uDC23",
  'headphones': "\uD83C\uDFA7",
  'hear_no_evil': "\uD83D\uDE49",
  'heart': "\u2764\uFE0F",
  'heart_decoration': "\uD83D\uDC9F",
  'heart_eyes': "\uD83D\uDE0D",
  'heart_eyes_cat': "\uD83D\uDE3B",
  'heartbeat': "\uD83D\uDC93",
  'heartpulse': "\uD83D\uDC97",
  'hearts': "\u2665\uFE0F",
  'heavy_check_mark': "\u2714\uFE0F",
  'heavy_division_sign': "\u2797",
  'heavy_dollar_sign': "\uD83D\uDCB2",
  'heavy_heart_exclamation': "\u2763\uFE0F",
  'heavy_minus_sign': "\u2796",
  'heavy_multiplication_x': "\u2716\uFE0F",
  'heavy_plus_sign': "\u2795",
  'helicopter': "\uD83D\uDE81",
  'herb': "\uD83C\uDF3F",
  'hibiscus': "\uD83C\uDF3A",
  'high_brightness': "\uD83D\uDD06",
  'high_heel': "\uD83D\uDC60",
  'hocho': "\uD83D\uDD2A",
  'hole': "\uD83D\uDD73",
  'honey_pot': "\uD83C\uDF6F",
  'horse': "\uD83D\uDC34",
  'horse_racing': "\uD83C\uDFC7",
  'hospital': "\uD83C\uDFE5",
  'hot_pepper': "\uD83C\uDF36",
  'hotdog': "\uD83C\uDF2D",
  'hotel': "\uD83C\uDFE8",
  'hotsprings': "\u2668\uFE0F",
  'hourglass': "\u231B\uFE0F",
  'hourglass_flowing_sand': "\u23F3",
  'house': "\uD83C\uDFE0",
  'house_with_garden': "\uD83C\uDFE1",
  'houses': "\uD83C\uDFD8",
  'hugs': "\uD83E\uDD17",
  'hushed': "\uD83D\uDE2F",
  'ice_cream': "\uD83C\uDF68",
  'ice_hockey': "\uD83C\uDFD2",
  'ice_skate': "\u26F8",
  'icecream': "\uD83C\uDF66",
  'id': "\uD83C\uDD94",
  'ideograph_advantage': "\uD83C\uDE50",
  'imp': "\uD83D\uDC7F",
  'inbox_tray': "\uD83D\uDCE5",
  'incoming_envelope': "\uD83D\uDCE8",
  'tipping_hand_woman': "\uD83D\uDC81",
  'information_source': "\u2139\uFE0F",
  'innocent': "\uD83D\uDE07",
  'interrobang': "\u2049\uFE0F",
  'iphone': "\uD83D\uDCF1",
  'izakaya_lantern': "\uD83C\uDFEE",
  'jack_o_lantern': "\uD83C\uDF83",
  'japan': "\uD83D\uDDFE",
  'japanese_castle': "\uD83C\uDFEF",
  'japanese_goblin': "\uD83D\uDC7A",
  'japanese_ogre': "\uD83D\uDC79",
  'jeans': "\uD83D\uDC56",
  'joy': "\uD83D\uDE02",
  'joy_cat': "\uD83D\uDE39",
  'joystick': "\uD83D\uDD79",
  'kaaba': "\uD83D\uDD4B",
  'key': "\uD83D\uDD11",
  'keyboard': "\u2328\uFE0F",
  'keycap_ten': "\uD83D\uDD1F",
  'kick_scooter': "\uD83D\uDEF4",
  'kimono': "\uD83D\uDC58",
  'kiss': "\uD83D\uDC8B",
  'kissing': "\uD83D\uDE17",
  'kissing_cat': "\uD83D\uDE3D",
  'kissing_closed_eyes': "\uD83D\uDE1A",
  'kissing_heart': "\uD83D\uDE18",
  'kissing_smiling_eyes': "\uD83D\uDE19",
  'kiwi_fruit': "\uD83E\uDD5D",
  'koala': "\uD83D\uDC28",
  'koko': "\uD83C\uDE01",
  'label': "\uD83C\uDFF7",
  'large_blue_circle': "\uD83D\uDD35",
  'large_blue_diamond': "\uD83D\uDD37",
  'large_orange_diamond': "\uD83D\uDD36",
  'last_quarter_moon': "\uD83C\uDF17",
  'last_quarter_moon_with_face': "\uD83C\uDF1C",
  'latin_cross': "\u271D\uFE0F",
  'laughing': "\uD83D\uDE06",
  'leaves': "\uD83C\uDF43",
  'ledger': "\uD83D\uDCD2",
  'left_luggage': "\uD83D\uDEC5",
  'left_right_arrow': "\u2194\uFE0F",
  'leftwards_arrow_with_hook': "\u21A9\uFE0F",
  'lemon': "\uD83C\uDF4B",
  'leo': "\u264C\uFE0F",
  'leopard': "\uD83D\uDC06",
  'level_slider': "\uD83C\uDF9A",
  'libra': "\u264E\uFE0F",
  'light_rail': "\uD83D\uDE88",
  'link': "\uD83D\uDD17",
  'lion': "\uD83E\uDD81",
  'lips': "\uD83D\uDC44",
  'lipstick': "\uD83D\uDC84",
  'lizard': "\uD83E\uDD8E",
  'lock': "\uD83D\uDD12",
  'lock_with_ink_pen': "\uD83D\uDD0F",
  'lollipop': "\uD83C\uDF6D",
  'loop': "\u27BF",
  'loud_sound': "\uD83D\uDD0A",
  'loudspeaker': "\uD83D\uDCE2",
  'love_hotel': "\uD83C\uDFE9",
  'love_letter': "\uD83D\uDC8C",
  'low_brightness': "\uD83D\uDD05",
  'lying_face': "\uD83E\uDD25",
  'm': "\u24C2\uFE0F",
  'mag': "\uD83D\uDD0D",
  'mag_right': "\uD83D\uDD0E",
  'mahjong': "\uD83C\uDC04\uFE0F",
  'mailbox': "\uD83D\uDCEB",
  'mailbox_closed': "\uD83D\uDCEA",
  'mailbox_with_mail': "\uD83D\uDCEC",
  'mailbox_with_no_mail': "\uD83D\uDCED",
  'man': "\uD83D\uDC68",
  'man_artist': "\uD83D\uDC68&zwj;\uD83C\uDFA8",
  'man_astronaut': "\uD83D\uDC68&zwj;\uD83D\uDE80",
  'man_cartwheeling': "\uD83E\uDD38&zwj;\u2642\uFE0F",
  'man_cook': "\uD83D\uDC68&zwj;\uD83C\uDF73",
  'man_dancing': "\uD83D\uDD7A",
  'man_facepalming': "\uD83E\uDD26&zwj;\u2642\uFE0F",
  'man_factory_worker': "\uD83D\uDC68&zwj;\uD83C\uDFED",
  'man_farmer': "\uD83D\uDC68&zwj;\uD83C\uDF3E",
  'man_firefighter': "\uD83D\uDC68&zwj;\uD83D\uDE92",
  'man_health_worker': "\uD83D\uDC68&zwj;\u2695\uFE0F",
  'man_in_tuxedo': "\uD83E\uDD35",
  'man_judge': "\uD83D\uDC68&zwj;\u2696\uFE0F",
  'man_juggling': "\uD83E\uDD39&zwj;\u2642\uFE0F",
  'man_mechanic': "\uD83D\uDC68&zwj;\uD83D\uDD27",
  'man_office_worker': "\uD83D\uDC68&zwj;\uD83D\uDCBC",
  'man_pilot': "\uD83D\uDC68&zwj;\u2708\uFE0F",
  'man_playing_handball': "\uD83E\uDD3E&zwj;\u2642\uFE0F",
  'man_playing_water_polo': "\uD83E\uDD3D&zwj;\u2642\uFE0F",
  'man_scientist': "\uD83D\uDC68&zwj;\uD83D\uDD2C",
  'man_shrugging': "\uD83E\uDD37&zwj;\u2642\uFE0F",
  'man_singer': "\uD83D\uDC68&zwj;\uD83C\uDFA4",
  'man_student': "\uD83D\uDC68&zwj;\uD83C\uDF93",
  'man_teacher': "\uD83D\uDC68&zwj;\uD83C\uDFEB",
  'man_technologist': "\uD83D\uDC68&zwj;\uD83D\uDCBB",
  'man_with_gua_pi_mao': "\uD83D\uDC72",
  'man_with_turban': "\uD83D\uDC73",
  'tangerine': "\uD83C\uDF4A",
  'mans_shoe': "\uD83D\uDC5E",
  'mantelpiece_clock': "\uD83D\uDD70",
  'maple_leaf': "\uD83C\uDF41",
  'martial_arts_uniform': "\uD83E\uDD4B",
  'mask': "\uD83D\uDE37",
  'massage_woman': "\uD83D\uDC86",
  'massage_man': "\uD83D\uDC86&zwj;\u2642\uFE0F",
  'meat_on_bone': "\uD83C\uDF56",
  'medal_military': "\uD83C\uDF96",
  'medal_sports': "\uD83C\uDFC5",
  'mega': "\uD83D\uDCE3",
  'melon': "\uD83C\uDF48",
  'memo': "\uD83D\uDCDD",
  'men_wrestling': "\uD83E\uDD3C&zwj;\u2642\uFE0F",
  'menorah': "\uD83D\uDD4E",
  'mens': "\uD83D\uDEB9",
  'metal': "\uD83E\uDD18",
  'metro': "\uD83D\uDE87",
  'microphone': "\uD83C\uDFA4",
  'microscope': "\uD83D\uDD2C",
  'milk_glass': "\uD83E\uDD5B",
  'milky_way': "\uD83C\uDF0C",
  'minibus': "\uD83D\uDE90",
  'minidisc': "\uD83D\uDCBD",
  'mobile_phone_off': "\uD83D\uDCF4",
  'money_mouth_face': "\uD83E\uDD11",
  'money_with_wings': "\uD83D\uDCB8",
  'moneybag': "\uD83D\uDCB0",
  'monkey': "\uD83D\uDC12",
  'monkey_face': "\uD83D\uDC35",
  'monorail': "\uD83D\uDE9D",
  'moon': "\uD83C\uDF14",
  'mortar_board': "\uD83C\uDF93",
  'mosque': "\uD83D\uDD4C",
  'motor_boat': "\uD83D\uDEE5",
  'motor_scooter': "\uD83D\uDEF5",
  'motorcycle': "\uD83C\uDFCD",
  'motorway': "\uD83D\uDEE3",
  'mount_fuji': "\uD83D\uDDFB",
  'mountain': "\u26F0",
  'mountain_biking_man': "\uD83D\uDEB5",
  'mountain_biking_woman': "\uD83D\uDEB5&zwj;\u2640\uFE0F",
  'mountain_cableway': "\uD83D\uDEA0",
  'mountain_railway': "\uD83D\uDE9E",
  'mountain_snow': "\uD83C\uDFD4",
  'mouse': "\uD83D\uDC2D",
  'mouse2': "\uD83D\uDC01",
  'movie_camera': "\uD83C\uDFA5",
  'moyai': "\uD83D\uDDFF",
  'mrs_claus': "\uD83E\uDD36",
  'muscle': "\uD83D\uDCAA",
  'mushroom': "\uD83C\uDF44",
  'musical_keyboard': "\uD83C\uDFB9",
  'musical_note': "\uD83C\uDFB5",
  'musical_score': "\uD83C\uDFBC",
  'mute': "\uD83D\uDD07",
  'nail_care': "\uD83D\uDC85",
  'name_badge': "\uD83D\uDCDB",
  'national_park': "\uD83C\uDFDE",
  'nauseated_face': "\uD83E\uDD22",
  'necktie': "\uD83D\uDC54",
  'negative_squared_cross_mark': "\u274E",
  'nerd_face': "\uD83E\uDD13",
  'neutral_face': "\uD83D\uDE10",
  'new': "\uD83C\uDD95",
  'new_moon': "\uD83C\uDF11",
  'new_moon_with_face': "\uD83C\uDF1A",
  'newspaper': "\uD83D\uDCF0",
  'newspaper_roll': "\uD83D\uDDDE",
  'next_track_button': "\u23ED",
  'ng': "\uD83C\uDD96",
  'no_good_man': "\uD83D\uDE45&zwj;\u2642\uFE0F",
  'no_good_woman': "\uD83D\uDE45",
  'night_with_stars': "\uD83C\uDF03",
  'no_bell': "\uD83D\uDD15",
  'no_bicycles': "\uD83D\uDEB3",
  'no_entry': "\u26D4\uFE0F",
  'no_entry_sign': "\uD83D\uDEAB",
  'no_mobile_phones': "\uD83D\uDCF5",
  'no_mouth': "\uD83D\uDE36",
  'no_pedestrians': "\uD83D\uDEB7",
  'no_smoking': "\uD83D\uDEAD",
  'non-potable_water': "\uD83D\uDEB1",
  'nose': "\uD83D\uDC43",
  'notebook': "\uD83D\uDCD3",
  'notebook_with_decorative_cover': "\uD83D\uDCD4",
  'notes': "\uD83C\uDFB6",
  'nut_and_bolt': "\uD83D\uDD29",
  'o': "\u2B55\uFE0F",
  'o2': "\uD83C\uDD7E\uFE0F",
  'ocean': "\uD83C\uDF0A",
  'octopus': "\uD83D\uDC19",
  'oden': "\uD83C\uDF62",
  'office': "\uD83C\uDFE2",
  'oil_drum': "\uD83D\uDEE2",
  'ok': "\uD83C\uDD97",
  'ok_hand': "\uD83D\uDC4C",
  'ok_man': "\uD83D\uDE46&zwj;\u2642\uFE0F",
  'ok_woman': "\uD83D\uDE46",
  'old_key': "\uD83D\uDDDD",
  'older_man': "\uD83D\uDC74",
  'older_woman': "\uD83D\uDC75",
  'om': "\uD83D\uDD49",
  'on': "\uD83D\uDD1B",
  'oncoming_automobile': "\uD83D\uDE98",
  'oncoming_bus': "\uD83D\uDE8D",
  'oncoming_police_car': "\uD83D\uDE94",
  'oncoming_taxi': "\uD83D\uDE96",
  'open_file_folder': "\uD83D\uDCC2",
  'open_hands': "\uD83D\uDC50",
  'open_mouth': "\uD83D\uDE2E",
  'open_umbrella': "\u2602\uFE0F",
  'ophiuchus': "\u26CE",
  'orange_book': "\uD83D\uDCD9",
  'orthodox_cross': "\u2626\uFE0F",
  'outbox_tray': "\uD83D\uDCE4",
  'owl': "\uD83E\uDD89",
  'ox': "\uD83D\uDC02",
  'package': "\uD83D\uDCE6",
  'page_facing_up': "\uD83D\uDCC4",
  'page_with_curl': "\uD83D\uDCC3",
  'pager': "\uD83D\uDCDF",
  'paintbrush': "\uD83D\uDD8C",
  'palm_tree': "\uD83C\uDF34",
  'pancakes': "\uD83E\uDD5E",
  'panda_face': "\uD83D\uDC3C",
  'paperclip': "\uD83D\uDCCE",
  'paperclips': "\uD83D\uDD87",
  'parasol_on_ground': "\u26F1",
  'parking': "\uD83C\uDD7F\uFE0F",
  'part_alternation_mark': "\u303D\uFE0F",
  'partly_sunny': "\u26C5\uFE0F",
  'passenger_ship': "\uD83D\uDEF3",
  'passport_control': "\uD83D\uDEC2",
  'pause_button': "\u23F8",
  'peace_symbol': "\u262E\uFE0F",
  'peach': "\uD83C\uDF51",
  'peanuts': "\uD83E\uDD5C",
  'pear': "\uD83C\uDF50",
  'pen': "\uD83D\uDD8A",
  'pencil2': "\u270F\uFE0F",
  'penguin': "\uD83D\uDC27",
  'pensive': "\uD83D\uDE14",
  'performing_arts': "\uD83C\uDFAD",
  'persevere': "\uD83D\uDE23",
  'person_fencing': "\uD83E\uDD3A",
  'pouting_woman': "\uD83D\uDE4E",
  'phone': "\u260E\uFE0F",
  'pick': "\u26CF",
  'pig': "\uD83D\uDC37",
  'pig2': "\uD83D\uDC16",
  'pig_nose': "\uD83D\uDC3D",
  'pill': "\uD83D\uDC8A",
  'pineapple': "\uD83C\uDF4D",
  'ping_pong': "\uD83C\uDFD3",
  'pisces': "\u2653\uFE0F",
  'pizza': "\uD83C\uDF55",
  'place_of_worship': "\uD83D\uDED0",
  'plate_with_cutlery': "\uD83C\uDF7D",
  'play_or_pause_button': "\u23EF",
  'point_down': "\uD83D\uDC47",
  'point_left': "\uD83D\uDC48",
  'point_right': "\uD83D\uDC49",
  'point_up': "\u261D\uFE0F",
  'point_up_2': "\uD83D\uDC46",
  'police_car': "\uD83D\uDE93",
  'policewoman': "\uD83D\uDC6E&zwj;\u2640\uFE0F",
  'poodle': "\uD83D\uDC29",
  'popcorn': "\uD83C\uDF7F",
  'post_office': "\uD83C\uDFE3",
  'postal_horn': "\uD83D\uDCEF",
  'postbox': "\uD83D\uDCEE",
  'potable_water': "\uD83D\uDEB0",
  'potato': "\uD83E\uDD54",
  'pouch': "\uD83D\uDC5D",
  'poultry_leg': "\uD83C\uDF57",
  'pound': "\uD83D\uDCB7",
  'rage': "\uD83D\uDE21",
  'pouting_cat': "\uD83D\uDE3E",
  'pouting_man': "\uD83D\uDE4E&zwj;\u2642\uFE0F",
  'pray': "\uD83D\uDE4F",
  'prayer_beads': "\uD83D\uDCFF",
  'pregnant_woman': "\uD83E\uDD30",
  'previous_track_button': "\u23EE",
  'prince': "\uD83E\uDD34",
  'princess': "\uD83D\uDC78",
  'printer': "\uD83D\uDDA8",
  'purple_heart': "\uD83D\uDC9C",
  'purse': "\uD83D\uDC5B",
  'pushpin': "\uD83D\uDCCC",
  'put_litter_in_its_place': "\uD83D\uDEAE",
  'question': "\u2753",
  'rabbit': "\uD83D\uDC30",
  'rabbit2': "\uD83D\uDC07",
  'racehorse': "\uD83D\uDC0E",
  'racing_car': "\uD83C\uDFCE",
  'radio': "\uD83D\uDCFB",
  'radio_button': "\uD83D\uDD18",
  'radioactive': "\u2622\uFE0F",
  'railway_car': "\uD83D\uDE83",
  'railway_track': "\uD83D\uDEE4",
  'rainbow': "\uD83C\uDF08",
  'rainbow_flag': "\uD83C\uDFF3\uFE0F&zwj;\uD83C\uDF08",
  'raised_back_of_hand': "\uD83E\uDD1A",
  'raised_hand_with_fingers_splayed': "\uD83D\uDD90",
  'raised_hands': "\uD83D\uDE4C",
  'raising_hand_woman': "\uD83D\uDE4B",
  'raising_hand_man': "\uD83D\uDE4B&zwj;\u2642\uFE0F",
  'ram': "\uD83D\uDC0F",
  'ramen': "\uD83C\uDF5C",
  'rat': "\uD83D\uDC00",
  'record_button': "\u23FA",
  'recycle': "\u267B\uFE0F",
  'red_circle': "\uD83D\uDD34",
  'registered': "\xAE\uFE0F",
  'relaxed': "\u263A\uFE0F",
  'relieved': "\uD83D\uDE0C",
  'reminder_ribbon': "\uD83C\uDF97",
  'repeat': "\uD83D\uDD01",
  'repeat_one': "\uD83D\uDD02",
  'rescue_worker_helmet': "\u26D1",
  'restroom': "\uD83D\uDEBB",
  'revolving_hearts': "\uD83D\uDC9E",
  'rewind': "\u23EA",
  'rhinoceros': "\uD83E\uDD8F",
  'ribbon': "\uD83C\uDF80",
  'rice': "\uD83C\uDF5A",
  'rice_ball': "\uD83C\uDF59",
  'rice_cracker': "\uD83C\uDF58",
  'rice_scene': "\uD83C\uDF91",
  'right_anger_bubble': "\uD83D\uDDEF",
  'ring': "\uD83D\uDC8D",
  'robot': "\uD83E\uDD16",
  'rocket': "\uD83D\uDE80",
  'rofl': "\uD83E\uDD23",
  'roll_eyes': "\uD83D\uDE44",
  'roller_coaster': "\uD83C\uDFA2",
  'rooster': "\uD83D\uDC13",
  'rose': "\uD83C\uDF39",
  'rosette': "\uD83C\uDFF5",
  'rotating_light': "\uD83D\uDEA8",
  'round_pushpin': "\uD83D\uDCCD",
  'rowing_man': "\uD83D\uDEA3",
  'rowing_woman': "\uD83D\uDEA3&zwj;\u2640\uFE0F",
  'rugby_football': "\uD83C\uDFC9",
  'running_man': "\uD83C\uDFC3",
  'running_shirt_with_sash': "\uD83C\uDFBD",
  'running_woman': "\uD83C\uDFC3&zwj;\u2640\uFE0F",
  'sa': "\uD83C\uDE02\uFE0F",
  'sagittarius': "\u2650\uFE0F",
  'sake': "\uD83C\uDF76",
  'sandal': "\uD83D\uDC61",
  'santa': "\uD83C\uDF85",
  'satellite': "\uD83D\uDCE1",
  'saxophone': "\uD83C\uDFB7",
  'school': "\uD83C\uDFEB",
  'school_satchel': "\uD83C\uDF92",
  'scissors': "\u2702\uFE0F",
  'scorpion': "\uD83E\uDD82",
  'scorpius': "\u264F\uFE0F",
  'scream': "\uD83D\uDE31",
  'scream_cat': "\uD83D\uDE40",
  'scroll': "\uD83D\uDCDC",
  'seat': "\uD83D\uDCBA",
  'secret': "\u3299\uFE0F",
  'see_no_evil': "\uD83D\uDE48",
  'seedling': "\uD83C\uDF31",
  'selfie': "\uD83E\uDD33",
  'shallow_pan_of_food': "\uD83E\uDD58",
  'shamrock': "\u2618\uFE0F",
  'shark': "\uD83E\uDD88",
  'shaved_ice': "\uD83C\uDF67",
  'sheep': "\uD83D\uDC11",
  'shell': "\uD83D\uDC1A",
  'shield': "\uD83D\uDEE1",
  'shinto_shrine': "\u26E9",
  'ship': "\uD83D\uDEA2",
  'shirt': "\uD83D\uDC55",
  'shopping': "\uD83D\uDECD",
  'shopping_cart': "\uD83D\uDED2",
  'shower': "\uD83D\uDEBF",
  'shrimp': "\uD83E\uDD90",
  'signal_strength': "\uD83D\uDCF6",
  'six_pointed_star': "\uD83D\uDD2F",
  'ski': "\uD83C\uDFBF",
  'skier': "\u26F7",
  'skull': "\uD83D\uDC80",
  'skull_and_crossbones': "\u2620\uFE0F",
  'sleeping': "\uD83D\uDE34",
  'sleeping_bed': "\uD83D\uDECC",
  'sleepy': "\uD83D\uDE2A",
  'slightly_frowning_face': "\uD83D\uDE41",
  'slightly_smiling_face': "\uD83D\uDE42",
  'slot_machine': "\uD83C\uDFB0",
  'small_airplane': "\uD83D\uDEE9",
  'small_blue_diamond': "\uD83D\uDD39",
  'small_orange_diamond': "\uD83D\uDD38",
  'small_red_triangle': "\uD83D\uDD3A",
  'small_red_triangle_down': "\uD83D\uDD3B",
  'smile': "\uD83D\uDE04",
  'smile_cat': "\uD83D\uDE38",
  'smiley': "\uD83D\uDE03",
  'smiley_cat': "\uD83D\uDE3A",
  'smiling_imp': "\uD83D\uDE08",
  'smirk': "\uD83D\uDE0F",
  'smirk_cat': "\uD83D\uDE3C",
  'smoking': "\uD83D\uDEAC",
  'snail': "\uD83D\uDC0C",
  'snake': "\uD83D\uDC0D",
  'sneezing_face': "\uD83E\uDD27",
  'snowboarder': "\uD83C\uDFC2",
  'snowflake': "\u2744\uFE0F",
  'snowman': "\u26C4\uFE0F",
  'snowman_with_snow': "\u2603\uFE0F",
  'sob': "\uD83D\uDE2D",
  'soccer': "\u26BD\uFE0F",
  'soon': "\uD83D\uDD1C",
  'sos': "\uD83C\uDD98",
  'sound': "\uD83D\uDD09",
  'space_invader': "\uD83D\uDC7E",
  'spades': "\u2660\uFE0F",
  'spaghetti': "\uD83C\uDF5D",
  'sparkle': "\u2747\uFE0F",
  'sparkler': "\uD83C\uDF87",
  'sparkles': "\u2728",
  'sparkling_heart': "\uD83D\uDC96",
  'speak_no_evil': "\uD83D\uDE4A",
  'speaker': "\uD83D\uDD08",
  'speaking_head': "\uD83D\uDDE3",
  'speech_balloon': "\uD83D\uDCAC",
  'speedboat': "\uD83D\uDEA4",
  'spider': "\uD83D\uDD77",
  'spider_web': "\uD83D\uDD78",
  'spiral_calendar': "\uD83D\uDDD3",
  'spiral_notepad': "\uD83D\uDDD2",
  'spoon': "\uD83E\uDD44",
  'squid': "\uD83E\uDD91",
  'stadium': "\uD83C\uDFDF",
  'star': "\u2B50\uFE0F",
  'star2': "\uD83C\uDF1F",
  'star_and_crescent': "\u262A\uFE0F",
  'star_of_david': "\u2721\uFE0F",
  'stars': "\uD83C\uDF20",
  'station': "\uD83D\uDE89",
  'statue_of_liberty': "\uD83D\uDDFD",
  'steam_locomotive': "\uD83D\uDE82",
  'stew': "\uD83C\uDF72",
  'stop_button': "\u23F9",
  'stop_sign': "\uD83D\uDED1",
  'stopwatch': "\u23F1",
  'straight_ruler': "\uD83D\uDCCF",
  'strawberry': "\uD83C\uDF53",
  'stuck_out_tongue': "\uD83D\uDE1B",
  'stuck_out_tongue_closed_eyes': "\uD83D\uDE1D",
  'stuck_out_tongue_winking_eye': "\uD83D\uDE1C",
  'studio_microphone': "\uD83C\uDF99",
  'stuffed_flatbread': "\uD83E\uDD59",
  'sun_behind_large_cloud': "\uD83C\uDF25",
  'sun_behind_rain_cloud': "\uD83C\uDF26",
  'sun_behind_small_cloud': "\uD83C\uDF24",
  'sun_with_face': "\uD83C\uDF1E",
  'sunflower': "\uD83C\uDF3B",
  'sunglasses': "\uD83D\uDE0E",
  'sunny': "\u2600\uFE0F",
  'sunrise': "\uD83C\uDF05",
  'sunrise_over_mountains': "\uD83C\uDF04",
  'surfing_man': "\uD83C\uDFC4",
  'surfing_woman': "\uD83C\uDFC4&zwj;\u2640\uFE0F",
  'sushi': "\uD83C\uDF63",
  'suspension_railway': "\uD83D\uDE9F",
  'sweat': "\uD83D\uDE13",
  'sweat_drops': "\uD83D\uDCA6",
  'sweat_smile': "\uD83D\uDE05",
  'sweet_potato': "\uD83C\uDF60",
  'swimming_man': "\uD83C\uDFCA",
  'swimming_woman': "\uD83C\uDFCA&zwj;\u2640\uFE0F",
  'symbols': "\uD83D\uDD23",
  'synagogue': "\uD83D\uDD4D",
  'syringe': "\uD83D\uDC89",
  'taco': "\uD83C\uDF2E",
  'tada': "\uD83C\uDF89",
  'tanabata_tree': "\uD83C\uDF8B",
  'taurus': "\u2649\uFE0F",
  'taxi': "\uD83D\uDE95",
  'tea': "\uD83C\uDF75",
  'telephone_receiver': "\uD83D\uDCDE",
  'telescope': "\uD83D\uDD2D",
  'tennis': "\uD83C\uDFBE",
  'tent': "\u26FA\uFE0F",
  'thermometer': "\uD83C\uDF21",
  'thinking': "\uD83E\uDD14",
  'thought_balloon': "\uD83D\uDCAD",
  'ticket': "\uD83C\uDFAB",
  'tickets': "\uD83C\uDF9F",
  'tiger': "\uD83D\uDC2F",
  'tiger2': "\uD83D\uDC05",
  'timer_clock': "\u23F2",
  'tipping_hand_man': "\uD83D\uDC81&zwj;\u2642\uFE0F",
  'tired_face': "\uD83D\uDE2B",
  'tm': "\u2122\uFE0F",
  'toilet': "\uD83D\uDEBD",
  'tokyo_tower': "\uD83D\uDDFC",
  'tomato': "\uD83C\uDF45",
  'tongue': "\uD83D\uDC45",
  'top': "\uD83D\uDD1D",
  'tophat': "\uD83C\uDFA9",
  'tornado': "\uD83C\uDF2A",
  'trackball': "\uD83D\uDDB2",
  'tractor': "\uD83D\uDE9C",
  'traffic_light': "\uD83D\uDEA5",
  'train': "\uD83D\uDE8B",
  'train2': "\uD83D\uDE86",
  'tram': "\uD83D\uDE8A",
  'triangular_flag_on_post': "\uD83D\uDEA9",
  'triangular_ruler': "\uD83D\uDCD0",
  'trident': "\uD83D\uDD31",
  'triumph': "\uD83D\uDE24",
  'trolleybus': "\uD83D\uDE8E",
  'trophy': "\uD83C\uDFC6",
  'tropical_drink': "\uD83C\uDF79",
  'tropical_fish': "\uD83D\uDC20",
  'truck': "\uD83D\uDE9A",
  'trumpet': "\uD83C\uDFBA",
  'tulip': "\uD83C\uDF37",
  'tumbler_glass': "\uD83E\uDD43",
  'turkey': "\uD83E\uDD83",
  'turtle': "\uD83D\uDC22",
  'tv': "\uD83D\uDCFA",
  'twisted_rightwards_arrows': "\uD83D\uDD00",
  'two_hearts': "\uD83D\uDC95",
  'two_men_holding_hands': "\uD83D\uDC6C",
  'two_women_holding_hands': "\uD83D\uDC6D",
  'u5272': "\uD83C\uDE39",
  'u5408': "\uD83C\uDE34",
  'u55b6': "\uD83C\uDE3A",
  'u6307': "\uD83C\uDE2F\uFE0F",
  'u6708': "\uD83C\uDE37\uFE0F",
  'u6709': "\uD83C\uDE36",
  'u6e80': "\uD83C\uDE35",
  'u7121': "\uD83C\uDE1A\uFE0F",
  'u7533': "\uD83C\uDE38",
  'u7981': "\uD83C\uDE32",
  'u7a7a': "\uD83C\uDE33",
  'umbrella': "\u2614\uFE0F",
  'unamused': "\uD83D\uDE12",
  'underage': "\uD83D\uDD1E",
  'unicorn': "\uD83E\uDD84",
  'unlock': "\uD83D\uDD13",
  'up': "\uD83C\uDD99",
  'upside_down_face': "\uD83D\uDE43",
  'v': "\u270C\uFE0F",
  'vertical_traffic_light': "\uD83D\uDEA6",
  'vhs': "\uD83D\uDCFC",
  'vibration_mode': "\uD83D\uDCF3",
  'video_camera': "\uD83D\uDCF9",
  'video_game': "\uD83C\uDFAE",
  'violin': "\uD83C\uDFBB",
  'virgo': "\u264D\uFE0F",
  'volcano': "\uD83C\uDF0B",
  'volleyball': "\uD83C\uDFD0",
  'vs': "\uD83C\uDD9A",
  'vulcan_salute': "\uD83D\uDD96",
  'walking_man': "\uD83D\uDEB6",
  'walking_woman': "\uD83D\uDEB6&zwj;\u2640\uFE0F",
  'waning_crescent_moon': "\uD83C\uDF18",
  'waning_gibbous_moon': "\uD83C\uDF16",
  'warning': "\u26A0\uFE0F",
  'wastebasket': "\uD83D\uDDD1",
  'watch': "\u231A\uFE0F",
  'water_buffalo': "\uD83D\uDC03",
  'watermelon': "\uD83C\uDF49",
  'wave': "\uD83D\uDC4B",
  'wavy_dash': "\u3030\uFE0F",
  'waxing_crescent_moon': "\uD83C\uDF12",
  'wc': "\uD83D\uDEBE",
  'weary': "\uD83D\uDE29",
  'wedding': "\uD83D\uDC92",
  'weight_lifting_man': "\uD83C\uDFCB\uFE0F",
  'weight_lifting_woman': "\uD83C\uDFCB\uFE0F&zwj;\u2640\uFE0F",
  'whale': "\uD83D\uDC33",
  'whale2': "\uD83D\uDC0B",
  'wheel_of_dharma': "\u2638\uFE0F",
  'wheelchair': "\u267F\uFE0F",
  'white_check_mark': "\u2705",
  'white_circle': "\u26AA\uFE0F",
  'white_flag': "\uD83C\uDFF3\uFE0F",
  'white_flower': "\uD83D\uDCAE",
  'white_large_square': "\u2B1C\uFE0F",
  'white_medium_small_square': "\u25FD\uFE0F",
  'white_medium_square': "\u25FB\uFE0F",
  'white_small_square': "\u25AB\uFE0F",
  'white_square_button': "\uD83D\uDD33",
  'wilted_flower': "\uD83E\uDD40",
  'wind_chime': "\uD83C\uDF90",
  'wind_face': "\uD83C\uDF2C",
  'wine_glass': "\uD83C\uDF77",
  'wink': "\uD83D\uDE09",
  'wolf': "\uD83D\uDC3A",
  'woman': "\uD83D\uDC69",
  'woman_artist': "\uD83D\uDC69&zwj;\uD83C\uDFA8",
  'woman_astronaut': "\uD83D\uDC69&zwj;\uD83D\uDE80",
  'woman_cartwheeling': "\uD83E\uDD38&zwj;\u2640\uFE0F",
  'woman_cook': "\uD83D\uDC69&zwj;\uD83C\uDF73",
  'woman_facepalming': "\uD83E\uDD26&zwj;\u2640\uFE0F",
  'woman_factory_worker': "\uD83D\uDC69&zwj;\uD83C\uDFED",
  'woman_farmer': "\uD83D\uDC69&zwj;\uD83C\uDF3E",
  'woman_firefighter': "\uD83D\uDC69&zwj;\uD83D\uDE92",
  'woman_health_worker': "\uD83D\uDC69&zwj;\u2695\uFE0F",
  'woman_judge': "\uD83D\uDC69&zwj;\u2696\uFE0F",
  'woman_juggling': "\uD83E\uDD39&zwj;\u2640\uFE0F",
  'woman_mechanic': "\uD83D\uDC69&zwj;\uD83D\uDD27",
  'woman_office_worker': "\uD83D\uDC69&zwj;\uD83D\uDCBC",
  'woman_pilot': "\uD83D\uDC69&zwj;\u2708\uFE0F",
  'woman_playing_handball': "\uD83E\uDD3E&zwj;\u2640\uFE0F",
  'woman_playing_water_polo': "\uD83E\uDD3D&zwj;\u2640\uFE0F",
  'woman_scientist': "\uD83D\uDC69&zwj;\uD83D\uDD2C",
  'woman_shrugging': "\uD83E\uDD37&zwj;\u2640\uFE0F",
  'woman_singer': "\uD83D\uDC69&zwj;\uD83C\uDFA4",
  'woman_student': "\uD83D\uDC69&zwj;\uD83C\uDF93",
  'woman_teacher': "\uD83D\uDC69&zwj;\uD83C\uDFEB",
  'woman_technologist': "\uD83D\uDC69&zwj;\uD83D\uDCBB",
  'woman_with_turban': "\uD83D\uDC73&zwj;\u2640\uFE0F",
  'womans_clothes': "\uD83D\uDC5A",
  'womans_hat': "\uD83D\uDC52",
  'women_wrestling': "\uD83E\uDD3C&zwj;\u2640\uFE0F",
  'womens': "\uD83D\uDEBA",
  'world_map': "\uD83D\uDDFA",
  'worried': "\uD83D\uDE1F",
  'wrench': "\uD83D\uDD27",
  'writing_hand': "\u270D\uFE0F",
  'x': "\u274C",
  'yellow_heart': "\uD83D\uDC9B",
  'yen': "\uD83D\uDCB4",
  'yin_yang': "\u262F\uFE0F",
  'yum': "\uD83D\uDE0B",
  'zap': "\u26A1\uFE0F",
  'zipper_mouth_face': "\uD83E\uDD10",
  'zzz': "\uD83D\uDCA4",
  /* special emojis :P */
  'octocat': '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
  'showdown': '<span style="font-family: \'Anonymous Pro\', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>'
};