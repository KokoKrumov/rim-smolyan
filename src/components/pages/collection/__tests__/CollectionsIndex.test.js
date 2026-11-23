import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import streams from "../../../../api/streams";
import categoriesReducer from "../../../../store/categoriesSlice";
import collectionsReducer from "../../../../store/collectionsSlice";
import CollectionsIndex from "../CollectionsIndex";

vi.mock("../../../../api/streams", () => ({ default: { get: vi.fn() } }));

it("loads both collection counts on mount when categories are already available", async () => {
  streams.get.mockImplementation((url) => {
    if (url.includes("parent=10")) return Promise.resolve({ data: [{ id: 1 }] });
    if (url.includes("parent=20")) return Promise.resolve({ data: [{ id: 2 }, { id: 3 }] });
    throw new Error(`Unexpected request: ${url}`);
  });
  const store = configureStore({
    reducer: { categories: categoriesReducer, collections: collectionsReducer },
    preloadedState: {
      categories: {
        0: { id: 10, slug: "main-collections" },
        1: { id: 20, slug: "virtual-collections" },
      },
    },
  });

  render(
    <Provider store={store}>
      <IntlProvider
        locale="en"
        messages={{
          "funds-count-label": "items",
          "main-collections": "Main collections",
          "virtual-collections": "Virtual collections",
          explore: "Explore",
        }}
      >
        <MemoryRouter>
          <CollectionsIndex />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

  expect(await screen.findByText("1 items")).toBeInTheDocument();
  expect(await screen.findByText("2 items")).toBeInTheDocument();
  expect(streams.get).toHaveBeenCalledTimes(2);
  expect(streams.get).toHaveBeenCalledWith(
    "/categories?parent=10&_fields=id,name,slug,description&page=1&per_page=100",
  );
  expect(streams.get).toHaveBeenCalledWith(
    "/categories?parent=20&_fields=id,name,slug,description&page=1&per_page=100",
  );
});
