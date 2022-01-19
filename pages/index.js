import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';

export async function getStaticProps(context) {
  const fs = require('fs');

  const response = await fetch("http://localhost:3000/api/cats");
  const data = await response.json();

  let catsData = [...data.cats];

  //This edits values for images in the JSON in cases where file endings differ from the image paths in the JSON data.
  fs.readdirSync('public/images').forEach(file => {
    if (file.slice(-4) === ".png") {
      catsData.forEach((cat) => {
        if (cat.image.slice(0, -4) === file.slice(0, -4)) {
          cat.image = file;
        }
      })
    }
  });

  return {
    props: { catsData },
  }
}

export default function Home(props) {
  const { catsData } = props;
  const [catsState, setCatsState] = useState(catsData);
  const [filterToggle, setFilterToggle] = useState("none");

  //Sort based on cutenessLevel - low to high
  function sortAsc() {
    const sortedData = [...catsData].sort((a, b) => a.cutenessLevel - b.cutenessLevel);

    setCatsState(sortedData);
    setFilterToggle("sortAsc");
  }
  //Sort based on cutenessLevel - high to low
  function sortDesc() {
    const sortedData = [...catsData].sort((a, b) => b.cutenessLevel - a.cutenessLevel);
    setCatsState(sortedData);
    setFilterToggle("sortDesc");
  }

  function sortReset() {
    const sortedData = catsData;
    setCatsState(sortedData);
    setFilterToggle("none");
  }

  console.log("catsState", catsState);

  return (
    <div>
      <Head>
        <title>Cats Incorpurrate /ᐠ｡ꞈ｡ᐟ\</title>
        <meta name="description" content="Incorpurrate" />
        <link rel="icon" href="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&display=swap" rel="stylesheet" />
      </Head>
      <header>
        <div>Cats Incorpurrate /ᐠ｡ꞈ｡ᐟ\</div>
        <nav>
          <button
            className={filterToggle === "none" ? "active-button" : null}
            onClick={sortReset}
          >
            None
          </button>
          <button
            className={filterToggle === "sortDesc" ? "active-button" : null}
            onClick={sortDesc}
          >
            Much cute
          </button>
          <button
            className={filterToggle === "sortAsc" ? "active-button" : null}
            onClick={sortAsc}
          >
            Not cute
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
                width={400}
                height={400}
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
};
