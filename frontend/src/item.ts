export enum ItemTypes {
  TEXT_FILE = 'TEXT_FILE',
  DIRECTORY = 'DIRECTORY',
  SEARCH = 'SEARCH',
  HTML = 'HTML',
  INFO = 'INFO',
}

interface IItem {
  type: ItemTypes
  description: string
  selector: string
  host: string
  port: number
}

export default IItem
