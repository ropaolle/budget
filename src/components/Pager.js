import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function getPagerItems(pageCount, maxLength, offset) {
  // Pager annvänds ej, dvs. en sida
  if (pageCount < 2) {
    return [];
  }

  const getRange = (count, indexOffset) => [...Array(count)].map((val, i) => i + indexOffset);

  // Alla sidor kan visas i pager
  if (pageCount <= maxLength) {
    return getRange(pageCount, 1);
  }

  // Alla de sista sidorna får plats
  const firstVisible = 1 + maxLength * offset;
  if (pageCount - firstVisible < maxLength) {
    const startRange = getRange(pageCount - firstVisible + 1, firstVisible);
    return [...startRange];
  }

  const startRange = getRange(maxLength - 4, firstVisible).filter(v => v < pageCount - 2);
  return [...startRange, '...', pageCount - 2, pageCount - 1, pageCount];
}

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: null,
      index: 0,
      maxLength: 10,
      offset: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pager, offset } = state;
    const { pageCount } = props;
    if (!pager && pageCount > 1) {
      return { pager: getPagerItems(pageCount, 10, offset) };
    }
    return null;
  }

  handleClick(action, newPage) {
    const { pageCount, onClick } = this.props;

    this.setState(prevState => {
      const { pager, index, offset, maxLength } = prevState;
      let nextIndex = index;
      let nextOffset = offset;
      let nextPager = pager;

      // console.log(action, newPage, index, nextIndex, pager[nextIndex]);

      if (action === 'first') {
        nextIndex = 0;
        nextOffset = 0;
      } else if (action === 'prev' && index > 0) {
        if (pager[index - 1] === '...') {
          nextOffset += 1;
          nextPager = getPagerItems(pageCount, maxLength, nextOffset);
        }
        nextIndex -= pager[index - 1] === '...' ? 2 : 1;
      } else if (action === 'next' && index < pager.length - 1) {
        nextIndex += pager[index + 1] === '...' ? 2 : 1;
      } else if (newPage) {
        nextIndex = newPage - 1;
      }

      if (nextIndex !== index) {
        onClick(pager[nextIndex]);
        return { index: nextIndex };
      }
      return null;
    });
  }

  render() {
    const { pageCount, page } = this.props;
    const { index, pager } = this.state;
    console.log(pageCount, page, this.state);

    const items =
      pager &&
      pager.map(val => (
        <PaginationItem disabled={val === '...'} key={val} active={val === page}>
          <PaginationLink onClick={() => this.handleClick('page', val)}>{val}</PaginationLink>
        </PaginationItem>
      ));

    return (
      <React.Fragment>
        {pageCount > 1 && (
          <Pagination>
            <PaginationItem>
              <PaginationLink title="first" previous onClick={() => this.handleClick('first')} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink title="previous" onClick={() => this.handleClick('prev')}>
                &lsaquo;
              </PaginationLink>
            </PaginationItem>
            {items}
            <PaginationItem>
              <PaginationLink title="next" onClick={() => this.handleClick('next')}>
                &rsaquo;
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink title="last" next onClick={() => this.handleClick('last')} />
            </PaginationItem>
          </Pagination>
        )}
      </React.Fragment>
    );
  }
}

export default Pager;

/*
 getPagerItems() {
    const { pageCount } = this.props;
    // const pageCount = 11;
    const { maxLength, pagerPage } = this.state;

    // Pager annvänds ej, dvs. en sida
    if (pageCount < 2) {
      return [];
    }

    const getRange = (count, offset) => [...Array(count)].map((val, i) => i + offset);

    // Alla sidor kan visas i pager
    if (pageCount <= maxLength) {
      return getRange(pageCount, 1);
    }

    // Alla de sista sidorna får plats
    const firstVisible = 1 + maxLength * pagerPage;
    if (pageCount - firstVisible < maxLength) {
      const startRange = getRange(pageCount - firstVisible + 1, firstVisible);
      return [...startRange];
    }

    const startRange = getRange(maxLength - 4, firstVisible).filter(v => v < pageCount - 2);
    return [...startRange, '...', pageCount - 2, pageCount - 1, pageCount];
  }
*/
