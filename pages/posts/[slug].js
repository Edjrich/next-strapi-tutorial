import ReactMarkdown from 'react-markdown'

// const URL = process.env.STRAPIBASEURL
const URL = `https://murmuring-bayou-82351.herokuapp.com`
// const URL = 'http://localhost:1337'

export async function getStaticPaths() {
  const fetchParams = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `
			{
				blogposts{
					slug
				}
			}`,
    }),
  }

  // const res = await fetch(`${URL}/graphql`, fetchParams)
  const res = await fetch(`${URL}/graphql`, fetchParams)
  const posts = await res.json()
  const paths = posts.data.blogposts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const fetchParams = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `
			{
				blogposts(where: {slug: "${params.slug}"}) {
					title
					description
					blogbody
					splash {
						url
					}
				}
			}
			`,
    }),
  }

  const res = await fetch(`${URL}/graphql`, fetchParams)
  const { data } = await res.json()

  // console.log(data)

  return {
    props: data.blogposts[0],
    revalidate: 10,
  }
}

function Content({ title, description, blogbody, splash }) {
  console.log(title, description, blogbody, { ...splash })
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <ReactMarkdown>{blogbody}</ReactMarkdown>
      <img src={splash} />
    </main>
  )
}

export default Content
