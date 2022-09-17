import mapboxgl from "mapbox-gl" // or "const mapboxgl = require('mapbox-gl');"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZDNwb3J0aWxsbyIsImEiOiJja3ljam5qN24wcTBvMzBueGNtZ25mdXh0In0.KYOQ-CJFDcaEpyH-Ebe8iQ"
    const map = new mapboxgl.Map({
      container: "map-render", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    })
  }, [])

  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        <div className="fixed top-0 left-0 z-10">
          <ConnectButton />
        </div>
        <div className="w-screen h-screen fixed top-0 left-0">
          <div className="w-full h-full absolute" id="map-render" />
        </div>
      </main>

      <footer>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  )
}

export default Home
