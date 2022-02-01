import React, { useCallback, useState, FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Search.module.css'

const Search: FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const [placeholder, setPlaceholder] = useState('Search for Github Repositories...')

  const onChange = useCallback((event) => {
    const query = event.target.value
    setQuery(query)
  }, []);

  const onFocus = useCallback((event) => {
    const query = event.target.value

    if (query.trim() !== '') {
      setPlaceholder('')
    } else {
      setPlaceholder('Search for Github Repositories...')
    }
  }, []);

  return (
    <div className={`container ${styles.search__container}`}>
      <input
        className={styles.search__bar}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type="text"
        value={query}
      />
      <Link href={`/search?query=${encodeURIComponent(query)}`} passHref>
        <button type="button" className={styles.search__button} aria-label="Search">
          <Image src="/search.svg" height={27} width={27} alt="Search" />
        </button>
      </Link>
    </div>
  )
}

export default Search
