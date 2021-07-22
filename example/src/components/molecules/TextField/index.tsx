import styled from '@emotion/styled'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { color, font } from '../../../style'

type Props = {
  label: string
  placeHolder: string
  registerReturnVal: UseFormRegisterReturn
  className?: string
}

export const TextField: React.VFC<Props> = ({
  registerReturnVal,
  placeHolder,
  label,
  className,
}) => {
  return (
    <FormGroup className={className}>
      <Label>{label}</Label>
      <InputContainner>
        <Input
          fullWidth={true}
          {...registerReturnVal}
          placeholder={placeHolder}
        />
      </InputContainner>
    </FormGroup>
  )
}

export const TextAreaField: React.VFC<Props> = ({
  registerReturnVal,
  placeHolder,
  label,
  className,
}) => {
  return (
    <FormGroup className={className}>
      <Label>{label}</Label>
      <InputContainner>
        <Memo {...registerReturnVal} placeholder={placeHolder} />
      </InputContainner>
    </FormGroup>
  )
}

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const Label = styled.span`
  ${font.mont.subtitle2}
  width: 160px;
`

const InputContainner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Input = styled.input<{ fullWidth: boolean }>`
  background: ${color.background.bague};
  border: 0.5px solid ${color.content.light};
  box-sizing: border-box;
  border-radius: 4px;
  ${font.mont.body1}
  padding: 12px 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '184px')};
`

const Memo = styled.textarea`
  background: ${color.background.bague};
  border: 0.5px solid ${color.content.light};
  box-sizing: border-box;
  border-radius: 4px;
  ${font.mont.body1}
  padding: 12px 16px;
  width: 100%;
`
