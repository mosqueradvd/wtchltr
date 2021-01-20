import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { GetServerSideProps } from 'next'
import { Text, Grid, Card } from '@geist-ui/react'

import styles from '../styles/Home.module.css'

const YT_PL_ITEMS = 'https://www.googleapis.com/youtube/v3/playlistItems'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `${YT_PL_ITEMS}?part=snippet&maxResults=50&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_APIKEY}`
  )
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default function Home({ data }) {
  console.log('print data >>>', data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Wtchltr</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text h1>Wtchltr</Text>

      <Grid.Container gap={2} justify='center'>
        {data.items.map(({ id, snippet = {} }, index: number) => {
          const { title, thumbnails = {}, resourceId = {} } = snippet
          const { medium } = thumbnails
          const { videoId } = resourceId
          return (
            <Grid xs={24} md={8} sm={12}>
              <Link href={`/watch/${videoId}`}>
                <Card key={index}>
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
              </Link>
            </Grid>
          )
        })}
      </Grid.Container>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
