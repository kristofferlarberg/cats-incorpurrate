import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
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
  const [catsState, setCatsState] = useState(cats);
  const [filterToggle, setFilterToggle] = useState("none");

  //Sort based on cutenessLevel - low to high
  function sortAsc() {
    const sortedData = [...cats].sort((a, b) => a.cutenessLevel - b.cutenessLevel)
    setCatsState(sortedData)
    setFilterToggle("sortAsc")
  }
  //Sort based on cutenessLevel - high to low
  function sortDesc() {
    const sortedData = [...cats].sort((a, b) => b.cutenessLevel - a.cutenessLevel)
    setCatsState(sortedData)
    setFilterToggle("sortDesc")
  }

  function sortReset(e) {
    e.preventDefault
    const sortedData = cats;
    setCatsState(sortedData)
    setFilterToggle("none")
  }

  console.log("cats", cats)
  console.log("catsState", catsState)

  return (
    <div>
      <Head>
        <title>Cats Incorpurrate /ᐠ｡ꞈ｡ᐟ\</title>
        <meta name="description" content="Incorpurrate" />
        <link rel="icon" href="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&display=swap" rel="stylesheet" />
      </Head>
      <header>
        <div>Cats Incorpurrate /ᐠ｡ꞈ｡ᐟ\</div>
        <nav>
          <button
            className={filterToggle === "sortAsc" ? "active-button" : null}
            onClick={sortAsc}
          >
            Much cute
          </button>
          <button
            className={filterToggle === "sortDesc" ? "active-button" : null}
            onClick={sortDesc}
          >
            Not cute
          </button>
          <button
            className={filterToggle === "none" ? "active-button" : null}
            onClick={sortReset}
          >
            None
          </button>
        </nav>
      </header>
      <main>
        <section>
          {catsState && catsState?.map((cat) => (
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
        </section>
      </main>
    </div>
  )
}
