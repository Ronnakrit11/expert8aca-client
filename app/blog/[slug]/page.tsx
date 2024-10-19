import dynamic from "next/dynamic";
import React, { useEffect } from "react";


const BlogContent = dynamic(() => import('@/app/components/Blog/BlogContent'), { ssr: false })

type Props = {
    params: any;
}

export async function generateStaticParams() {
    const response = await fetch(`${process.env.SERVER_URI}/api/v1/get-all-blog`).then((res) => res.json())
    const blogs = response?.result || []
    return blogs.map((blog) => ({
        slug: blog.slug,
    }))
}


export async function generateMetadata({ params }) {
    const response = await fetch(`${process.env.SERVER_URI}/api/v1/get-blog-meta/${params.slug}`).then((res) => res.json())
    const blog = response.result
    if (!blog) {
      return;
    }
  
    const publishedAt = new Date(blog.createdAt).toISOString();
    const modifiedAt = new Date(blog.updatedAt || blog.createdAt).toISOString();
    const ogImages = blog.thumbnail.url

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        // url: siteMetadata.siteUrl + blog.url,
        siteName: 'siteMetadata.title',
        locale: "en_US",
        type: "article",
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        images: ogImages,
        // authors: authors.length > 0 ? authors : [siteMetadata.author],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.description,
        images: ogImages,
      },
    };
  }

export const revalidate = 120

const Page = async ({ params }: Props) => {
    const slug = params.slug;
    const response = await fetch(`${process.env.SERVER_URI}/api/v1/get-blog/${slug}`).then((res) => res.json())
    const blog = response.result

    return (
        <>
            <BlogContent slug={slug} blog={blog}/>
        </>
    )
}

export default Page