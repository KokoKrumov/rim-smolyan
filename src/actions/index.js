import {
  CLOSE_NEDELOV_MODAL,
  CLOSE_REDIRECT_MODAL,
  CLOSE_TEAM_MODAL,
  FETCH_ARTICLE,
  FETCH_CATEGORIES,
  FETCH_COLLECTIONS_BYTYPE,
  FETCH_COLLECTIONS_BYTYPE_ERROR,
  FETCH_COLLECTIONS_MAIN,
  FETCH_COLLECTIONS_VIRTUAL,
  FETCH_EXHIBITIONS,
  FETCH_EXHIBITIONS_ERROR,
  FETCH_EXHIBITION_ARTICLE,
  FETCH_EXHIBITION_ARTICLE_ERROR,
  FETCH_ITEM_FROM_COLLECTION,
  FETCH_ITEM_FROM_COLLECTION_ERROR,
  FETCH_NEDELOV_MODAL,
  FETCH_NEWS,
  FETCH_NEWS_ERROR,
  FETCH_REDIRECT_MODAL,
  FETCH_RIM_BUILDING_IMAGES,
  FETCH_ROUTES,
  FETCH_SERVICES,
  FETCH_TEAM,
  FETCH_TEAM_MODAL,
  RESET_FETCH_EXHIBITIONS,
  RESET_FETCH_NEWS,
} from "./types";

import publicStreams from "../api/public";
import streams from "../api/streams";

//Create Actions

export const fetchNews =
  (id, page = 1, number = 10) =>
  async (dispatch) => {
    try {
      const response = await streams.get(
        `/posts?categories=${id}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed&page=${page}&per_page=${number}`
      );
      dispatch({ type: FETCH_NEWS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_NEWS_ERROR, payload: error });
    }
  };

export const resetFetchNews = () => {
  return {
    type: RESET_FETCH_NEWS,
    data: [],
  };
};

export const resetFetchExhibitions = () => {
  return {
    type: RESET_FETCH_EXHIBITIONS,
    data: [],
  };
};

export const fetchRoutes = () => async (dispatch) => {
  const response = await publicStreams.get("/routes.json");
  dispatch({ type: FETCH_ROUTES, payload: response.data });
};

export const fetchCategories = () => async (dispatch) => {
  const response = await streams.get(
    // "/categories?_fields=id,name,slug,parent,count&per_page=100"
    "/categories?_fields=id,name,slug,parent,count&per_page=100"
  );
  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const fetchCollectionsMain = (parent) => async (dispatch) => {
  console.log("parent: ", parent);
  const response = await streams.get(
    `/categories?parent=${parent}&_fields=id,name,slug,description&page=1&per_page=50`
  );
  dispatch({ type: FETCH_COLLECTIONS_MAIN, payload: response.data });
};

export const fetchCollectionsVirtual = () => async (dispatch) => {
  const response = await streams.get("/collections-virtual.json");
  dispatch({ type: FETCH_COLLECTIONS_VIRTUAL, payload: response.data });
};

export const fetchCollections =
  (slugId, page = 1, number = 10) =>
  async (dispatch) => {
    try {
      const response = await streams.get(
        `/posts?categories=${slugId}&_fields=id,date_gmt,slug,title,_links,_embedded&_embed&page=${page}&per_page=${number}`
      );
      dispatch({ type: FETCH_COLLECTIONS_BYTYPE, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COLLECTIONS_BYTYPE_ERROR, payload: error });
    }
  };

export const fetchExhibitions =
  (id, page = 1, number = 10) =>
  async (dispatch) => {
    try {
      const response = await streams.get(
        `/posts?categories=${id}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,archive,_links,_embedded&_embed&page=${page}&per_page=${number}`
      );
      dispatch({ type: FETCH_EXHIBITIONS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_EXHIBITIONS_ERROR, payload: error });
    }
  };

export const fetchExhibitionArticle = (slug) => async (dispatch) => {
  try {
    const response = await streams.get(
      `/posts?slug=${slug}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,archive,_links,_embedded&_embed `
    );
    dispatch({ type: FETCH_EXHIBITION_ARTICLE, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EXHIBITION_ARTICLE_ERROR, payload: error });
  }
};

export const fetchServices = () => async (dispatch) => {
  const response = await publicStreams.get("/services.json");
  dispatch({ type: FETCH_SERVICES, payload: response.data });
};

export const fetchRimBuildingImages = () => async (dispatch) => {
  const response = await publicStreams.get("/rim-building-images.json");
  dispatch({ type: FETCH_RIM_BUILDING_IMAGES, payload: response.data });
};

export const fetchTeam = () => async (dispatch) => {
  const response = await publicStreams.get("/team.json");
  dispatch({ type: FETCH_TEAM, payload: response.data });
};

// export const fetchArticle = (id) => async (dispatch) => {
//   // const response = await streams.get(`/streamy/${id}`);
//   const response = await streams.get(
//     `/posts?slug={url-slug}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,archive,_links,_embedded&_embed`
//   );
//   dispatch({ type: FETCH_ARTICLE, payload: response.data });
// };

export const fetchArticle = (urlSlug) => async (dispatch) => {
  try {
    const response = await streams.get(
      `/posts?slug=${urlSlug}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed`
    );
    dispatch({ type: FETCH_ARTICLE, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_NEWS_ERROR, payload: error });
  }
};

export const fetchItemFromCollection = (urlSlug) => async (dispatch) => {
  try {
    const response = await streams.get(
      `/posts?slug=${urlSlug}&_fields=id,date_gmt,slug,title,content,excerpt,collection_item_dating,collection_item_inventory_number,collection_item_location,collection_item_material,collection_item_size,_links,_embedded&_embed`
    );
    dispatch({ type: FETCH_ITEM_FROM_COLLECTION, payload: response.data[0] });
  } catch (error) {
    dispatch({ type: FETCH_ITEM_FROM_COLLECTION_ERROR, payload: error });
  }
};

export const showModal = (data, url, user) => {
  switch (data) {
    case "modal-redirect":
      return {
        type: FETCH_REDIRECT_MODAL,
        data: data,
        url: url,
      };
    case "modal-shishkov":
      return {
        type: FETCH_NEDELOV_MODAL,
        data: data,
      };
    case "modal-team":
      return {
        type: FETCH_TEAM_MODAL,
        data: data,
        user: user,
      };
    default:
      return data;
  }
};

export const closeModal = (data) => {
  switch (data) {
    case "modal-redirect":
      return {
        type: CLOSE_REDIRECT_MODAL,
        data: data,
      };
    case "modal-shishkov":
      return {
        type: CLOSE_NEDELOV_MODAL,
        data: data,
      };
    case "modal-team":
      return {
        type: CLOSE_TEAM_MODAL,
        data: data,
      };
    default:
      return data;
  }
};
