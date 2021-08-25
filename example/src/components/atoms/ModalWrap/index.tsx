import React from 'react'
import { curve, zIndex } from '../../../style'
import { ClassNames } from '@emotion/react'
import Modal from 'react-modal'

type Props = {
  children?: any
  isOpen: boolean
  contentLabel?: string
}

export const ModalWrap: React.VFC<Props> = ({
  children,
  isOpen,
  contentLabel,
}) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          isOpen={isOpen}
          contentLabel={`${contentLabel}`}
          ariaHideApp={false}
          overlayClassName={{
            base: 'overlay-base',
            afterOpen: 'overlay-after',
            beforeClose: 'overlay-before',
          }}
          className={{
            base: 'content-base',
            afterOpen: 'content-after',
            beforeClose: 'content-before',
          }}
          closeTimeoutMS={1000}
          portalClassName={css`
            .overlay-base {
              position: fixed;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              background: rgba(242, 245, 245, 0);
              backdrop-filter: blur(8px);
              opacity: 0;
              /* transition-property: background-color, opacity;
                        transition-duration: 300ms;
                        transition-timing-function: ease-out; */
              ${curve.fade}
              z-index:${zIndex.elevation.ev15};
              outline: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .overlay-after {
              background: rgba(242, 245, 245, 0.56);
              backdrop-filter: blur(8px);
              opacity: 1;
            }

            .overlay-before {
              background: rgba(242, 245, 245, 0);
              backdrop-filter: blur(8px);
              opacity: 0;
            }

            .content-base {
              position: relative;
              top: auto;
              left: auto;
              right: auto;
              bottom: auto;
              margin: 0 auto;
              border: 0;
              outline: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              transform: scale(0);
              background-color: transparent;
              /* transition-property: all;
                        transition-duration: 300ms;
                        transition-timing-function: ease-out; */
              ${curve.button}
            }

            .content-after {
              transform: scale(1);
            }

            .content-before {
              transform: scale(0);
            }
          `}
        >
          {children}
        </Modal>
      )}
    </ClassNames>
  )
}
