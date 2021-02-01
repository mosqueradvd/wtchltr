import Link from 'next/link'
import { Text } from '@geist-ui/react'
import styles from '../../styles/Home.module.css'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
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
      </footer>
    </>
  )
}

export default Footer
