import { ConnectButton } from '@rainbow-me/rainbowkit';
import mapboxgl from 'mapbox-gl';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  useEffect(() => {
    if (ref.current && position) {
      createMap(ref.current, { longitude, latitude }).then((map: any) => {
        map.addControl(new mapboxgl.NavigationControl());

        const marker1 = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        console.log('marker1', marker1);

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
                <>
                  <span>Live Watching: </span>
                  <button
                    onClick={watching ? unwatch : watch}
                    className={'border-1 mx-2 rounded-xl bg-gray-300 p-2 px-4'}
                  >
                    {watching ? 'stop' : 'start'}
                  </button>
                  <div className={'mb-5'}>
                    <span>
                      <b>latitude:</b> {latitude}
                    </span>{' '}
                    <span>
                      <b>longitude:</b> {longitude}
                    </span>
                  </div>
                  <div>
                    <button
                      className={'rounded-xl bg-black p-2 px-4 text-white'}
                      onClick={() => {
                        setGeoLocations([
                          ...geoLocations,
                          { longitude, latitude },
                        ]);
                      }}
                    >
                      + Save coords for deposit
                    </button>
                  </div>
                  <hr className={`my-5`} />
                </>
                {geoLocations.map((geoLocation, index) => (
                  <div key={index} className={'my-1'}>
                    <input
                      className={
                        'mr-4 w-[240px] rounded-xl border-2 border-gray-400 bg-gray-100 p-2'
                      }
                      type="text"
                      value={[geoLocation.latitude, geoLocation.longitude].join(
                        ', '
                      )}
                      placeholder={'Location'}
                    />
                    <button
                      onClick={() => {
                        setGeoLocations([
                          ...geoLocations.slice(0, index),
                          ...geoLocations.slice(index + 1, geoLocations.length),
                        ]);
                      }}
                      className={
                        'bg-gray inline-flex justify-items-center rounded-xl border-2 bg-red-500 py-2 px-3 align-middle text-white'
                      }
                    >
                      Remove
                      <img
                        src={`${router.basePath}/assets/icons/remove.webp`}
                        alt=""
                        className="ml-3 w-5"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <Deposit geoLocations={geoLocations} />
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
