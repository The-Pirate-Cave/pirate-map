// or "const mapboxgl = require('mapbox-gl');"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import mapboxgl from 'mapbox-gl';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useGeo, useGeoWatch } from 'use-geo';

import Deposit from '@/components/Deposit';
import Withdraw from '@/components/Withdraw';

import useMap from '../components/Map';

const Home: NextPage = () => {
  const geo = useGeo();
  const { position, watching, watch, unwatch } =
    useGeoWatch(/* immediate flag (boolean) or PositionOptions object */);
  const { createMap } = useMap();
  const ref = useRef(null);
  const [geoLocations, setGeoLocations] = useState([]);
  const { longitude, latitude } = position?.coords || {};
  console.log({ geo, position, longitude, watching });
  useEffect(() => {
    if (ref.current && position) {
      createMap(ref.current, { longitude, latitude }).then((map: any) => {
        map.addControl(new mapboxgl.NavigationControl());

        const marker1 = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        map.addControl(
          new mapboxgl.AttributionControl({
            customAttribution: 'Map design by me',
          })
        );
      });
    }
  }, [ref, position]);

  return (
    <>
      <Head>
        <title>Pirate Cave</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex h-screen">
        <div className="h-full w-1/2">
          <div ref={ref} className="h-full w-full" id="map-render">
            Loading...
          </div>
        </div>
        <div className="z-10 w-1/2 p-20">
          <div className="mb-20">
            <ConnectButton />
          </div>
          <article className="mb-20 flex">
            <article className="">
              <div className="mb-5">
                {geoLocations.length === 0 && (
                  <>
                    <span>Watching: </span>
                    <button
                      onClick={watching ? unwatch : watch}
                      className={'border-1 rounded-xl bg-gray-300 p-2'}
                    >
                      {watching ? 'stop' : 'start'}
                    </button>
                    <div>
                      <span>latitude: {latitude}</span>{' '}
                      <span>longitude: {longitude}</span>
                    </div>
                  </>
                )}
                {geoLocations.map((geoLocation, index) => (
                  <div key={index}>
                    <input
                      className={
                        'border-1 mr-4 rounded-xl border-indigo-600 bg-gray-100 p-2'
                      }
                      type="text"
                      value={geoLocation}
                      placeholder={'Location'}
                    />
                    <button
                      className={
                        'bg-gray border-1 h-[25px] w-[25px] rounded-xl bg-gray-500 text-white'
                      }
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <Deposit />
              </div>
              <div className="mb-5">
                <Withdraw />
              </div>
            </article>
          </article>
        </div>
      </section>

      {/* <footer> */}
      {/*  <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer"> */}
      {/*    Made with ❤️ by your frens at 🌈 */}
      {/*  </a> */}
      {/* </footer> */}
    </>
  );
};

export default Home;
