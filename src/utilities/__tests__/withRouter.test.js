import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { withRouter } from './withRouter';

class ArticlePage extends React.Component {
  render() {
    const { match, location, navigate, title } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <p data-testid="slug">{match.params.slug}</p>
        <p data-testid="path">{location.pathname}</p>
        <button onClick={() => navigate('/news/other-article')}>Next</button>
      </div>
    );
  }
}

const renderAt = (path) => {
  const Wrapped = withRouter(ArticlePage);
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/news/:slug" element={<Wrapped title="Новини" />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('withRouter', () => {
  it('injects match.params, location and forwards props', () => {
    renderAt('/news/my-article');

    expect(screen.getByRole('heading')).toHaveTextContent('Новини');
    expect(screen.getByTestId('slug')).toHaveTextContent('my-article');
    expect(screen.getByTestId('path')).toHaveTextContent('/news/my-article');
  });

  it('injects a working navigate function', async () => {
    renderAt('/news/my-article');

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByTestId('slug')).toHaveTextContent('other-article');
    expect(screen.getByTestId('path')).toHaveTextContent('/news/other-article');
  });

  it('sets a descriptive displayName', () => {
    expect(withRouter(ArticlePage).displayName).toBe('WithRouter(ArticlePage)');
    expect(withRouter(() => null).displayName).toBe('WithRouter(Component)');
  });
});
