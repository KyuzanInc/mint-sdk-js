import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { format } from 'date-fns'

import React, { useEffect } from 'react'
import { Card } from '.'
import { color, font } from '../../../style'

type Props = {
  item: Item
}

export const EndedCard: React.FC<Props> = ({
  item
}) => {
  const target = item.endAt ? item.endAt : new Date();
  const date = format(target, 'yyyy.MM.dd HH:mm');

  const onClick = useEffect(()=>{
    //TODO: write onclick action
  }, []);
  return (
    <Card onClick={onClick} title={item.name}>
      <StatusBar />
      <StatusContent>
        <StatusTitle>
          sold for
        </StatusTitle>
        <StatusValue>
          <Value>
              {item.currentPrice}
          </Value>
          <Unit>
              ETH
          </Unit>
        </StatusValue>
      </StatusContent>
      <StatusContent>
        <StatusTitle>
          end time
        </StatusTitle>
        <StatusValue>
          <Time>
            {date}
          </Time>
        </StatusValue>
      </StatusContent>
    </Card>
  )
}

const StatusBar = styled.span`
  background: rgba(0, 0, 0, 0.14);
  width: 6px;
  height: 52px;
  border-radius: 3px;
`

const StatusContent = styled.div`
  background:  ${color.white};
  padding: 0px 24px 0px 8px;
`

const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.label}
  padding: 0 10px 0 0;
`


const StatusValue = styled.div`
  width: 68px;
  height: 24px;
  ${font.lg.h3}
  color: ${color.content.dark};
  margin: 9px 10px 0 0px;
  display: flex;
`

const Value = styled.div`
  width: 42px;
  height: 24px;
  display: flex;
  ${font.lg.h3}
  color: ${color.content.dark};
`

const Unit = styled.div`
  width: 22px;
  height: 20px;
  ${font.lg.unit}
  color: ${color.content.dark};
  margin: 6px 0 6px 0
`
const Time = styled.div`
  width: 118px;
  height: 20px;
  display: flex;
  font-weight: 500; font-size: 14px; line-height: 1.3;
  color: ${color.content.dark};
  display: table;
`
