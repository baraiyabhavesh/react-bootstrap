import React from "react";
import { i18n } from "../../../../i18n-config";
import Routes from "@/utils/Routes";
import getAPIData from "@/utils/API";
import { draftMode } from "next/headers";
import ContentType from "@/utils/ContentType";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "@/components/Sidebar";
import Breadcrumb from "@/components/Breadcrumb";
import nextDynamic from "next/dynamic";
const HolyLoader = nextDynamic(() => import("holy-loader"), { ssr: false });

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  let pageRoutes = [];
  const { defaultLocale, locales } = i18n;
  await Promise.all(
    locales.map(async (locale) => {
      const localPaths = await Routes({
        locale,
        defaultLocale,
      });
      pageRoutes = [...pageRoutes, ...localPaths];
    })
  );
  locales.map((locale) => {
    pageRoutes = [
      ...pageRoutes,
      {
        params: { slug: [""] },
        locale,
      },
      {
        params: { slug: ["search"] },
        locale,
      },
    ];
  });

  const filteredPaths = pageRoutes.filter((path) => {
    if (path.params.slug[0] == "404") {
      return false;
    } else if (path.params.slug[0] == "sitemap") {
      return false;
    } else {
      return true;
    }
  });
  return filteredPaths;
}

const getAllData = async (params, searchParams) => {
  const { isEnabled } = draftMode();
  const { defaultLocale } = i18n;
  const { locale, slug } = params;
  let pageData;
  var paramSlug;

  let string = "?";
  for (let key in searchParams) {
    string += key + "=" + searchParams[key] + "&";
  }
  if (slug && slug.length > 2) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug && slug.length > 1) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug) {
    if (slug[0] === "page") {
      paramSlug = "";
    } else {
      paramSlug = slug[0];
    }
  }
  if (string.includes("?search_query")) {
    string = "";
  }
  const apiPath = `${locale === defaultLocale ? "" : `${locale}/`}${
    paramSlug
      ? searchParams && Object.keys(searchParams).length
        ? paramSlug + string.slice(0, -1)
        : paramSlug
      : ""
  }`;
  
  pageData = await getAPIData(apiPath);
  if (isEnabled) {
    pageData = await getAPIData(
      `${locale === defaultLocale ? "" : `${locale}/`}${
        paramSlug
          ? searchParams && Object.keys(searchParams).length
            ? paramSlug + string.slice(0, -1)
            : paramSlug
          : ""
      }`
    );
  }
  if (pageData && !pageData.error && pageData.data === 404) {
    notFound();
  }
  
  return {
    pageData,
  };
};

export default async function Page({ params, searchParams }) {
  const { pageData } = await getAllData(params, searchParams);  
  if (!pageData) {
    return <div>Page not found or data unavailable</div>;
  }
  if (pageData.error) {
    return <div>Page not found or data unavailable (API Error)</div>;
  }
  
  if (!pageData.data || (typeof pageData.data === 'object' && Object.keys(pageData.data).length === 0)) {
    return <div>Page not found or data unavailable (No Data)</div>;
  }
  
  const nsBaseTheme = pageData?.data?.page?.constants?.ns_basetheme;
  const websiteType = nsBaseTheme?.websiteType?.value || "normal";  
  const currentPageBreadcrumbStyle = pageData?.data?.page?.breadcrumbStyle;
  const currentHeaderLayout = pageData?.data?.page?.headerLayout;
  const layoutType = pageData?.data?.appearance?.backendLayout || pageData?.data?.page?.appearance?.backendLayout || "default";

  let gridWidth;
  let noOfColumns;
  let totalWidth;

  if (
    layoutType === "2_Columns_50_50" ||
    layoutType === "2_Columns_25_75" ||
    layoutType === "2_Columns_75_25" ||
    layoutType === "3_Columns_25_50_25" ||
    layoutType === "3_Columns_33"
  ) {
    gridWidth = layoutType.split("_").slice(2).map(Number);
    noOfColumns = layoutType.split("_").shift();

    if (gridWidth.length === 1) {
      if (noOfColumns > 1) {
        const colSize = gridWidth[0];
        for (let i = 1; i < noOfColumns; i++) {
          gridWidth.push(colSize);
        }
      }
      totalWidth = 100;
    } else {
      totalWidth = gridWidth.reduce((total, width) => total + width, 0);
    }
  }

  return (
    <>
      <HolyLoader showSpinner={false} />
      <main>
        {pageData?.data?.content?.colPos1 &&
        pageData?.data?.content?.colPos1?.length ? (
          <>
            <ContentType pageData={pageData?.data?.content?.colPos1} />
          </>
        ) : (
          <></>
        )}

        {pageData &&
        layoutType === "empty" ? null : currentPageBreadcrumbStyle !== "4" ? (
          <Breadcrumb
            currentPageBreadcrumbStyle={currentPageBreadcrumbStyle}
            currentHeaderLayout={currentHeaderLayout}
          />
        ) : null}
        {pageData?.data?.content?.colPos8 &&
        pageData?.data?.content?.colPos8?.length ? (
          <>
            <section className="content-section-before">
              <ContentType pageData={pageData?.data?.content?.colPos8} />
            </section>
          </>
        ) : (
          <></>
        )}
        <section className="content-section">
          {gridWidth && gridWidth.length ? (
            <>
              {(pageData && ((pageData?.data?.page?.slug || pageData?.data?.slug) !== "/")) ? (
                <Container>
                  {
                    <Row>
                      {pageData?.data?.content?.colPos5 &&
                      pageData?.data?.content?.colPos5?.length ? (
                        <>
                          <Col lg={Math.ceil((gridWidth[0] / totalWidth) * 12)}>
                            <div className="sidebar-widget">
                              <div className="list-group">
                                <ContentType
                                  pageData={pageData?.data?.content?.colPos5}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col lg={Math.ceil((gridWidth[1] / totalWidth) * 12)}>
                            <ContentType
                              pageData={pageData?.data?.content?.colPos0}
                            />
                          </Col>
                          {pageData?.data?.content?.colPos7 &&
                          pageData?.data?.content?.colPos7?.length ? (
                            <>
                              <Col
                                lg={Math.ceil((gridWidth[2] / totalWidth) * 12)}
                              >
                                <div className="sidebar-widget">
                                  <div className="list-group">
                                    <ContentType
                                      pageData={pageData?.data?.content?.colPos7}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          <Col lg={Math.ceil((gridWidth[0] / totalWidth) * 12)}>
                            <ContentType
                              pageData={pageData?.data?.content?.colPos0}
                            />
                          </Col>
                          {pageData?.data?.content?.colPos7 &&
                          pageData?.data?.content?.colPos7?.length ? (
                            <>
                              <Col
                                lg={Math.ceil((gridWidth[1] / totalWidth) * 12)}
                              >
                                <div className="sidebar-widget">
                                  <div className="list-group">
                                    <ContentType
                                      pageData={pageData?.data?.content?.colPos7}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </Row>
                  }
                </Container>
              ) : (
                <Container>
                  <Row>
                    {pageData?.data?.content?.colPos5 &&
                    pageData?.data?.content?.colPos5?.length ? (
                      <>
                        <Col lg={Math.ceil((gridWidth[0] / totalWidth) * 12)}>
                          <div className="sidebar-widget">
                            <div className="list-group">
                              <ContentType
                                pageData={pageData.data.content.colPos5}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col lg={Math.ceil((gridWidth[1] / totalWidth) * 12)}>
                          <ContentType
                            pageData={pageData.data.content.colPos0}
                          />
                        </Col>
                        {pageData?.data?.content?.colPos7 &&
                        pageData?.data?.content?.colPos7?.length ? (
                          <>
                            <Col
                              lg={Math.ceil((gridWidth[2] / totalWidth) * 12)}
                            >
                              <div className="sidebar-widget">
                                <div className="list-group">
                                  <ContentType
                                    pageData={pageData.data.content.colPos7}
                                  />
                                </div>
                              </div>
                            </Col>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <Col lg={Math.ceil((gridWidth[0] / totalWidth) * 12)}>
                          <ContentType
                            pageData={pageData.data.content.colPos0}
                          />
                        </Col>
                        {pageData?.data?.content?.colPos7 &&
                        pageData?.data?.content?.colPos7?.length ? (
                          <>
                            <Col
                              lg={Math.ceil((gridWidth[1] / totalWidth) * 12)}
                            >
                              <div className="sidebar-widget">
                                <div className="list-group">
                                  <ContentType
                                    pageData={pageData.data.content.colPos7}
                                  />
                                </div>
                              </div>
                            </Col>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </Row>
                </Container>
              )}
            </>
          ) : (
            <>
              {pageData &&
              pageData.data &&
              layoutType !== "empty" &&
              (pageData.data.slug || pageData.data.page?.slug) !== "/" &&
              layoutType !== "content" ? (
                <Container>
                  {layoutType === "subnavigation_left" ? (
                    <Row>
                      <Col lg={3}>
                        <div className="sidebar-widget">
                          <div className="list-group">
                            <SideBar
                              pageData={pageData.data.page.leftRightMenu}
                              sidebar={layoutType}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <ContentType pageData={pageData.data.content.colPos0} />
                      </Col>
                    </Row>
                  ) : layoutType === "subnavigation_right" ? (
                    <Row>
                      <Col lg={9}>
                        <ContentType pageData={pageData.data.content.colPos0} />
                      </Col>
                      <Col lg={3}>
                        <div className="sidebar-widget">
                          <div className="list-group">
                            <SideBar
                              pageData={pageData.data.page.leftRightMenu}
                              sidebar={layoutType}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <ContentType pageData={pageData.data.content.colPos0} />
                  )}
                </Container>
              ) : (
                <>
                  {websiteType === "normal" ? (
                    <Container fluid>
                      <ContentType pageData={pageData?.data?.content?.colPos0} />
                    </Container>
                  ) : (
                    pageData.data?.onepageSite?.colPos?.map(
                      (onepageItem, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Container>
                              <ContentType
                                pageData={onepageItem.colPos0}
                                id={pageData.data.page.mainNavigation[
                                  index
                                ].link.replace("/", "")}
                              />
                            </Container>
                          </React.Fragment>
                        );
                      }
                    )
                  )}
                </>
              )}
            </>
          )}
        </section>
        {pageData?.data?.content?.colPos9 &&
        pageData?.data?.content?.colPos9?.length ? (
          <>
            <section className="content-section-after">
              <ContentType pageData={pageData?.data?.content?.colPos9} />
            </section>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
