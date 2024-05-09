import Driver from "../models/driver";
import { DriverType } from "../types/driver";

export const findNearbyDrivers = async (
  longitude: number,
  latitude: number
): Promise<DriverType[]> => {
  const drivers = await Driver.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [longitude, latitude] },
        spherical: true,
        distanceField: "distance",
        key: "location",
        maxDistance: 200000,
      },
    },
  ]);

  return drivers;
};

export const createDriver = async (body: DriverType): Promise<DriverType> => {
  const newDriver = await Driver.create(body);

  return newDriver;
};

export const updateDriver = async (
  { _id: id },
  body: DriverType
): Promise<DriverType> => {
  const updatedDriver = await Driver.findByIdAndUpdate({ _id: id }, body);

  return updatedDriver;
};

export const deleteOneDriver = async ({ _id: id }): Promise<DriverType> => {
  const updatedDriver = await Driver.findByIdAndDelete({ _id: id });

  return updatedDriver;
};
