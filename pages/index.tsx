import React from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Search from '../components/search'
import Repository, { IRepository } from '../components/repository'
import { server } from '../config/index'

import styles from '../styles/Home.module.css'
import repositoryStyles from '../styles/Repository.module.css'

interface Repos {
  repos: IRepository;
}

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { repos } = props;

  return (
    <>
      <Head>
        <title>Github API Search</title>
        <meta name="description" content="Arctic Shores Technical test by Scott Taylor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Search />
        <h2 className={styles.header}>Top Starred Repositories</h2>
        <section className={`container ${repositoryStyles.results__grid}`}>
          {repos && repos.map((item: IRepository, index: number) => <Repository key={index} {...item} />)}
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${server}/api/github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: 'stars:>=10000',
      sort: 'stars'
    })
  })
  const repos: Repos = await res.json()

  return {
    props: {
      repos,
    },
  }
}

export default Home
