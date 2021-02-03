import Link from 'next/link'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomHead from '@/components/CustomHead'

import styles from '../../styles/Home.module.css'
import { Text, Grid, Image, Card } from '@geist-ui/react'

const YT_PL_ITEMS = 'https://www.googleapis.com/youtube/v3/playlistItems'

export const getServerSideProps = async () => {
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
      <CustomHead />

      <Header />

      <Grid.Container justify='center' style={{ marginTop: '5rem' }}>
        {data.items?.map(({ snippet = {} }, index) => {
          const {
            title,
            thumbnails = {},
            resourceId = { videoId },
            description
          } = snippet
          const { medium } = thumbnails
          const { videoId } = resourceId
          const subText = description.substring(0, 66)
          return (
            <Grid xs={24} md={8} sm={12} key={index}>
              <Link href={`watch/${videoId}`}>
                <Card
                  width='auto'
                  style={{
                    margin: '1em 0.5em 3em',
                    cursor: 'pointer',
                    height: '400px'
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
      <Footer />
    </div>
  )
}
