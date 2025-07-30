import React from 'react';
import "../../../css/berita/cardBerita.css"

const CardBerita = ({ image, title, content, id, link, date }) => {
    return (
        <div className='card-berita'>
            <img src={image} alt={title} />
            <h4 style={{ textTransform: "uppercase", color: "#000 !important" }}>{title}</h4>
            <p className="date-berita" style={{ color: "#000 !important" }}>{date}</p>
            <div className="content-berita" style={{ color: "#000 !important" }}>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{ color: "inherit !important" }}
                />
            </div>
            <a href={`/detail-${link}-${id}`} style={{ color: "#000 !important" }}>Selengkapnya</a>
        </div>
    );
};

export default CardBerita;