import { observer } from 'mobx-react-lite';
import { SyntheticEvent } from 'react';
import { rootStore } from '../../../mobx/store';
import './pagination.css';

export const Pagination = observer(() => {
  const { setPage, pages, currentPage, isLoading } = rootStore;

  const clickHandler = (event: SyntheticEvent<HTMLDivElement>) => {
    if (isLoading) return;
    const target = event.currentTarget;
    const pageText = target.innerText;

    if (pageText === '...') {
      const direction = target.dataset.direction;
      if (direction === 'left') {
        setPage(Math.max(currentPage - 5, 1));
      } else if (direction === 'right') {
        setPage(Math.min(currentPage + 5, pages));
      }
      return;
    }

    setPage(+pageText);
  };

  const paginationPages = printPages(pages, currentPage);

  const buttonStyle = (page: number | string) => ({
    padding: '8px 12px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontWeight: page === currentPage ? 'bold' : 'normal',
    opacity: isLoading ? 0.5 : 1,
    border: '1px solid #CED5DE',
    borderRadius: '6px',
  });

  const getDirection = (page: number | string, index: number) =>
    page === '...' && index < paginationPages.indexOf(currentPage)
      ? 'left'
      : 'right';

  return (
    <div
      style={{
        display: 'flex',
        gap: '0 8px',
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {paginationPages.map((page: number | string, index) => (
        <div
          className="button"
          key={index}
          onClick={clickHandler}
          data-direction={getDirection(page, index)}
          style={buttonStyle(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
});

const printPages = (
  totalPages: number,
  currentPage: number
): Array<number | string> => {
  const visiblePagesAtStart = 3;
  const visiblePagesAtEnd = 3;
  const middlePagesAroundCurrent = 1;

  const result: Array<number | string> = [];

  for (let i = 1; i <= visiblePagesAtStart; i++) {
    result.push(i);
  }
  if (currentPage > visiblePagesAtStart + middlePagesAroundCurrent + 1) {
    result.push('...');
  }

  const middleStart = Math.max(
    visiblePagesAtStart + 1,
    currentPage - middlePagesAroundCurrent
  );
  const middleEnd = Math.min(
    totalPages - visiblePagesAtEnd,
    currentPage + middlePagesAroundCurrent
  );

  for (let i = middleStart; i <= middleEnd; i++) {
    if (i > visiblePagesAtStart && i < totalPages - visiblePagesAtEnd + 1) {
      result.push(i);
    }
  }

  if (currentPage + middlePagesAroundCurrent < totalPages - visiblePagesAtEnd) {
    result.push('...');
  }

  for (let i = totalPages - visiblePagesAtEnd + 1; i <= totalPages; i++) {
    result.push(i);
  }

  return result;
};
