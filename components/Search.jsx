import { createAutocomplete } from '@algolia/autocomplete-core';
import Image from 'next/image';
import { useMemo, useState, useRef } from 'react';

function cn(...args) {
  return args.filter(Boolean).join(' ');
}

function AutocompleteItem({ id, title, img, price }) {
  return (
    <li>
      {title}
    </li>
  );
}

function AutocompletePanel({
  isOpen = false,
  collections = [],
  panelProps = {},
  listProps = {},
  panelRef,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg"
      ref={panelRef}
      {...panelProps}
    >
      {
        collections.map((collection, index) => {
          const { items } = collection;

          return (
            <section key={`section-${index}`}>
              {
                items.length > 0 ? (
                  <ul {...listProps}>
                    {
                      items.map(
                        (item) => <AutocompleteItem key={item.id} {...item} />
                      )
                    }
                  </ul>
                ) : null
              }
            </section>
          )
        })
      }
    </div>
  )
}

export default function Search({ ...props }) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Busca tu oferta',
    autoFocus: true,
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'offers-next-api',
      getItems: ({ query }) => {
        if (!query) {
          return [];
        }

        return fetch(`/api/search?q=${query}`)
          .then((response) => response.json());
      },
    }],
    ...props,
  }), [props]);

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <search>
      <form className="flex justify-center mb-20" {...formProps}>
        <div className={cn(
          "flex",
          "relative",
          "p-1",
          "bg-gradient-to-tr from-purple-600 to-blue-300",
          "rounded-full",
          "w-2/6",
        )}>
          <input
            className="flex-1 p-2 pl-8 rounded-full w-full"
            {...inputProps}
          />
        </div>

        <AutocompletePanel
          isOpen={autocompleteState.isOpen}
          collections={autocompleteState.collections}
          panelProps={autocomplete.getPanelProps()}
          listProps={autocomplete.getListProps()}
          panelRef={panelRef}
        />
      </form>
    </search>
  );
}