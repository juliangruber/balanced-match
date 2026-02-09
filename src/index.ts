export const balanced = (
  a: string | RegExp,
  b: string | RegExp,
  str: string,
) => {
  const ma = a instanceof RegExp ? maybeMatch(a, str) : a
  const mb = b instanceof RegExp ? maybeMatch(b, str) : b

  const r = ma !== null && mb != null && range(ma, mb, str)

  return (
    r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + ma.length, r[1]),
      post: str.slice(r[1] + mb.length),
    }
  )
}

const maybeMatch = (reg: RegExp, str: string) => {
  const m = str.match(reg)
  return m ? m[0] : null
}

export const range = (
  a: string,
  b: string,
  str: string,
): undefined | [number, number] => {
  let begs: number[],
    beg: number | undefined,
    left: number,
    right: number | undefined = undefined,
    result: undefined | [number, number]
  let ai = str.indexOf(a)
  let bi = str.indexOf(b, ai + 1)
  let i = ai

  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi]
    }
    begs = []
    left = str.length

    while (i >= 0 && !result) {
      if (i === ai) {
        begs.push(i)
        ai = str.indexOf(a, i + 1)
      } else if (begs.length === 1) {
        const r = begs.pop()
        if (r !== undefined) result = [r, bi]
      } else {
        beg = begs.pop()
        if (beg !== undefined && beg < left) {
          left = beg
          right = bi
        }

        bi = str.indexOf(b, i + 1)
      }

      i = ai < bi && ai >= 0 ? ai : bi
    }

    if (begs.length && right !== undefined) {
      result = [left, right]
    }
  }

  return result
}
