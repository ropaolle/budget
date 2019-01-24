import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function SortedHeader(props) {
  const { headers, order, sort, onSort } = props;

  const sortIcon = id => {
    if (sort !== id) {
      return faSort;
    }
    return order === 'asc' ? faSortUp : faSortDown;
  };

  const list = headers.map(({ id, label }) => (
    <th key={id}>
      {label}{' '}
      <FontAwesomeIcon icon={sortIcon(id)} color={sort === id ? '#333' : '#ddd'} onClick={() => onSort(id, order)} />
    </th>
  ));
  return (
    <thead>
      <tr>{list}</tr>
    </thead>
  );
}

export default SortedHeader;
