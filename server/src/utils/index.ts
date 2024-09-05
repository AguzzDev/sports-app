function diacriticSensitiveRegex(string:string) {
  return string.replace(/a/g, '[a,á,à,ä,â]')
     .replace(/e/g, '[e,é,ë,è]')
     .replace(/i/g, '[i,í,ï,ì]')
     .replace(/o/g, '[o,ó,ö,ò]')
     .replace(/u/g, '[u,ü,ú,ù]');
}

export {diacriticSensitiveRegex}