import * as React from 'react'
import { useCallback } from 'react'

import { debounce } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

type propsType = {
  onChangeRange: (value: [number, number]) => void
  value: [number, number]
  min: number
  max: number
  className?: string
  onChangeCommitted: (value: [number, number]) => void
}
export const SliderFromMateUI = (props: propsType) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    props.onChangeRange(newValue as [number, number])
  }

  const onChangeCommittedHandler = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    props.onChangeCommitted(value as [number, number])
  }
  const debouncedChangeHandler = useCallback(
    debounce(() => {
      console.log('dd')
    }, 1000),
    []
  )

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={props.value}
        onChange={handleChange}
        onChangeCommitted={onChangeCommittedHandler}
        valueLabelDisplay="auto"
        min={props.min}
        max={props.max}
      />
    </Box>
  )
}
