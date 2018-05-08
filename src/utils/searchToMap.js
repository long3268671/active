/**
 * Created by kinda on 17/1/4.
 */
export default function searchToMap(){
  let search = location.search.slice(1);
  // console.log(search)
  let _array =search.split('&');
  // console.log(_array)
  let map = {};
  _array.forEach(str => {
    let _str = str.split('=');
    map[_str[0]] = _str[1];
  });
  return map;
}
