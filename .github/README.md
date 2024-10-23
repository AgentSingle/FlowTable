<h1 align="center">
  Welcome To "FlowTable"
</h1>

<h2>🔆
  <a href="https://www.npmjs.com/package/flowtable" target="_blank">
  npm Link
  </a>
</h2>

<h2 align="center">**HOW TO USE: "flowtable"**</h2>

☸**1.** ADD PLUGIN INTO YOUR PROJECT [latest version]:

  ```
  npm i flowtable
  ```


☸**2.** IMPORT flowtable INTO YOUR WORKING FILE (Eg. App.vue):
```
import { FlowTable } from "flowtable"
import "flowtable/style.css"
```


☸**2.1** For ```Table Header``` part:

```<script setup>```:
```javascript
const TableName = ref('Parent');
const scrollTableHeader = ref({
    /* TableName (Importent for nested table otherwise not required)  */
    'TableName': TableName.value,
    'height': '95vh', // Required
    "width": "1400px", // Required
    'headerBackgroundColor': '#417690', // Required
    'headerColor': 'white', // Required
    // 'zebraStripe1': "blue", // odd row background color
    // 'zebraStripe2': "orange", // even row background color
    /* describe grid according to your requirements 
    [other style are your choice]  */
    'style': {
        'display': 'grid', // Required
        /* Required (define your table header content width according to your requirements as below) */
        'grid-template-columns': `100px 200px 300px 1fr 1fr 120px 100px 40px`,
        'grid-template-rows': `40px auto`,
    },
    /* describe grid according to your requirements */
    'tableContent':[
        {'key': 'col1', 'value': 'Column 1', 'style': {'position': 'sticky', 'left': 0}},
        {'key': 'col2', 'value': 'Column 2'},
        {'key': 'col3', 'value': 'Column 3'},
        {'key': 'col4', 'value': 'Column 4', 'style':{'min-width': '250px'}},
        {'key': 'col5', 'value': 'Column 5', 'style':{'min-width': '250px'}},
        {'key': 'col6', 'value': 'Column 6'},
        {'key': 'col7', 'value': 'Column 7'},

        /* Important if you want to add any action */
        {
            'key': 'action', 
            'value': true,
            'style': {'position': 'sticky', 'right': 0}
        }, 
    ]
})

```
```<template>```:
```html
<FlowTable
    :tableHeaderContent="scrollTableHeader"
>
</FlowTable>
```


☸**2.2** For ```Table Body``` part:

```<script setup>```:
```
const tableDataContent = ref([]);
```
Here an example data
```javascript
onMounted(()=>{
    for (let i = 1; i <= 50; i++) {
        let obj = {
            'id': i, // Id only required if any action required
            'col1': `${i}, 1`,
            'col2': `${i}, 2`,
            'col3': `${i}, 3`,
            'col4': `${i}, 4`,
            'col5': `${i}, 5`,
            'col6': `${i}, 6`,
            'col7': `${i}, 7`,
            'action': true,
        };
        tableDataContent.value.push(obj);
    }
})
```
```<template>```:
```html
<FlowTable
    :tableHeaderContent="scrollTableHeader"
    :tableDataContent="tableDataContent"
>
</FlowTable>
```



☸**2.3** If you want to add action popup:

```<script setup>```:
```javascript
const popUpMenuItem = ref([
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
])


const actionRespose = (e)=>{
    console.warn(e);
}
```

```<template>```:
```html
<FlowTable
    :tableHeaderContent="scrollTableHeader"
    :tableDataContent="tableDataContent"
    :popUpMenuItem="popUpMenuItem"
    @vueTableFlowResponse="actinRespose"
>
</FlowTable>
```

☸**3** MAKING NESTED TABLE:
```<script setup>```:
```javascript
/* DONT FORGET (incase of nested table):
in table header part REQUIRE: (TableName)
in data set REQUIRE: (id)
now your slotName.value = `${id}_${TableName}`
*/
let slotName = ref();
const actionRespose = (e)=>{
    slotName.value = e.slotName;
}
  
```

```<template>```:
```html
<FlowTable
    :tableHeaderContent="scrollTableHeader"
    :tableDataContent="tableDataContent"
    :popUpMenuItem="popUpMenuItem"
>
    <template v-slot:[slotName]>
        <div>
            Test Child
        </div>
    </template>
</FlowTable>
```

