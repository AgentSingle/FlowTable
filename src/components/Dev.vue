<script setup>
import  FlowTable  from "./vdt/FlowTable.vue";

import { ref, onMounted, watch } from 'vue';

const TableName = ref('Parent');
const scrollTableHeader = ref({
    'TableName': TableName.value, // (Importent for nested table other wise not required & unique)
    'height': 'calc(100vh - 20px)',
    "width": "2800px", // Required
    'headerBackgroundColor': 'green',
    'headerColor': 'white',
    'zebraStripe1': "#affddd",
    'zebraStripe2': "#affdff",
    'style': {
        'display': 'grid',
        'grid-template-columns': `100px 200px 300px 1fr 1fr 120px 100px 40px`,
        'grid-template-rows': `40px auto`,
    },
    'tableContent':[
        {'key': 'col1', 'value': 'Column 1', 'style': {'position': 'sticky', 'left': 0}},
        // {'value': 'Name', 'style': {'position': 'sticky', 'left': 0, 'z-index': '2'}},
        // {'value': 'Name', 'style': {'position': 'sticky', 'left': '15rem', 'z-index': '2'}},
        {'key': 'col2', 'value': 'Column 2'},
        {'key': 'col3', 'value': 'Column 3'},
        {'key': 'col4', 'value': 'Column 4', 'style':{'min-width': '250px'}},
        {'key': 'col5', 'value': 'Column 5', 'style':{'min-width': '250px'}},
        {'key': 'col6', 'value': 'Column 6'},
        {'key': 'col7', 'value': 'Column 7', 'style': {'position': 'sticky', 'right': `40px`}},
        {
            'key': 'action', 
            'value': true,
            'style': {'position': 'sticky', 'right': 0,}
        },
    ]
})

const tableDataContent = ref([]);

onMounted(()=>{
    for (let i = 1; i <= 50; i++) {
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
        tableDataContent.value.push(obj);
    }
    // console.warn(tableDataContent.value);
})

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
    // slotName.value = `${e.data.id}_${TableName.value}`;
    console.warn(e)
    slotName.value = e.slotName;
}

let slotName = ref('');
</script>

<template>
  <div class="ExampleBody">
    <FlowTable
        @FlowTableResponse="actionRespose"
    >
    <!-- <VueTableFlow
    :tableHeaderContent="scrollTableHeader"
    :tableDataContent="tableDataContent"
    :popUpMenuItem="popUpMenuItem"
    @vueTableFlowResponse="actionRespose"
    > -->
    
    <template v-slot:[slotName]>
        <div style="height: 400px; position: sticky; left: 1000px;">
            Test Child... {{ slotName }}
        </div>
    </template>
        <!-- <template v-slot:[dyNamic]>
            <div style="max-height: 400px;">
                <VueTableFlow
                :tableHeaderContent="scrollTableHeaderTwo"
                :tableDataContent="tableDataContent"
                :popUpMenuItem="popUpMenuItem"
                @vueTableFlowResponse="actinRespose"
                ></VueTableFlow>
            </div>
            defaultcontent
        </template> -->
    </FlowTable>
  </div>
</template>


