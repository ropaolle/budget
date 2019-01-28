import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  handleClick(action, newPage) {
    const { pageCount, onClick } = this.props;
    const { page } = this.state;
    let nextPage = page;

    if (action === 'prev' && page > 0) {
      nextPage = page - 1;
    } else if (action === 'next' && page < pageCount - 1) {
      nextPage = page + 1;
    } else if (newPage > -1) {
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

    /*     const pagerPage = 1;
    const pc = 14;
    let left = 10;
    if (pagerPage * 10 + 11 > pc) {
      left = pagerPage * 10 + 11 - pc - 5;
    }
    console.log(p2, left);
    const p2 = [...[...Array(left)].map((val, i) => i + pagerPage * 10 + 1), '...', pc - 3, pc - 2, pc - 1];
    console.log(p2); */

    // [<<][<][1][2][...][8][9][>][>>]

    // [...Array(pageCount)] creates an array with null values that can be iterated over.
    const pager = [...Array(pageCount)].map((val, i) => (
      <PaginationItem key={i} active={i === page}>
        <PaginationLink onClick={() => this.handleClick('page', i)}>{i + 1}</PaginationLink>
      </PaginationItem>
    ));

    return (
      <React.Fragment>
        {pageCount > 1 && (
          <Pagination>
            <PaginationItem>
              <PaginationLink previous onClick={() => this.handleClick('prev')} />
            </PaginationItem>
            {pager}
            <PaginationItem>
              <PaginationLink next onClick={() => this.handleClick('next')} />
            </PaginationItem>
          </Pagination>
        )}
      </React.Fragment>
    );
  }
}

export default Pager;
