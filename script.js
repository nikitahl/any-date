let date = new Date()
let isCopied = false
const currentDate = document.getElementById('current-date')
const localeSelect = document.getElementById('locale')
const timezoneSelect = document.getElementById('time-zone')
const timezoneFormatSelect = document.getElementById('time-zone-format')
const dayFormat = document.getElementById('day-format')
const monthFormat = document.getElementById('month-format')
const timeFormat = document.getElementById('time-format')
const dateFormat = document.getElementById('date-format')
const output = document.getElementById('output')
const codeOutput = document.getElementById('code')
const examples = document.querySelectorAll('.example')
const options = document.getElementById('options')
const copy = document.getElementById('copy')

function outputResult (result, code) {
  let currentDateValue = currentDate.value ? `"${currentDate.value}"` : ''
  if (currentDateValue && dateFormat.value === 'utc') {
    currentDateValue = `"${currentDate.value}:00Z"`
  }
  const snippet = code ? `const date = new Date(${currentDateValue});${code};` : ''
  output.innerText = `Result: ${result}`
  codeOutput.innerText = snippet
}

function outputSeconds () {
  const seconds = dateFormat.value === 'local' ? date.getSeconds() : date.getUTCSeconds()
  const secondsCode = dateFormat.value === 'local' ? '\ndate.getSeconds()' : '\ndate.getUTCSeconds()'
  outputResult(seconds, secondsCode)
}

function outputMinutes () {
  const minutes = dateFormat.value === 'local' ? date.getMinutes() : date.getUTCMinutes()
  const minutesCode = dateFormat.value === 'local' ? '\ndate.getMinutes()' : '\ndate.getUTCMinutes()'
  outputResult(minutes, minutesCode)
}

function outputHours () {
  const hours = dateFormat.value === 'local' ? date.getHours() : date.getUTCHours()
  const hoursCode = dateFormat.value === 'local' ? '\ndate.getHours()' : '\ndate.getUTCHours()'
  outputResult(hours, hoursCode)
}

function outputTime () {
  const timeFormatResult = timeFormat.value === 'true' ? true : false
  const time = date.toLocaleTimeString(localeSelect.value, { hour12: timeFormatResult, timeZone: timezoneSelect.value, timeZoneName: timezoneFormatSelect.value })
  const timeCode = `
const options = {
  hour12: '${timeFormat.value}',
  timeZone: '${timezoneSelect.value}',
  timeZoneName: '${timezoneFormatSelect.value}'
}

date.toLocaleTimeString('${localeSelect.value}', options)`
  outputResult(time, timeCode)
}

function outputWeekday () {
  const day = dateFormat.value === 'local' ? date.getDay() : date.getUTCDay()
  const dayCode = dateFormat.value === 'local' ? '\ndate.getDay()' : '\ndate.getUTCDay()'
  outputResult(day, dayCode)
}

function outputMonthday () {
  const monthDay = dateFormat.value === 'local' ? date.getDate() : date.getUTCDate()
  const monthDayCode = dateFormat.value === 'local' ? '\ndate.getDate()' : '\ndate.getUTCDate()'
  outputResult(monthDay, monthDayCode)
}

function outputDayname () {
  const dayName = date.toLocaleString(localeSelect.value, { weekday: dayFormat.value })
  const dayNameCode = `
const options = {
  weekday: '${dayFormat.value}'
};

date.toLocaleString('${localeSelect.value}', options)`
  outputResult(dayName, dayNameCode)
}

function outputMonth () {
  const month = dateFormat.value === 'local' ? date.getMonth() : date.getUTCMonth()
  const monthCode = dateFormat.value === 'local' ? '\ndate.getMonth()' : '\ndate.getUTCMonth()'
  outputResult(month, monthCode)
}

function outputMonthname () {
  const monthName = date.toLocaleString(localeSelect.value, { month: monthFormat.value })
  const monthNameCode = `
const options = {
  month: '${monthFormat.value}'
};

date.toLocaleString('${localeSelect.value}', options)`
  outputResult(monthName, monthNameCode)
}

function outputYear () {
  const year = dateFormat.value === 'local' ? date.getFullYear() : date.getUTCFullYear()
  const yearCode = dateFormat.value === 'local' ? '\ndate.getFullYear()' : '\ndate.getUTCFullYear()'
  outputResult(year, yearCode)
}

function outputDate () {
  const fullDate = date.toLocaleDateString(localeSelect.value, { weekday: dayFormat.value, year: 'numeric', month: monthFormat.value, day: 'numeric', timeZone: timezoneSelect.value, timeZoneName: timezoneFormatSelect.value })
  const fullDateCode = `
const options = {
  weekday: '${dayFormat.value}',
  year: 'numeric',
  month: '${monthFormat.value}',
  day: 'numeric',
  timeZone: '${timezoneSelect.value}',
  timeZoneName: '${timezoneFormatSelect.value}'
};

date.toLocaleDateString('${localeSelect.value}', options)`
  outputResult(fullDate, fullDateCode)
}

function outputDateTime () {
  const timeFormatResult = timeFormat.value === 'true' ? true : false
  const fullDate = date.toLocaleString(localeSelect.value, { weekday: dayFormat.value, year: 'numeric', month: monthFormat.value, day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: timeFormatResult, timeZone: timezoneSelect.value, timeZoneName: timezoneFormatSelect.value })
  const fullDateCode = `
const options = {
  weekday: '${dayFormat.value}',
  year: 'numeric',
  month: '${monthFormat.value}',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: '${timeFormat.value}',
  timeZone: '${timezoneSelect.value}',
  timeZoneName: '${timezoneFormatSelect.value}'
};

date.toLocaleString('${localeSelect.value}', options)`
  outputResult(fullDate, fullDateCode)
}

function handleExampleClick (e) {
  const element = e.currentTarget
  const id = element.id
  clearActiveElement()
  element.classList.add('active')

  date = new Date()
  if (currentDate.value) {
    let dateValue = currentDate.value
    if (dateFormat.value === 'utc') {
      dateValue = `${dateValue}:00Z`
    }
    date = new Date(dateValue)
  }

  switch (id) {
  case 'seconds':
    outputSeconds()
    break
  case 'minutes':
    outputMinutes()
    break
  case 'hours':
    outputHours()
    break
  case 'time':
    outputTime()
    break
  case 'weekday':
    outputWeekday()
    break
  case 'monthday':
    outputMonthday()
    break
  case 'dayname':
    outputDayname()
    break
  case 'month':
    outputMonth()
    break
  case 'monthname':
    outputMonthname()
    break
  case 'year':
    outputYear()
    break
  case 'date':
    outputDate()
    break
  case 'datetime':
    outputDateTime()
    break
  default:
    outputDate()

  }
}

function clearActiveElement () {
  const activeElement = document.querySelector('.active')
  if (activeElement) {
    activeElement.classList.remove('active')
  }
}

function handleFormChange () {
  clearActiveElement()
  outputResult('', '')
}

function handleCopy (e) {
  if (codeOutput.innerText && !isCopied) {
    navigator.clipboard.writeText(codeOutput.innerText)
    const currentValue = e.target.innerText
    e.target.innerText = 'Copied!'
    isCopied = true
    setTimeout(() => {
      e.target.innerText = currentValue
      isCopied = false
    }, 2000)
  }
}

async function populateLocales () {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json()

    const localeSet = new Set()

    countries.forEach(country => {
      const countryCode = country.cca2
      const languages = country.languages

      if (languages && countryCode) {
        Object.entries(languages).forEach(([ langCode, langName ]) => {
          const locale = `${langCode}-${countryCode}`
          const label = `${langName} (${countryCode})`
          localeSet.add(JSON.stringify({ locale, label }))
        })
      }
    })

    const localeEntries = Array.from(localeSet).map(item => JSON.parse(item))
    localeEntries.sort((a, b) => a.label.localeCompare(b.label))

    localeSelect.innerHTML = ''
    localeEntries.forEach(({ locale, label }) => {
      const option = document.createElement('option')
      option.value = locale
      option.textContent = label
      localeSelect.appendChild(option)
    })
  } catch (error) {
    console.warn('Failed to load locales from API, using fallback.', error)
  }
}

function getTimeZoneOffsetLabel (timeZone) {
  try {
    const now = new Date()
    const options = {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }

    const formatter = new Intl.DateTimeFormat('en-US', options)
    const parts = formatter.formatToParts(now)
    const tzPart = parts.find(p => p.type === 'timeZoneName')
    return tzPart ? tzPart.value.replace('GMT', 'UTC') : ''
  } catch (e) {
    console.warn(e)
    return ''
  }
}

function populateTimeZones () {
  let timeZones = []

  // Modern browsers support this API
  if (typeof Intl.supportedValuesOf === 'function') {
    try {
      timeZones = Intl.supportedValuesOf('timeZone')
      // Sort by name
      timeZones.sort()
      timezoneSelect.innerHTML = ''
      // Add options
      timeZones.forEach(zone => {
        const offsetLabel = getTimeZoneOffsetLabel(zone)
        const option = document.createElement('option')
        option.value = zone
        option.textContent = `${zone} (${offsetLabel})`
        timezoneSelect.appendChild(option)
      })
    } catch (e) {
      console.warn('Intl.supportedValuesOf("timeZone") not available, using fallback.', e)
    }
  }
}

examples.forEach(example => example.addEventListener('click', handleExampleClick))
options.addEventListener('change', handleFormChange)
copy.addEventListener('click', handleCopy)

populateLocales()
populateTimeZones()