import {  useState } from "react";
import Checkbox from "./Checkbox";

export interface CheckNode{
    state: boolean
    hasCheckedChildren:boolean
    parent:CheckNode | null
    children:CheckNode[]
}

const defaultRootNode = {state:false,hasCheckedChildren:false,parent:null,children:[]} as CheckNode

export default function CheckboxTreePage(){
    const [root,setRoot]=useState(defaultRootNode)

    return (
        <>
           <h2>Checkbox Tree</h2>
        </>
    )

}