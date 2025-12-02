import getAPIData from "@/utils/API";
import { i18n } from "../../i18n-config";
import moment from "moment/moment";

const getRoutes = (menuData, lang) => {
  let mainMenu = [];

  const mainNavMenu = menuData.data.page.mainNavigation.map((article) => {
    return {
      params: {
        link: article.link,
        date: article.data.SYS_LASTCHANGED,
      },
    };
  });

  const subNavMenu = menuData.data.page.subNavigation.map((article) => {
    return {
      params: {
        link: article.link,
        date: article.data.SYS_LASTCHANGED,
      },
    };
  });

  mainMenu = [...mainNavMenu, ...subNavMenu];

  let menuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      return {
        params: {
          link: child.link,
          date: child.data.SYS_LASTCHANGED,
        },
      };
    });
    menuChildren = [...menuChildren, ...spreadMenuChildren];
  });

  menuData.data.page.subNavigation
    .filter((mainNav) => mainNav.children && mainNav.children.length)
    .map((mainNav) => {
      if (!mainNav.children && !mainNav.children.length) {
        return;
      }
      let spreadMenuChildren = mainNav.children.map((child) => {
        return {
          params: {
            link: child.link,
            date: child.data.SYS_LASTCHANGED,
          },
        };
      });
      menuChildren = [...menuChildren, ...spreadMenuChildren];
    });

  let subMenuChildren = [];
  let subMenu = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        return {
          params: {
            link: subChild.link,
            date: subChild.data.SYS_LASTCHANGED,
          },
        };
      });

      subMenuChildren = [...subMenuChildren, ...spreadSubMenuChildren];
    });
  });

  menuData.data.page.subNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        return {
          params: {
            link: subChild.link,
            date: subChild.data.SYS_LASTCHANGED,
          },
        };
      });

      subMenuChildren = [...subMenuChildren, ...spreadSubMenuChildren];
    });
  });

  menuData.data.page.subNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }

      child.children.map((subChild) => {
        if (!subChild.children || !subChild.children.length) {
          return;
        }
        let subMegamenu = subChild.children.map((menusItem) => {
          return {
            params: {
              link: menusItem.link,
              date: menusItem.data.SYS_LASTCHANGED,
            },
          };
        });

        subMenu = [...subMenu, ...subMegamenu];
      });
    });
  });

  mainMenu = [...mainMenu, ...menuChildren, ...subMenu];

  return mainMenu;
};

const Routes = async ({ locale, defaultLocale }) => {
  const menuData = await getAPIData(
    `${locale === defaultLocale ? "" : locale}`
  );
  let pages = [];

  let getENRoutes = [];
  if (menuData && menuData.data) {
    getENRoutes = getRoutes(menuData, locale);
  }
  pages = [...pages, ...getENRoutes];
  let paths = pages;

  return paths;
};

export default async function Sitemap() {
  const { defaultLocale, locales } = i18n;
  let pageRoutes = [];
  await Promise.all(
    locales.map(async (locale) => {
      const localPaths = await Routes({
        locale,
        defaultLocale,
      });
      pageRoutes = [...pageRoutes, ...localPaths];
    })
  );

  const posts = pageRoutes.map(({ params }) => {
    return {
      url: `${params.link}`,
      lastModified: `${moment.unix(params.date).format("YYYY-MM-DD HH:mm ZZ")}`,
      priority: 0.5,
    };
  });
  return posts;
}
