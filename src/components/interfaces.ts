export interface ColumnDescriptor {
  name: string
  label: string
  rowValueDescriptor: string
  formatter: (x: string) => string
}

export interface SidebarStyleProps {
  open: boolean;
}
