import React from "react";
import {
    makeStyles,
    Theme,
    createStyles,
    Container,
    Avatar,
    Typography,
    Fab,
    List,
    ListItem, ListItemIcon, ListItemText, SvgIcon
} from "@material-ui/core";
import store from "../../Store/store";
import avatar from './avatar.jpg';
import {Email, LocationCity, ContactMail} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: 'auto',
    },
    info: {
        width: '100%',
        display: 'flex',
    },
    basisArea: {
        width: '31.8%',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '31.8%',
    },
    avatarArea: {
        position: 'relative',
        paddingTop: '100%',
        width: '100%',
    },
    avatar: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75%',
        height: '75%',
    },
    img: {
        objectFit: 'contain',
    },
    basisInfo: {
        width: '100%',
        textAlign: 'center',
    },
    biography: {
        padding: `4% ${theme.spacing(8)}px`,
    },
    title: {
        margin: `${theme.spacing(1)}px 0`,
    },
    separator: {
        height: theme.spacing(3),
    },
    connectWithMe: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        borderTop: `1px solid ${theme.palette.secondary.light}`,
        padding: theme.spacing(3),
    },
    contactItem: {
        display: 'flex',
        marginTop: theme.spacing(1),
    },
    iconButton: {
        width: 'auto',
        height: 'auto',
        padding: theme.spacing(1),
        margin: -theme.spacing(1),
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();

    return <Container className={classes.root} maxWidth={"lg"}>
        <div className={classes.info}>
            <div className={classes.basisArea}>
                <div className={classes.avatarArea}>
                    <Avatar src={avatar} component={'div'} className={classes.avatar} classes={{img: classes.img}}/>
                </div>
                <div className={classes.basisInfo}>
                    <Typography variant={"h4"} className={classes.title}>Jiang Wu</Typography>
                    <Typography variant={"h5"}>Ph.D. of Computer Science</Typography>
                    <Typography variant={"h5"}>Zhejiang University</Typography>
                </div>
            </div>
            <div className={classes.biography}>
                <Typography variant={"h4"} className={classes.title}>Biography</Typography>
                <Typography variant={"h5"}>
                    Jiang Wu is currently a Ph.D. student in <i>ZJUIDG, the State Key Lab of CAD&CG, Zhejiang
                    University</i> in China. His research interests are in <i>Sports Data Visualizations</i>
                </Typography>
                <div className={classes.separator}/>
                <Typography variant={"h4"} className={classes.title}>Resume</Typography>
                <Typography variant={"h5"}>9.2015~6.2019, BS in Computer Science, Zhejiang University</Typography>
            </div>
        </div>
        <div className={classes.connectWithMe}>
            <Typography variant={"h5"}>Contact Information</Typography>
            <List component={'nav'}>
                <ListItem component={'li'}>
                    <ListItemIcon>
                        <Fab href={'mailto:wujiang5521@gmail.com'} className={classes.iconButton} color={"primary"}>
                            <Email/>
                        </Fab>
                    </ListItemIcon>
                    <ListItemText primary={'Email'}
                                  secondary={store.getData.EmailAddress()}/>
                </ListItem>
                <ListItem component={'li'}>
                    <ListItemIcon>
                        <Fab href={store.getData.GithubAddress()} className={classes.iconButton} color={"primary"}>
                            <SvgIcon>
                                <path
                                    d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>
                            </SvgIcon>
                        </Fab>
                    </ListItemIcon>
                    <ListItemText primary={'Github'}
                                  secondary={store.getData.GithubAddress()}/>
                </ListItem>
                <ListItem component={'li'}>
                    <ListItemIcon>
                        <Fab className={classes.iconButton} disabled color={"primary"} href={''}>
                            <LocationCity/>
                        </Fab>
                    </ListItemIcon>
                    <ListItemText primary={'Location'}
                                  secondary={store.getData.LocalAddress()}/>
                </ListItem>
                <ListItem component={'li'}>
                    <ListItemIcon>
                        <Fab className={classes.iconButton} disabled color={"primary"} href={''}>
                            <ContactMail/>
                        </Fab>
                    </ListItemIcon>
                    <ListItemText primary={'Postal Code'}
                                  secondary={store.getData.PostalCode()}/>
                </ListItem>
            </List>
        </div>
    </Container>;
};

export default Home;
