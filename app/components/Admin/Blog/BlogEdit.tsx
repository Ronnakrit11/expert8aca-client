"use client"
import { useGetBlogContentByIdQuery, useGetBlogContentQuery } from '@/redux/features/blog/blogsApi';
import React from 'react'
import BlogInformation from './BlogInformation';

const BlogEdit = ({ id }) => {
    const { data: blogData, isLoading, refetch } = useGetBlogContentByIdQuery(id, { refetchOnMountOrArgChange: true });

    return <BlogInformation blogData={blogData} refetch={refetch} />
}

export default BlogEdit