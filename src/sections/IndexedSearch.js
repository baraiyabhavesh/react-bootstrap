"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getAPIData from "@/utils/API";
import SafeLink from "@/components/Core/SafeLink";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";

const IndexedSearch = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchData, setSearchData] = useState([]);
  const [resultSearchTerm, setResultSearchTerm] = useState(null);

  let initialSearchTerm = params.get("search_query");

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const searchResults = async () => {
    try {
      const { data } = await getAPIData(`search/score/desc/0/1/${searchTerm}`);
      if (
        data &&
        data.content &&
        data.content.colPos0 &&
        data.content.colPos0.length &&
        data.content.colPos0[1].content &&
        data.content.colPos0[1].content.data
      ) {
        setResultSearchTerm(searchTerm);
        setSearchData(data.content.colPos0[1].content.data.resultrows);
      }
    } catch (e) {
      // Error handling - silently fail
    }
  };

  useEffect(() => {
    searchResults();
  }, [initialSearchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) {
      setResultSearchTerm(searchTerm);
      return;
    }
    router.push(`/search?search_query=${searchTerm}`);
  };

  const renderMarkdown = (str) => {
    const withoutRNT = str
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "");
    return (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(withoutRNT) }}
      />
    );
  };

  return (
    <Container>
      <div
        className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      >
        <div className="tx-indexedsearch-searchbox">
          <form onSubmit={handleSubmit}>
            <fieldset>
              {data.header && <legend>{data.header}</legend>}
              <div className="tx-indexedsearch-form">
                <label htmlFor="tx-indexedsearch-searchbox-sword">
                  Saerch For:
                </label>
                <input
                  className="tx-indexedsearch-searchbox-sword"
                  type="text"
                  id="tx-indexedsearch-searchbox-sword"
                  onChange={handleChange}
                  defaultValue={searchTerm}
                />
                <div className="tx-indexedsearch-search-submit">
                  <input
                    type="submit"
                    className="tx-indexedsearch-searchbox-button"
                    id="tx-indexedsearch-searchbox-button-submit"
                    value="Submit"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="tx-indexedsearch-info-sword">
          {resultSearchTerm ? (
            <>
              Search for <strong> {resultSearchTerm}</strong>
            </>
          ) : (
            <strong>Please search for somthing!</strong>
          )}
        </div>
        <div className="tx-indexedsearch-browsebox"></div>
        {searchData &&
          searchData.map(({ url, teaser, title_text }, index) => {
            return (
              <div className="tx-indexedsearch-res" key={index}>
                <h3>
                  <span className="tx-indexedsearch-title">
                    <SafeLink href={url}>{title_text}</SafeLink>
                  </span>
                </h3>
                {teaser && (
                  <p className="tx-indexedsearch-description">
                    {renderMarkdown(teaser)}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </Container>
  );
};
export default IndexedSearch;
