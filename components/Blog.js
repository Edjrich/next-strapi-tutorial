import React from 'react'
import Link from 'next/link'

function Blog({ description, title, slug }) {
  console.log(description, title, slug)
  return (
    <div>
      <Link href={'/posts/' + slug}>
        {/* <h1>Blog</h1> */}
        <a>
          <h1>{title}</h1>
          <p>{description}</p>
        </a>
      </Link>
    </div>
  )
}

export default Blog
