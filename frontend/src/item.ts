export enum ItemType {
  TEXT_FILE = 'TEXT_FILE',
  DIRECTORY = 'DIRECTORY',
  INFO      = 'INFO',
}

interface IItem {
  type: ItemType
  description: string
  selector: string
  host: string
  port: number
}

export default IItem
