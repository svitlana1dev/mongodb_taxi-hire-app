import { NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import Driver from "../models/driver";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { lng, lat } = req.query;
  const longitude: number = parseFloat(lng as string);
  const latitude: number = parseFloat(lat as string);

  try {
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
    res.status(StatusCodes.OK).send(drivers);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    const newDriver = await Driver.create({ email });
    res.status(StatusCodes.CREATED).send(newDriver);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedDriver = await Driver.findByIdAndUpdate({ _id: id }, body);
    res.status(StatusCodes.OK).send(updatedDriver);
  } catch (err) {
    next(err);
  }
};

export const deleteDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedDriver = await Driver.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).send(updatedDriver);
  } catch (err) {
    next(err);
  }
};
