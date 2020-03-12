import { find } from "lodash";
import { useRouter } from "next/router";
import { Handle, Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Autocomplete from "react-autocomplete";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";
import {
  apiCountries,
  apiDisciplines,
  apiInfluentialPeoplePage,
  apiPersonSearch
} from "../../api";
import { lookupDiscipline } from "../../disciplines";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  CountriesResponse,
  DisciplinesResponse,
  Identifiable,
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse
} from "../../schema";
import { GRAY } from "../../styles";
import QueryPage from "../../utils/QueryPage";

// I have sloppily copy-pasted bits from college-ranking.tsx
// refactoring is encouraged

function FilterSep() {
  return (
    <div
      css={{
        width: "25px"
      }}
    />
  );
}

type FilterLabelProps = {
  label: string;
  children: React.ReactNode;
};
function FilterLabel(props: FilterLabelProps) {
  return (
    <label
      css={{
        display: "block",
        flexGrow: 1,
        marginTop: "10px"
      }}
    >
      <div
        css={{
          fontSize: "20px",
          lineHeight: "28px",
          color: GRAY
        }}
      >
        {props.label}
      </div>
      {props.children}
    </label>
  );
}

type FilterProps = InfluentialPeopleProps;

function Discipline(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        discipline: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let discipline = props.request.discipline;
  let supertopic: string | null;
  let subtopic: string | null;

  if (
    discipline === null ||
    lookupDiscipline(props.disciplines, discipline).level === 1
  ) {
    supertopic = discipline;
    subtopic = null;
  } else {
    supertopic = lookupDiscipline(props.disciplines, discipline).parent;
    subtopic = discipline;
  }

  const options = [
    {
      value: null,
      label: "Overall"
    },
    ...props.disciplines
      .filter(item => item.level === 1)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const selected =
    find(options, option => option.value === supertopic) || options[0];

  const suboptions = [
    {
      value: null,
      label: "Overall"
    },
    ...props.disciplines
      .filter(item => item.parent === supertopic)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const sub_selected =
    find(suboptions, option => option.value === subtopic) || suboptions[0];

  return (
    <>
      <FilterLabel label="Discipline">
        <Select
          instanceId="discipline-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
      <FilterSep />
      <FilterLabel label="Subdiscipline">
        <Select
          instanceId="subdiscipline-filter"
          value={sub_selected}
          options={suboptions}
          onChange={onChange}
          isDisabled={supertopic === null}
        />
      </FilterLabel>
    </>
  );
}

function Gender(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        gender: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let country = props.request.country;

  const options = [
    {
      value: null,
      label: "All"
    },
    {
      value: true,
      label: "Male"
    },
    {
      value: false,
      label: "Female"
    }
  ];

  const selected =
    find(options, option => option.value === country) || options[0];

  return (
    <>
      <FilterLabel label="Gender">
        <Select
          instanceId="gender-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

function Country(props: FilterProps) {
  const onChange = React.useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        country: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let country = props.request.country;

  const options = [
    {
      value: null,
      label: "All"
    },
    ...props.countries.map(item => ({
      value: item.name,
      label: item.name
    }))
  ];

  const selected =
    find(options, option => option.value === country) || options[0];

  return (
    <>
      <FilterLabel label="Country">
        <Select
          instanceId="country-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

type RangeHandleProps = {
  label: string;
  format: (value: number) => string;
};

function RangeHandle(sliderProps: RangeHandleProps, props: any) {
  const { value, dragging, index, ...restProps } = props;

  let formatted = sliderProps.format(value);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={formatted}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle
        value={value}
        {...restProps}
        aria-label={
          index == 0
            ? "Minimum " + sliderProps.label
            : "Maximum " + sliderProps.label
        }
        aria-valuetext={formatted}
      />
    </Tooltip>
  );
}

function YearsFilter(props: FilterProps) {
  const onChange = React.useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        years: {
          min: n[0],
          max: n[1]
        }
      }),
    [props.request, props.updateRequest]
  );

  return (
    <FilterLabel label="Years">
      <Range
        value={[props.request.years.min, props.request.years.max]}
        min={-2000}
        max={2020}
        handle={RangeHandle.bind(null, {
          label: "Years",
          format: year => (year < 0 ? year + " BC" : year + " AD")
        })}
        onChange={onChange}
      />
    </FilterLabel>
  );
}

type InfluentialPeopleProps = InfluentialPeoplePageResponse & {
  countries: CountriesResponse;
  disciplines: DisciplinesResponse;
  request: InfluentialPeoplePageRequest;
  updateRequest: (request: InfluentialPeoplePageRequest) => void;
};

function PersonSearchBox() {
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState([] as Identifiable[]);

  const onChange = React.useCallback(
    async text => {
      setItems([]);
      setValue(text.target.value);
      const items = await apiPersonSearch(text.target.value);
      setItems(items.people);
    },
    [setValue, setItems]
  );

  const router = useRouter();

  const onSelect = React.useCallback(
    slug => {
      router.push("/people/" + slug);
    },
    [router]
  );

  return (
    <Autocomplete
      value={value}
      items={items}
      onChange={onChange}
      onSelect={onSelect}
      getItemValue={item => item.slug}
      renderItem={(item, isHighlighted) => (
        <div
          key={item.slug}
          style={{ background: isHighlighted ? "lightgray" : "white" }}
        >
          {item.name}
        </div>
      )}
    />
  );
}

const QUERY_SCHEMA = QuerySchema("/schools", {
  discipline: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  },
  years: RangeParameter(-4000, 2020),
  country: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  },
  gender: {
    toQuery: value => (value ? "m" : "f"),
    fromQuery: value => value === "m",
    default: null as null | boolean
  }
});

const InfluentialPeople: React.SFC<InfluentialPeopleProps> = props => {
  return (
    <div>
      <PersonSearchBox />
      <Discipline {...props} />
      <YearsFilter {...props} />
      <Country {...props} />
      <Gender {...props} />

      <pre>{JSON.stringify(props.people, null, 4)}</pre>
    </div>
  );
};

export default QueryPage(
  InfluentialPeople,
  QUERY_SCHEMA,
  {
    title: "Influential People"
  },
  async (request: InfluentialPeoplePageRequest, signal?: AbortSignal) => {
    const schools = apiInfluentialPeoplePage(request);
    const disciplines = apiDisciplines({});
    const countries = apiCountries({});
    return {
      ...(await schools),
      disciplines: await disciplines,
      countries: await countries,
      request
    };
  }
);
