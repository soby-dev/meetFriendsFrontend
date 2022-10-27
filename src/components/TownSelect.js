import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function TownSelect(props) {
  let { error, register } = props;

  return (
    <Autocomplete
      id="toen-select-demo"
      sx={{ width: 300 }}
      options={towns}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          name="town"
          color="secondary"
          focused
          {...params}
          label="Town"
          helperText={error ? error.message : "Event town"}
          {...register("town")}
          error={error ? true : false}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const towns = [
  { label: "Winchester" },
  { label: "New Alresford" },
  { label: "Southampton" },
  { label: "Aldershot" },
  { label: "Portsmouth" },
  { label: "Alton" },
  { label: "Basingstoke" },
  { label: "Havant" },
  { label: "Whitchurch" },
  { label: "Gosport" },
  { label: "Fareham" },
  { label: "Stockbridge" },
  { label: "Farnborough" },
  { label: "Bishop's Waltham" },
  { label: "Beaulie" },
  { label: "Eastleigh" },
  { label: "Fordinbridge" },
  { label: "Lyndhurst" },
  { label: "Emsworth" },
  { label: "Tadley" },
  { label: "Yateley" },
  { label: "Petersfield" },
  { label: "Fleet" },
  { label: "Hedge End" },
  { label: "Romsey" },
  { label: "New Milton" },
  { label: "Lymington" },
  { label: "Burley" },
  { label: "odiham" },
  { label: "Waterlooville" },
  { label: "Hartley Wintney" },
];
