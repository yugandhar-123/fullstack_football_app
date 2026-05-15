


import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

export default function SelectForm({
  label,
  options,
  value,
  name,
  onChange,
  onBlur,
  error,
  helperText,
}) {
  // ✅ Use name as unique id so League and Country don't clash
  const labelId = `select-label-${name}`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}        // ✅ unique per field
        id={`select-${name}`}    // ✅ unique per field
        label={label}
        value={value ?? ''}      // ✅ prevents uncontrolled→controlled warning
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      >
        {/* ✅ Show placeholder while data loads */}
        {options.length === 0 && (
          <MenuItem disabled value="">
            Loading...
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
}