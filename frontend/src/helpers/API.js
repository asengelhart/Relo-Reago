export default class API {
  static path(endpoint) {
    return new URL(`http://localhost:3000/${endpoint}/`)
  }

  static queryPath(endpoint, queryObj) {
    let newUrl = this.path(endpoint);
    newUrl.search = new URLSearchParams(queryObj);
    return newUrl;
  }

  static postObj(postBody) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(postBody)
    }
  }

  static changeVotesObj(originalObj, votesChange) {
    const postBody = JSON.stringify({
      ...originalObj,
      votes: originalObj.votes + votesChange
    });
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: postBody
    }
  }

  static fetchPost(endpoint, postObj, dispatchCallback, errorHandler) {
    //Note that postObj should be the result of either postObj() or changeVotesObj()
    fetch(this.path(endpoint).toString(), postObj)
    .then(r => r.json())
    .then(newObj => {dispatchCallback(newObj)})
    .catch(error => {
      if(errorHandler) {
        errorHandler(error);
      } else {
        alert(error.messsage)
      }
    });
  }
}
