import { Request, Response } from "express";
import { readData, writeData } from "../utils/dataStore";
type AnyObject = Record<string, unknown>

export const updateJson = async (req: Request, res: Response) => {
  try {
   const payload: AnyObject = req.body
console.log(payload,"theddta is")
  // const existing = await readData<AnyObject[]>()
  // const updated = [...existing, payload]

  await writeData(payload)
 
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

// dataRoutes.post('/', async (req: Request, res: Response) => {
//   const payload: AnyObject = req.body

//   const existing = await readData<AnyObject[]>()
//   const updated = [...existing, payload]

//   await writeData(updated)

//   res.status(201).json({ success: true, data: payload })
// })

// dataRoutes.get('/', async (_req: Request, res: Response) => {

// })
