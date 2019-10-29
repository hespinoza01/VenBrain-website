/////////////////////////////////////
//   Custom properties utils    ////
////////////////////////////////////

// Node Selector based in JQuery
window.$ = function(selector){
  let result;

  selector = selector || document.body; // Set default value for selector

  // If using css selectors
  if(typeof selector === "string"){
    let elements = Array.from(document.querySelectorAll(selector));
    result = (elements.length === 1) ? elements[0] : elements;
  }else if(Object.is(selector, document) || Object.is(selector, window)){
    result = selector;
  }else{
    throw new TypeError('Selector argument is not valid');
  }

  if(Array.isArray(result)){
    if(result.length === 0) return null;
  }

  return result;
};

// shorthand to addEventListener
window.Node.prototype.on = function(eventType, callback){
  if(eventType === undefined || typeof eventType !== "string") return;
  if(callback === undefined || typeof callback !== "function") return;

  this.addEventListener(`${eventType}`, callback);
  return this;
};
window.on = window.Node.prototype.on;

//shorthand to classList.Add
window.Node.prototype.addClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  this.classList.add(classname);
  return this;
};

// shorthand to classList.remove
window.Node.prototype.removeClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  this.classList.remove(classname);
  return this;
};

// verify is node contain className
window.Node.prototype.hasClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  return this.classList.contains(classname);
};

// shorthand to style.[propertyName] and modify styles
window.Node.prototype.css = function(arg){
  if(Object.prototype.toString.call(arg) === '[object Array]'){
    let result = [];

    for(let i=0; i<arg.length; i++){
      result.push(this.style[arg[i]]);
    }

    return (result.length === 1) ? result[0] : result;
  }

  if(arguments.length === 1){
    let data = arguments[0];

    if(data === Object(data)){
      let keys = Object.keys(data);

      for(let i=0; i<keys.length; i++){
        this.style[keys[i]] = data[keys[i]];
      }
    }else if(typeof data === "string"){
      return this.style[data];
    }

  }else if(arguments.length === 2){
    let property = arguments[0],
      value = arguments[1];

    if(typeof property === "string" && ["string", "number"].includes(typeof value)){
      this.style[arguments[0]] = arguments[1];
    }
  }

  return this;
};
document.body.css = window.Node.prototype.css;

// adding new property to history object, and dispatching custom event after pushState invoke
window.history.setURI = function(URL='/'){
  let oldUrl = location.href,
    newUrl = location.origin + URL,
    pathName = URL,
    oldPathName = oldUrl.substring(location.origin.length, oldUrl.length);

  history.pushState({}, pathName, URL);

  window.dispatchEvent(new CustomEvent('pushstate', {
    detail: {
      oldUrl,
      newUrl,
      oldPathName,
      pathName
    },
    bubbles: true,
    cancelable: true
  }));
};

// adding new property to get all cookies storaged
window.getPathCookies = function(){
  let cookies = { path: '/' };

  if(document.cookie){
    cookies = document.cookie
      .split(';')
      .map(item => item.split('='))
      .reduce((prev, cur) => {
        prev[cur[0]] = cur[1].split('%2F').join('/');
        return prev;
      }, {});
  }

  return cookies;
};
