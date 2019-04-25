import axios from "axios";

const YELP_API_KEY = "<YOUR_API_KEY>";

const api = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`
  }
});

const getCoffeeShops = userLocation => {
  return api
    .get("/businesses/search", {
      params: {
        limit: 10,
        categories: "coffee",
        ...userLocation
      }
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates
        };
      })
    )
    .catch(error => console.error(error));
};

export default {
  getCoffeeShops
};
