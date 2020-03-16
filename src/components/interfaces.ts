export interface iColumnDescriptor {
  name: string
  label: string
  rowValueDescriptor: string
  formatter: (x: string) => string
}
