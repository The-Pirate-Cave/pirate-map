import { utils } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';

export function generatePrivateKey(geoLocations) {
  const hashedArray = geoLocations.map(({ longitude, latitude }) => {
    return (
      keccak256(utils.toUtf8Bytes(longitude)) +
      keccak256(utils.toUtf8Bytes(latitude))
    );
  });
  const concatStr = hashedArray.join('');
  const result = keccak256(utils.toUtf8Bytes(concatStr));

  return result;
}

export function generateChest(geoLocations) {
  const joinedCoords = geoLocations
    .map(({ longitude, latitude }) => [longitude, latitude].join(''))
    .join('');

  return keccak256(utils.toUtf8Bytes(joinedCoords));
}
