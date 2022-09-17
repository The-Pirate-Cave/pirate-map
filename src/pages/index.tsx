import { ConnectButton } from '@rainbow-me/rainbowkit';
import mapboxgl from 'mapbox-gl';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiTwotonePushpin } from 'react-icons/ai';
import Switch from 'react-ios-switch';
import { useGeoWatch } from 'use-geo';

import Deposit from '@/components/Deposit';
import Withdraw from '@/components/Withdraw';

import useMap from '../components/Map';
import { bnum } from '../lib/helpers';

const Home: NextPage = () => {
  const { position, watching, watch, unwatch } =
    useGeoWatch(/* immediate flag (boolean) or PositionOptions object */);
  const { createMap } = useMap();
  const ref = useRef(null);
  const [geoLocations, setGeoLocations] = useState([]);
  const [amount, setAmount] = useState(0);
  const { longitude, latitude } = position?.coords || {};
  const router = useRouter();

  useEffect(() => {
    if (ref.current && position) {
      createMap(ref.current, { longitude, latitude }).then((map: any) => {
        map.addControl(new mapboxgl.NavigationControl());

        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            showUserLocation: true,
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
          })
        );
      });
      ref.current = null;
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-screen md:flex">
        <div className="h-64 grow md:h-full">
          <div
            ref={ref}
            className="h-full w-full p-2 text-center"
            id="map-render"
          >
            Loading...
          </div>
        </div>
        <div className="z-10 py-5 px-4 md:px-10">
          <div className="">
            <ConnectButton />
          </div>
          <div className="mt-5 grid place-items-center">
            <div className={'mx-auto block w-3/12 md:mx-10'}>
              <img
                src={`${router.basePath}/assets/icons/logotype.svg`}
                alt=""
              />
            </div>
            <h2 className={'mx-3 text-2xl md:text-3xl'}>
              Hide your crypto assets in a secret location
            </h2>
            <hr className={`my-5 w-full border-gray-600`} />
          </div>
          <article className="mb-20">
            <article className="">
              <div className="mb-6">
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className={'inline font-bold'}>Live location</h4>
                    <Switch
                      className={'mx-2'}
                      checked={watching}
                      onChange={() => {
                        if (watching) {
                          unwatch();
                        } else {
                          watch();
                        }
                      }}
                    />
                  </div>
                </>
                {geoLocations.map((geoLocation, index) => (
                  <div key={index} className={'my-2 flex align-middle'}>
                    <svg
                      className={'mr-2 w-7 stroke-amber-50'}
                      version="1.1"
                      viewBox="0 0 91 91"
                    >
                      <g>
                        <path d="M34.7,73.3V48.4l34.6-10.1c0.7-0.2,1.2-0.8,1.2-1.5s-0.4-1.4-1-1.7L33.7,20.5c-0.5-0.2-1.1-0.2-1.6,0.2   c-0.5,0.3-0.7,0.8-0.7,1.4v51.2H34.7z" />
                      </g>
                    </svg>
                    <input
                      disabled={true}
                      onChange={() => {}}
                      className={
                        'w-[200px] rounded-xl border-2 border-gray-200 p-2 text-black disabled:bg-gray-300'
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
                        'bg-gray mx-2 flex rounded-md bg-red-600 px-3 align-middle text-white'
                      }
                    >
                      <img
                        src={`${router.basePath}/assets/icons/remove.svg`}
                        alt=""
                        className="mt-3.5 -mb-1 w-5"
                      />
                    </button>
                  </div>
                ))}
                <div>
                  <button
                    disabled={!position}
                    className={
                      'mt-2 flex w-full items-center rounded-xl border-2 border-indigo-500 bg-indigo-600 p-2 px-4 font-bold text-white'
                    }
                    onClick={() => {
                      setGeoLocations([
                        ...geoLocations,
                        {
                          longitude: bnum(longitude).toFixed(3),
                          latitude: bnum(latitude).toFixed(3),
                        },
                      ]);
                    }}
                  >
                    <AiTwotonePushpin className="text-xl" />
                    <div className="flex grow items-center justify-center">
                      PIN MY LOCATION
                    </div>
                  </button>
                </div>
                {geoLocations.length === 0 && (
                  <p className="py-2 text-red-500">No location stored</p>
                )}
              </div>
              <div className="mb-5">
                <hr className={`my-5 border-gray-600`} />
                <label>
                  <b>Amount (ETH):</b>
                  <div className={'mt-5'}>
                    <input
                      placeholder="0.00"
                      className="text-whit w-full border-b-2 bg-transparent p-2 outline-none focus:border-lime-500"
                      type="number"
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>
              <article className="mt-16 flex">
                <div className="mb-5 mr-2">
                  <Deposit amount={amount} geoLocations={geoLocations} />
                </div>
                <div className="mb-5">
                  <Withdraw amount={amount} geoLocations={geoLocations} />
                </div>
              </article>
            </article>
          </article>
        </div>
      </section>
    </>
  );
};

export default Home;
