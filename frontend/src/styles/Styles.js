import { makeStyles, createStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

//_________Sign up form
export const useSignUpStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//_________Log in form
export const useLogInStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexWrap: 'wrap-reverse',
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1521092375781-38696f9841fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  information: {
    margin: theme.spacing(8, 4),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      margin: '20%',
      display: 'flex ',
      justifyContent: 'center',
    },
  },
  informationText: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    padding: '10px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.3rem',
    },
  },
  informationMobile: {
    margin: '32px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//_______Card
export const useCardStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

//_______Create/Edit project
export const useFormProjectStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// profile page
export const useProfileStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: '60px',
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  avatarImage: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center', //kolla övriga ställen där avatar används
  },
  input: {
    display: 'none',
  },
}));

export const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

// comment style
export const useCommentsStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    //overflowY: "auto",
    overflowY: 'scroll',
    overscrollBehaviorY: 'contain',
    scrollSnapType: 'y proximity',
  },
  messageBubble: {
    background: '#fff0f5',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    wordBreak: 'break-word',

    //width: "100%",
  },
  myMessageBubble: {
    background: '#ebedf8',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    wordBreak: 'break-word',

    //width: "100%",
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end !important',
  },
  reverseFlexOrder: {
    flexDirection: 'row-reverse',
  },
  customAccordion: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    '&::before': {
      background: 'transparent',
    },
  },
  postImage: {
    maxHeight: '300px',
    maxWidth: '100%',
  },
  dropZone: {
    minHeight: 'unset',
    maxHeight: '200px',
  },
});

// navigation styles
export const useNavigationStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// snackbar styles
export const useSnackBarStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// main styles
export const useMainStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

// Animation style
export const useAnimationStyles = makeStyles(theme => ({
  animation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  animationText: {
    color: '#A25365',
  },
}));

// Tooltip style
export const useTooltipStyles = makeStyles(theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));
