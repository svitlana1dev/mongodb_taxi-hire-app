import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  findNearbyDrivers,
  createDriver,
  updateDriver,
  deleteOneDriver,
} from "../services/drivers-service";

export const index = async (req: Request, res: Response): Promise<void> => {
  const { lng, lat } = req.query;
  const longitude: number = parseFloat(lng as string);
  const latitude: number = parseFloat(lat as string);

  const drivers = await findNearbyDrivers(longitude, latitude);
  res.status(StatusCodes.OK).send(drivers);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  const newDriver = await createDriver(body);
  res.status(StatusCodes.CREATED).json(newDriver);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const body = req.body;

  const updatedDriver = await updateDriver({ _id: id }, body);
  res.status(StatusCodes.OK).json(updatedDriver);
};

export const deleteDriver = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const updatedDriver = await deleteOneDriver({ _id: id });
  res.status(StatusCodes.OK).json(updatedDriver);
};
