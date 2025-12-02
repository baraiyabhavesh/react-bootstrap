'use client'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DOMPurify from "dompurify";

const NewsDetail = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
    const news = data?.data?.detail
    const image = news?.media[0].images.defaultImage.publicUrl

    return (
        <div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
            <div className='news news-single'>
                <div className='article'>
                    <h2>{news?.title}</h2>
                    <div className='meta-info'>
                        Posted on <time>{news?.datetime}</time>
                    </div>
                </div>
                <LazyLoadImage
                    effect="opacity"
                    src={image}
                    alt="Image thumb"
                    width={1200}
                    height={300}
                />
                <p className='lead'>{news?.teaser}</p>
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.bodytext) }}
                />
            </div>
        </div>
    )
}

export default NewsDetail
