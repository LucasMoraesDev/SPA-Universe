document.querySelector(".logo").addEventListener("click", () => {
  window.location = "/";
});
export class Router {
  routes = {};

  add(routeName, link) {
    this.routes[routeName] = link;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;

    updateBackground(pathname);
    function updateBackground(pathname) {
      const root = document.querySelector(":root");
      switch (pathname) {
        case "/":
          root.style.setProperty(
            "--background-default",
            "url('images/mountains-universe-1.png')"
          );
          updateMenuStyle(1);
          break;

        case "/the-universe":
          root.style.setProperty(
            "--background-default",
            "url('images/mountains-universe02.png')"
          );
          updateMenuStyle(2);
          break;

        case "/exploration":
          root.style.setProperty(
            "--background-default",
            "url('images/mountains-universe-3.png')"
          );
          updateMenuStyle(3);
          break;

        default:
          root.style.setProperty(
            "--background-default",
            "url('images/mountains-universe-1.png')"
          );
          updateMenuStyle(1);
          break;
      }
    }
    function updateMenuStyle(index) {
      const a = document.querySelectorAll("a");
      a.forEach((element) => {
        element.classList.remove("clicked");
      });
      a[index].classList.add("clicked");
      document.querySelector(".app").classList.remove("home");
      document.querySelector(".app").classList.remove("the-universe");
      document.querySelector(".app").classList.remove("exploration");
      switch (index) {
        case 0:
        case 1:
        default:
          document.querySelector(".app").classList.add("home");
          break;
        case 2:
          document.querySelector(".app").classList.add("the-universe");
          break;
        case 3:
          document.querySelector(".app").classList.add("exploration");
          break;
      }
    }

    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector(".app").innerHTML = html;
      });
  }
}
