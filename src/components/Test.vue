<script setup>
import { FlowTable } from "flowtable";
import "flowtable/style.css"
import { ref, onMounted, watch } from 'vue';

// const TableName = ref('Parent');
// const scrollTableHeader = ref({
//     'TableName': TableName.value,
//     'height': 'calc(100vh - 20px)',
//     "width": "1400px",
//     'headerBackgroundColor': '#417690',
//     'headerColor': 'white',
//     // 'zebraStripe1': "blue",
//     // 'zebraStripe2': "orange",
//     'style': {
//         'position': 'sticky',
//         'top': 0,
//         'min-width': '1400px',
//         'display': 'grid',
//         'grid-template-columns': `100px 200px 300px 1fr 1fr 120px 100px 40px`,
//     },
//     'tableContent':[
//         {'key': 'col1', 'value': 'Column 1', 'style': {'position': 'sticky', 'left': 0}},
//         // {'value': 'Name', 'style': {'position': 'sticky', 'left': 0, 'z-index': '2'}},
//         // {'value': 'Name', 'style': {'position': 'sticky', 'left': '15rem', 'z-index': '2'}},
//         {'key': 'col2', 'value': 'Column 2'},
//         {'key': 'col3', 'value': 'Column 3'},
//         {'key': 'col4', 'value': 'Column 4', 'style':{'min-width': '250px'}},
//         {'key': 'col5', 'value': 'Column 5', 'style':{'min-width': '250px'}},
//         {'key': 'col6', 'value': 'Column 6'},
//         {'key': 'col7', 'value': 'Column 7'},
//         {
//             'key': 'action', 
//             'value': true,
//             'style': {'position': 'sticky', 'right': 0}
//         },
//     ]
// })

// const tableDataContent = ref([]);

// onMounted(()=>{
//     for (let i = 1; i <= 50; i++) {
//         let obj = {
//             'id': i,
//             'col1': `${i}, 1`,
//             'col2': `${i}, 2`,
//             'col3': `${i}, 3`,
//             'col4': `${i}, 4`,
//             'col5': `${i}, 5`,
//             'col6': `${i}, 6`,
//             'col7': `${i}, 7`,
//             'action': true,
//         };
//         tableDataContent.value.push(obj);
//     }
//     // console.warn(tableDataContent.value);
// })

// const popUpMenuItem = ref([
//     {
//         'value': 'Edit', 
//         'bg': 'linear-gradient(90deg, rgba(110,0,235,1) 0%, rgba(4,128,193,1) 100%)',
//         'style': {'min-height':'30px'}
//     },
//     {
//         'value': 'Details',
//         'bg': 'linear-gradient(276deg, rgba(29,153,0,1) 0%, rgba(0,119,85,1) 100%)',
//         'style': {'min-height':'30px'}
//     },
//     {
//         'value': 'Delete', 
//         'bg': 'linear-gradient(90deg, rgba(235,27,0,1) 0%, rgba(255,0,99,1) 100%)',
//         'style': {'min-height':'30px'}
//     },
// ])
let slotName = ref('1_TableName');
const actionResponse = (e)=>{
  console.warn(e)
}
</script>

<template>
  <div class="ExampleBody">
    
    <FlowTable
        @FlowTableResponse="actionResponse"
    ></FlowTable>
    <!-- <FlowTable
    :tableHeaderContent="scrollTableHeader"
    :tableDataContent="tableDataContent"
    :popUpMenuItem="popUpMenuItem"
    @vueTableFlowResponse="actinRespose"
    >
    <template v-slot:[slotName]>
        <div>
            Test Child
        </div>
    </template>
    </FlowTable> -->
  </div>
</template>
