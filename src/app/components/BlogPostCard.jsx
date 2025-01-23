"use client";
import React from "react";
import Link from "next/link";

const BlogPostCard = ({ article }) => {
    return (
        <div
            className="h-52 md:h-72 mt-4 mb-20 rounded-xl relative group "
            style={{ background: `url(${article.link})`, backgroundSize: "cover", backgroundPositionX: "center" }}
        >
            <Link
                href={article.link}
                target="_blank"
            >
                <img
                    src={article.description.match(/<img[^>]+src="([^">]+)"/)?.[1]}
                    alt={article.title}
                    className="card-img-top img-fluid"
                    width={400}
                    height={200}
                />

                <div className="text-white rounded-b-l mt-3 bg-[#181818]py-3 px-0">
                    <p className="text-m font-semibold fs-5 mb-2 text-wrap text-break">{article.title}</p>
                </div>


            </Link>
        </div>
    );
};

export default BlogPostCard;