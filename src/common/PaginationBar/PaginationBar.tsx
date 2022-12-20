import React, { ChangeEvent } from 'react'

import NativeSelect from '@mui/material/NativeSelect'
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
  const pageCountHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    props.pageCountHandler(e.currentTarget.value)
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
      <span>Show</span>
      <NativeSelect value={props.pageCount} onChange={pageCountHandler}>
        {props.selectOption.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </NativeSelect>
      <span>Cards per page</span>
    </div>
  )
}
