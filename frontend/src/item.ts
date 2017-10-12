export enum ItemTypes {
  TEXT_FILE = 'TEXT_FILE',
  DIRECTORY = 'DIRECTORY',
  SEARCH = 'SEARCH',
  HTML = 'HTML',
  INFO = 'INFO',
}

interface IItem {
  data: any
  description: string
  host: string
  port: number
  selector: string
  type: ItemTypes
}

export default IItem
