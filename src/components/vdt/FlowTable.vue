<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import ClickIcon from './IconClick.vue';
import { tableHeaderExample, tableBodyExample, popUpMenuItemExample } from './flowTableData.js';

const props = defineProps({
    tableHeaderContent: Object,
    tableDataContent: Array,
    popUpMenuItem: Array
})
const tableHeaderContentMain = ref(null);
const tableDataContentMain = ref([]);
const popUpMenuItemMain = ref([]);
const emit = defineEmits(['FlowTableResponse'])

let tableName = ref('default');
let zebraStripe1 = ref('#dedede');
let zebraStripe2 = ref('#f0f0f0');

// ONLY FOR CLICK BUTTON REQUIRE THIS
const isActionPopUpVisible = ref(false);
const ScrollTablePopUpRectangle = ref(null);
const ScrollableTableBody = ref(null);
let clickedElmId = ref('');
let dataObj = ref({});
let popupButtonStyle = ref([]);

onMounted(()=>{
    if (props.tableHeaderContent==undefined){
        tableHeaderContentMain.value = tableHeaderExample;
        tableDataContentMain.value = tableBodyExample(30);
        popUpMenuItemMain.value = popUpMenuItemExample;
    }
    if (props.tableHeaderContent!=undefined){
        tableHeaderContentMain.value = props.tableHeaderContent;
        tableDataContentMain.value = props.tableDataContent;
        popUpMenuItemMain.value = props.popUpMenuItem;

        if(props.tableHeaderContent.TableName!=undefined){
            tableName.value = props.tableHeaderContent.TableName;
        }
        if(props.tableHeaderContent.zebraStripe1!=undefined){
            zebraStripe1.value = props.tableHeaderContent.zebraStripe1;
        }
        if(props.tableHeaderContent.zebraStripe2!=undefined){
            zebraStripe2.value = props.tableHeaderContent.zebraStripe2;
        }
    }


    window.addEventListener('resize', ()=>{
        deacitvatePopUp();
    });
})

watch(ScrollTablePopUpRectangle, ()=>{
    let popup = ScrollTablePopUpRectangle.value;
    let tableBodyRect = ScrollableTableBody.value.getBoundingClientRect();

    if(popup!=null){
        let clickedElement = document.getElementById(clickedElmId.value);
        let clickElmBound = clickedElement.getBoundingClientRect();
        let popUpBound = popup.getBoundingClientRect();

        popup.style.left = `${(clickElmBound.left + 20) - popUpBound.width}px`;
        let exceedHeight = (clickElmBound.top+popUpBound.height) - tableBodyRect.bottom;
        if(exceedHeight>-10){
            popup.style.top = `${clickElmBound.top - exceedHeight -10}px`;
        }else{
            popup.style.top = `${clickElmBound.top}px`;
        }
    }
})


const actionInitiated = async (obj, id)=>{
    isActionPopUpVisible.value = true;
    dataObj.value = obj;
    clickedElmId.value = id;
}

const PopUpActionTaken = (e)=>{
    deacitvatePopUp();
    let data = {
        'action': e.value,
        'data': dataObj.value,
        'slotName': `${dataObj.value.id}_${tableName.value}`
    }
    emit('FlowTableResponse', data);
}

const deacitvatePopUp = ()=>{
    isActionPopUpVisible.value=false;
    ScrollTablePopUpRectangle.value = null;
    popupButtonStyle.value = [];
    for (let i=0; i<popUpMenuItemMain.length; i++){
        let obj = {
            'background': `${popUpMenuItemMain[i].bg}`,
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
        }
        popupButtonStyle.value.push(obj);
    }
}

</script>


<template>
    <div v-if="tableHeaderContentMain!=null" class="ScrollableTableWrapper">
        <div class="ScrollableTableBody" :style="{'max-height': tableHeaderContentMain.height}"
        ref="ScrollableTableBody">
            
            <!-- TABLE HEADER  -->
            <div class="ScrollableTableHeader" 
                :style="[
                    {
                        'background-color': `${tableHeaderContentMain.headerBackgroundColor}`,
                        'color': `${tableHeaderContentMain.headerColor}`,
                        'min-width': `${tableHeaderContentMain.width}`,
                        'position': 'sticky',
                        'top': 0,
                    },
                    tableHeaderContentMain.style,
                ]"
            >
                <!-- TABLE HEADER CONTENTS -->
                <div 
                    v-for="content in tableHeaderContentMain.tableContent"
                    class="ScrollableTableHeaderContent"
                    :style="[
                        content.style, 
                        {
                            'background-color': `${tableHeaderContentMain.headerBackgroundColor}`,
                        }
                    ]"
                >   
                    <div v-if="content.key=='action'" 
                        style="font-weight: bold;cursor: pointer; display: flex; align-items: center; justify-content: center;"
                    >
                        <ClickIcon></ClickIcon>
                    </div>
                    <p v-else>{{ content.value }}</p>
                </div>
            </div>


            <!-- TABLE BODY (DATA LIST) -->
            <div 
            class="ScrollableTableListContent"
            :style="[
                tableHeaderContentMain.style,
                {'min-width': `${tableHeaderContentMain.width}`,}
            ]"
            v-for="item, index in tableDataContentMain" v-bind:key="item.id">

                <!-- TABLE DATA LIST CONTENTS -->
                <div 
                    v-for="content, rowIndex in tableHeaderContentMain.tableContent"
                    :class="['ScrollTableContent']"
                    :style="[
                        content.style, 
                        {'background-color': `${(index%2==0)?zebraStripe1:zebraStripe2}`}
                    ]"
                >
                    <!-- IF ACTION ITEM IS PRESENT THEN THIS IS VISIBLE OR HIDDEN -->
                    <div v-if="content.key=='action' & item[content.key]" 
                        class="ScrollTableActionElement" style="overflow: visible;" 
                        :id="`col_${index}_row${rowIndex}_name${tableName}`"
                        v-on:click="actionInitiated(
                            item,
                            `col_${index}_row${rowIndex}_name${tableName}`
                        )"
                    >
                        <div class="ScrollActionElipsis"></div>
                    </div>
                    <p v-else-if="!item[content.key]" style="font-size: 16px;">
                    </p>
                    <p v-else style="font-size: 16px;">
                        {{ item[content.key] }}
                    </p>
                </div>

                <!-- ADITIONAL TABLE CONTENT -->
                <div
                    v-if="$slots[`${item.id}_${tableName}`]"
                    :style="[
                        {
                            'position': 'sticky',
                            'left': 0,
                            'background-color': 'white', 
                            'min-width': `${tableHeaderContentMain.width}`,
                        }
                    ]"
                >
                    <slot :name="`${item.id}_${tableName}`"></slot>
                </div>
                
            </div>
        </div>
    </div>


    <!-- ACTION POPUP -->
    <div v-if="isActionPopUpVisible" class="ScrollTableActionPopUp">
        <div class="ScrollTableActionPopUpBlanket" @click="deacitvatePopUp">
        </div>
        <div class="ScrollTableActionPopUpWrapper" ref="ScrollTablePopUpRectangle">
            <div v-for="item, popupBtnIndex in popUpMenuItemMain" :key="item.id" 
                @click="PopUpActionTaken(item)" 
                :style="[item.style, popupButtonStyle[popupBtnIndex]]"
                @mouseout="popupButtonStyle[popupBtnIndex]={
                    'background': `${item.bg}`,
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                }"
                @mouseover="popupButtonStyle[popupBtnIndex]={
                    'background': `${item.bg}`,
                    '-webkit-background-clip': '',
                    '-webkit-text-fill-color': 'white',
                }"
                class="PopUpeListementStyle"
            >   
                {{ item.value }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.ScrollableTableWrapper{
    min-width: 100%;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid gray;
    box-sizing: border-box;
}
.ScrollableTableHeader{
    z-index: 1;
}
.ScrollableTableHeaderContent{
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    padding: 5px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    box-sizing: border-box;
    box-shadow: -2px 2px 2px white;
}
.ScrollableTableHeaderContent:last-child{
    border-right: 0;
}

.ScrollableTableBody{
    overflow-y: scroll;
    overflow-x: scroll;
    scrollbar-gutter: auto;
}
.ScrollTableContent{
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 5px;
    border-right: 2px solid white;
    border-top: 2px solid white;
    box-sizing: border-box;
    box-shadow: -2px 2px 2px white;
    color: black;
}
.ScrollTableContent:last-child{
    border-right: 0;
}

.ScrollableTableListContent:nth-child(odd) .ScrollTableContent{
    background-color: var(--zebraStripe1);
}
.ScrollableTableListContent:nth-child(even) .ScrollTableContent{
    background-color: var(--zebraStripe2);
}
</style>

<style scoped>
/* ACTION ELEMENT STYLING */
.ScrollTableActionElement{
    position: relative;
    width: 25px; 
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    text-align: center; 
    font-weight: bolder; 
    cursor: pointer; 
    user-select: none;
    transition: 0.3s;
}
.ScrollTableActionElement:hover{
    background-color: #a9cbff;
}
.ScrollActionElipsis{
    position: relative;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: black;
}
.ScrollActionElipsis::before, .ScrollActionElipsis::after{
    content: "";
    position: absolute;
    left: 0px;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: black;
}
.ScrollActionElipsis::before{
    top: -8px;
}
.ScrollActionElipsis::after{
    bottom: -8px;
}
</style>



<style scoped>
.ScrollTableActionPopUp{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: transparent;
}
.ScrollTableActionPopUpBlanket{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.ScrollTableActionPopUpWrapper{
    position: absolute;
    min-height: 20px;
    height: auto;
    width: 160px;
    max-width: 200px;
    overflow: hidden;
    background-color: #fff;
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.404);
    border-radius: 10px;
}

.PopUpeListementStyle{
    user-select: none;
    cursor: pointer;
    padding: 2px;
    border-radius: 5px;
    display: flex;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: 0.5s;
}
</style>

