"use client";

import Image from "next/image";
import { BlogPostsProps } from "../@types";
import { blogPosts } from "../data";
import { CardPost, CardPostContent, CardPostFooter } from "./ui/card-posts-ui";
import Link from "next/link";

export default function LatestPosts() {
  return (
    <>
      <section className="w-full py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Últimos Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                alt={post.alt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ id, imageUrl, excerpt, alt, title }: BlogPostsProps) {
  return (
    <>
      <CardPost key={id}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardPostContent>
          <h3 className="font-medium text-lg mb-2 line-clamp-2 mt-5">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-4">
            {excerpt}
          </p>
        </CardPostContent>
        <CardPostFooter>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ler mais
          </Link>
        </CardPostFooter>
      </CardPost>
    </>
  );
}
