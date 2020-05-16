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
    postBody = JSON.stringify({
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

  static async fetchPost(endpoint, postObj, dispatchCallback) {
    //Note that postObj should be the result of either postObj() or changeVotesObj()
    try {
      let response = await fetch(this.path(endpoint).toString(), postObj)
      if(!response.ok) {
        let errorObj = await response.json();
        if(errorObj.message) {
          throw new Error(errorObj.message);
        } else {
          throw new Error(response.statusText);
        }
      } else {
        const newTranslation = await response.json();
        dispatchCallback(newTranslation);
      }
    } catch(error) {
      dispatch({type: 'ERROR_CAUGHT', error})
    }
  }
}
