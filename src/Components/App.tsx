import React from "react";
import {
    AppBar,
    makeStyles,
    Theme,
    createStyles,
    MuiThemeProvider,
    createMuiTheme,
    Avatar,
    Toolbar, Typography, Button, Container, CssBaseline
} from "@material-ui/core";
import store from "../Store/store";
import groupLogo from '../assets/group.png';
import {Router, Route, Link, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {fade, lighten, darken} from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";
import Home from "./Home/Home";
import Works from "./Works/Works";
import Work from "./Work/Work";

const history = createBrowserHistory();

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
    },
    groupLogoArea: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(3),
        borderRadius: 20,
    },
    groupLogo: {
        width: 40,
        height: 40,
        margin: 0,
    },
    flex: {
        flex: 1,
    },
    button: {
        height: '100%',
        margin: `0 ${theme.spacing(1)}px`,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        height: 56,
        '@media (min-width:0px) and (orientation: landscape)': {
            minHeight: 48,
        },
        '@media (min-width:600px)': {
            minHeight: 64,
        }
    },
    decoration: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: theme.palette.primary.contrastText,
        transition: `opacity 1.3s ease-in-out`,
    },
    main: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    toolbar: theme.mixins.toolbar,
}));

const App: React.FC = () => {
    const classes = useStyles();
    const [refresh, toRefresh] = React.useState(false);
    store.register('App', refresh, toRefresh);
    const palette = createPalette(store.getData.Palette());
    const theme = createMuiTheme({
        palette: store.getData.Palette(),
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*::-webkit-scrollbar': {
                        width: 10,
                    },
                    '*::-webkit-scrollbar-track': {
                        display: 'none',
                    },
                    '*::-webkit-scrollbar-corner': {
                        display: 'none',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: fade(palette.secondary.main, 0.1),
                        borderRadius: 10,
                    },
                    '*:hover::-webkit-scrollbar-thumb': {
                        backgroundColor: lighten(palette.secondary.main, 0.2),
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: palette.secondary.main,
                    },
                    '*::-webkit-scrollbar-thumb:active': {
                        backgroundColor: darken(palette.secondary.main, 0.2),
                    }
                }
            }
        }
    });
    const Decoration: React.FC = () => <div className={classes.decoration}/>;
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router history={history}>
                <div className={classes.root}>
                    <AppBar>
                        <Toolbar>
                            <a href={'https://zjuidg.org/'}
                               className={classes.groupLogoArea}>
                                <Avatar alt="Group Logo" src={groupLogo} component={'div'}
                                        className={classes.groupLogo}/>
                            </a>
                            <Typography variant={"h5"} noWrap>Jiang Wu's Homepage</Typography>
                            <div className={classes.flex}/>
                            <Link to={'/home'} className={classes.link}>
                                <Button href={''} color={"inherit"} className={classes.button}>
                                    Home
                                    <Route path={'/home'} component={Decoration}/>
                                </Button>
                            </Link>
                            <Link to={'/works'} className={classes.link}>
                                <Button href={''} color={"inherit"} className={classes.button}>
                                    Works
                                    <Route path={'/works'} component={Decoration}/>
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.main}>
                        <div className={classes.toolbar}/>
                        <Container className={classes.content} maxWidth={false}>
                            <Route path={'/home'} component={Home}/>
                            <Route path={'/works'} component={Works}/>
                            <Route path={'/work/:wId'} component={Work}/>
                            <Route exact path="/" render={() => (
                                <Redirect to="/home"/>
                            )}/>
                        </Container>
                    </div>
                </div>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
