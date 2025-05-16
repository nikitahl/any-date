let date=new Date,isCopied=!1,currentDate=document.getElementById("current-date"),localeSelect=document.getElementById("locale"),timezoneSelect=document.getElementById("time-zone"),timezoneFormatSelect=document.getElementById("time-zone-format"),dayFormat=document.getElementById("day-format"),monthFormat=document.getElementById("month-format"),timeFormat=document.getElementById("time-format"),dateFormat=document.getElementById("date-format"),output=document.getElementById("output"),codeOutput=document.getElementById("code"),examples=document.querySelectorAll(".example"),options=document.getElementById("options"),copy=document.getElementById("copy");function outputResult(e,t){let a=currentDate.value?`"${currentDate.value}"`:"";a&&"utc"===dateFormat.value&&(a=`"${currentDate.value}:00Z"`);let o=t?`const date = new Date(${a});${t};`:"";output.innerText=`Result: ${e}`,codeOutput.innerText=o}function outputSeconds(){outputResult("local"===dateFormat.value?date.getSeconds():date.getUTCSeconds(),"local"===dateFormat.value?"\ndate.getSeconds()":"\ndate.getUTCSeconds()")}function outputMinutes(){outputResult("local"===dateFormat.value?date.getMinutes():date.getUTCMinutes(),"local"===dateFormat.value?"\ndate.getMinutes()":"\ndate.getUTCMinutes()")}function outputHours(){outputResult("local"===dateFormat.value?date.getHours():date.getUTCHours(),"local"===dateFormat.value?"\ndate.getHours()":"\ndate.getUTCHours()")}function outputTime(){let e="true"===timeFormat.value;outputResult(date.toLocaleTimeString(localeSelect.value,{hour12:e,timeZone:timezoneSelect.value,timeZoneName:timezoneFormatSelect.value}),`
const options = {
  hour12: '${timeFormat.value}',
  timeZone: '${timezoneSelect.value}',
  timeZoneName: '${timezoneFormatSelect.value}'
}

date.toLocaleTimeString('${localeSelect.value}', options)`)}function outputWeekday(){outputResult("local"===dateFormat.value?date.getDay():date.getUTCDay(),"local"===dateFormat.value?"\ndate.getDay()":"\ndate.getUTCDay()")}function outputMonthday(){outputResult("local"===dateFormat.value?date.getDate():date.getUTCDate(),"local"===dateFormat.value?"\ndate.getDate()":"\ndate.getUTCDate()")}function outputDayname(){outputResult(date.toLocaleString(localeSelect.value,{weekday:dayFormat.value}),`
const options = {
  weekday: '${dayFormat.value}'
};

date.toLocaleString('${localeSelect.value}', options)`)}function outputMonth(){outputResult("local"===dateFormat.value?date.getMonth():date.getUTCMonth(),"local"===dateFormat.value?"\ndate.getMonth()":"\ndate.getUTCMonth()")}function outputMonthname(){outputResult(date.toLocaleString(localeSelect.value,{month:monthFormat.value}),`
const options = {
  month: '${monthFormat.value}'
};

date.toLocaleString('${localeSelect.value}', options)`)}function outputYear(){outputResult("local"===dateFormat.value?date.getFullYear():date.getUTCFullYear(),"local"===dateFormat.value?"\ndate.getFullYear()":"\ndate.getUTCFullYear()")}function outputDate(){outputResult(date.toLocaleDateString(localeSelect.value,{weekday:dayFormat.value,year:"numeric",month:monthFormat.value,day:"numeric",timeZone:timezoneSelect.value,timeZoneName:timezoneFormatSelect.value}),`
const options = {
  weekday: '${dayFormat.value}',
  year: 'numeric',
  month: '${monthFormat.value}',
  day: 'numeric',
  timeZone: '${timezoneSelect.value}',
  timeZoneName: '${timezoneFormatSelect.value}'
};

date.toLocaleDateString('${localeSelect.value}', options)`)}function outputDateTime(){let e="true"===timeFormat.value;outputResult(date.toLocaleString(localeSelect.value,{weekday:dayFormat.value,year:"numeric",month:monthFormat.value,day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:e,timeZone:timezoneSelect.value,timeZoneName:timezoneFormatSelect.value}),`
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

date.toLocaleString('${localeSelect.value}', options)`)}function handleExampleClick(e){let t=e.currentTarget,a=t.id;if(clearActiveElement(),t.classList.add("active"),date=new Date,currentDate.value){let e=currentDate.value;"utc"===dateFormat.value&&(e=`${e}:00Z`),date=new Date(e)}switch(a){case"seconds":outputSeconds();break;case"minutes":outputMinutes();break;case"hours":outputHours();break;case"time":outputTime();break;case"weekday":outputWeekday();break;case"monthday":outputMonthday();break;case"dayname":outputDayname();break;case"month":outputMonth();break;case"monthname":outputMonthname();break;case"year":outputYear();break;case"date":default:outputDate();break;case"datetime":outputDateTime()}}function clearActiveElement(){let e=document.querySelector(".active");e&&e.classList.remove("active")}function handleFormChange(){clearActiveElement(),outputResult("","")}function handleCopy(e){if(codeOutput.innerText&&!isCopied){navigator.clipboard.writeText(codeOutput.innerText);let t=e.target.innerText;e.target.innerText="Copied!",isCopied=!0,setTimeout(()=>{e.target.innerText=t,isCopied=!1},2e3)}}async function populateLocales(){try{let e=await fetch("https://restcountries.com/v3.1/all"),t=await e.json(),a=new Set;t.forEach(e=>{let t=e.cca2,o=e.languages;o&&t&&Object.entries(o).forEach(([e,o])=>{let n=`${e}-${t}`,l=`${o} (${t})`;a.add(JSON.stringify({locale:n,label:l}))})});let o=Array.from(a).map(e=>JSON.parse(e));o.sort((e,t)=>e.label.localeCompare(t.label)),localeSelect.innerHTML="",o.forEach(({locale:e,label:t})=>{let a=document.createElement("option");a.value=e,a.textContent=t,localeSelect.appendChild(a)})}catch(e){console.warn("Failed to load locales from API, using fallback.",e)}}function getTimeZoneOffsetLabel(e){try{let t=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",timeZoneName:"short"}).formatToParts(t).find(e=>"timeZoneName"===e.type);return a?a.value.replace("GMT","UTC"):""}catch(e){return console.warn(e),""}}function populateTimeZones(){let e=[];if("function"==typeof Intl.supportedValuesOf)try{(e=Intl.supportedValuesOf("timeZone")).sort(),timezoneSelect.innerHTML="",e.forEach(e=>{let t=getTimeZoneOffsetLabel(e),a=document.createElement("option");a.value=e,a.textContent=`${e} (${t})`,timezoneSelect.appendChild(a)})}catch(e){console.warn('Intl.supportedValuesOf("timeZone") not available, using fallback.',e)}}examples.forEach(e=>e.addEventListener("click",handleExampleClick)),options.addEventListener("change",handleFormChange),copy.addEventListener("click",handleCopy),populateLocales(),populateTimeZones();
//# sourceMappingURL=any-date.456fadbd.js.map
