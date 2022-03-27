function useFetch() {
  async function getFetch(url, MerchantId, locale = "ar") {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          MerchantId: MerchantId,
          "Accept-Language": locale,
        },
      });
      return response;
    } catch (e) {
      return null;
    }
  }
  async function postFetch(url, MerchantId, body, userID = "") {
    console.log("body", body);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          MerchantId: MerchantId,
          UserId: userID,
        },
        body: JSON.stringify(body),
      });
      return response;
    } catch (e) {
      return null;
    }
  }

  async function SignUpPost(body, image, url) {
    const data = new FormData();
    data.append(`image`, image);
    for (let key in body) data.append(key, JSON.stringify(body[key]));

    const requestOptions = {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        MerchantId: merchant,
      },
      body: data,
    };
    try {
      return fetch(`${url}`, requestOptions)
        .then()
        .then((res) => {
          console.log("NewUser", res);
          return res;
        });
    } catch (e) {
      console.log(e);
    }
  }

  return [getFetch, postFetch, SignUpPost];
}
export default useFetch;
