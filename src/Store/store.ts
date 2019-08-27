import {Database, DatabaseIO} from "./Database";
import React from "react";

function copy(obj: Object | Array<any>) {
    return JSON.parse(JSON.stringify(obj));
}

function Store() {
    const data: Database = {
        palette: {
            primary: {
                main: 'rgb(17,150,240)'
            },
            secondary: {
                main: 'rgb(35,35,40)'
            }
        },
        email: 'wujiang5521@gmail.com',
        github: 'https://github.com/wujiang5521',
        address: 'Room 417, Meng Minwei Building, Zijingang Campus, Zhejiang University, Hangzhou City, Zhejiang Province, China',
        postalCode: '310058',
        works: [],
    };

    interface Refresher {
        components: {
            [propNames: string]: [boolean, Function],
        },
        register: Function,
        refresh: Function,
    }
    const refresher: Refresher = {
        components: {},
        register: (name: string, ref: boolean, toRef: Function) => {
            refresher.components[name] = [ref, toRef];
        },
        refresh: (name: string) => {
            if (refresher.components.hasOwnProperty(name))
                refresher.components[name][1](!refresher.components[name][0]);
        }
    };

    const getter: DatabaseIO = {
        Palette: () => copy(data.palette),
        EmailAddress: () => data.email,
        GithubAddress: () => data.github,
        LocalAddress: () => data.address,
        PostalCode: () => data.postalCode,
        Works: () => copy(data.works),
        Work: (wId: string) => {
            for (let row of data.works)
                for (let w of row)
                    if (w.id === wId)
                        return w;
            return null;
        },
        WorkUrl: (wId: number) => {
            const work = getter.Work(wId);
            if (work) return work.url;
            else return '';
        },
        WorkTitle: (wId: number) => {
            const work = getter.Work(wId);
            if (work) return work.title;
            else return '';
        },
    };

    fetch('/works/works.json')
        .then(res => res.json())
        .then(res => {
            data.works = res;
            refresher.refresh('App');
        })
        .catch(e => console.error(e));

    return {
        getData: getter,
        register: refresher.register,
    }
}

const store = Store();
export default store;
