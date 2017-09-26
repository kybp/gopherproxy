export enum ItemType {
  TEXT_FILE = 'TEXT_FILE',
  DIRECTORY = 'DIRECTORY',
  SEARCH = 'SEARCH',
  INFO = 'INFO',
}

interface IItem {
  type: ItemType
  description: string
  selector: string
  host: string
  port: number
}

export default IItem
