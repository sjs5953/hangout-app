import moment from 'moment'

export default function convertDate (date) {
  // return moment().calendar(date,{
  //   sameDay: '[Today], hh:mm a',
  //   nextDay: '[Yesterday], hh:mm a',
  //   nextWeek: 'dddd, hh:mm a',
  //   lastDay: '[Tomorrow], hh:mm a',
  //   lastWeek: '[Last] ddd, hh:mm a',
  //   sameElse: 'MMM DD, hh:mm a'
  // })

  return moment(date).format('MMM DD, hh:mm a')
}