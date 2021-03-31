import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  title: string
  onClick: () => any
}

export const Card: React.FC<Props> = ({
	onClick,
  title
}) => {
  return (
    <CardBase onClick={onClick}>
      <CardMedia>
				<Image
						src={'/images/shoes.png'}
						layout={'fill'}
					/>
			</CardMedia>
			<CardContent>
				<Typography>
					{title}
				</Typography>
				<CardAction>
					<StatusBar />
					<StatusContent>
						<StatusTitle>
							current bid
						</StatusTitle>
						<StatusValue>
							<Value>
								0.61
							</Value>
							<Unit>
								ETH
							</Unit>
						</StatusValue>
					</StatusContent>
					<StatusContent>
						<StatusTitle>
							ending in
						</StatusTitle>
						<StatusValue>
							<Time>
								21
							</Time>
							<TimeUnit>
								h
							</TimeUnit>
							<Time>
								21
							</Time>
							<TimeUnit>
								m
							</TimeUnit>
							<Time>
								21
							</Time>
							<TimeUnit>
								s
							</TimeUnit>
						</StatusValue>
					</StatusContent>
				</CardAction>
			</CardContent>
    </CardBase>
  )
}

const CardBase = styled.div`
  cursor: pointer;
  ${font.lg.button}
  height: 382px;
  width: 264px;
  line-height: 44px;
  border-radius: 22px;
  color: ${color.white};
  padding: 0px 0px 24px;
	box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04), 0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443), 0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
	border-radius: 12px;
  `
const CardMedia = styled(CardBase)`
	border-radius: 12px 12px 0 0;
  background: ${color.primary};
	height: 220px;
  width: 264px%;
	position: relative;
`


const CardContent = styled.div`
	background: ${color.white};
  width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 16px 24px 16px;
	border-radius: 0 0 12px 12px;
`
const Typography = styled.div`
	background: ${color.white};
  width: 100%;
	${font.lg.subtitle1}
	display: flex;
	color: ${color.content.dark};
	padding-bottom: 32px;
	align-items: center;
`

const CardAction = styled.div`
	background: ${color.white};
	height: 52px;
  width: 100%;
	${font.lg.subtitle1}
	display: flex;
	align-items: center;
	color: ${color.content.dark};
	align-items: center;
`

const StatusBar = styled.span`
	background: linear-gradient(180deg, #FD80A8 0%, #FCCF42 100%);
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
	height: 12px;
	${font.lg.unit}
	color: ${color.content.dark};
	margin: 6px 0 6px 0
`
const Time = styled.div`
	width: 17px;
	height: 20px;
	display: flex;
	${font.lg.h3}
	color: ${color.content.dark};
`

const TimeUnit = styled.div`
	width: 7px;
	height: 12px;
	${font.lg.unit}
	color: ${color.content.dark};
	margin: 6px;
`