import InfoContainer from '@components/Containers/InfoContainer';
import { Typography } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

interface EstimatedDateProps {
  estimatedDate: string;
  actualWorkDays: number;
}

const EstimatedDate = ({ estimatedDate, actualWorkDays }: EstimatedDateProps) => (
  <InfoContainer
    title="תאריך משוער לסיום"
    width="100%"
    icon={<FlagIcon color="primary" />}
    gap={2}
    height="46%"
  >
    <Typography variant="h5" fontWeight={600} component="div" alignSelf="center">
      {estimatedDate}
    </Typography>
    <span>ימי עבודה בפועל: {actualWorkDays}</span>
  </InfoContainer>
);

export default EstimatedDate;
