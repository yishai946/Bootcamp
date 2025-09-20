import InfoContainer from "@components/Containers/InfoContainer";
import { Typography } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';

const EstimatedDate = () => {
  return (
    <InfoContainer
      title="תאריך משוער לסיום"
      width="100%"
      icon={<FlagIcon color="primary" />}
      gap={2}
      height="46%"
    >
      <Typography variant="h5" fontWeight={600} component="div" alignSelf="center">
        12/12/2025
      </Typography>
      <span>ימי עבודה בפועל: 54</span>
    </InfoContainer>
  );
}

export default EstimatedDate;
