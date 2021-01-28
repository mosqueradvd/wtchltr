import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import { Grid, Image } from '@geist-ui/react'
import { GetServerSideProps } from 'next'

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

const WatchVideo = ({ data }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Grid.Container gap={2} justify='center' className='main_container'>
        <Grid xs={24} sm={24} md={16}>
          <div className='videoPlayer__container'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width='100%'
              playbackRate={2}
            />
          </div>
        </Grid>
        <Grid xs={24} sm={24} md={8}>
          <div className='scroll'>
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
    </>
  )
}

export default WatchVideo
