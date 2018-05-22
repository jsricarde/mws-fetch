const load = () => {
  var myHeaders = new Headers();

  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'no-cors',
    cache: 'default'
  };

  const myRequest = new Request('movies.json', myInit);
  // return fetch('https://raw.githubusercontent.com/jsricarde/mws-fetch/master/movies.json')
  return fetch(myRequest)
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      console.log(res);
    })
}

// const postData = (url, data) => {
//   return fetch(url)
// }

// console.log(myRequest);
load();