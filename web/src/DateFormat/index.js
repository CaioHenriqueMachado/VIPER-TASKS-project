export default function DateFormat( number ) {
  var date = (number).toString();
  var dateFormat = date.substr( 8, 2 ) + ':';
  dateFormat += date.substr( 10, 2 ) + ':';
  dateFormat += date.substr( 12) + ' ';

  dateFormat += date.substr( 6, 2 )+ '/';
  dateFormat += date.substr( 4, 2 )+ '/';
  dateFormat += date.substr( 0, 4);

  return (dateFormat);
}