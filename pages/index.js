import { useEffect, useState } from 'react';
import Head from 'next/head';
import Post from '../components/post';

function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const res = await fetch(
        `https://api.storyblok.com/v1/cdn/stories?token=${
          process.env.SB_API_TOKEN
        }`
      );
      const { stories } = await res.json();
      setPosts([...stories]);
    }
    getPosts();
  }, []);
  return (
    <>
      <Head>
        <title>Next.js + Storyblok</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <header>
        <div>
          <img src="/icons/next.svg" />
          <img src="/icons/storyblok.svg" />
        </div>
        <h1>Next.js + Storyblok</h1>
      </header>
      <hr />
      {posts.length > 0
        ? posts.map(p => (
            <Post
              alt={p.content.alt}
              date={p.content.date}
              key={p.content.title}
              image={p.content.image}
              title={p.content.title}
              url={p.content.url}
            />
          ))
        : null}
      <style jsx>{`
        header {
          height: 9.5em;
          margin-top: 3em;
        }
        img {
          margin-right: 8px;
        }
        hr {
          margin 48px 0;
        }
        @media screen and (max-width: 360px) {
          header {
            height: 6em;
          }
          h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}

export default HomePage;
