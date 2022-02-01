import React from 'react'
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import Repository, { IRepository } from '../components/repository'
import { server } from '../config/index'

import styles from '../styles/Home.module.css'
import repositoryStyles from '../styles/Repository.module.css'

interface Repos {
  repos: IRepository;
}

const Search: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { repos } = props;

  return (
    <>
      <Head>
        <title>Github Search Results</title>
        <meta name="description" content="Search results from the Github API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={`container ${repositoryStyles.results__grid}`}>
          {repos && repos.map((item: IRepository, index: number) => <Repository key={index} {...item} />)}
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`${server}/api/github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: query.query
    })
  })
  const repos: Repos = await res.json()

  return {
    props: {
      repos,
    },
  }
}

export default Search
