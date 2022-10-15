import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="grid grid-cols-3 mb-10">
      <div className="col-span-3 sm:col-span-2 text-lg">
        <label
          htmlFor="company-website"
          className="block font-medium text-gray-900"
        >
          Filters:
        </label>
        <div className="mt-1 w-80 flex rounded-md shadow-sm">
          <AdjustmentsVerticalIcon className="inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-3  text-gray-500 w-12 h-10" />
          <select
            className="block flex-1 rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 "
            name="category"
            value={category}
            onChange={handleCategory}
          >
            <option value="">All Products</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2 text-lg">
        <label
          htmlFor="company-website"
          className="block font-medium text-gray-900"
        >
          Search:
        </label>
        <div className="mt-1 w-80 flex rounded-md shadow-sm">
          <MagnifyingGlassIcon className="inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-3  text-gray-500 w-12 h-10" />
          <input
            type="text"
            value={search}
            placeholder="Enter your search!"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="block w-full flex-1 rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2 text-lg">
        <label
          htmlFor="company-website"
          className="block font-medium text-gray-900"
        >
          Sort by:
        </label>
        <div className="mt-1 w-80 flex rounded-md shadow-sm">
          <Bars3BottomRightIcon className="inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-3  text-gray-500 w-12 h-10" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="block flex-1 rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 "
          >
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
