import { GeistProvider, CssBaseline } from '@geist-ui/react'

function Wtchltr({ Component, pageProps }) {
  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default Wtchltr
