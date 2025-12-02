import SafeLink from "@/components/Core/SafeLink";
import React from 'react'
import { Col, Row } from 'react-bootstrap';

const NewsNoMarginFullWidth = ({ data }) => {
    return (
        <div className='container-fluid'>
            <div className='news'>
                <div className='news news-grid-layout news-no-margins'>
                    <Row className='news-grid'>
                        {data.map((item) => {
                            const formattedDate = new Date(item.datetime).toLocaleDateString('en-GB');
                            return (
                                <Col sm={6} md={4} lg={3} key={item.uid} className='px-0 col-xl-1-5'>
                                    <div className='news-item'>
                                        <div className='news-img-wrap'>
                                            <SafeLink href={item.slug} style={{
                                                backgroundImage: `url(${item.media[0].images.listViewFeaturedImage.publicUrl})`,
                                            }} title={item.title}>
                                                <div className='news-info-title'>
                                                    <h4 className='news-info-inner'>{item.title}</h4>
                                                    <div className='news-info-type p-relative bottom-4'>
                                                        <span className='news-date'>{formattedDate}</span>
                                                    </div>
                                                </div>
                                            </SafeLink>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </div>

    )
}

export default NewsNoMarginFullWidth
