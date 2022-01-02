import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import { GEOLOCATION_ENDPOINT } from '../../utils/Constants/APIConstants';
import { US } from './constants';

type GeolocationResponse = {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
};

export const useGeoLocation = () => {
  const { data: location } = useQuery<
    Response<GeolocationResponse>,
    Response<Error>
  >(
    'Geolocation',
    async () => await axios.get<GeolocationResponse>(GEOLOCATION_ENDPOINT)
  );

  const requestFromUS = location?.data.country_code === US;

  return { location, requestFromUS };
};
