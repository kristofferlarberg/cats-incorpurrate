import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export async function getStaticProps(context) {
  const fs = require('fs');
  const data = require('/data/catdata.json');
  let cats = data.cats;

  fs.readdirSync('public/images').forEach(file => {
    if (file.slice(-4) === ".png") {
      cats.forEach((cat) => {
        if (cat.image.slice(0, -4) === file.slice(0, -4)) {
          cat.image = file;
        }
      })
    }
    console.log(cats);
  });

  return {
    props: { cats },
  }
}

export default function Home(props) {
  const { cats } = props;

  return (
    <div>
      <Head>
        <title>Cats Incorpurrate /ᐠ｡ꞈ｡ᐟ\</title>
        <meta name="description" content="Incorpurrate" />
        <link rel="icon" href="" />
      </Head>

      <main>
        {cats && cats?.map((cat) => (
          <figure key={cat.name}>
            <Image
              src={`/images/${cat.image}`}
              alt={`Image of ${cat.name}`}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={"data:iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8f5PhDwAHjQLWJOWl2QAAAABJRU5ErkJggg=="}
            />
            <figcaption>{cat.name}</figcaption>
          </figure>
        ))}
      </main>
    </div>
  )
}
