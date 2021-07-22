import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import { color, font } from '../../../style'

type Props = {
  className?: string
  label: string
  iconPath?: string
}

export const Tag: React.VFC<Props> = ({ className, label, iconPath }) => {
  return (
    <TagBase className={className}>
      {iconPath && (
        <Icon>
          <Image width={14} height={14} layout={'fixed'} src={iconPath} />
        </Icon>
      )}
      <Label>{label}</Label>
    </TagBase>
  )
}

const TagBase = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  border-radius: 4px;
  background-color: ${color.content.gray2};
  padding: 7px 10px;
`

const Icon = styled.span`
  line-height: 1;
  margin-right: 4px;
  height: 14px;
  width: 14px;
`

const Label = styled.span`
  ${font.mont.subtitle2}
  color: ${color.content.gray1};
  line-height: 1;
`
