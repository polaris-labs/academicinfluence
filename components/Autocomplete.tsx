import AwesomeDebouncePromise from "awesome-debounce-promise";
import * as React from "react";
import { useAsyncAbortable } from "react-async-hook";
import Autosuggest from "react-autosuggest";

export default function Autocomplete<T extends { name: string }>(props: {
  api: (text: string, abort: AbortSignal) => Promise<T[]>;
  text: string;
  textChange?: (text: string) => void;
  clearSelection?: () => void;
  updateCurrent?: (item: T | null) => void;
  onSelect?: (item: T) => void;
}) {
  const debouncedApi = React.useMemo(
    () =>
      AwesomeDebouncePromise(
        (details: { text: string; abortSignal: AbortSignal }) =>
          props.api(details.text, details.abortSignal),
        1000
      ),
    [props.api]
  );

  const suggestionsLookup = useAsyncAbortable(
    async (abortSignal, text) =>
      text === "" ? [] : debouncedApi({ text, abortSignal }),
    [props.text]
  );

  const suggestions = suggestionsLookup.result || [];

  const [currentSuggestion, setCurrentSuggestion] = React.useState<T | null>(
    null
  );

  const onSelect = React.useCallback(
    (event, { suggestion }) => {
      if (props.onSelect) {
        props.onSelect(suggestion);
      }
    },
    [props.onSelect]
  );

  const onChange = React.useCallback(
    (event, { newValue }) => {
      if (props.textChange) {
        props.textChange(newValue);
      }
    },
    [props.textChange]
  );

  const onSuggestionsFetchRequested = React.useCallback(() => {}, []);

  const onSuggestionsClearRequested = React.useCallback(() => {}, []);

  const targetCurrentSuggestion =
    suggestions.length > 0 ? suggestions[0] : null;

  if (props.updateCurrent && targetCurrentSuggestion !== currentSuggestion) {
    props.updateCurrent(targetCurrentSuggestion);
    setCurrentSuggestion(targetCurrentSuggestion);
  }

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        "& .rc-slider": {
          marginLeft: "20px"
        },
        "& .react-autosuggest__container": {
          position: "relative"
        },
        "& .react-autosuggest__suggestions-container": {
          position: "absolute",
          top: "25px",
          width: "100%",
          zIndex: 1000,
          "& ul": {
            listStyle: "none",
            padding: 0,
            background: "white",
            border: "solid 1px black"
          }
        },
        "& input": {
          paddingLeft: "8px",
          paddingRight: "8px"
        }
      }}
    >
      <Autosuggest
        inputProps={{
          style: {
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "hsl(0,0%,80%)",
            minHeight: "34px",
            fontSize: "16px",
            fontWeight: 500
          },
          onChange,
          value: props.text
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        suggestions={suggestions}
        getSuggestionValue={item => item.name}
        renderSuggestion={(item, { isHighlighted }) => (
          <div
            key={item.name}
            css={{
              background: isHighlighted ? "lightgray" : "white",
              padding: "5px"
            }}
          >
            {item.name}
          </div>
        )}
        onSuggestionSelected={onSelect}
        multiSection={false}
      />
    </div>
  );
}
