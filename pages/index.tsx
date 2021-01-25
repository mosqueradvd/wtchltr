import Head from 'next/head'
import Link from 'next/link'

import { GetServerSideProps } from 'next'
import { Text, Grid, Card, Input, Image } from '@geist-ui/react'

import styles from '../styles/Home.module.css'
import { Search } from '@geist-ui/react-icons'

const YT_PL_ITEMS = 'https://www.googleapis.com/youtube/v3/playlistItems'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `${YT_PL_ITEMS}?part=snippet&maxResults=50&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_APIKEY}`
  )
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wtchltr</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text h1 style={{ color: 'wheat', textAlign: 'initial' }}>
        Wtchltr
      </Text>
      <Input
        icon={<Search color='white' size={28} />}
        placeholder='Search somethig'
        width='100%'
      />

      <Grid.Container justify='center' style={{ marginTop: '5rem' }}>
        {data.items.map(({ id, snippet = {} }, index: number) => {
          const {
            title,
            thumbnails = {},
            resourceId = {},
            description
          } = snippet
          const { medium } = thumbnails
          const subText = description.substring(0, 66)
          return (
            <Grid xs={24} md={8} sm={12} key={index}>
              <Link href={`watch/${id}`}>
                <Card
                  width='auto'
                  style={{
                    margin: '1em 0.5em 3em',
                    cursor: 'pointer'
                  }}
                  type='dark'
                  shadow
                >
                  <Image
                    src={medium.url}
                    height='auto'
                    width='auto'
                    style={{ objectFit: 'cover', margin: 0 }}
                  />
                  <Text h4 style={{ marginBottom: '0' }}>
                    {title}
                  </Text>
                  <Text type='secondary' small>
                    {subText}...
                  </Text>
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
