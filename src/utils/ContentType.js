import React from "react";
import dynamic from "next/dynamic";

const TextPic = dynamic(() => import("@/components/Core/TextPic"), {
  ssr: false,
});

const GridColumns = dynamic(() => import("@/components/Gridcolumns"), {
  ssr: false,
});

const OneColumns = dynamic(
  () => import("@/components/Gridcolumns/oneColumns"),
  {
    ssr: false,
  }
);

const TwoColumns = dynamic(
  () => import("@/components/Gridcolumns/twoColumns"),
  {
    ssr: false,
  }
);

const ThreeColumns = dynamic(
  () => import("@/components/Gridcolumns/threeColumns"),
  {
    ssr: false,
  }
);

const FourColumns = dynamic(
  () => import("@/components/Gridcolumns/fourColumns"),
  {
    ssr: false,
  }
);

const FiveColumns = dynamic(
  () => import("@/components/Gridcolumns/fiveColumns"),
  {
    ssr: false,
  }
);

const SixColumns = dynamic(
  () => import("@/components/Gridcolumns/sixColumns"),
  {
    ssr: false,
  }
);

const LandingSlider = dynamic(
  () => import("@/components/Slider/LandingSlider"),
  {
    ssr: false,
  }
);

const Testimonial = dynamic(() => import("@/components/Testimonial/index"), {
  ssr: false,
});

const Team = dynamic(() => import("@/components/Team/index"), {
  ssr: false,
});

const Banner = dynamic(() => import("@/sections/Banner"), {
  ssr: false,
});
const Accordion = dynamic(() => import("@/sections/Accordion"), {
  ssr: false,
});

const Text = dynamic(() => import("@/sections/Text"), {
  ssr: false,
});
const Progress = dynamic(() => import("@/components/ProgressBar/index"), {
  ssr: false,
});

const Sitemap = dynamic(() => import("@/sections/Sitemap"), {
  ssr: false,
});

const Header = dynamic(() => import("@/sections/Headings"), {
  ssr: false,
});

const Images = dynamic(() => import("@/components/Core/Images"), {
  ssr: false,
});

const AbstractMenu = dynamic(() => import("@/components/AbtractMenu/index"), {
  ssr: false,
});

const CategorizedPage = dynamic(
  () => import("@/components/MenuCategorized/CategorizedPage"),
  {
    ssr: false,
  }
);

const Textmedia = dynamic(() => import("@/components/Textmedia"), {
  ssr: false,
});

const Table = dynamic(() => import("@/components/Table"), {
  ssr: false,
});

const Uploads = dynamic(() => import("@/components/Uploads"), {
  ssr: false,
});

const HTML = dynamic(() => import("@/components/Core/SimpleHTML"), {
  ssr: false,
});

const ShortcutCmp = dynamic(() => import("@/components/ShortcutCmp"), {
  ssr: false,
});

const Div = dynamic(() => import("@/components/Core/SimpleDiv"), {
  ssr: false,
});

const CategorizedContent = dynamic(
  () => import("@/components/MenuCategorized/CategorizedContent"),
  {
    ssr: false,
  }
);

const MenuPages = dynamic(() => import("@/components/Menulist/MenuPages"), {
  ssr: false,
});

const MenuSubPages = dynamic(
  () => import("@/components/Menulist/MenuSubPages"),
  {
    ssr: false,
  }
);

const UpdatedPage = dynamic(() => import("@/components/Core/UpdatedPages"), {
  ssr: false,
});

const MenuRelatedPages = dynamic(
  () => import("@/components/Core/MenuRelatedPages"),
  {
    ssr: false,
  }
);

const MenuSectionsPage = dynamic(
  () => import("@/components/Core/MenuSectionPages"),
  {
    ssr: false,
  }
);

const MenuSections = dynamic(() => import("@/components/Core/MenuSections"), {
  ssr: false,
});

const TabComponent = dynamic(() => import("@/components/Tabs"), {
  ssr: false,
});

const AlertComponents = dynamic(() => import("@/components/Alert"), {
  ssr: false,
});

const FormVariation = dynamic(() => import("@/sections/Form"), {
  ssr: false,
});

const GoogleMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
});

const Card = dynamic(() => import("@/components/Card"), {
  ssr: false,
});

const Pricebox = dynamic(() => import("@/components/Pricebox"), {
  ssr: false,
});

const TeaserList = dynamic(() => import("@/components/TeaserList"), {
  ssr: false,
});

const NewsListSticky = dynamic(
  () => import("@/components/News/NewsListSticky"),
  {
    ssr: false,
  }
);

const NewsCategorylist = dynamic(
  () => import("@/components/News/NewsCategorylist"),
  {
    ssr: false,
  }
);

const NewsPi = dynamic(() => import("@/components/News/NewsPi"), {
  ssr: false,
});

const NewsDetail = dynamic(() => import("@/components/News/NewsDetail"), {
  ssr: false,
});

const NewsDateMenu = dynamic(() => import("@/components/News/NewsDateMenu"), {
  ssr: false,
});

const IndexedSearch = dynamic(() => import("@/sections/IndexedSearch"), {
  ssr: false,
});

const Login = dynamic(() => import("@/components/Form/loginForm"), {
  ssr: false,
});

const ModalComponent = dynamic(() => import("@/components/Modal"), {
  ssr: false,
});

const ScrollspyComponent = dynamic(() => import("@/components/Scrollspy"), {
  ssr: false,
});

const Video = dynamic(() => import("@/components/Video"), {
  ssr: false,
});

const ToastsComponent = dynamic(() => import("@/components/Toasts"), {
  ssr: false,
});

export const componentMapping = {
  text: Text,
  textpic: TextPic,
  ns_teaser: GridColumns,
  ns_base_container: OneColumns,
  ns_base_2Cols: TwoColumns,
  ns_base_3Cols: ThreeColumns,
  ns_base_4Cols: FourColumns,
  ns_base_5Cols: FiveColumns,
  ns_base_6Cols: SixColumns,
  ns_testimonial: Testimonial,
  ns_landing_pageslider: LandingSlider,
  ns_banner: Banner,
  ns_profiler: Team,
  ns_accordion: Accordion,
  menu_sitemap: Sitemap,
  ns_progressbar: Progress,
  header: Header,
  image: Images,
  menu_abstract: AbstractMenu,
  menu_categorized_pages: CategorizedPage,
  menu_categorized_content: CategorizedContent,
  textmedia: Textmedia,
  table: Table,
  uploads: Uploads,
  html: HTML,
  shortcut: ShortcutCmp,
  div: Div,
  menu_pages: MenuPages,
  menu_subpages: MenuSubPages,
  menu_recently_updated: UpdatedPage,
  menu_related_pages: MenuRelatedPages,
  menu_section_pages: MenuSectionsPage,
  menu_section: MenuSections,
  ns_tab: TabComponent,
  ns_alert: AlertComponents,
  form_formframework: FormVariation,
  ns_map: GoogleMap,
  ns_gallery: Gallery,
  ns_card: Card,
  ns_pricebox: Pricebox,
  ns_teaserlist: TeaserList,
  news_newsliststicky: NewsListSticky,
  news_categorylist: NewsCategorylist,
  news_pi1: NewsPi,
  news_newsdetail: NewsDetail,
  news_newsdatemenu: NewsDateMenu,
  ke_search_pi2: IndexedSearch,
  felogin_login: Login,
  ns_modal: ModalComponent,
  ns_toasts: ToastsComponent,
  ns_scrollspy: ScrollspyComponent,
  ns_media: Video,
};
const ContentType = ({ pageData, sidebar, id }) => {
  if (!pageData) {
    return false;
  }
  
  return (
    <>
      {pageData &&
        pageData.length &&
        pageData.map((items) => {
          if (items) {
            let contentType = items.type;
            let contentData;
            if (items.content?.items) {
              contentData = findValuesObject(items.content.items, "items");
            } else {
              contentData = findValuesObject(
                items?.content,
                "pi_flexform_content"
              );
            }
            
            const gridType = pageData?.appearance?.backendLayout;
            const marBottom = items?.appearance?.spaceAfter;
            const marTop = items?.appearance?.spaceBefore;
            const frameClass = items?.appearance?.frameClass;
            const layout = items?.appearance?.layout;
            const Component = componentMapping[contentType];
            if (Component) {
              // Merge content and pi_flexform_content for components that need both
              const finalData = contentData && contentData.length
                ? contentData[0]
                : items?.content;
              
              // If finalData has both content and pi_flexform_content, merge them
              // This ensures components can access data from both locations
              const mergedData = finalData && finalData.pi_flexform_content
                ? {
                    ...finalData,
                    ...finalData.pi_flexform_content,
                  }
                : finalData;
              
              return (
                <Component
                  data={mergedData || finalData}
                  key={items.id}
                  spaceAfter={marBottom}
                  spaceBefore={marTop}
                  layoutType={layout}
                  elementType={contentType}
                  sidebar={sidebar}
                  posibleGrid={gridType}
                  frameClass={frameClass}
                  id={id}
                />
              );
            }
            return null;
          }
        })}
    </>
  );
};
export default ContentType;

export function findValuesObject(obj, key) {
  return findValuesObjectHelper(obj, key, []);
}

export function findValuesObjectHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesObjectHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if (typeof obj == "object" && obj !== null) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesObjectHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}
