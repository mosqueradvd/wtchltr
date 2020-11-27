import Head from "next/head";
import Image from "next/image";

import { Text } from "@geist-ui/react";

import styles from "../styles/Home.module.css";

const YT_PL_ITEMS = "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YT_PL_ITEMS}?part=snippet&maxResults=50&playlistId=PL9uwekurBrErSgziV1oozrRxY-KCmSgId&key=${process.env.YOUTUBE_APIKEY}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wtchltr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Text h1>Welcome to Wtchltr</Text>

        <ul className={styles.grid}>
          {data.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                >
                  <p>
                    {/* <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt=""
                    /> */}
                    <Image
                      src={medium.url}
                      width={medium.width}
                      height={medium.height}
                    />
                  </p>
                  <h3>{title}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
