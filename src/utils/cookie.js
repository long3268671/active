
  //cookie 暴露出的方法

  exports.getCookie = (name) => {
      let arg = name + "=";
      let alen = arg.length;
      let clen = document.cookie.length;
      let i = 0;
      while (i < clen)
      {
      let j = i + alen;
      if (document.cookie.substring(i, j) == arg)
      return _getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
      }
      return null;
  }
  function _getCookieVal(offset){
      let endstr = document.cookie.indexOf (";", offset);
      if (endstr == -1)
      endstr = document.cookie.length;
      return unescape(document.cookie.substring(offset, endstr));
  }
  exports.setCookie = (name,value)=>{
      let expdate = new Date();
      let argv = arguments;
      let argc = arguments.length;
      let expires = (argc > 2) ? argv[2] : 7;//设置默认 cookie 过期时间为 7 天
      let path = (argc > 3) ? argv[3] : '/'; //默认所有页面使用
      let domain = (argc > 4) ? argv[4] : null;
      let secure = (argc > 5) ? argv[5] : null;
      if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 24 * 60 * 60 * 1000 ));
      document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
      +("; path=" + path) +((domain == null) ? "" : ("; domain=" + domain))
      +((secure == null) ? "" : ("; secure=" + secure));//path 默认为/ domain和secure默认都不设置。已经将delCookie方法同步，删除时保持一致，否则会导致cookie删除失败！！
  }
  exports.DelCookie = (name)=>{
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      document.cookie = name + "=; expires="+ exp.toGMTString()+"; path=/";
  }

