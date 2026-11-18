import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { Link, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import streams from "../../../../api/streams";
import articleReducer from "../../../../store/articleSlice";
import categoriesReducer, { fetchCategories } from "../../../../store/categoriesSlice";
import newsReducer from "../../../../store/newsSlice";
import NewsDetailPage from "../NewsDetailPage";

vi.mock("../../../../api/streams", () => ({ default: { get: vi.fn() } }));
vi.mock("../../../Article/ArticleDetail", () => ({
  default: ({ article }) => <h1>{article.title.rendered}</h1>,
}));
vi.mock("../../NotFound", () => ({
  default: () => <h1>Article not found</h1>,
}));

const categories = [{ id: 10, slug: "news-and-events", name: "News and events" }];
const articleA = {
  id: 1,
  slug: "article-a",
  event_date: "",
  title: { rendered: "Article A" },
};
const relatedStory = {
  id: 2,
  slug: "related-story",
  title: { rendered: "Related story" },
};

function deferred() {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function mockRequests({
  articleResponse = Promise.resolve({ data: [articleA] }),
  relatedResponse = Promise.resolve({ data: [relatedStory] }),
} = {}) {
  streams.get.mockImplementation((url) => {
    if (url.includes("slug=article-a")) return articleResponse;
    if (url.includes("categories=10&")) return relatedResponse;
    throw new Error(`Unexpected request: ${url}`);
  });
}

function KeyedNewsDetail() {
  const { pathname } = useLocation();
  return <NewsDetailPage key={pathname} />;
}

function renderNewsDetail({
  initialArticle = {},
  initialCategories = {},
  initialNews = {},
  strict = false,
} = {}) {
  const store = configureStore({
    reducer: {
      article: articleReducer,
      categories: categoriesReducer,
      news: newsReducer,
    },
    preloadedState: {
      article: initialArticle,
      categories: initialCategories,
      news: initialNews,
    },
  });
  const page = (
    <Provider store={store}>
      <IntlProvider locale="en" messages={{ news: "News", events: "Events" }}>
        <MemoryRouter initialEntries={["/news/article-a"]}>
          <Link to="/news/article-b">Article B</Link>
          <Routes>
            <Route path="/news/:slug" element={<KeyedNewsDetail />} />
          </Routes>
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...render(strict ? <StrictMode>{page}</StrictMode> : page), store };
}

describe("NewsDetailPage", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it("shows not found after a client-side article request fails despite retained Redux data", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    sessionStorage.setItem("categories", "[]");
    streams.get.mockImplementation((url) => {
      if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
      if (url.includes("slug=article-b")) return Promise.reject(new Error("Network unavailable"));
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    renderNewsDetail({ initialArticle: [articleA] });

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Article B" }));

    expect(await screen.findByRole("heading", { name: "Article not found" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Article A" })).not.toBeInTheDocument();
    expect(error).toHaveBeenCalledWith(
      "Failed to load article",
      expect.objectContaining({ message: "Network unavailable" }),
    );
  });

  it.each([
    ["absent", null],
    ["empty", "[]"],
  ])("loads the article with an %s cache and fetches related news when categories arrive", async (_name, cache) => {
    if (cache !== null) sessionStorage.setItem("categories", cache);
    mockRequests();
    const { store } = renderNewsDetail();

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();

    act(() => store.dispatch(fetchCategories.fulfilled(categories, "categories")));

    expect(await screen.findByRole("link", { name: "Related story" })).toHaveAttribute(
      "href",
      "/news-and-events/related-story",
    );
    expect(streams.get).toHaveBeenCalledTimes(2);
    expect(streams.get).toHaveBeenCalledWith(
      expect.stringMatching(/^\/posts\?categories=10&.*&page=6&per_page=3$/),
    );
  });

  it("starts related news while the article request is still pending", async () => {
    const articleResponse = deferred();
    mockRequests({ articleResponse: articleResponse.promise });
    const { store } = renderNewsDetail();

    act(() => store.dispatch(fetchCategories.fulfilled(categories, "categories")));

    await waitFor(() => expect(store.getState().news).toEqual({ 0: relatedStory }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(2);

    await act(async () => {
      articleResponse.resolve({ data: [articleA] });
      await articleResponse.promise;
    });
    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Related story" })).toBeInTheDocument();
  });

  it("loads related news after the asynchronous category request completes", async () => {
    const categoryResponse = deferred();
    streams.get.mockImplementation((url) => {
      if (url.startsWith("/categories?")) return categoryResponse.promise;
      if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
      if (url.includes("categories=10&")) return Promise.resolve({ data: [relatedStory] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const { store } = renderNewsDetail();
    let categoryRequest;
    act(() => {
      categoryRequest = store.dispatch(fetchCategories());
    });

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(2);
    await act(async () => {
      categoryResponse.resolve({ data: categories });
      await categoryRequest;
    });

    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(3);
  });

  it("starts related news immediately when Redux categories are already available", async () => {
    mockRequests();
    renderNewsDetail({ initialCategories: categories });

    expect(streams.get).toHaveBeenCalledTimes(2);
    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
  });

  it("prefers available Redux categories over stale cached categories", async () => {
    sessionStorage.setItem("categories", JSON.stringify([{ ...categories[0], id: 99 }]));
    mockRequests();
    renderNewsDetail({ initialCategories: categories });

    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(2);
    expect(streams.get).toHaveBeenCalledWith(
      expect.stringMatching(/^\/posts\?categories=10&/),
    );
  });

  it.each(["before", "after"])(
    "keeps the cached-category request when metadata refreshes %s its completion",
    async (timing) => {
      const relatedResponse = deferred();
      sessionStorage.setItem("categories", JSON.stringify(categories));
      mockRequests({ relatedResponse: relatedResponse.promise });
      const { store } = renderNewsDetail();
      const refresh = () => act(() => store.dispatch(fetchCategories.fulfilled(
        [{ ...categories[0], count: 10 }],
        "refresh",
      )));

      expect(streams.get).toHaveBeenCalledTimes(2);
      if (timing === "before") refresh();

      await act(async () => {
        relatedResponse.resolve({ data: [relatedStory] });
        await relatedResponse.promise;
      });
      expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();

      if (timing === "after") refresh();
      expect(streams.get).toHaveBeenCalledTimes(2);
    },
  );

  it.each(["before", "after"])(
    "ignores an outdated cached-category response finishing %s the refreshed response",
    async (timing) => {
      const cachedResponse = deferred();
      const refreshedResponse = deferred();
      const cachedStory = { id: 3, slug: "cached", title: { rendered: "Cached story" } };
      const refreshedStory = { id: 4, slug: "fresh", title: { rendered: "Fresh story" } };
      sessionStorage.setItem("categories", JSON.stringify(categories));
      streams.get.mockImplementation((url) => {
        if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
        if (url.includes("categories=10&")) return cachedResponse.promise;
        if (url.includes("categories=99&")) return refreshedResponse.promise;
        throw new Error(`Unexpected request: ${url}`);
      });
      const { store } = renderNewsDetail();
      await screen.findByRole("heading", { name: "Article A" });
      act(() => store.dispatch(fetchCategories.fulfilled(
        [{ ...categories[0], id: 99 }],
        "refresh",
      )));

      const finishCached = async () => {
        await act(async () => {
          cachedResponse.resolve({ data: [cachedStory] });
          await cachedResponse.promise;
        });
      };
      if (timing === "before") await finishCached();
      expect(screen.queryByRole("link", { name: "Cached story" })).not.toBeInTheDocument();

      await act(async () => {
        refreshedResponse.resolve({ data: [refreshedStory] });
        await refreshedResponse.promise;
      });
      expect(await screen.findByRole("link", { name: "Fresh story" })).toBeInTheDocument();

      if (timing === "after") await finishCached();
      expect(screen.queryByRole("link", { name: "Cached story" })).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Fresh story" })).toBeInTheDocument();
      expect(streams.get).toHaveBeenCalledTimes(3);
    },
  );

  it.each([
    ["a missing category", [{ id: 8, slug: "exhibitions" }]],
    ["a missing category ID", [{ slug: "news-and-events" }]],
  ])("reports %s and waits for usable categories", async (_name, initialCategories) => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    mockRequests();
    const { store } = renderNewsDetail({ initialCategories });

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
    expect(error).toHaveBeenCalledWith("Category not found: news-and-events");

    act(() => store.dispatch(fetchCategories.fulfilled(categories, "categories")));
    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(2);
  });

  it("ignores an in-flight cached request if refreshed categories no longer contain the target", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const relatedResponse = deferred();
    sessionStorage.setItem("categories", JSON.stringify(categories));
    mockRequests({ relatedResponse: relatedResponse.promise });
    const { store } = renderNewsDetail();

    act(() => store.dispatch(fetchCategories.fulfilled(
      [{ id: 8, slug: "exhibitions" }],
      "refresh",
    )));
    await act(async () => {
      relatedResponse.resolve({ data: [relatedStory] });
      await relatedResponse.promise;
    });

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Related story" })).not.toBeInTheDocument();
    expect(error).toHaveBeenCalledWith("Category not found: news-and-events");
  });

  it.each([
    ["malformed JSON", "invalid JSON", "Error parsing categories:"],
    ["a non-array value", "{}", "Invalid cached categories:"],
    ["an invalid category entry", "[null]", "Invalid cached categories:"],
  ])("reports %s in the cache and recovers when Redux categories arrive", async (_name, cache, message) => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    sessionStorage.setItem("categories", cache);
    mockRequests();
    const { store } = renderNewsDetail();

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    expect(error).toHaveBeenCalledWith(message, expect.anything());
    expect(streams.get).toHaveBeenCalledOnce();

    act(() => store.dispatch(fetchCategories.fulfilled(categories, "categories")));
    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
  });

  it("does not display retained Redux news after a failure and can retry when categories refresh", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const retainedStory = { id: 9, slug: "retained", title: { rendered: "Retained story" } };
    let relatedRequests = 0;
    streams.get.mockImplementation((url) => {
      if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
      if (url.includes("categories=10&")) {
        relatedRequests += 1;
        return relatedRequests === 1
          ? Promise.reject(new Error("Network unavailable"))
          : Promise.resolve({ data: [relatedStory] });
      }
      throw new Error(`Unexpected request: ${url}`);
    });
    const { store } = renderNewsDetail({
      initialCategories: categories,
      initialNews: { 0: retainedStory },
    });

    expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
    await waitFor(() => expect(error).toHaveBeenCalledWith(
      "Failed to load related news",
      expect.objectContaining({ message: "Network unavailable" }),
    ));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Retained story" })).not.toBeInTheDocument();

    act(() => store.dispatch(fetchCategories.fulfilled(
      [{ ...categories[0], count: 10 }],
      "refresh",
    )));
    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
    expect(relatedRequests).toBe(2);
  });

  it("preserves previously loaded related news when a refresh fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const refreshedCategories = [{ ...categories[0], id: 99 }];
    streams.get.mockImplementation((url) => {
      if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
      if (url.includes("categories=10&")) return Promise.resolve({ data: [relatedStory] });
      if (url.includes("categories=99&")) return Promise.reject(new Error("Network unavailable"));
      throw new Error(`Unexpected request: ${url}`);
    });
    const { store } = renderNewsDetail({ initialCategories: categories });

    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, "refresh")));

    await waitFor(() => expect(error).toHaveBeenCalledWith(
      "Failed to load related news",
      expect.objectContaining({ message: "Network unavailable" }),
    ));
    expect(screen.getByRole("link", { name: "Related story" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("loads related news after a StrictMode remount while requests are pending", async () => {
    const relatedResponse = deferred();
    sessionStorage.setItem("categories", JSON.stringify(categories));
    mockRequests({ relatedResponse: relatedResponse.promise });
    renderNewsDetail({ strict: true });

    await act(async () => {
      relatedResponse.resolve({ data: [relatedStory] });
      await relatedResponse.promise;
    });
    expect(await screen.findByRole("link", { name: "Related story" })).toBeInTheDocument();
  });
});
