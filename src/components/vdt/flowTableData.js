export const tableHeaderExample = {
    'TableName': 'default', // (Importent for nested table other wise not required)
    'height': 'calc(100vh - 20px)',
    "width": "1800px", // Required
    'headerBackgroundColor': '#417690',
    'headerColor': 'white',
    // 'zebraStripe1': "blue",
    // 'zebraStripe2': "orange",
    'style': {
        'display': 'grid',
        'grid-template-columns': `100px 200px 300px 1fr 1fr 120px 100px 40px`,
        'grid-template-rows': `40px auto`,
    },
    'tableContent':[
        {'key': 'col1', 'value': 'Example 1', 'style': {'position': 'sticky', 'left': 0}},
        // {'value': 'Name', 'style': {'position': 'sticky', 'left': 0, 'z-index': '2'}},
        // {'value': 'Name', 'style': {'position': 'sticky', 'left': '15rem', 'z-index': '2'}},
        {'key': 'col2', 'value': 'Example 2'},
        {'key': 'col3', 'value': 'Example 3'},
        {'key': 'col4', 'value': 'Example 4', 'style':{'min-width': '250px'}},
        {'key': 'col5', 'value': 'Example 5', 'style':{'min-width': '250px'}},
        {'key': 'col6', 'value': 'Example 6'},
        {'key': 'col7', 'value': 'Example 7'},
        {
            'key': 'action', 
            'value': true,
            'style': {'position': 'sticky', 'right': 0,}
        },
    ]
};

export const tableBodyExample = (itemCount) =>{
    let arr = [];
    for (let i = 1; i <= itemCount; i++) {
        let obj = {
            'id': i, // REQUIRED FOR ACTION OTHER WISE NOT REQUIRED
            'col1': `${i}, 1`,
            'col2': `${i}, 2`,
            'col3': `${i}, 3`,
            'col4': `${i}, 4`,
            'col5': `${i}, 5`,
            'col6': `${i}, 6`,
            'col7': `${i}, 7`,
            'action': true,
        };
        arr.push(obj);
    }
    return arr;
}

export const popUpMenuItemExample = [
    {
        'value': 'Edit', 
        'bg': 'linear-gradient(90deg, rgba(110,0,235,1) 0%, rgba(4,128,193,1) 100%)',
        'style': {'min-height':'30px'}
    },
    {
        'value': 'Details',
        'bg': 'linear-gradient(276deg, rgba(29,153,0,1) 0%, rgba(0,119,85,1) 100%)',
        'style': {'min-height':'30px'}
    },
    {
        'value': 'Delete', 
        'bg': 'linear-gradient(90deg, rgba(235,27,0,1) 0%, rgba(255,0,99,1) 100%)',
        'style': {'min-height':'30px'}
    },
]