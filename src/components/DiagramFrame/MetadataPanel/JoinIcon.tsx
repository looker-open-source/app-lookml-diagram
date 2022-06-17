/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React from 'react'
import { Box } from '@looker/components'

const FullOuterIcon = React.memo(() => (
  <Box width={30} height={20}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 48 32"
      fill="none"
    >
      <path
        d="M30 16C30 22.6274 24.6274 28 18 28C11.3726 28 6 22.6274 6 16C6 9.37258 11.3726 4 18 4C24.6274 4 30 9.37258 30 16Z"
        fill="#8C3AC6"
        fillOpacity="0.64"
      />
      <path
        d="M42 16C42 22.6274 36.6274 28 30 28C23.3726 28 18 22.6274 18 16C18 9.37258 23.3726 4 30 4C36.6274 4 42 9.37258 42 16Z"
        fill="#6CA290"
        fillOpacity="0.72"
      />
      <path
        d="M24 27C27.5868 24.8043 30 20.7004 30 16C30 11.2996 27.5868 7.1957 24 5C20.4132 7.1957 18 11.2996 18 16C18 20.7004 20.4132 24.8043 24 27Z"
        fill="#C2CAD1"
      />
      <g opacity="0.4">
        <mask
          id="outermask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="6"
          y="4"
          width="18"
          height="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 5.60539C20.4132 7.68025 18 11.5583 18 16C18 20.4417 20.4132 24.3198 24 26.3946C22.235 27.4156 20.1857 28 18 28C11.3726 28 6 22.6274 6 16C6 9.37258 11.3726 4 18 4C20.1857 4 22.235 4.58437 24 5.60539Z"
            fill="white"
          />
        </mask>
        <g mask="url(#outermask0)">
          <rect x="1" y="7" width="26" height="2" fill="#41344A" />
          <rect x="2" y="3" width="26" height="2" fill="#41344A" />
          <rect x="1" y="11" width="26" height="2" fill="#41344A" />
          <rect x="1" y="15" width="26" height="2" fill="#41344A" />
          <rect x="1" y="19" width="26" height="2" fill="#41344A" />
          <rect x="1" y="23" width="26" height="2" fill="#41344A" />
          <rect x="2" y="27" width="26" height="2" fill="#41344A" />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 16C44 23.732 37.732 30 30 30C22.268 30 16 23.732 16 16C16 8.26801 22.268 2 30 2C37.732 2 44 8.26801 44 16ZM30 28C36.6274 28 42 22.6274 42 16C42 9.37258 36.6274 4 30 4C23.3726 4 18 9.37258 18 16C18 22.6274 23.3726 28 30 28Z"
        fill="#194839"
      />
      <g opacity="0.4">
        <mask
          id="outermask1"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="24"
          y="4"
          width="18"
          height="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 5.60539C27.5868 7.68025 30 11.5583 30 16C30 20.4417 27.5868 24.3198 24 26.3946C25.765 27.4156 27.8143 28 30 28C36.6274 28 42 22.6274 42 16C42 9.37258 36.6274 4 30 4C27.8143 4 25.765 4.58437 24 5.60539Z"
            fill="#194839"
          />
        </mask>
        <g mask="url(#outermask1)">
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 47 7)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 46 3)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 47 11)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 47 15)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 47 19)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 47 23)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 46 27)"
            fill="#194839"
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 16C32 23.732 25.732 30 18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16ZM18 28C24.6274 28 30 22.6274 30 16C30 9.37258 24.6274 4 18 4C11.3726 4 6 9.37258 6 16C6 22.6274 11.3726 28 18 28Z"
        fill="#41344A"
      />
      <path
        d="M24 27C27.5868 24.8043 30 20.7004 30 16C30 11.2996 27.5868 7.1957 24 5C20.4132 7.1957 18 11.2996 18 16C18 20.7004 20.4132 24.8043 24 27Z"
        fill="#B2C6D8"
      />
    </svg>
  </Box>
))
FullOuterIcon.displayName = 'FullOuterIcon'

const LeftOuterIcon = React.memo(() => (
  <Box width={30} height={20}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: '20px', width: '30px' }}
      width="100%"
      height="100%"
      viewBox="0 0 48 32"
      fill="none"
    >
      <path
        d="M30 16C30 22.6274 24.6274 28 18 28C11.3726 28 6 22.6274 6 16C6 9.37258 11.3726 4 18 4C24.6274 4 30 9.37258 30 16Z"
        fill="#8C3AC6"
        fillOpacity="0.64"
      />
      <path
        d="M42 16C42 22.6274 36.6274 28 30 28C23.3726 28 18 22.6274 18 16C18 9.37258 23.3726 4 30 4C36.6274 4 42 9.37258 42 16Z"
        fill="#6CA290"
        fillOpacity="0.15"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 26.3946C27.5868 24.3198 30 20.4417 30 16C30 11.5583 27.5868 7.68024 24 5.60539C25.765 4.58437 27.8143 4 30 4C36.6274 4 42 9.37258 42 16C42 22.6274 36.6274 28 30 28C27.8143 28 25.765 27.4156 24 26.3946Z"
        fill="white"
      />
      <g opacity="0.4">
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="5"
          y="3"
          width="19"
          height="26"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 4.73917C20.2139 6.98693 17.6667 11.1882 17.6667 16C17.6667 20.8118 20.2139 25.0131 24 27.2608C22.1369 28.3669 19.9738 29 17.6667 29C10.6711 29 5 23.1797 5 16C5 8.8203 10.6711 3 17.6667 3C19.9738 3 22.1369 3.63307 24 4.73917Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0)">
          <rect y="7" width="26" height="2" fill="#41344A" />
          <rect x="1" y="3" width="26" height="2" fill="#41344A" />
          <rect y="11" width="26" height="2" fill="#41344A" />
          <rect y="15" width="26" height="2" fill="#41344A" />
          <rect y="19" width="26" height="2" fill="#41344A" />
          <rect y="23" width="26" height="2" fill="#41344A" />
          <rect x="2" y="27" width="26" height="2" fill="#41344A" />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 16C44 23.732 37.732 30 30 30C22.268 30 16 23.732 16 16C16 8.26801 22.268 2 30 2C37.732 2 44 8.26801 44 16ZM30 28C36.6274 28 42 22.6274 42 16C42 9.37258 36.6274 4 30 4C23.3726 4 18 9.37258 18 16C18 22.6274 23.3726 28 30 28Z"
        fill="#194839"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 16C32 23.732 25.732 30 18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16ZM18 28C24.6274 28 30 22.6274 30 16C30 9.37258 24.6274 4 18 4C11.3726 4 6 9.37258 6 16C6 22.6274 11.3726 28 18 28Z"
        fill="#41344A"
      />
      <path
        d="M24 27C27.5868 24.8043 30 20.7004 30 16C30 11.2996 27.5868 7.1957 24 5C20.4132 7.1957 18 11.2996 18 16C18 20.7004 20.4132 24.8043 24 27Z"
        fill="#B2C6D8"
      />
    </svg>
  </Box>
))
LeftOuterIcon.displayName = 'LeftOuterIcon'

const InnerIcon = React.memo(() => (
  <Box width={30} height={20}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 32"
      fill="none"
      style={{ height: '20px', width: '30px' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 16C30 22.6274 24.6274 28 18 28C11.3726 28 6 22.6274 6 16C6 9.37258 11.3726 4 18 4C24.6274 4 30 9.37258 30 16Z"
        fill="#8D6BA5"
        fillOpacity="0.15"
      />
      <path
        d="M42 16C42 22.6274 36.6274 28 30 28C23.3726 28 18 22.6274 18 16C18 9.37258 23.3726 4 30 4C36.6274 4 42 9.37258 42 16Z"
        fill="#6CA290"
        fillOpacity="0.15"
      />
      <path
        d="M24 27C27.5868 24.8043 30 20.7004 30 16C30 11.2996 27.5868 7.1957 24 5C20.4132 7.1957 18 11.2996 18 16C18 20.7004 20.4132 24.8043 24 27Z"
        fill="#80AAD0"
      />
      <mask
        id="innermask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="18"
        y="5"
        width="12"
        height="22"
      >
        <path
          d="M24 26.7892C27.5868 24.6146 30 20.55 30 15.8946C30 11.2393 27.5868 7.17466 24 5C20.4132 7.17466 18 11.2393 18 15.8946C18 20.55 20.4132 24.6146 24 26.7892Z"
          fill="#6CA290"
        />
      </mask>
      <g mask="url(#innermask0)" style={{ opacity: 1 }}>
        <rect
          opacity="0.5"
          width="26.3182"
          height="2"
          transform="matrix(-0.855554 -0.517714 -0.482492 0.8759 39.7583 14.125)"
          fill="white"
        />
        <rect
          opacity="0.5"
          width="26.3182"
          height="2"
          transform="matrix(-0.855554 -0.517714 -0.482492 0.8759 37.7583 17.7559)"
          fill="white"
        />
        <rect
          opacity="0.5"
          width="26.3182"
          height="2"
          transform="matrix(-0.855554 -0.517714 -0.482492 0.8759 35.7583 21.3867)"
          fill="white"
        />
        <rect
          opacity="0.5"
          width="26.3182"
          height="2"
          transform="matrix(-0.855554 -0.517714 -0.482492 0.8759 33.7583 25.0176)"
          fill="white"
        />
        <rect
          opacity="0.5"
          width="26.3182"
          height="2"
          transform="matrix(-0.855554 -0.517714 -0.482492 0.8759 31.7583 28.6484)"
          fill="white"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 16C44 23.732 37.732 30 30 30C22.268 30 16 23.732 16 16C16 8.26801 22.268 2 30 2C37.732 2 44 8.26801 44 16ZM30 28C36.6274 28 42 22.6274 42 16C42 9.37258 36.6274 4 30 4C23.3726 4 18 9.37258 18 16C18 22.6274 23.3726 28 30 28Z"
        fill="#194839"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 16C32 23.732 25.732 30 18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16ZM18 28C24.6274 28 30 22.6274 30 16C30 9.37258 24.6274 4 18 4C11.3726 4 6 9.37258 6 16C6 22.6274 11.3726 28 18 28Z"
        fill="#41344A"
      />
    </svg>
  </Box>
))
InnerIcon.displayName = 'InnerIcon'

const CrossIcon = React.memo(() => (
  <Box width={40} height={20}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 80 32"
      fill="none"
    >
      <path
        d="M27 17C27 23.6274 21.6274 29 15 29C8.37258 29 3 23.6274 3 17C3 10.3726 8.37258 5 15 5C21.6274 5 27 10.3726 27 17Z"
        fill="#8C3AC6"
        fillOpacity="0.64"
      />
      <path
        d="M77 17C77 23.6274 71.6274 29 65 29C58.3726 29 53 23.6274 53 17C53 10.3726 58.3726 5 65 5C71.6274 5 77 10.3726 77 17Z"
        fill="#6CA290"
        fillOpacity="0.72"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79 17C79 24.732 72.732 31 65 31C57.268 31 51 24.732 51 17C51 9.26801 57.268 3 65 3C72.732 3 79 9.26801 79 17ZM65 29C71.6274 29 77 23.6274 77 17C77 10.3726 71.6274 5 65 5C58.3726 5 53 10.3726 53 17C53 23.6274 58.3726 29 65 29Z"
        fill="#194839"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 17C29 24.732 22.732 31 15 31C7.26801 31 1 24.732 1 17C1 9.26801 7.26801 3 15 3C22.732 3 29 9.26801 29 17ZM15 29C21.6274 29 27 23.6274 27 17C27 10.3726 21.6274 5 15 5C8.37258 5 3 10.3726 3 17C3 23.6274 8.37258 29 15 29Z"
        fill="#41344A"
      />
      <path
        d="M33 9.5H47"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 25.5H47"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 14L47 21"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M47 14L33 21"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g opacity="0.4">
        <mask
          id="crossmask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="53"
          y="5"
          width="24"
          height="24"
        >
          <path
            d="M77 17C77 23.6274 71.6274 29 65 29C58.3726 29 53 23.6274 53 17C53 10.3726 58.3726 5 65 5C71.6274 5 77 10.3726 77 17Z"
            fill="#6CA290"
            fillOpacity="0.72"
          />
        </mask>
        <g mask="url(#crossmask0)">
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 78 9)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 77 5)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 78 13)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 78 17)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 78 21)"
            fill="#194839"
          />
          <rect
            width="26"
            height="2"
            transform="matrix(-1 0 0 1 78 25)"
            fill="#194839"
          />
        </g>
      </g>
      <g opacity="0.6">
        <mask
          id="mask1"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="3"
          y="5"
          width="24"
          height="24"
        >
          <path
            d="M27 17C27 23.6274 21.6274 29 15 29C8.37258 29 3 23.6274 3 17C3 10.3726 8.37258 5 15 5C21.6274 5 27 10.3726 27 17Z"
            fill="#8C3AC6"
            fillOpacity="0.64"
          />
        </mask>
        <g mask="url(#mask1)">
          <rect x="1" y="8" width="26" height="2" fill="#41344A" />
          <rect x="2" y="4" width="26" height="2" fill="#41344A" />
          <rect x="1" y="12" width="26" height="2" fill="#41344A" />
          <rect x="1" y="16" width="26" height="2" fill="#41344A" />
          <rect x="1" y="20" width="26" height="2" fill="#41344A" />
          <rect x="1" y="24" width="26" height="2" fill="#41344A" />
          <rect x="3" y="28" width="26" height="2" fill="#41344A" />
        </g>
      </g>
    </svg>
  </Box>
))
CrossIcon.displayName = 'CrossIcon'

const JoinIcon: React.FC<{
  type: string
}> = ({ type }) => (
  <>
    {type === 'full-outer' && <FullOuterIcon />}
    {type === 'left-outer' && <LeftOuterIcon />}
    {type === 'inner' && <InnerIcon />}
    {type === 'cross' && <CrossIcon />}
  </>
)

export default JoinIcon
