import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, maxLength: 10, pagerPage: 0 };
  }

  getPagerItems() {
    const { pageCount } = this.props;
    // const pageCount = 11;
    const { /* page,  */ maxLength, pagerPage } = this.state;

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

  handleClick(action, newPage) {
    const { pageCount, onClick } = this.props;
    const { page } = this.state;
    let nextPage = page;

    if (action === 'first') {
      nextPage = 1;
    } else if (action === 'last') {
      nextPage = pageCount;
    } else if (action === 'prev' && page > 1) {
      nextPage = page - 1;
    } else if (action === 'next' && page < pageCount) {
      nextPage = page + 1;
    } else if (newPage > 0) {
      nextPage = newPage;
    }

    if (nextPage !== page) {
      this.setState({ page: nextPage });
      onClick(nextPage);
    }
  }

  render() {
    const { pageCount } = this.props;
    const { page } = this.state;
    console.log(this.getPagerItems());

    // [...Array(pageCount)] creates an array with null values that can be iterated over.
    // const pager = [...Array(pageCount)].map((val, i) => (
    //   <PaginationItem key={i} active={i === page}>
    //     <PaginationLink onClick={() => this.handleClick('page', i)}>{i + 1}</PaginationLink>
    //   </PaginationItem>
    // ));

    const pager = this.getPagerItems().map(val => (
      <PaginationItem key={val} active={val === page}>
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
            {pager}
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
