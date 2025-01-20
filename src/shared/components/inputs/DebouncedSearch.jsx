import PropTypes from 'prop-types';
import { InputControl } from './InputControl';
import { useDebounce } from 'use-debounce';
import React from 'react';

/**
 * @function DebouncedSearch
 * @description A search input that triggers a callback after debouncing user input
 * @param {Object} props component props
 * @param {string} [props.value] initial value of the search input
 * @param {Function} [props.onChange] callback that will be called after debouncing user input
 * @param {number} [props.debounce=500] delay in milliseconds before the callback will be called
 * @param {string} [props.placeholder='Search...'] placeholder text to be displayed in the input
 * @returns {ReactElement} The debounced search component
 */
export const DebouncedSearch = ({
  value: initialValue = '',
  onChange,
  debounce = 500,
  placeholder = 'Search...',
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [debouncedValue] = useDebounce(value, debounce);

  React.useEffect(() => {
    onChange?.(debouncedValue);
  }, [debouncedValue]);

  return (
    <InputControl
      type="search"
      size="small"
      name="search"
      id="search"
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...props}
    />
  );
};

DebouncedSearch.propTypes = {
  debounce: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
