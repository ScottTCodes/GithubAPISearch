import React from 'react'
import Image from 'next/image'

import styles from '../../styles/Repository.module.css'

export interface Props {
  name: string,
  author: string,
  stars: string,
  image: string,
}

const Repository = ({ name, author, stars, image }: Props) => (
  <article className={styles.repository}>
    <div className={styles['repository__inner-wrap']}>
      <Image className={styles.repository__image} src={image} height={100} width={100} alt={name}  data-testid="image" />
      <div className={styles['repository__inner-wrap-content']}>
        <h2 className={styles.repository__name} data-testid="name">{name}</h2>
        <h3 className={styles.repository__author} data-testid="author">{author}</h3>
      </div>
    </div>
    <div className={styles.repository__details}>
      <p className={styles['repository__details-stat']}>
        <Image src="/stars.svg" height={30} width={30} alt="Star" />
        <span data-testid="stars">{stars} Stars</span>
      </p>
    </div>
  </article>
)

export default Repository
