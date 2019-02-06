import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function getPagerItems(pageCount, maxLength, offset) {
  const indexOffset = pageCount <= maxLength ? 1 : maxLength * offset + 1;
  return pageCount < 2 ? [] : [...Array(maxLength)].map((val, i) => i + indexOffset).filter(v => v < pageCount + 1);
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

      if (action === 'first') {
        nextIndex = 0;
        nextOffset = 0;
        nextPager = getPagerItems(pageCount, maxLength, nextOffset);
      } else if (action === 'prev' && index === 0 && offset > 0) {
        nextIndex = 9;
        nextOffset -= 1;
        nextPager = getPagerItems(pageCount, maxLength, nextOffset);
      } else if (action === 'next' && index === maxLength - 1) {
        nextIndex = 0;
        nextOffset += 1;
        nextPager = getPagerItems(pageCount, maxLength, nextOffset);
      } else if (action === 'prev' && index > 0) {
        nextIndex -= 1;
      } else if (action === 'next' && index < pager.length - 1) {
        nextIndex += 1;
      } else if (action === 'last') {
        nextOffset = Math.ceil(pageCount / maxLength) - 1; // lastOffset
        nextPager = getPagerItems(pageCount, maxLength, nextOffset);
        nextIndex = nextPager.length - 1;
      } else if (newPage) {
        nextIndex = newPage - 1;
      }

      if (nextPager[nextIndex] !== pager[index]) {
        onClick(nextPager[nextIndex]);
        return { index: nextIndex, pager: nextPager, offset: nextOffset };
      }
      return null;
    });
  }

  render() {
    const { pageCount, page } = this.props;
    const { pager } = this.state;

    const items =
      pager &&
      pager.map((val, index) => (
        <PaginationItem disabled={val === '...'} key={val} active={val === page}>
          <PaginationLink onClick={() => this.handleClick('page', index + 1)}>{val}</PaginationLink>
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
