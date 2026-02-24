import { Request, Response } from "express";
import { deleteNode, IInsertElement, insertElemet, readData, updateData } from "../utils/dataStore";
import { ElementNode, IUpadtedDataStore } from "../type/nodeType";
type AnyObject = Record<string, unknown>

export const updateJson = async<T> (req: Request, res: Response) => {
  try {
   const payload: IUpadtedDataStore<T>= req.body

  // const existing = await readData<AnyObject[]>()
  // const updated = [...existing, payload]

  await updateData(payload)
 
   res.status(201).json({ success: true, data: payload })
  } catch (error) {
    console.error("the error is ", error);
    return res.status(500).json({ error });
  }
};
export const addElements = async (req: Request, res: Response) => {
  try {
   const payload: IInsertElement= req.body
  await insertElemet(payload)

   res.status(201).json({ success: true, data: payload })
  } catch (error) {
    console.error("the error is ", error);
    return res.status(500).json({ error });
  }
};

export const getJson = async (req: Request, res: Response) => {
  try {

      const data = await readData<AnyObject[]>()

    return res.status(200).json({ result: data,isSuccess:true });
  } catch (error) {
    console.error("th error is ", error);
    return res.status(500).json({ error });
  }
};

export const deleteElement=async (req: Request, res: Response)=>{
   try {
    const { id } = req.query as { id: string };
      const data = await deleteNode(id)

    return res.status(200).json({ result: data,isSuccess:true });
  } catch (error) {
    console.error("th error is ", error);
    return res.status(500).json({ error });
  }
}

// dataRoutes.post('/', async (req: Request, res: Response) => {
//   const payload: AnyObject = req.body

//   const existing = await readData<AnyObject[]>()
//   const updated = [...existing, payload]

//   await writeData(updated)

//   res.status(201).json({ success: true, data: payload })
// })

// dataRoutes.get('/', async (_req: Request, res: Response) => {

// })
