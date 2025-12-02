'use client'
import React from 'react'
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';

const NewsCategorylist = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
    const router = useRouter();
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        router.push(targetLink.href)
    };

    return (
        <div className={`frame frame-${layoutType} frame-type-list frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
            <div
                onClick={contentClickHandler}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.data) }}
            />
        </div>
    )
}

export default NewsCategorylist
