type PointType = {
  type: String;
  coordinates: number[];
};

export type DriverType = {
  email: String;
  driving?: Boolean;
  location?: PointType;
};
