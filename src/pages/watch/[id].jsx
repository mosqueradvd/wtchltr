import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import { Image, Grid } from '@geist-ui/react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import styles from '../../../styles/components/Watch.module.css'

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

const WatchVideo = ({ data }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <div className={styles.container}>
        <Header />
        <Grid.Container gap={2} justify='center' className='main_container'>
          <Grid xs={24} sm={24} md={16}>
            <div className='videoPlayer__container'>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width='100%'
              />
            </div>
          </Grid>
          <Grid xs={24} sm={24} md={24}>
            <div className={styles.scroll}>
              {data.items.map(({ snippet = {} }, index) => {
                const { thumbnails = {} } = snippet
                const { medium } = thumbnails
                return (
                  <div className='thumbnail' key={index}>
                    <Image src={medium.url} />
                  </div>
                )
              })}
            </div>
          </Grid>
        </Grid.Container>
        <Footer />
      </div>
    </>
  )
}

export default WatchVideo
