import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { Link, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import streams from "../../../../api/streams";
import articleReducer from "../../../../store/articleSlice";
import newsReducer from "../../../../store/newsSlice";
import NewsDetailPage from "../NewsDetailPage";

afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
});

vi.mock("../../../../api/streams", () => ({ default: { get: vi.fn() } }));
vi.mock("../../../Article/Article", () => ({
  default: ({ data }) => <h1>{data.article.title.rendered}</h1>,
}));
vi.mock("../../NotFound", () => ({
  default: () => <h1>Article not found</h1>,
}));

function KeyedNewsDetail() {
  const { pathname } = useLocation();
  return <NewsDetailPage key={pathname} />;
}

it("shows not found after a client-side article request fails despite retained Redux data", async () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  sessionStorage.setItem("categories", "[]");
  const articleA = {
    id: 1,
    title: { rendered: "Article A" },
  };
  streams.get.mockImplementation((url) => {
    if (url.includes("slug=article-a")) return Promise.resolve({ data: [articleA] });
    if (url.includes("slug=article-b")) return Promise.reject(new Error("Network unavailable"));
    throw new Error(`Unexpected request: ${url}`);
  });
  const store = configureStore({
    reducer: { article: articleReducer, news: newsReducer },
    preloadedState: { article: [articleA], news: {} },
  });
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={{}}>
        <MemoryRouter initialEntries={["/news/article-a"]}>
          <Link to="/news/article-b">Article B</Link>
          <Routes>
            <Route path="/news/:slug" element={<KeyedNewsDetail />} />
          </Routes>
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

  expect(await screen.findByRole("heading", { name: "Article A" })).toBeInTheDocument();
  await user.click(screen.getByRole("link", { name: "Article B" }));

  expect(await screen.findByRole("heading", { name: "Article not found" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Article A" })).not.toBeInTheDocument();
  expect(error).toHaveBeenCalledWith(
    "Failed to load article",
    expect.objectContaining({ message: "Network unavailable" }),
  );
  error.mockRestore();
});
