import React from 'react'
import ReactFinder from "react-finderjs";
import _ from "./util"
import "./finder.css"
export default function PriceGuide() {
    const data = [
        {
            id: 1,
            label: 'Label A',
            children: [
                {
                    id: 10,
                    label: 'Label A1'
                },
                {
                    id: 11,
                    label: 'Label A2'
                }
            ]
        }, {
            id: 2,
            label: 'Label B'
        },
        {
            id: 3,
            label: ' ',
            type: "addCategory"
        }
    ];
    const createItemContent = (cfg, item) => {
        console.log("cfg", cfg, item)
        var data = item.children || cfg.data;
        var frag = document.createDocumentFragment();
        var label = _.el('span');
        var iconPrepend = _.el('i');
        var iconAppend = _.el('i');
        var prependClasses = ['fa'];
        var appendClasses = ['fa'];
        console.log(data)
        // prepended icon
        if (data) {
            prependClasses.push('fa-folder');
        } else if (item.type === 'github-url') {
            prependClasses.push('fa-github');
        } else if (item.type !== "addCategory") {
            prependClasses.push('fa-file-o');
        }
        _.addClass(iconPrepend, prependClasses);

        // text label
        _.append(label, [iconPrepend, _.text(item.label)]);
        frag.appendChild(label);

        // appended icon
        if (data) {
            appendClasses.push('fa-caret-right');
        } else if ('url' in item) {
            appendClasses.push('fa-external-link');
        } else if (item.type === "addCategory") {
            appendClasses.push('fa-plus');

        }
        _.addClass(iconAppend, appendClasses);
        frag.appendChild(iconAppend);

        return frag;
    }
    return (
        <div>
            <ReactFinder
                createItemContent={createItemContent}
                data={data} />
        </div>
    )
}


