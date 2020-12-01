import Head from "next/head";
import Image from "next/image";

import { Text, Grid, Card } from "@geist-ui/react";

import styles from "../styles/Home.module.css";

const YT_PL_ITEMS = "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YT_PL_ITEMS}?part=snippet&maxResults=50&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_APIKEY}`
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

      <Text h1>Welcome to Wtchltr</Text>

      <Grid.Container gap={2} justify="center">
        {data.items.map(({ id, snippet = {} }) => {
          const { title, thumbnails = {}, resourceId = {} } = snippet;
          const { medium } = thumbnails;
          return (
            <Grid xs={6}>
              <Card key={id}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                >
                  <p>
                    <Image
                      src={medium.url}
                      width={medium.width}
                      height={medium.height}
                    />
                  </p>
                  <h3>{title}</h3>
                </a>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>

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
