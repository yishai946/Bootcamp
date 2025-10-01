import { EventTypeNames, eventTypeOptions } from '@enums/EventType';
import MenuItem from '@mui/material/MenuItem';
import RHFSelect from './RHFSelect';

const EventTypeSelect = () => (
  <RHFSelect name="type" label="סוג האירוע" required>
    {eventTypeOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {EventTypeNames[option]}
      </MenuItem>
    ))}
  </RHFSelect>
);

export default EventTypeSelect;
