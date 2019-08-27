import React from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    Container, GridListTileBar
} from '@material-ui/core';
import store from '../../Store/store';
import {WorkInfo} from "../../Store/Database";
import {History} from "history";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: 'auto',
        width: '61.8vw',
        maxWidth: 'none',
    },
    table: {
        borderSpacing: '1px',
    },
    tableCell: {
        padding: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    tile: {
        height: '100%',
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        padding: 0,
        cursor: 'pointer',
        '&:hover $tileBackdrop': {
            opacity: 0.4,
        },
    },
    tileBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0,
        transition: theme.transitions.create('opacity'),
    },
    imgSrc: {
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        top: '50%',
        left: '50%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
    },
}));

interface CProps {
    history: History,
}

const Works: React.FC<CProps> = (props) => {
    const classes = useStyles();
    const vw = window.innerWidth * 0.618;
    const works = store.getData.Works();
    const countCol: Array<number> = [];
    works.forEach((row: Array<WorkInfo>, rId: number) => {
        row.forEach((work: WorkInfo, wId: number) => {
            for (let i = 0; i < work.rowSpan; i++) {
                const r = i + rId;
                if (countCol[r] === undefined)
                    countCol[r] = 0;
                countCol[r] += work.colSpan;
            }
        })
    });
    let maxCol = Math.max(...countCol);
    if (maxCol < 1)
        maxCol = 1;
    const cellWid = vw / maxCol;
    const cellHei = cellWid * 0.4;
    const handleJump = (wId: string) => props.history.push(`/work/${wId}`);

    return (
        <Container className={classes.root}>
            <table className={classes.table}>
                <tbody>
                {
                    works.map((row: Array<WorkInfo>, rowId: number) => {
                        return <tr key={rowId}>
                            {
                                row.map((tile: WorkInfo) => {
                                    return <td key={tile.id} className={classes.tableCell}
                                               rowSpan={tile.rowSpan} colSpan={tile.colSpan}>
                                        <div className={classes.tile} style={{
                                            width: tile.colSpan * cellWid + (tile.colSpan - 1),
                                            height: tile.rowSpan * cellHei + (tile.rowSpan - 1),
                                        }} onClick={() => handleJump(tile.id)}>
                                            <img src={tile.img} alt={tile.title} className={classes.imgSrc}/>
                                            <span className={classes.tileBackdrop}/>
                                            <GridListTileBar
                                                title={tile.title}
                                                subtitle={tile.subtitle}
                                                actionPosition="left"
                                                className={classes.tileBar}
                                            />
                                        </div>
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        </Container>
    );
};

export default Works;
