export default function parse<T> (fields: T[]): T[] {
  return fields.map((field) => {
    for (const key in field) {
      if (field[key] === null) {
        delete field[key]
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (field as any).__typename

    return field
  })
}
