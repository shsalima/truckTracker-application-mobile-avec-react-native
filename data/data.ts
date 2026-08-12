import { Truck } from "../types/Truck";

export const initialTrucks: Truck[] = [
  {
    id: "1",
    plateNumber: "12345-A-6",
    color: "Blanc",
    fuelType: "Diesel",
    mileage: 45000,
    status: "En service",
    nextOilChangeMileage: 50000,
  },
  {
    id: "2",
    plateNumber: "67890-B-7",
    color: "Bleu",
    fuelType: "Diesel",
    mileage: 72000,
    status: "À l'arrêt",
    nextOilChangeMileage: 70000,
  },
  {
    id: "3",
    plateNumber: "24680-C-8",
    color: "Rouge",
    fuelType: "Essence",
    mileage: 30000,
    status: "En maintenance",
    nextOilChangeMileage: 35000,
  },
];