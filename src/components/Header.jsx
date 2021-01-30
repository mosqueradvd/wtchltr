import Link from 'next/link'
import { Search } from '@geist-ui/react-icons'
import { useMediaQuery } from 'react-responsive'
import { Text, Input, Image, Page } from '@geist-ui/react'
import styles from '../../styles/components/Header.module.css'

const Header = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)'
  })

  return (
    <>
      <Page.Header className={styles.Header}>
        <Link href='/'>
          <Text
            h1
            style={{
              color: 'white',
              textAlign: 'initial',
              display: 'flex',
              marginLeft: '0.5em',
              marginRight: '0.5em',
              cursor: 'pointer'
            }}
          >
            Wtchltr
          </Text>
        </Link>
        {isDesktopOrLaptop && (
          <Input
            clearable
            icon={<Search color='white' size={28} />}
            placeholder='Search something'
            initialValue=''
            width='86%'
            style={{ color: 'white', borderColor: '#303030' }}
          />
        )}
        {isTabletOrMobile && <Search color='white' size={28} />}
        <ul>
          <Image
            src='https://randomuser.me/api/portraits/women/17.jpg'
            width='50'
            height='50'
            style={{ borderRadius: '100%', width: '40px' }}
          />
        </ul>
      </Page.Header>
    </>
  )
}

export default Header
