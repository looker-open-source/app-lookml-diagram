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

export function makeJoinIcon(join: any, iconWidth: number, pillWidth: number, lX: number, lY: number, cX: number, isCross: boolean, leftFill: number, rightFill: number, joinTypeLabel: string) {

  join.append("rect")
  .attr("fill", "none")
  .attr("class", "join-path-icon-background")
  .style("rx", 15)
  .style("ry", 15)
  .attr("width", pillWidth)
  .attr("height", 36)
  .attr("transform", `translate(${lX + 2.5}, ${lY + 5})`)
  .style("filter", "url(#pill-shadow)")
  .style("opacity", 0.3)

  join.append("rect")
  .attr("fill", "none")
  .attr("class", "join-path-icon-background")
  .style("rx", 15)
  .style("ry", 15)
  .attr("width", pillWidth)
  .attr("height", 36)
  .attr("transform", `translate(${lX + 2.5}, ${lY + 5})`)

  isCross || join.append("path")
  .attr("d", "M23.6468 14.9375C17.7708 16.8958 14.834 26.6875 23.6468 32.5625C32.46 25.7083 28.5434 16.8958 23.6468 14.9375Z")
  .attr("fill", "none")
  .attr("fill-opacity", 0.2)
  .attr("class", "join-path-icon-right")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross || join.append("path")
  .attr("d", "M23.6468 14.9375C17.7708 16.8958 14.834 26.6875 23.6468 32.5625C32.46 25.7083 28.5434 16.8958 23.6468 14.9375Z")
  .attr("fill", "none")
  .attr("fill-opacity", 0.2)
  .attr("class", "join-path-icon-left")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross || join.append("path")
  .attr("d", "M28.5415 33.5417C33.9493 33.5417 38.3332 29.1578 38.3332 23.75C38.3332 18.3422 33.9493 13.9583 28.5415 13.9583C23.1337 13.9583 18.7498 18.3422 18.7498 23.75C18.7498 29.1578 23.1337 33.5417 28.5415 33.5417ZM28.5415 35.5C35.0308 35.5 40.2915 30.2393 40.2915 23.75C40.2915 17.2607 35.0308 12 28.5415 12C22.0522 12 16.7915 17.2607 16.7915 23.75C16.7915 30.2393 22.0522 35.5 28.5415 35.5Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("class", "join-path-icon-right")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross || join.append("path")
  .attr("d", "M18.75 33.5417C24.1578 33.5417 28.5417 29.1578 28.5417 23.75C28.5417 18.3422 24.1578 13.9583 18.75 13.9583C13.3422 13.9583 8.95833 18.3422 8.95833 23.75C8.95833 29.1578 13.3422 33.5417 18.75 33.5417ZM18.75 35.5C25.2393 35.5 30.5 30.2393 30.5 23.75C30.5 17.2607 25.2393 12 18.75 12C12.2607 12 7 17.2607 7 23.75C7 30.2393 12.2607 35.5 18.75 35.5Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("class", "join-path-icon-left")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross || join.append("path")
  .attr("d", "M21.4928 14.3483C20.6225 14.0949 19.7022 13.959 18.7502 13.959C13.3424 13.959 8.9585 18.3429 8.9585 23.7507C8.9585 29.1584 13.3424 33.5423 18.7502 33.5423C19.7027 33.5423 20.6234 33.4063 21.4941 33.1527C18.6387 31.0091 16.7917 27.5952 16.7917 23.75C16.7917 19.9053 18.6382 16.4919 21.4928 14.3483Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("fill-opacity", leftFill)
  .attr("class", "join-path-icon-left")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross || join.append("path")
  .attr("d", "M25.7983 33.1508C28.6533 31.0072 30.5001 27.5936 30.5001 23.7487C30.5001 19.9038 28.6533 16.4902 25.7983 14.3465C26.6688 14.093 27.5894 13.957 28.5417 13.957C33.9495 13.957 38.3334 18.3409 38.3334 23.7487C38.3334 29.1565 33.9495 33.5404 28.5417 33.5404C27.5894 33.5404 26.6688 33.4044 25.7983 33.1508Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("fill-opacity", rightFill)
  .attr("class", "join-path-icon-right")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("path")
  .attr("d", "M42.3335 31.5827L26.6668 15.916")
  .attr("stroke", "none")
  .attr("stroke-width", 0)
  .attr("class", "join-path-icon-connector")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("path")
  .attr("d", "M42.3332 15.916L26.6665 31.5827")
  .attr("stroke", "none")
  .attr("stroke-width", 0)
  .attr("class", "join-path-icon-connector")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("path")
  .attr("d", "M50.1665 33.5417C55.5743 33.5417 59.9582 29.1578 59.9582 23.75C59.9582 18.3422 55.5743 13.9583 50.1665 13.9583C44.7587 13.9583 40.3748 18.3422 40.3748 23.75C40.3748 29.1578 44.7587 33.5417 50.1665 33.5417ZM50.1665 35.5C56.6558 35.5 61.9165 30.2393 61.9165 23.75C61.9165 17.2607 56.6558 12 50.1665 12C43.6772 12 38.4165 17.2607 38.4165 23.75C38.4165 30.2393 43.6772 35.5 50.1665 35.5Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("class", "join-path-icon-right")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("circle")
  .attr("fill", "none")
  .attr("fill-opacity", 0.2)
  .attr("cx", 50.1667)
  .attr("cy", 23.7507)
  .attr("r", 9.79167)
  .attr("class", "join-path-icon-right")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("path")
  .attr("d", "M18.8335 33.5417C24.2413 33.5417 28.6252 29.1578 28.6252 23.75C28.6252 18.3422 24.2413 13.9583 18.8335 13.9583C13.4257 13.9583 9.04183 18.3422 9.04183 23.75C9.04183 29.1578 13.4257 33.5417 18.8335 33.5417ZM18.8335 35.5C25.3228 35.5 30.5835 30.2393 30.5835 23.75C30.5835 17.2607 25.3228 12 18.8335 12C12.3442 12 7.0835 17.2607 7.0835 23.75C7.0835 30.2393 12.3442 35.5 18.8335 35.5Z")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("fill", "none")
  .attr("class", "join-path-icon-left")
  .attr("transform", `translate(${lX}, ${lY})`)

  isCross && join.append("circle")
  .attr("fill", "none")
  .attr("fill-opacity", 0.2)
  .attr("cx", 18.8332)
  .attr("cy", 23.7507)
  .attr("r", 9.79167)
  .attr("class", "join-path-icon-left")
  .attr("transform", `translate(${lX}, ${lY})`)

  join.append("text")
  .attr("class", "join-path-icon-label")
  .attr("fill", "none")
  .text(joinTypeLabel)
  .attr("transform", `translate(${lX + iconWidth - 2}, ${lY + 29})`);
}
