"use client";
import React from "react";
import Link from "next/link";

const BlogPostCard = ({ article }) => {
    return (
        <div
            className="h-52 md:h-72 mt-4 mb-8 rounded-xl relative group "
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
                    width={250}
                    height={200}
                />

                <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
                    <h5 className="text-xl font-semibold mb-2">{article.title}</h5>
                    <p className="text-[#ADB7BE]">{new Date(article.pubDate).toLocaleDateString()}</p>
                </div>


            </Link>
        </div>
    );
};

export default BlogPostCard;