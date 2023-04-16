import * as React from 'react';
import { InputLabel, OutlinedInput, MenuItem, FormControl, Select } from '@mui/material/';

import { COLUMNS } from '../../features/StockReports/constants';

export default function ParamsSelect(props: any) {
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel>Params</InputLabel>
      <Select
        fullWidth
        multiple
        input={<OutlinedInput label="Params" size="small" />}
        value={props.params}
        onChange={props.onChange}
      >
        {COLUMNS.map((column) => (
          <MenuItem disabled={column.isDisabled} key={column.id} value={column.value}>
            {column.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
