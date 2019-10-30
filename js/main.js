// Routes and RoutesEvents object content
const Routes = {},
      RoutesEvents = {},
      RootComponent = $('#main-content'),
      MainHeader = $('#main-header');

// controller for pushState event to change component to view
function onPushState(e){
  let pathName = e.detail.pathName;

  // invoking component for current route
  if(Routes[pathName]){
    RootComponent.innerHTML = Routes[pathName];
  }

  // invoking event's listener (if exist)
  if(RoutesEvents[pathName]){
    RoutesEvents[pathName]();
  }
}

// event listener for navbar items
function onNavbarItemClick(e){
  e.preventDefault();
  let node = e.target;

  if(node.matches('[route_to]')){
    let pathName = node.getAttribute('route_to');
    history.setURI(pathName);
  }
}

// Event's Listener
window
  .on('pushstate', onPushState);

MainHeader
  .on('click', onNavbarItemClick);


// load components
(function () {
  let components = $('[component]');

  if(components){
    components.forEach(item => {
      let route = item.getAttribute('route');

      Routes[route] = item.innerHTML;
      item.remove();
    });
  }
})();

// load current URI for first load
(function (){
  let pathCookies = window.getPathCookies();

  history.pushState({}, '/', '/');
  history.setURI(pathCookies.websitepath);
})();
