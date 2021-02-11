import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useAnimationStyles } from '../styles/Styles';

const Animation = () => {
  const container = useRef();
  const classes = useAnimationStyles();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../Animation/lottie.json'),
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} className={classes.animation}>
        <Typography
          component="h2"
          variant="h5"
          className={classes.animationText}
        >
          Create your first project!
        </Typography>
        <div ref={container}></div>
      </Grid>
    </Grid>
  );
};
export default Animation;
