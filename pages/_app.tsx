import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import '../styles/globals.css'
import styles from '../styles/Header.module.css'

type AppProps = {
  pageProps: any,
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any },
}

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <header className={styles.header}>
      <Link href="/" passHref>
        <div className={`container ${styles['header__inner-wrap']}`}>
          <Image src="/github-logo.svg" height={50} width={50} alt="Github Logo" />
          <h1 className={styles.header__title}>Github repository search</h1>
        </div>
      </Link>
    </header>
    <Component {...pageProps} />
  </>
}

export default MyApp
