import React from 'react';

import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { useTooltipStyles } from '../styles/Styles';

const CustomTooltip = () => {
  const classes = useTooltipStyles();

  return (
    <Tooltip
      title={
        <Typography variant="body2" component="p">
          Save your plans in your own project planner dashboard. Start by
          signing up and create your future plans. Keep it to yourself or invite
          friends to collaborate.
        </Typography>
      }
      aria-label="project planner app information"
      arrow
    >
      <Fab color="primary" className={classes.absolute}>
        <InfoRoundedIcon />
      </Fab>
    </Tooltip>
  );
};
export default CustomTooltip;
