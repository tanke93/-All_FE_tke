function dateFormat (dtStr) {
  const dt = new Date(dtStr)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0');
  const d = (dt.getDate()).toString().padStart(2, '0')

  const hh = (dt.getHours()).toString().padStart(2, '0')
  const mm = (dt.getMinutes()).toString().padStart(2, '0')
  const ss = (dt.getSeconds()).toString().padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

}
module.exports = {
  dateFormat
}
