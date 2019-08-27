import React from 'react';
import {makeStyles, Theme, createStyles, Container} from '@material-ui/core';
import store from '../../Store/store';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: 'auto',
        width: '61.8vw',
        maxWidth: 'none',
    },
    iframe: {
        width: '100%',
        height: 'auto',
        margin: 0,
        padding: 0,
        border: 0,
    }
}));

interface CProps {
    match: {
        params: {
            wId: number,
        }
    },
}

const Work: React.FC<CProps> = (props) => {
    const classes = useStyles();
    const wId = props.match.params.wId;
    const changeFrameHeight = () => {
        const frame = document.getElementById("workFrame") as HTMLIFrameElement;
        frame.style.height = "0";
        if (!frame.contentWindow) return;
        frame.style.height = frame.contentWindow.document.body.scrollHeight + 'px';
    };
    return (
        <Container className={classes.root}>
            <iframe id={'workFrame'}
                    title={store.getData.WorkTitle(wId)}
                    src={store.getData.WorkUrl(wId)}
                    onLoad={changeFrameHeight}
                    className={classes.iframe}/>
        </Container>
    );
};

export default Work;
