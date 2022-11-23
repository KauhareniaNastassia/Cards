import * as React from 'react'
import { useCallback, useState } from 'react'

import { debounce } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { getPacksTC, setMaxCardsCountAC, setMinCardsCountAC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

const minDistance = 10

export const SliderFromMateUI = () => {
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const dispatch = useAppDispatch()
  const sliderValue = [minCardsCount, maxCardsCount]

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      dispatch(setMinCardsCountAC(Math.min(newValue[0], sliderValue[1] - minDistance)))
    } else {
      dispatch(setMaxCardsCountAC(Math.max(newValue[1], sliderValue[0] + minDistance)))
    }
  }

  const debouncedChangeHandler = useCallback(
    debounce(() => dispatch(getPacksTC({ min: minCardsCount, max: maxCardsCount })), 1000),
    [sliderValue]
  )

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={sliderValue}
        onChange={handleChange1}
        onChangeCommitted={debouncedChangeHandler}
        // valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  )
}
