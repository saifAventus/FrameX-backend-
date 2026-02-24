import fs from 'fs/promises'
import path from 'path'
import { ElementNode, IUpadtedDataStore } from '../type/nodeType'

const DATA_PATH = path.join(process.cwd(), 'src/assets/dummy.json')
export const readData = async <T>(): Promise<T> => {
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as T
}

export const writeData = async <T>(data: T): Promise<void> => {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
}




export const updateData = async <T>({
  id,
  updated,
  elementType = "className",
}: IUpadtedDataStore<T>): Promise<void> => {

  const row = await fs.readFile(DATA_PATH, "utf-8");
  const jsonData = JSON.parse(row) as { layout: ElementNode[] };

  const updatedLayout = updateNodeID(
    jsonData.layout,
    id,
    String(updated),
    elementType
  );


  const newJson = {
    ...jsonData,
    layout: updatedLayout,
  };


  await fs.writeFile(DATA_PATH, JSON.stringify(newJson, null, 2));
};

export interface IInsertElement{
    parentId: string,
  newNode: ElementNode
}

export const insertElemet = async (
 {newNode,parentId}:IInsertElement
): Promise<void> => {

  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const json = JSON.parse(raw) as ElementNode;

  const updatedTree = insertNodeInside(json, parentId, newNode);

  // 3️⃣ Write back
  await fs.writeFile(DATA_PATH, JSON.stringify(updatedTree, null, 2));
};








export function insertNodeInside(
  tree: ElementNode,
  parentId: string,
  newNode: ElementNode,
): ElementNode {
  if (tree.id === parentId && tree.id === "root") {
    return {
      ...tree,
      layout: [...(tree.layout || []), newNode],
    };
  }

  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...(tree.children || []), newNode],
    };
  }

  return {
    ...tree,
    layout: tree.layout?.map((n) => insertNodeInside(n, parentId, newNode)),
    children: tree.children?.map((n) => insertNodeInside(n, parentId, newNode)),
  };
}


export function updateNodeID(
  nodes: ElementNode[],
  id: string,
  updatedData: string,
  updatedType: "className" | "text",
): ElementNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        props: {
          ...node.props,
          [updatedType]: updatedData,
        },
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeID(node.children, id, updatedData, updatedType),
      };
    }

    return node;
  });
}


export async function deleteNode (id:string){
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const json = JSON.parse(raw) as ElementNode;
const updated=deleteNodeById(json,id)



 return await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2));


}


export function deleteNodeById(
  tree: ElementNode,
  id: string
): ElementNode {

  if (tree.id === id && tree.id === "root") {
    return tree;
  }

  return {
    ...tree,

 
    layout: tree.layout
      ?.filter((node) => node.id !== id)
      .map((node) => deleteNodeById(node, id)),


    children: tree.children
      ?.filter((node) => node.id !== id)
      .map((node) => deleteNodeById(node, id)),
  };
}