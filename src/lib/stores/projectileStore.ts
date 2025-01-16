import { create } from "zustand";

const useProjectileStore = create<any>()((set, get) => ({
  projectiles: [],
}));
