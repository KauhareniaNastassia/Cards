import React from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import s from './paginationBar.module.css'

type PropsType = {
  pageCountHandler: (value: string) => void
  handleChangePage: (page: number) => void
  paginationPages: number
  pageCount: number
  page: number
  selectOption: number[]
}

export const PaginationBar = (props: PropsType) => {
  const pageCountHandler = (e: SelectChangeEvent) => {
    props.pageCountHandler(e.target.value as string)
  }
  const handleChangePage = (event: unknown, page: number) => {
    props.handleChangePage(page)
  }

  return (
    <div className={s.wrapper}>
      <Pagination
        color="primary"
        shape="rounded"
        page={props.page}
        onChange={handleChangePage}
        count={props.paginationPages}
      />
      <div className={s.select}>
        <span>Show</span>
        <Select value={props.pageCount.toString()} onChange={pageCountHandler}>
          {props.selectOption.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <span>Cards per page</span>
      </div>
    </div>
  )
}
