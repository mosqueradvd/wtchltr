import ReactPlayer from 'react-player'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Grid, Card } from '@geist-ui/react'

const MockItem = () => {
  return <Card shadow style={{ width: '100%', height: '50px', backgroundColor: 'black' }} />
}

const WatchVideo = () => {

  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Grid.Container gap={2} justify='center' className='main_container' >
        <Grid xs={16}>
          <div className='videoPlayer__container'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width='100%'
              playbackRate={2}
            />
          </div>
        </Grid>
        <Grid xs={8}>
          <div className='scroll'>
            <Image className='thumbnail' src='https://img.freepik.com/free-photo/abstract-pink-red-background-christmas-valentines-layout-des_1258-262.jpg' width='auto' height='auto' />

            <Image className='thumbnail' src='https://img.freepik.com/free-vector/gradient-wallpaper-background_1159-5356.jpg' width='auto' height='auto' />
            <Image className='thumbnail' src='https://img.freepik.com/free-photo/abstract-pink-red-background-christmas-valentines-layout-des_1258-262.jpg' width='auto' height='auto' />
            <Image className='thumbnail' src='https://img.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg' width='auto' height='auto' />
            <Image className='thumbnail' src='https://img.freepik.com/free-photo/abstract-pink-red-background-christmas-valentines-layout-des_1258-262.jpg' width='auto' height='auto' />
            <Image className='thumbnail' src='https://img.freepik.com/free-photo/abstract-pink-red-background-christmas-valentines-layout-des_1258-262.jpg' width='auto' height='auto' />
          </div>
        </Grid>
        <Grid xs={16}>
          <Image src='/vercel.svg' width='100%' height='100%' />
        </Grid>
        <Grid xs={8}><MockItem /></Grid>
        <Grid xs={16}><MockItem /></Grid>
        <Grid xs={8}><MockItem /></Grid>
        <Grid xs={16}><MockItem /></Grid>
        <Grid xs={8}><MockItem /></Grid>
      </Grid.Container>
    </>
  )
}

export default WatchVideo 
