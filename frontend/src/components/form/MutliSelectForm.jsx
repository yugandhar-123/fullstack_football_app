



import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function MultipleSelectForm({
  label, options, value, name, onChange, onBlur, error, helperText
}) {
  // ✅ Unique labelId using name prop
  const labelId = `multi-select-label-${name}`;

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}       // ✅ unique
          id={`multi-select-${name}`}
          multiple
          label={label}
          value={value ?? []}     // ✅ always an array, never undefined
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
        >
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
    </div>
  );
}