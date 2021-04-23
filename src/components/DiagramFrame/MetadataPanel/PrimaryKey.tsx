import React from 'react'
import { getPkPath } from '../../../d3-utils/table-helpers'

export const PrimaryKey: React.FC<{
}> = ({
}) => {
  return (
    <svg className="lookml-diagram-primary-key" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" aria-labelledby="title">
 <title id="title">Lookml Diagram Primary Key Icon</title>
       <path d={getPkPath({primary_key: true})}/>
     </svg>
  )
}
