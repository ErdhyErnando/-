import { sample_restaurant, sample_tags } from "../restaurantData";

export const getAll = async () => sample_restaurant;

export const search = async (searchTerm) =>
  sample_restaurant.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // doesn't matter if its case sensitive
  ); // Pizza or pizza

export const getAllTags = async () => sample_tags;

export const getAllByTags = async (tag) => {
  if (tag === "All") return getAll();
  return sample_restaurant.filter((item) => item.tags?.includes(tag));
};

export const getById = async (foodId) =>
  sample_restaurant.find((item) => item.id === foodId);
