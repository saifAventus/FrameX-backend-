import fs from 'fs/promises'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/assets/dummy.json')
export const readData = async <T>(): Promise<T> => {
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as T
}

export const writeData = async <T>(data: T): Promise<void> => {

  console.log(data)
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
}
