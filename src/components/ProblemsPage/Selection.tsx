import React, { useEffect, useState } from 'react';
import {
  useInstantSearch,
  useRefinementList,
  UseRefinementListProps,
} from 'react-instantsearch';
import Select from '../Select';

export type SelectionProps = UseRefinementListProps & {
  placeholder: string;
  searchable: boolean;
  isMulti: boolean;
  transformLabel?: (label: string) => string;
  items?: { label: string; value: string | string[] }[];
};

export default function Selection({
  attribute,
  limit,
  placeholder,
  searchable,
  isMulti,
  transformLabel: transform,
  items,
  ...props
}: SelectionProps) {
  const { items: refineItems } = useRefinementList({
    attribute,
    limit,
    ...props,
  });
  if (!items) items = refineItems;

  const normalizedItems = items.map(item => ({
    ...item,
    value: Array.isArray(item.value)
      ? item.value.map(String)
      : String(item.value),
  }));

  const [refinements, setRefinements] = useState<string[]>([]);
  const { setIndexUiState } = useInstantSearch();

  useEffect(() => {
    setIndexUiState(prevIndexUiState => ({
      ...prevIndexUiState,
      refinementList: {
        ...prevIndexUiState.refinementList,
        [attribute]: refinements,
      },
    }));
  }, [attribute, refinements, setIndexUiState]);

  const handleChange = (selected: any) => {
    if (isMulti) {
      const values = (selected || [])
        .flatMap(item =>
          Array.isArray(item.value) ? item.value.map(String) : [String(item.value)]
        )
        .filter(Boolean);
      setRefinements(values);
    } else if (selected) {
      setRefinements([String(selected.value)]);
    } else {
      setRefinements([]);
    }
  };
  return (
    <Select
      onChange={handleChange}
      isClearable
      placeholder={placeholder}
      isMulti={isMulti}
      isSearchable={searchable}
      options={normalizedItems.map(item => ({
        ...item,
        label: transform ? transform(item.label) : item.label,
      }))}
      className="text-black dark:text-white"
      classNamePrefix="select"
    />
  );
}
